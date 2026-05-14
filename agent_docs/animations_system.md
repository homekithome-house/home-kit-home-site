# Animations System HKH — pattern reproductible toutes pages

**Statut** : système livré sur `index.html` (Pass 4.5 — 2026-05-14). À répliquer sur toute nouvelle page éditoriale ou refonte.

**Principe directeur** : pattern visuel **répété par section**, pas scroll-driven global. La grammaire animation HKH = magazine architecture Aman/iglucraft (chaque closure narrative a son micro-événement copper). Le scroll-driven continu est un AI tell tech, banni.

---

## 1. Reveal par élément (data-reveal-item)

**Pattern unifié** : chaque élément à animer porte `data-reveal-item` (+ optionnel `data-reveal-delay="X"`). Un IO unique observe chaque élément, ajoute `.is-revealed` quand il entre dans le viewport (one-shot).

### CSS générique (en tête de `style.css`)

```css
[data-reveal-item]{
  opacity:0;
  transform:translateY(36px);
  transition:opacity 1400ms cubic-bezier(.16,1,.3,1), transform 1400ms cubic-bezier(.16,1,.3,1);
  will-change:opacity, transform;
}
[data-reveal-item].is-revealed{
  opacity:1;
  transform:none;
}
@media (prefers-reduced-motion: reduce){
  [data-reveal-item]{ opacity:1; transform:none; transition:none; }
}
```

### JS IIFE (dans la page HTML, bloc script principal)

```js
(function(){
  var items=document.querySelectorAll('[data-reveal-item]');
  if(!items.length) return;
  if(!('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('is-revealed'); });
    return;
  }
  items.forEach(function(el){
    var d=parseInt(el.getAttribute('data-reveal-delay')||'0',10);
    if(d>0) el.style.transitionDelay=d+'ms,'+d+'ms';
  });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('is-revealed');
        io.unobserve(e.target);
      }
    });
  },{threshold:0,rootMargin:'0px 0px -10% 0px'});
  items.forEach(function(el){ io.observe(el); });
})();
```

### HTML usage

```html
<span data-reveal-item>Eyebrow</span>
<h2 data-reveal-item data-reveal-delay="200">Titre</h2>
<p data-reveal-item data-reveal-delay="400">Sous-titre</p>
```

### Staggers recommandés (delays en ms)

- Cascade 2 éléments (eyebrow + title) : 0 / 200
- Cascade 3 éléments (eyebrow + title + sub) : 0 / 200 / 400
- Cascade 4 éléments (eyebrow + h2 + desc + form) : 0 / 180 / 380 / 560
- Cascade 8 éléments (Collections fam) : 0 / 180 / 320 / 420 / 500 / 580 / 700 / 820
- 2 voies/cards parallèles : 0 / 220 (suffit pour percevoir le décalage)

### Overrides post-reveal (préserver les opacities spécifiques)

Quand un élément a une opacity finale différente de 1 :

```css
.duo__pivot[data-reveal-item].is-revealed{ opacity:.55; }
.newsletter__desc[data-reveal-item].is-revealed{ opacity:.85; }
.method__lead[data-reveal-item].is-revealed{ opacity:.7; }
.method__lead[data-reveal-item]{ opacity:0; } /* override cascade order pour cacher au repos */
```

---

## 2. Traits closure (pattern visuel répété)

**Grammaire HKH** : à chaque closure narrative de section (fin de bloc, transition, citation), un trait copper s'étend de 0 à sa largeur cible au reveal.

### Pattern CSS

```css
.section-closure-rule{
  display:block;
  width:0;
  height:1px;
  background:var(--copper);
  opacity:.4;
  transition:width 1400ms cubic-bezier(.16,1,.3,1);
}
.section-closure.is-revealed .section-closure-rule{ width:38%; }
```

### Largeurs cibles selon contexte

- Closure narrative courte (Cercle bridge) : `60px`
- Closure de section paper (Duo, Terrain, Collections) : `38%`
- Closure de section dark (Newsletter) : `80px`
- Trait synthèse Method (5 à 6 mois) : `38%`
- Trait quote Boris Milnes (Premiers projets) : `60px`

### Implémentations existantes

- `.duo__closure-rule` → 38%
- `.terrain__closure-rule` → 38%
- `.collections-spread__closure-rule` → 38%
- `.cercle-bridge__rule` → 60px
- `.newsletter__closure-rule` → 80px
- `.method__synth-rule` → 38%
- `.fp-quote__rule` → 60px

---

## 3. Parallax sections dark BG

