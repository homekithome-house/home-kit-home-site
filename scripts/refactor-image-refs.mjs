// One-shot: refactor all code refs to images.
// 1) Slugify all `dist/images/...` paths (in src/srcset/url()).
// 2) Migrate <img src="images/..."> directly to <picture> AVIF/WebP + <img> fallback (AVIF).
// 3) Slugify any leftover `images/...` references in CSS/JSON/JS that don't get wrapped.
//
// Run: node scripts/refactor-image-refs.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function slugifySegment(name) {
    return name
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/\+/g, '-plus')
        .replace(/[()]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9._-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Decode URI-encoded path then slugify each segment.
// Keeps the extension intact (slugify the basename without ext, then re-add).
function slugifyPath(p) {
    // Decode percent-encoding
    let decoded;
    try { decoded = decodeURIComponent(p); } catch(e) { decoded = p; }
    const segments = decoded.split('/');
    return segments.map(seg => {
        if (!seg) return seg;
        const dot = seg.lastIndexOf('.');
        // Treat as filename only if dot is past position 0 AND extension is short (<=5 chars, alnum)
        if (dot > 0 && /^\.[a-z0-9]{1,5}$/i.test(seg.slice(dot))) {
            const base = seg.slice(0, dot);
            const ext = seg.slice(dot + 1).toLowerCase();
            return slugifySegment(base) + '.' + ext;
        }
        return slugifySegment(seg);
    }).join('/');
}

// Map source image extension (png/jpg/jpeg/webp) to the AVIF derivative path in /dist/images/.
function sourceToAvif(srcPath) {
    // srcPath like "images/Top Photos/foo.png" or "Top Photos/foo.png" or with encoding
    let p = srcPath.replace(/^\.?\/?images\//, '');
    p = slugifyPath(p);
    // strip extension, add .avif
    return 'dist/images/' + p.replace(/\.(png|jpe?g|webp)$/i, '.avif');
}
function sourceToWebp(srcPath) {
    return sourceToAvif(srcPath).replace(/\.avif$/, '.webp');
}

let stats = { picturesMigrated: 0, distPathsSlugified: 0, cssJsonRefs: 0, files: 0 };

// --- HTML: migrate <img src="images/..."> to <picture> ---
function migrateImgsToPicture(html) {
    // Find <img ... src="images/..."> that is NOT already inside a <picture>...</picture>.
    // We need a two-pass: first identify ranges inside <picture>...</picture>, then skip.
    const pictureRanges = [];
    const pRe = /<picture\b[\s\S]*?<\/picture>/gi;
    let m;
    while ((m = pRe.exec(html)) !== null) {
        pictureRanges.push([m.index, m.index + m[0].length]);
    }
    const inPicture = (idx) => pictureRanges.some(([a, b]) => idx >= a && idx < b);

    // Match <img ... src="images/..." ...>
    const imgRe = /<img\b([^>]*?)\bsrc="(images\/[^"]+)"([^>]*)>/g;
    let out = '';
    let last = 0;
    while ((m = imgRe.exec(html)) !== null) {
        const fullStart = m.index;
        if (inPicture(fullStart)) continue;

        const before = m[1] || '';
        const src = m[2];
        const after = m[3] || '';

        // Skip svg/gif (not converted)
        if (/\.(svg|gif)$/i.test(src)) continue;
        // Only handle png/jpg/jpeg/webp
        if (!/\.(png|jpe?g|webp)$/i.test(src)) continue;

        const avifSrc = sourceToAvif(src);
        const webpSrc = sourceToWebp(src);

        // Detect any attributes to preserve (alt, width, height, loading, decoding, class, id, fetchpriority, style)
        const attrs = (before + after).trim();

        // Ensure loading="lazy" present unless eager already
        let imgAttrs = attrs;
        if (!/\bloading=/.test(imgAttrs)) {
            imgAttrs = imgAttrs + ' loading="lazy"';
        }
        if (!/\bdecoding=/.test(imgAttrs)) {
            imgAttrs = imgAttrs + ' decoding="async"';
        }
        imgAttrs = imgAttrs.replace(/\s+/g, ' ').trim();

        const replacement =
            `<picture>` +
            `<source srcset="${avifSrc}" type="image/avif">` +
            `<source srcset="${webpSrc}" type="image/webp">` +
            `<img src="${avifSrc}" ${imgAttrs}>` +
            `</picture>`;

        out += html.slice(last, fullStart) + replacement;
        last = fullStart + m[0].length;
        stats.picturesMigrated++;
    }
    out += html.slice(last);
    return out;
}

