/* ─────────────────────────────────────────────────────────────────
   interactive-plan.js — Logique partagée pages résidence
   Données page-spécifiques fournies via window.PLAN_DATA :
     model   : string  — clé du modèle (ex. 'horizon')
     prices  : object  — { GP:..., MQ:..., GF:..., MF:..., BL:..., FR:... }
     rooms   : array   — (essence uniquement) ['sejour','chambre',...]
     labels  : object  — (essence uniquement) { sejour:'Séjour', ... }
     descs   : object  — (essence uniquement) { sejour:'...', ... }
     photos  : object  — (essence uniquement) { sejour:'images/...', ... }
───────────────────────────────────────────────────────────────────── */

/* ── Carrousel ── */
(function initCarrousel() {
  const slides    = document.querySelectorAll('.car-slide');
  const thumbs    = document.querySelectorAll('.car-thumb');
  const carSlides = document.getElementById('carSlides');
  if (!carSlides || !slides.length) return;

  let curSlide = 0;
  const totalSlides = slides.length;
  const elTot = document.getElementById('carTot');
  const elCur = document.getElementById('carCur');
  if (elTot) elTot.textContent = totalSlides;

  function goSlide(n) {
    slides[curSlide].classList.remove('active');
    if (thumbs[curSlide]) thumbs[curSlide].classList.remove('active');
    curSlide = (n + totalSlides) % totalSlides;
    slides[curSlide].classList.add('active');
    if (thumbs[curSlide]) thumbs[curSlide].classList.add('active');
    carSlides.style.transform = 'translateX(-' + (curSlide * 100) + '%)';
    if (elCur) elCur.textContent = curSlide + 1;
  }

  const btnPrev = document.getElementById('carPrev');
  const btnNext = document.getElementById('carNext');
  if (btnPrev) btnPrev.addEventListener('click', () => goSlide(curSlide - 1));
  if (btnNext) btnNext.addEventListener('click', () => goSlide(curSlide + 1));
  thumbs.forEach((t, i) => t.addEventListener('click', () => goSlide(i)));

  /* ── Group tabs (carrousel + 3D) ── */
  let threejsLoaded = false;
  document.querySelectorAll('.cgt').forEach(btn => {
    btn.addEventListener('click', function () {
      const group = this.dataset.group;
      document.querySelectorAll('.cgt').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      if (group === '3d') {
        carSlides.style.display = 'none';
        const c3d = document.getElementById('viewer3d');
        if (c3d) {
          c3d.style.display = 'block';
          if (!threejsLoaded) { threejsLoaded = true; loadThreeJS(); }
        }
        const carCount = document.querySelector('.car-count');
        if (carCount) carCount.style.display = 'none';
        const hint = document.getElementById('viewerHint');
        if (hint) hint.style.display = 'block';
      } else {
        carSlides.style.display = 'flex';
        const c3d = document.getElementById('viewer3d');
        if (c3d) c3d.style.display = 'none';
        const carCount = document.querySelector('.car-count');
        if (carCount) carCount.style.display = '';
        const hint = document.getElementById('viewerHint');
        if (hint) hint.style.display = 'none';
        const idx = [...slides].findIndex(s => s.dataset.group === group);
        if (idx >= 0) goSlide(idx);
      }
    });
  });
})();

/* ── Finition selector ── */
const finDescs = {
  pinede: 'Bardage bois foncé, teinte naturelle profonde — s\'intègre harmonieusement dans les environnements boisés et tropicaux.',
  pure:   'Enduit blanc minéral, rendu architectural sobre — idéal pour les environnements côtiers et les projets contemporains.',
  linea:  'Bardage horizontal aluminium — lignes nettes, style premium, résistance maximale aux intempéries tropicales.',
  pano:   'Vitrages sols-plafonds sur toutes les façades — immersion totale dans l\'environnement, luminosité maximale.'
};