Wrapper image enlarged (top/bottom -12 à -14%) + JS IIFE qui translate3d proportionnel à la position viewport. Ken Burns CSS reste sur l'img sans conflit.

### CSS

```css
.section{ position:relative; isolation:isolate; overflow:hidden; }
.section__bg{
  position:absolute;
  top:-14%; bottom:-14%; left:0; right:0;
  z-index:-1;
  pointer-events:none;
  will-change:transform;
}
.section__bg img{
  width:100%; height:100%; object-fit:cover;
  opacity:.4;
  animation:sectionKenBurns 24s ease-in-out infinite alternate;
}
@keyframes sectionKenBurns{
  from{ transform:scale(1) translate3d(0,0,0); }
  to{ transform:scale(1.04) translate3d(-.5%,.3%,0); }
}
```

### JS IIFE

```js
(function(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var targets = [
    { sectionSel: '.section1', wrapperSel: '.section1__bg', max: 80 },
    { sectionSel: '.section2', wrapperSel: '.section2__bg', max: 70 }
  ];
  var pairs = targets.map(t => {
    var s = document.querySelector(t.sectionSel);
    var w = s && s.querySelector(t.wrapperSel);
    return s && w ? { section:s, wrapper:w, max:t.max } : null;
  }).filter(Boolean);
  if(!pairs.length) return;
  var ticking = false;
  function update(){
    var vh = window.innerHeight;
    pairs.forEach(p => {
      var rect = p.section.getBoundingClientRect();
      if(rect.bottom < -200 || rect.top > vh + 200) return;
      var center = rect.top + rect.height/2;
      var ratio = Math.max(-1, Math.min(1, (center - vh/2) / (vh/2 + rect.height/2)));
      p.wrapper.style.transform = 'translate3d(0,'+(-ratio * p.max).toFixed(1)+'px,0)';
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if(!ticking){ requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();
```

**Plage parallax** : 60-80px max. Au-delà = sensation de lag.

---

## 4. Sticky scroll magazine spread

**Quand l'utiliser** : section "preuves sociales" / liste d'articles featured (Premiers projets). Le 1er article reste sticky pendant que le 2e arrive par-dessus → effet magazine.

```css
.list{ display:flex; flex-direction:column; gap:5rem; }
.featured{ position:relative; min-height:580px; }
.list > .featured:not(.featured--compact){
  position:sticky;
  top:clamp(6vh,8vh,9vh);
  z-index:0;
}
.featured--compact{
  position:relative;
  z-index:1;
  background:var(--dark); /* opaque pour couvrir le sticky du dessus */
  margin-top:clamp(-6vh,-8vh,-10vh); /* monte sur le sticky */
}
@media (max-width:900px){
  .list > .featured:not(.featured--compact){ position:relative; top:auto; }
}
```

**Règle** : 1 seule section sticky par page. Cumul = chaos vertical.

---

## 5. Hover trail underline copper

**Pour les CTAs premium** (boutons éditoriaux finaux). Une base permanente + un trail qui s'étend gauche-droite au hover.

```css
.cta{ position:relative; padding-bottom:.5rem; transition:color .3s ease; }
.cta::before{
  content:''; position:absolute; left:0; bottom:0;
  width:100%; height:1px; background:var(--copper); opacity:.3;
}
.cta::after{
  content:''; position:absolute; left:0; bottom:0;
  width:100%; height:1px; background:var(--copper);
  transform:scaleX(0); transform-origin:left center;
  transition:transform 600ms cubic-bezier(.16,1,.3,1);
}
.cta:hover{ color:var(--copper); }
.cta:hover::after{ transform:scaleX(1); }
/* Si CTA aligné à droite, inverser origin */
.cta--right::after{ transform-origin:right center; }
```

---

## 6. Smooth scroll JS lerp (Lenis-light)

**Desktop only** (pointer:fine). Mobile garde scroll natif (touch + pull-to-refresh).

```js
(function(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(!window.matchMedia || !window.matchMedia('(pointer:fine)').matches) return;

  var current = window.scrollY, target = window.scrollY;
  var lerp = 0.09;
  var raf = null;
  function maxScroll(){ return document.documentElement.scrollHeight - window.innerHeight; }
  function clamp(v){ return Math.max(0, Math.min(maxScroll(), v)); }

  document.documentElement.style.scrollBehavior = 'auto';

  function loop(){
    var diff = target - current;
    if(Math.abs(diff) < 0.35){
      current = target; window.scrollTo(0, current); raf = null; return;
    }
    current += diff * lerp;
    window.scrollTo(0, current);
    raf = requestAnimationFrame(loop);
  }
  function start(){ if(raf === null) raf = requestAnimationFrame(loop); }

  window.addEventListener('wheel', function(e){
    if(e.ctrlKey) return;
    e.preventDefault();
    target = clamp(target + e.deltaY);
    start();
  }, { passive: false });
  // keyboard + anchor handlers : voir index.html bloc Phase 4 polish
})();
```