// --- Slugify any dist/images/... path inside src=, srcset=, url(...) ---
function slugifyDistRefs(content) {
    // src="dist/images/..." and srcset="dist/images/..."
    content = content.replace(/(src|srcset|href)="(dist\/images\/[^"]+)"/g, (full, attr, p) => {
        const fixed = 'dist/images/' + slugifyPath(p.replace(/^dist\/images\//, ''));
        if (fixed !== p) stats.distPathsSlugified++;
        return `${attr}="${fixed}"`;
    });
    // url(dist/images/...) and url("dist/images/...") and url('dist/images/...')
    content = content.replace(/url\((["']?)(dist\/images\/[^)"']+)\1\)/g, (full, q, p) => {
        const fixed = 'dist/images/' + slugifyPath(p.replace(/^dist\/images\//, ''));
        if (fixed !== p) stats.distPathsSlugified++;
        return `url(${q}${fixed}${q})`;
    });
    return content;
}

// --- Slugify lingering `images/...` refs in CSS/JS/JSON (where we don't wrap into <picture>) ---
// In CSS: url(images/...) → url(dist/images/<slug>.avif)? No — keep as dist path with original ext slugged.
// Actually for CSS bg-images, we want to point to dist/images/<slug>.<ext>... but dist only contains avif/webp.
// Safer: rewrite url(images/X.png) → url(dist/images/<slug>.avif)
function rewriteCssJsonImagesRefs(content) {
    content = content.replace(/url\((["']?)images\/([^)"']+)\1\)/g, (full, q, rest) => {
        const slug = slugifyPath(rest).replace(/\.(png|jpe?g|webp)$/i, '.avif');
        stats.cssJsonRefs++;
        return `url(${q}dist/images/${slug}${q})`;
    });
    // For JSON: "path": "images/X.png" → "dist/images/<slug>.avif"
    content = content.replace(/"(images\/[^"]+\.(?:png|jpe?g|webp))"/gi, (full, p) => {
        const rel = p.replace(/^images\//, '');
        const slug = slugifyPath(rel).replace(/\.(png|jpe?g|webp)$/i, '.avif');
        stats.cssJsonRefs++;
        return `"dist/images/${slug}"`;
    });
    // For JS string literals: 'images/X.png' or "images/X.png"
    content = content.replace(/(['"`])images\/([^'"`]+\.(?:png|jpe?g|webp))\1/gi, (full, q, rest) => {
        const slug = slugifyPath(rest).replace(/\.(png|jpe?g|webp)$/i, '.avif');
        stats.cssJsonRefs++;
        return `${q}dist/images/${slug}${q}`;
    });
    return content;
}

function processFile(absPath) {
    const ext = path.extname(absPath).toLowerCase();
    const original = fs.readFileSync(absPath, 'utf8');
    let updated = original;

    if (ext === '.html') {
        updated = slugifyDistRefs(updated);
        updated = migrateImgsToPicture(updated);
        // any leftover images/ refs in HTML (e.g. inline style url(...)) → rewrite
        updated = rewriteCssJsonImagesRefs(updated);
    } else if (ext === '.css') {
        updated = slugifyDistRefs(updated);
        updated = rewriteCssJsonImagesRefs(updated);
    } else if (ext === '.js' || ext === '.json') {
        updated = slugifyDistRefs(updated);
        updated = rewriteCssJsonImagesRefs(updated);
    }

    if (updated !== original) {
        fs.writeFileSync(absPath, updated, 'utf8');
        stats.files++;
        console.log(`✓ ${path.relative(ROOT, absPath)}`);
    }
}

function walk(dir, exclude) {
    for (const name of fs.readdirSync(dir)) {
        if (exclude.includes(name)) continue;
        const p = path.join(dir, name);
        const s = fs.statSync(p);
        if (s.isDirectory()) walk(p, exclude);
        else {
            const ext = path.extname(name).toLowerCase();
            if (['.html', '.css', '.js', '.json'].includes(ext)) processFile(p);
        }
    }
}

// Scan root + assets + data + partials
const targets = ['.', 'assets', 'data', 'partials'];
const exclude = ['node_modules', '.git', 'dist', 'images', 'Convertir images', 'scripts', 'fichiers', '.claude', 'agent_docs'];

for (const t of targets) {
    const abs = path.join(ROOT, t);
    if (!fs.existsSync(abs)) continue;
    if (t === '.') {
        // only top-level files
        for (const name of fs.readdirSync(abs)) {
            const p = path.join(abs, name);
            if (!fs.statSync(p).isFile()) continue;
            const ext = path.extname(name).toLowerCase();
            if (['.html', '.css', '.js', '.json'].includes(ext)) processFile(p);
        }
    } else {
        walk(abs, exclude);
    }
}

console.log(`\n=== Done ===`);
console.log(`Files modified: ${stats.files}`);
console.log(`<img> migrated to <picture>: ${stats.picturesMigrated}`);
console.log(`dist/images/ paths slugified: ${stats.distPathsSlugified}`);
console.log(`leftover images/ refs rewritten (CSS/JSON/JS): ${stats.cssJsonRefs}`);
