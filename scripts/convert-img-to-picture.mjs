/**
 * convert-img-to-picture.mjs
 * Converts <img> tags to <picture> elements with AVIF + WebP sources.
 * Run from project root: node scripts/convert-img-to-picture.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// HTML files at root level to process
const htmlFiles = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html') && f !== 'nav-snippet.html')
  .map(f => path.join(ROOT, f));

// Skip if src is external or empty
function isSkippable(src) {
  return !src || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src.startsWith('//');
}

// Compute dist path: images/foo/bar.png -> dist/images/foo/bar
// Returns { avif, webp } or null if not an image path starting with images/
function getDistPaths(src) {
  // Decode and re-encode to handle URI-encoded paths
  // We work on the raw src string to preserve encoding
  // Check if it starts with images/
  const decodedSrc = decodeURIComponent(src);
  if (!decodedSrc.startsWith('images/')) return null;

  // Get extension from original src (handle URI encoded characters)
  const extMatch = src.match(/\.(png|jpg|jpeg|webp|PNG|JPG|JPEG)(%.*)?$/i);
  if (!extMatch) return null;

  const ext = extMatch[1];
  // Replace images/ prefix with dist/images/ and swap extension
  // We preserve the exact encoding of the rest of the path
  const base = src.replace(/^images\//, 'dist/images/');
  const withoutExt = base.replace(new RegExp('\\.' + ext + '(%.*)?$', 'i'), '');

  return {
    avif: withoutExt + '.avif',
    webp: withoutExt + '.webp'
  };
}

// Parse a single <img ...> tag and return its attributes as a map
function parseImgAttrs(imgStr) {
  const attrs = {};
  // Match key="value", key='value', key=value (no quotes), or standalone key
  const attrRe = /(\w[\w-]*)(?:\s*=\s*(?:"([^"]*?)"|'([^']*?)'|([^\s>\/]+)))?/g;
  let m;
  while ((m = attrRe.exec(imgStr)) !== null) {
    const name = m[1];
    if (name === 'img') continue; // skip the tag name itself
    const val = m[2] !== undefined ? m[2] : (m[3] !== undefined ? m[3] : (m[4] !== undefined ? m[4] : true));
    attrs[name] = val;
  }
  return attrs;
}

// Rebuild img tag string preserving exact attribute order and quotes
// We just take the original tag and wrap it
function buildPictureTag(originalImgTag, avifSrc, webpSrc) {
  return `<picture>\n  <source srcset="${avifSrc}" type="image/avif">\n  <source srcset="${webpSrc}" type="image/webp">\n  ${originalImgTag}\n</picture>`;
}

// Check if an <img> match is already inside a <picture> tag
function isInsidePicture(content, matchIndex) {
  // Look backwards from matchIndex for <picture or </picture>
  const before = content.slice(Math.max(0, matchIndex - 300), matchIndex);
  const lastPicOpen = before.lastIndexOf('<picture');
  const lastPicClose = before.lastIndexOf('</picture>');
  if (lastPicOpen === -1) return false;
  return lastPicOpen > lastPicClose;
}

// Check if <img> is inside a <script> block
function isInsideScript(content, matchIndex) {
  const before = content.slice(0, matchIndex);
  const lastScriptOpen = before.lastIndexOf('<script');
  const lastScriptClose = before.lastIndexOf('</script>');
  if (lastScriptOpen === -1) return false;
  return lastScriptOpen > lastScriptClose;
}

// Check if <img> is in an HTML comment
function isInsideComment(content, matchIndex) {
  const before = content.slice(0, matchIndex);
  const lastComOpen = before.lastIndexOf('<!--');
  const lastComClose = before.lastIndexOf('-->');
  if (lastComOpen === -1) return false;
  return lastComOpen > lastComClose;
}

// Heuristic: is this img "above the fold" (hero)?
// We consider any <img> in the first 100 lines of <body> as potential above-fold
function isAboveFold(content, matchIndex) {
  const bodyStart = content.indexOf('<body');
  if (bodyStart === -1) return false;
  const bodyContent = content.slice(bodyStart, matchIndex);
  const lineCount = (bodyContent.match(/\n/g) || []).length;
  return lineCount < 100;
}

const stats = {
  converted: {},
  skipped: [],
  addedLoading: [],
  addedDimensions: [],
};

for (const filePath of htmlFiles) {
  const fileName = path.basename(filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let convertedCount = 0;

  // Regex to match <img ...> tags (self-closing or not), possibly multiline
  // We use a greedy approach but stop at >
  const imgRe = /<img\s([^>]*?)\/?>(?!\s*<\/picture>)/gs;

  let result = '';
  let lastIndex = 0;
  let match;

  while ((match = imgRe.exec(content)) !== null) {
    const fullMatch = match[0];
    const matchIndex = match.index;

    // Extract src
    const srcMatch = fullMatch.match(/\bsrc\s*=\s*(?:"([^"]*?)"|'([^']*?)'|([^\s>\/]+))/i);
    const src = srcMatch ? (srcMatch[1] !== undefined ? srcMatch[1] : (srcMatch[2] !== undefined ? srcMatch[2] : srcMatch[3])) : '';

    // Skip conditions
    if (isInsideScript(content, matchIndex)) {
      result += content.slice(lastIndex, matchIndex + fullMatch.length);
      lastIndex = matchIndex + fullMatch.length;
      stats.skipped.push({ file: fileName, src, reason: 'inside <script>' });
      continue;
    }
    if (isInsideComment(content, matchIndex)) {
      result += content.slice(lastIndex, matchIndex + fullMatch.length);
      lastIndex = matchIndex + fullMatch.length;
      stats.skipped.push({ file: fileName, src, reason: 'inside HTML comment' });
      continue;
    }
    if (isInsidePicture(content, matchIndex)) {
      result += content.slice(lastIndex, matchIndex + fullMatch.length);
      lastIndex = matchIndex + fullMatch.length;
      stats.skipped.push({ file: fileName, src, reason: 'already inside <picture>' });
      continue;
    }
    if (isSkippable(src)) {
      result += content.slice(lastIndex, matchIndex + fullMatch.length);
      lastIndex = matchIndex + fullMatch.length;
      stats.skipped.push({ file: fileName, src: src || '(empty)', reason: 'external URL or empty src' });
      continue;
    }

    const distPaths = getDistPaths(src);
    if (!distPaths) {
      result += content.slice(lastIndex, matchIndex + fullMatch.length);
      lastIndex = matchIndex + fullMatch.length;
      stats.skipped.push({ file: fileName, src, reason: 'path not under images/ — keeping as-is' });
      continue;
    }

    // Build the modified <img> tag
    let imgTag = fullMatch;

    // Add loading="lazy" if absent and not above fold
    const hasLoading = /\bloading\s*=/i.test(imgTag);
    if (!hasLoading) {
      const aboveFold = isAboveFold(content, matchIndex);
      if (!aboveFold) {
        // Insert loading="lazy" before the closing > or />
        imgTag = imgTag.replace(/(\s*\/?>)$/, ' loading="lazy"$1');
        stats.addedLoading.push({ file: fileName, src });
      }
      // If above fold, leave as-is (browser default = eager)
    }

    // Ensure self-closing for consistency (some already are)
    // We leave the tag as-is — picture wrapper handles the rest

    // Build picture element
    const picture = buildPictureTag(imgTag, distPaths.avif, distPaths.webp);

    result += content.slice(lastIndex, matchIndex) + picture;
    lastIndex = matchIndex + fullMatch.length;
    convertedCount++;
  }

  result += content.slice(lastIndex);

  if (convertedCount > 0) {
    fs.writeFileSync(filePath, result, 'utf8');
    stats.converted[fileName] = convertedCount;
    console.log(`✅ ${fileName}: ${convertedCount} img → picture`);
  } else {
    console.log(`⏭  ${fileName}: nothing to convert`);
  }
}

// Summary
console.log('\n═══ RÉSUMÉ ═══');
console.log('Fichiers modifiés:');
for (const [f, n] of Object.entries(stats.converted)) {
  console.log(`  ${f}: ${n} conversions`);
}
console.log(`\nSkipped (${stats.skipped.length}):`);
for (const s of stats.skipped) {
  console.log(`  [${s.file}] ${s.src} — ${s.reason}`);
}
console.log(`\nloading="lazy" ajouté: ${stats.addedLoading.length} images`);
if (stats.addedLoading.length > 0) {
  for (const s of stats.addedLoading) {
    console.log(`  [${s.file}] ${s.src}`);
  }
}