**Lerp recommandé** : 0.08-0.10. Plus bas = trop mou. Plus haut = trop sec.

---

## 7. Cas spéciaux à garder hors pattern data-reveal-item

Certains dispositifs gardent leur pattern propre car ils sont des **signatures section uniques** :

- **Collections cascade reveal** : opacity-only 1500ms (intentionnel taste-skill, la photo seule est l'événement)
- **Method steps** : pattern `is-active` (opacity .35→1 + scale .96→1.05 + translateY 28→0) — signature des numéros monumentaux
- **Cercle thread vertical** : scaleY 0→1 sur 1800ms (fil rouge unique)
- **Cercle markers ronds** : scale + opacity 700ms par marker (signature points dans le fil)
- **Hero entry animations** : keyframes heroFadeUp/heroSubIn/heroWordIn (0.65-0.7s, entrée immédiate non-scroll)

Ces patterns ne sont **pas reproductibles** entre sections — ils sont uniques par design.

---

## 8. Anti-patterns à BANNIR

1. **Legacy `.reveal` / `.reveal-delay-X`** (animations.css) : translation 20px, transition 0.55s, delays 100-400ms. Sage AI. À remplacer par data-reveal-item partout sauf si signature unique.
2. **Scroll-driven fil conducteur continu** sur toute la page : effet AI tell, perfo, complexité JS. Préférer pattern visuel répété.
3. **Reveal sur conteneur section** quand la section fait > 900px : le stagger se déroule pendant que l'utilisateur scrolle pour atteindre les éléments bas → finit avant qu'on les voit → effet "tout d'un coup". Toujours passer par data-reveal-item par élément.
4. **Sticky > 1 par page** : empile les contextes, perturbe le scroll.
5. **Parallax > 100px** : sensation de lag.
6. **Hover scale > 1.03** : AI tell.
7. **Smooth scroll JS sur mobile** : casse pull-to-refresh.
8. **Traits décoratifs statiques (sans width 0 → X au reveal)** : raté de la grammaire HKH closure narrative.

---

## 9. Checklist avant livraison page

- [ ] Tous les eyebrows / h2 / p texte ont `data-reveal-item` (sauf si signature unique)
- [ ] Staggers cohérents (cascade 200ms entre éléments majeurs)
- [ ] Traits closure narrative ont animation `width 0 → X` au reveal
- [ ] Sections dark BG ont parallax léger (60-80px)
- [ ] 1 sticky magazine spread max (si applicable)
- [ ] CTAs premium ont hover trail underline
- [ ] Hero a son entry animation (keyframes 0.6-0.7s)
- [ ] Aucun `.reveal` / `.reveal-delay-X` legacy restant
- [ ] `prefers-reduced-motion` respecté partout
- [ ] Lighthouse 100/100/100/100 (audit en fin, page verrouillée)

---

## 10. Migration page existante

Pour migrer une page legacy `.reveal` vers le système Pass 4.5 :

1. **HTML** : remplacer chaque `class="reveal reveal-delay-X"` par `data-reveal-item data-reveal-delay="Y"` (Y = X*180 en général)
2. **JS** : ajouter le IIFE data-reveal-item dans le bloc script principal
3. **CSS** : ajouter le bloc générique `[data-reveal-item]` en tête de style.css (déjà fait sur index.html)
4. **Traits closure** : ajouter animation width sur les `__rule` statiques
5. **Test scroll** : chaque élément doit apparaître quand IL entre dans le viewport, pas en bloc

---

## Références implémentation

- **CSS générique data-reveal-item** : `style.css` ligne ~40
- **JS IIFE data-reveal-item** : `index.html` bloc script principal
- **JS IIFE col-reveal (section-level, kept for fp-featured/fp-quote/fp-archive)** : `index.html` même bloc
- **Parallax** : `index.html` bloc Phase 4 polish
- **Smooth scroll lerp** : `index.html` bloc Phase 4 polish
- **Méthode page entière** : `agent_docs/methode_niveau_method.md` (Phase 4)