function selectFin(el, fin) {
  document.querySelectorAll('.fin-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.fin-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  const swatch = el.querySelector('.fin-swatch');
  if (swatch) swatch.classList.add('active');
  const desc = document.getElementById('finDesc');
  if (desc) desc.textContent = finDescs[fin] || '';
}

/* ── Ambiance selector ── */
function selectAmbiance(el) {
  document.querySelectorAll('.ambiance-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

/* ── View tabs (plan / 3D) ── */
function switchView(type, btn) {
  const planView       = document.getElementById('planView');
  const viewer3dEl     = document.getElementById('viewer3d');
  const mainPlaceholder = document.getElementById('mainPlaceholder');
  const viewerHint     = document.getElementById('viewerHint');
  if (!planView || !viewer3dEl) return;

  document.querySelectorAll('.view-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  planView.classList.remove('active');
  viewer3dEl.style.display = 'none';
  if (viewerHint) viewerHint.style.display = 'none';
  if (mainPlaceholder) mainPlaceholder.style.display = 'flex';

  if (type === 'plan') {
    planView.classList.add('active');
    if (mainPlaceholder) mainPlaceholder.style.display = 'none';
  } else if (type === '3d') {
    viewer3dEl.style.display = 'block';
    if (viewerHint) viewerHint.style.display = 'block';
    if (mainPlaceholder) mainPlaceholder.style.display = 'none';
    if (!window._threejsLoaded) { window._threejsLoaded = true; loadThreeJS(); }
  }
}

/* ── 3D Viewer ── */
function loadThreeJS() {
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  s.onload = buildScene3D;
  document.head.appendChild(s);
}

function buildScene3D() {
  const THREE  = window.THREE;
  const canvas = document.getElementById('viewer3d');
  if (!canvas || !THREE) return;
  const W = canvas.clientWidth, H = canvas.clientHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a18);
  scene.fog = new THREE.Fog(0x1a1a18, 20, 38);

  const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
  camera.position.set(8, 5, 10);
  camera.lookAt(0, 1, 0);

  scene.add(new THREE.AmbientLight(0xfff5e0, 0.7));
  const sun = new THREE.DirectionalLight(0xfff0d0, 1.5);
  sun.position.set(8, 14, 6); sun.castShadow = true; scene.add(sun);

  const m = (c, r = .6, met = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: met });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), m(0x252521, .9));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

  const body = new THREE.Mesh(new THREE.BoxGeometry(7, 1.9, 2.6), m(0xe8e0d4, .7));
  body.position.set(0, .95, 0); body.castShadow = true; body.receiveShadow = true; scene.add(body);

  const rfG  = new THREE.CylinderGeometry(0, 3.8, .95, 4, 1);
  const roof = new THREE.Mesh(rfG, m(0x2c2c28, .8));
  roof.position.set(0, 2.4, 0); roof.rotation.y = Math.PI / 4; roof.castShadow = true; scene.add(roof);

  const glassM = new THREE.MeshStandardMaterial({ color: 0x88bbcc, roughness: .05, metalness: .2, transparent: true, opacity: .55 });
  const gF = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.5, .06), glassM);
  gF.position.set(0, 1.1, 1.31); scene.add(gF);
  const gS = new THREE.Mesh(new THREE.BoxGeometry(.06, 1.5, 2.2), glassM);
  gS.position.set(3.51, 1.1, 0); scene.add(gS);

  const stripe = new THREE.Mesh(new THREE.BoxGeometry(7.02, .06, 2.62), m(0xB87333, .4, .5));
  stripe.position.set(0, 1.9, 0); scene.add(stripe);

  [[5.5, 0, 4], [-6, 0, -3.5], [4, 0, -4.5]].forEach(([x, y, z]) => {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(.1, .14, 1.4), m(0x5a4032));
    t.position.set(x, .7, z); scene.add(t);
    const f = new THREE.Mesh(new THREE.SphereGeometry(.8, 8, 6), m(0x2d5a27, .95));
    f.position.set(x, 2.1, z); scene.add(f);
  });

  let theta = .5, phi = .45, radius = 14, tTheta = .5, tPhi = .45, drag = false, px = 0, py = 0;
  const upd = () => {
    camera.position.x = radius * Math.sin(theta) * Math.cos(phi);
    camera.position.y = radius * Math.sin(phi) + 1;
    camera.position.z = radius * Math.cos(theta) * Math.cos(phi);
    camera.lookAt(0, 1, 0);
  };
  upd();

  canvas.addEventListener('mousedown',  e  => { drag = true; px = e.clientX; py = e.clientY; });
  canvas.addEventListener('mousemove',  e  => {
    if (!drag) return;
    tTheta -= (e.clientX - px) * .008;
    tPhi    = Math.max(-.05, Math.min(1.15, tPhi + (e.clientY - py) * .005));
    px = e.clientX; py = e.clientY;
  });
  canvas.addEventListener('mouseup',    () => drag = false);
  canvas.addEventListener('mouseleave', () => drag = false);
  canvas.addEventListener('wheel', e => {
    radius = Math.max(6, Math.min(22, radius + e.deltaY * .015));
    e.preventDefault();
  }, { passive: false });

  let lTouch = null;
  canvas.addEventListener('touchstart', e => lTouch = e.touches[0]);
  canvas.addEventListener('touchmove', e => {
    if (!lTouch) return;
    tTheta -= (e.touches[0].clientX - lTouch.clientX) * .008;
    tPhi    = Math.max(-.05, Math.min(1.15, tPhi + (e.touches[0].clientY - lTouch.clientY) * .005));
    lTouch  = e.touches[0]; e.preventDefault();
  }, { passive: false });

  let autoRot = true;
  canvas.addEventListener('mousedown', () => autoRot = false);
  (function animate() {
    requestAnimationFrame(animate);
    if (autoRot) tTheta += .003;
    theta += (tTheta - theta) * .08;
    phi   += (tPhi   - phi)   * .08;
    upd(); renderer.render(scene, camera);
  })();

  window.addEventListener('resize', () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
  });
}

/* ── Plan interactif SVG — Architecture B (data-attributes) ── */
function activateRoom(id) {
  document.querySelectorAll('.room-zone').forEach(z => z.classList.remove('active'));
  const zone = document.getElementById(id);
  if (!zone) return;
  zone.classList.add('active');
  const rpName = document.getElementById('rpName');
  const rpDesc = document.getElementById('rpDesc');
  const rpImg  = document.getElementById('rpImg');
  const rpPh   = document.getElementById('rpPlaceholder');
  if (rpName) rpName.textContent = zone.dataset.name || '';
  if (rpDesc) rpDesc.textContent = zone.dataset.desc || '';
  if (zone.dataset.img) {
    if (rpImg) { rpImg.src = zone.dataset.img; rpImg.style.display = 'block'; }
    if (rpPh)  rpPh.style.display = 'none';
  } else {
    if (rpImg) rpImg.style.display = 'none';
    if (rpPh)  { rpPh.style.display = 'block'; rpPh.textContent = 'Ajoutez data-img="images/..." sur cette pièce'; }
  }
}
document.querySelectorAll('.room-zone').forEach(z => {
  z.addEventListener('click', () => activateRoom(z.id));
});

/* ── Plan interactif ROOM_ORDER — Architecture A (essence) ── */
(function initPlanROOM() {
  const pd = window.PLAN_DATA;
  if (!pd || !pd.rooms) return;

  const ROOM_ORDER  = pd.rooms;
  const ROOMS       = Object.fromEntries(ROOM_ORDER.map(k => [k, { label: pd.labels[k], desc: pd.descs[k] }]));
  const ROOM_PHOTOS = pd.photos || {};

  let currentIdx = 0;
  let isAnimating = false;

  function slideToRoom(targetRoom, fromNav) {
    const targetIdx = ROOM_ORDER.indexOf(targetRoom);
    if (targetIdx === -1) return;

    document.querySelectorAll('.rz').forEach(el => el.classList.toggle('active', el.dataset.room === targetRoom));
    document.querySelectorAll('[id^="lbl-"]').forEach(el => el.classList.toggle('active', el.id === 'lbl-' + targetRoom));
    document.querySelectorAll('.ip-thumb').forEach(el => el.classList.toggle('active', el.dataset.room === targetRoom));
    const descEl = document.getElementById('ipRoomDesc');
    if (descEl) descEl.textContent = ROOMS[targetRoom].desc;

    if (fromNav || currentIdx === targetIdx) { showPhoto(targetIdx); return; }

    const step = targetIdx > currentIdx ? 1 : -1;
    let idx = currentIdx;
    function nextStep() {
      idx += step;
      showPhoto(idx, idx !== targetIdx ? nextStep : null);
    }
    nextStep();
  }

  function showPhoto(idx, callback) {
    if (isAnimating) return;
    isAnimating = true;
    currentIdx  = idx;
    const room   = ROOM_ORDER[idx];
    const mainImg = document.getElementById('ipMainImg');
    const mainPh  = document.getElementById('ipMainPh');
    const src     = ROOM_PHOTOS[room] || '';

    if (mainImg) mainImg.style.opacity = '0';
    setTimeout(() => {
      if (src) {
        if (mainImg) { mainImg.src = src; mainImg.style.display = 'block'; }
        if (mainPh)  mainPh.style.display = 'none';
      } else {
        if (mainImg) mainImg.style.display = 'none';
        if (mainPh)  { mainPh.style.display = 'flex'; mainPh.textContent = ROOMS[room].label; }
      }
      if (mainImg) mainImg.style.opacity = '1';
      isAnimating = false;
      if (callback) setTimeout(callback, 180);
    }, 180);
  }

  document.querySelectorAll('.rz').forEach(el => {
    el.addEventListener('click', () => slideToRoom(el.dataset.room, false));
  });
  document.querySelectorAll('.ip-thumb').forEach(el => {
    el.addEventListener('click', () => slideToRoom(el.dataset.room, true));
  });

  const btnPrev = document.getElementById('ipPrev');
  const btnNext = document.getElementById('ipNext');
  if (btnPrev) btnPrev.addEventListener('click', () => {
    const newIdx = (currentIdx - 1 + ROOM_ORDER.length) % ROOM_ORDER.length;
    slideToRoom(ROOM_ORDER[newIdx], true);
  });
  if (btnNext) btnNext.addEventListener('click', () => {
    const newIdx = (currentIdx + 1) % ROOM_ORDER.length;
    slideToRoom(ROOM_ORDER[newIdx], true);
  });

  document.querySelectorAll('.ip-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.ip-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const view = this.dataset.view;
      document.querySelectorAll('.ip-left-content').forEach(v => v.classList.remove('active'));
      const id = 'ipView' + (view === '360' ? '360' : view.charAt(0).toUpperCase() + view.slice(1));
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
      const ipPB = document.getElementById('ipPhotosBottom');
      if (ipPB) ipPB.style.display = view === 'photos' ? '' : 'none';
    });
  });

  slideToRoom(ROOM_ORDER[0], true);
})();

/* ── Testimonials ── */
(function initTestimonials() {
  const tItems = document.querySelectorAll('.t-item');
  const tDots  = document.querySelectorAll('.t-dot');
  if (!tItems.length) return;

  let tCur = 0, tTimer;
  function showT(i) {
    tItems.forEach((t, j) => t.classList.toggle('active', j === i));
    tDots.forEach((d, j)  => d.classList.toggle('active', j === i));
    tCur = i;
  }
  tDots.forEach(d => d.addEventListener('click', () => {
    showT(+d.dataset.i);
    clearInterval(tTimer);
    tTimer = setInterval(() => showT((tCur + 1) % tItems.length), 5000);
  }));
  tTimer = setInterval(() => showT((tCur + 1) % tItems.length), 5000);
})();

/* ── Geo-IP Prix ── */
(async function loadPrice() {
  const pd    = window.PLAN_DATA;
  const block = document.getElementById('priceBlock');
  if (!pd || !pd.model || !pd.prices || !block) return;

  const TERRITORIES = {
    GP: 'Guadeloupe', MQ: 'Martinique', GF: 'Guyane française',
    MF: 'Saint-Martin', BL: 'Saint-Barthélemy',
    FR: 'France métropolitaine', ES: 'Espagne',
    BE: 'Belgique', CH: 'Suisse', LU: 'Luxembourg',
    PT: 'Portugal', IT: 'Italie', DE: 'Allemagne'
  };

  function showPrice(code) {
    const price = pd.prices[code] || pd.prices['FR'];
    if (!price) {
      block.innerHTML = '<div class="price-on-request">Tarif sur demande</div>'
        + '<a href="contact.html?model=' + pd.model + '" class="price-cta-link">Demander le tarif →</a>';
      return;
    }
    const p         = new Intl.NumberFormat('fr-FR').format(price);
    const territory = TERRITORIES[code] || (pd.prices[code] ? code : 'Export');
    block.innerHTML = '<div class="price-from">À partir de</div>'
      + '<div class="price-amount">' + p + ' €</div>'
      + '<div class="price-territory">TTC · Livré en ' + territory + '</div>'
      + '<div class="price-note">* Prix indicatifs — mise à jour catalogue 2026</div>';
  }

  try {
    const r = await fetch('https://ipapi.co/json/');
    if (!r.ok) throw new Error('api-error');
    const d    = await r.json();
    const code = d.country_code;
    if (!code) throw new Error('no-code');
    showPrice(code);
  } catch (e) {
    /* Fallback : affiche le tarif FR/Export si geo-IP indisponible */
    showPrice('FR');
  }
})();
