/* ═══════════════════════════════════════════════════════
   HKH — Navigation partagée
   Modifier ce fichier suffit pour mettre à jour le menu
   sur toutes les pages du site.
═══════════════════════════════════════════════════════ */
(function () {

  /* ── CSS ─────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    :root{--nav-h:72px}
    .nav{
      position:fixed;top:0;left:0;right:0;z-index:200;
      height:var(--nav-h);
      display:flex;align-items:center;justify-content:space-between;
      padding:0 2.5rem;
      background:transparent;
      backdrop-filter:blur(0px);
      font-family:'Jost',system-ui,sans-serif;
    }
    .nav.nav--anim{transition:background .4s,backdrop-filter .4s}
    .nav.nav--solid{
      background:rgba(249,247,242,.97);
      backdrop-filter:blur(20px);
    }
    /* Logo */
    .nav__logo{display:flex;flex-direction:column;line-height:1;gap:2px;text-decoration:none}
    .nav__logo .hkh{font-family:'Old Standard TT',serif;font-size:1.65rem;color:#fff;letter-spacing:.06em;transition:color .4s}
    .nav__logo .sub{font-size:.75rem;letter-spacing:.24em;text-transform:uppercase;color:#B87333}
    .nav.nav--solid .nav__logo .hkh{color:#1A1A18}
    .nav.nav--solid .nav__logo .sub{color:#9A5A1E}
    /* Interior pages: dark text when transparent (light background) */
    .nav.nav--interior .nav__logo .hkh{color:#1A1A18}
    .nav.nav--interior .nav__logo .sub{color:#9A5A1E}
    /* Center links */
    .nav__center{display:flex;align-items:center;gap:2rem;position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap}
    .nav__center > a,
    .nav__has-drop > a{
      font-size:1rem;letter-spacing:.04em;color:rgba(255,255,255,.88);
      transition:color .2s;text-shadow:0 1px 4px rgba(0,0,0,.6);
      position:relative;text-decoration:none;
    }
    .nav__center > a::after,
    .nav__has-drop > a::after{
      content:'';position:absolute;bottom:-3px;left:0;height:1.5px;width:0;
      background:currentColor;transition:width .3s ease;
    }
    .nav__center > a:hover::after,
    .nav__has-drop > a:hover::after,
    .nav__center > a.active::after,
    .nav__has-drop > a.active::after{width:100%}
    .nav__center > a:hover,
    .nav__has-drop > a:hover,
    .nav__center > a.active,
    .nav__has-drop > a.active{color:#fff}
    .nav.nav--solid .nav__center > a,
    .nav.nav--solid .nav__has-drop > a{color:#6B6660;text-shadow:none}
    .nav.nav--solid .nav__has-drop:first-child > a,
    .nav.nav--solid .nav__center > a[href="investir.html"],
    .nav.nav--interior .nav__has-drop:first-child > a,
    .nav.nav--interior .nav__center > a[href="investir.html"]{color:#1F1F1B}
    .nav.nav--solid .nav__center > a:hover,
    .nav.nav--solid .nav__has-drop > a:hover,
    .nav.nav--solid .nav__center > a.active,
    .nav.nav--solid .nav__has-drop > a.active{color:#1A1A18}
    .nav.nav--interior .nav__center > a,
    .nav.nav--interior .nav__has-drop > a{color:#6B6660;text-shadow:none}
    .nav.nav--interior .nav__center > a:hover,
    .nav.nav--interior .nav__has-drop > a:hover,
    .nav.nav--interior .nav__center > a.active,
    .nav.nav--interior .nav__has-drop > a.active{color:#1A1A18}
    /* Dropdown */
    .nav__has-drop{position:relative;display:flex;align-items:center}
    .nav__drop{
      position:absolute;top:calc(100% + .5rem);left:50%;
      transform:translateX(-50%) translateY(-6px);
      background:rgba(249,247,242,.98);backdrop-filter:blur(20px);
      border:1px solid #EBE4D5;
      padding:1.2rem 1.4rem;
      display:grid;grid-template-columns:repeat(3,1fr);column-gap:1.6rem;
      min-width:380px;
      opacity:0;pointer-events:none;
      transition:opacity .2s,transform .2s;z-index:201;
    }
    .nav__drop::before{content:'';position:absolute;top:-.5rem;left:0;right:0;height:.5rem}
    .nav__has-drop:hover .nav__drop{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}
    .nav__drop-col{display:flex;flex-direction:column}
    .nav__drop-family{
      font-size:.78rem;letter-spacing:.24em;text-transform:uppercase;color:#B87333;
      display:block;margin-bottom:.5rem;padding-bottom:.4rem;border-bottom:1px solid #EBE4D5;
    }
    .nav__drop a:hover{color:#B87333}
    .nav__drop a::after{display:none!important}
    /* Variant: Journal — single column, narrower */
    .nav__drop--journal{
      grid-template-columns:1fr;column-gap:0;
      min-width:240px;padding:1.2rem 1.4rem;
    }
    .nav__drop--journal .nav__drop-family{
      margin-bottom:.8rem;padding-bottom:.5rem;
    }
    /* Right */
    .nav__right{display:flex;align-items:center;gap:1.2rem}
    .nav__lang{display:flex;align-items:center;gap:.35rem;font-size:.7rem;color:rgba(255,255,255,.3);transition:color .4s}
    .nav.nav--solid .nav__lang{color:#6B6660}
    .nav.nav--interior .nav__lang{color:#6B6660}
    .nav__lang .lang-btn,.nav .lang-btn{background:none;border:none;cursor:pointer;font-size:.7rem;color:rgba(255,255,255,.4);padding:0;font-family:'Jost',system-ui,sans-serif;transition:color .2s}
    .nav.nav--solid .lang-btn{color:#6B6660}
    .nav.nav--interior .lang-btn{color:#6B6660}
    .lang-btn.active,.lang-btn:hover{color:#B87333}
    .nav.nav--solid .lang-btn.active,.nav.nav--interior .lang-btn.active{color:#B87333}
    .nav__cta{
      font-size:.68rem;letter-spacing:.24em;text-transform:uppercase;
      background:#B87333;color:#fff;padding:.55rem 1.2rem;
      border:1px solid #B87333;transition:background .3s,color .3s;white-space:nowrap;
      text-decoration:none;font-family:'Jost',system-ui,sans-serif;
    }
    .nav__cta:hover{background:transparent;color:#B87333}
    /* Burger */
    .nav__burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px}
    .nav__burger span{display:block;width:22px;height:1.5px;background:#fff;transition:all .3s}
    .nav.nav--solid .nav__burger span{background:#1A1A18}
    .nav.nav--interior .nav__burger span{background:#1A1A18}
    .nav__burger.open span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px)}
    .nav__burger.open span:nth-child(2){opacity:0}
    .nav__burger.open span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px)}
    /* Mobile overlay */
    .mob-ov{
      position:fixed;inset:0;background:#F9F7F2;z-index:999;
      display:flex;flex-direction:column;
      opacity:0;pointer-events:none;transition:opacity .3s;
    }
    .mob-ov.open{opacity:1;pointer-events:auto}
    .mob-hdr{
      display:flex;align-items:center;justify-content:space-between;
      padding:1.2rem 1.5rem;border-bottom:1px solid #EBE4D5;flex-shrink:0;
    }
    .mob-hdr .hkh{font-family:'Old Standard TT',serif;font-size:1.3rem;color:#1A1A18;letter-spacing:.06em}
    .mob-hdr .sub{font-size:.7rem;letter-spacing:.24em;text-transform:uppercase;color:#B87333;display:block}
    .mob-x{background:none;border:none;font-size:1.8rem;cursor:pointer;color:#1A1A18;line-height:1;padding:.2rem .4rem}
    .mob-prod{padding:1.5rem 1.8rem;flex-shrink:0;border-bottom:1px solid #EBE4D5}
    .mob-prod h3{font-size:.6rem;letter-spacing:.24em;text-transform:uppercase;color:#6B6660;margin-bottom:1rem}
    .res-sc{display:flex;gap:.8rem;overflow-x:auto;padding-bottom:.5rem;scrollbar-width:none}
    .res-sc::-webkit-scrollbar{display:none}
    .rt{display:flex;flex-direction:column;align-items:center;gap:.4rem;flex-shrink:0;text-decoration:none}
    .rt__img{width:80px;height:80px;background:#252521;display:flex;align-items:center;justify-content:center;overflow:hidden}
    .rt__img img{width:100%;height:100%;object-fit:contain;padding:4px}
    .rt__n{font-size:.7rem;letter-spacing:.24em;text-transform:uppercase;color:#6B6660}
    .mob-nav{display:flex;flex-direction:column;padding:0 1.8rem;overflow-y:auto;flex:1}
    .mob-nav a{font-size:1.1rem;color:#1A1A18;text-decoration:none;padding:.8rem 0;border-bottom:1px solid #EBE4D5;letter-spacing:.02em}
    .mob-nav a.active{color:#B87333}
    .mob-bot{display:flex;align-items:center;justify-content:space-between;padding:1.2rem 1.8rem;border-top:1px solid #EBE4D5;flex-shrink:0}
    .mob-lang{display:flex;align-items:center;gap:.4rem;font-size:.7rem;color:#6B6660}
    .mob-cta{font-size:.68rem;letter-spacing:.24em;text-transform:uppercase;background:#B87333;color:#fff;padding:.55rem 1.2rem;border:1px solid #B87333;text-decoration:none}
    /* Territory dropdown — desktop */
    .nav__terr{position:relative;display:flex;align-items:center}
    .nav__terr-trigger{background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:.35rem;font-size:.7rem;color:rgba(255,255,255,.4);font-family:'Jost',system-ui,sans-serif;padding:0;transition:color .2s}
    .nav.nav--solid .nav__terr-trigger,.nav.nav--interior .nav__terr-trigger{color:#6B6660}
    .nav__terr-trigger:hover,.nav__terr-trigger[aria-expanded="true"]{color:#B87333}
    .nav.nav--solid .nav__terr-trigger:hover,.nav.nav--solid .nav__terr-trigger[aria-expanded="true"],.nav.nav--interior .nav__terr-trigger:hover,.nav.nav--interior .nav__terr-trigger[aria-expanded="true"]{color:#B87333}
    .nav__terr-caret{font-size:.6rem;transform:translateY(1px);transition:transform .2s;display:inline-block}
    .nav__terr-trigger[aria-expanded="true"] .nav__terr-caret{transform:translateY(1px) rotate(180deg)}
    .nav__terr-menu{position:absolute;top:calc(100% + .6rem);right:0;background:#F9F7F2;border:1px solid #EBE4D5;list-style:none;margin:0;padding:.4rem 0;min-width:160px;opacity:0;visibility:hidden;transform:translateY(-4px);transition:opacity .22s,transform .22s,visibility 0s linear .22s;z-index:1000;box-shadow:0 8px 24px rgba(0,0,0,.06)}
    .nav__terr-menu.is-open{opacity:1;visibility:visible;transform:translateY(0);transition:opacity .22s,transform .22s,visibility 0s}
    .nav__terr-opt{background:none;border:none;width:100%;text-align:left;padding:.5rem 1rem;font-size:.7rem;letter-spacing:.04em;color:#3A3A34;font-family:'Jost',system-ui,sans-serif;cursor:pointer;transition:background .15s,color .15s;display:flex;align-items:center}
    .nav__terr-opt:hover,.nav__terr-opt.is-active{color:#B87333;background:rgba(184,115,51,.06)}
    .nav__terr-opt.is-active::before{content:'';display:inline-block;width:.7rem;height:1px;background:#B87333;margin-right:.5rem;flex-shrink:0;position:relative;top:-.05em}
    /* Territory dropdown — mobile */
    .mob-terr{position:relative}
    .mob-terr-trigger{background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:.35rem;font-size:.72rem;color:#6B6660;font-family:'Jost',system-ui,sans-serif;padding:0;transition:color .2s}
    .mob-terr-trigger:hover,.mob-terr-trigger[aria-expanded="true"]{color:#B87333}
    .mob-terr-menu{position:absolute;bottom:calc(100% + .5rem);left:0;background:#F9F7F2;border:1px solid #EBE4D5;list-style:none;margin:0;padding:.4rem 0;min-width:160px;opacity:0;visibility:hidden;transform:translateY(4px);transition:opacity .22s,transform .22s,visibility 0s linear .22s;z-index:1000;box-shadow:0 -8px 24px rgba(0,0,0,.06)}
    .mob-terr-menu.is-open{opacity:1;visibility:visible;transform:translateY(0);transition:opacity .22s,transform .22s,visibility 0s}
    .mob-terr-opt{background:none;border:none;width:100%;text-align:left;padding:.5rem 1rem;font-size:.7rem;letter-spacing:.04em;color:#3A3A34;font-family:'Jost',system-ui,sans-serif;cursor:pointer;transition:background .15s,color .15s;display:flex;align-items:center}
    .mob-terr-opt:hover,.mob-terr-opt.is-active{color:#B87333;background:rgba(184,115,51,.06)}
    .mob-terr-opt.is-active::before{content:'';display:inline-block;width:.7rem;height:1px;background:#B87333;margin-right:.5rem;flex-shrink:0;position:relative;top:-.05em}
    .mob-bot{flex-wrap:wrap;gap:.6rem}
    @media(max-width:900px){
      .nav__center,.nav__right .nav__lang,.nav__cta,.nav__right .nav__terr{display:none}
      .nav__burger{display:flex}
    }
    @media(max-width:640px){.nav{padding:0 1.2rem}}
  `;
  document.head.appendChild(style);

  /* ── Active page detection ───────────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  function ac(href) {
    if (href === 'habitats.html' && (page === 'habitats.html' || page.startsWith('residence-'))) return ' class="active"';
    if (href === 'blog.html' && (page === 'blog.html' || page.startsWith('blog-'))) return ' class="active"';
    if (href !== 'habitats.html' && href !== 'blog.html' && page === href) return ' class="active"';
    return '';
  }

  /* ── État initial nav (avant injection pour éviter flash transparent) ── */
  const hasHero = document.body.dataset.nav === 'hero';
  const isInterior = !hasHero;
  const initialNavClass = isInterior ? 'nav nav--solid' : 'nav';

  /* ── HTML ────────────────────────────────────────────── */
  document.body.insertAdjacentHTML('afterbegin', `
<div class="mob-ov" id="mobOv">
  <div class="mob-hdr">
    <div><span class="hkh">HKH</span><span class="sub">Home Kit Home</span></div>
    <button class="mob-x" id="mobX">×</button>
  </div>
  <div class="mob-prod">
    <h3 data-fr="Nos habitats" data-en="Our homes">Nos habitats</h3>
    <div class="res-sc">
      <a href="residence-essence.html" class="rt"><div class="rt__img"><picture><source srcset="dist/images/habitats/essence-plus/finitions/essence-plus-zenith.avif" type="image/avif"><source srcset="dist/images/habitats/essence-plus/finitions/essence-plus-zenith.webp" type="image/webp"><img src="dist/images/habitats/essence-plus/finitions/essence-plus-zenith.avif" alt="" width="80" height="80" loading="lazy" decoding="async"/></picture></div><span class="rt__n">Essence</span></a>
      <a href="residence-essence-plus.html" class="rt"><div class="rt__img"><picture><source srcset="dist/images/habitats/essence-plus/finitions/essence-plus-zenith.avif" type="image/avif"><source srcset="dist/images/habitats/essence-plus/finitions/essence-plus-zenith.webp" type="image/webp"><img src="dist/images/habitats/essence-plus/finitions/essence-plus-zenith.avif" alt="" width="80" height="80" loading="lazy" decoding="async"/></picture></div><span class="rt__n">Essence +</span></a>
      <a href="residence-horizon.html" class="rt"><div class="rt__img"><picture><source srcset="dist/images/habitats/horizon/finitions/horizon-zenith.avif" type="image/avif"><source srcset="dist/images/habitats/horizon/finitions/horizon-zenith.webp" type="image/webp"><img src="dist/images/habitats/horizon/finitions/horizon-zenith.avif" alt="" width="80" height="80" loading="lazy" decoding="async"/></picture></div><span class="rt__n">Horizon</span></a>
      <a href="residence-horizon-t.html" class="rt"><div class="rt__img"><picture><source srcset="dist/images/habitats/horizon-t/finitions/horizon-t-zenith.avif" type="image/avif"><source srcset="dist/images/habitats/horizon-t/finitions/horizon-t-zenith.webp" type="image/webp"><img src="dist/images/habitats/horizon-t/finitions/horizon-t-zenith.avif" alt="" width="80" height="80" loading="lazy" decoding="async"/></picture></div><span class="rt__n">Horizon T</span></a>
      <a href="residence-signature.html" class="rt"><div class="rt__img"><picture><source srcset="dist/images/habitats/signature/finitions/singnature-zenith.avif" type="image/avif"><source srcset="dist/images/habitats/signature/finitions/singnature-zenith.webp" type="image/webp"><img src="dist/images/habitats/signature/finitions/singnature-zenith.avif" alt="" width="80" height="80" loading="lazy" decoding="async"/></picture></div><span class="rt__n">Signature</span></a>
      <a href="residence-signature-duo.html" class="rt"><div class="rt__img"><picture><source srcset="dist/images/habitats/signature/finitions/singnature-zenith.avif" type="image/avif"><source srcset="dist/images/habitats/signature/finitions/singnature-zenith.webp" type="image/webp"><img src="dist/images/habitats/signature/finitions/singnature-zenith.avif" alt="" width="80" height="80" loading="lazy" decoding="async"/></picture></div><span class="rt__n">Sig. Duo</span></a>
    </div>
  </div>
  <nav class="mob-nav">
    <a href="habitats.html"${ac('habitats.html')} data-fr="Nos Habitats" data-en="Our Homes">Nos Habitats</a>
    <a href="partenaires.html"${ac('partenaires.html')} data-fr="Partenaires" data-en="Partners">Partenaires</a>
    <a href="projets.html"${ac('projets.html')} data-fr="Projets" data-en="Projects">Projets</a>
    <a href="investir.html"${ac('investir.html')} data-fr="Investir" data-en="Invest">Investir</a>
    <a href="visite-virtuelle.html"${ac('visite-virtuelle.html')} data-fr="Visite Virtuelle" data-en="Virtual Tour">Visite Virtuelle</a>
    <a href="blog.html"${ac('blog.html')} data-fr="Actualités" data-en="News">Actualités</a>
    <a href="faq.html"${ac('faq.html')}>FAQ</a>
    <a href="histoire.html"${ac('histoire.html')} data-fr="Notre Histoire" data-en="Our Story">Notre Histoire</a>
    <a href="contact.html"${ac('contact.html')} data-fr="Contact" data-en="Contact">Contact</a>
  </nav>
  <div class="mob-bot">
    <div class="mob-terr" data-mob-terr-wrap>
      <button type="button" class="mob-terr-trigger" data-mob-terr-trigger aria-haspopup="listbox" aria-expanded="false">
        <span data-mob-terr-label>France</span>
        <span aria-hidden="true">▾</span>
      </button>
      <ul class="mob-terr-menu" data-mob-terr-menu role="listbox">
        <li><button type="button" class="mob-terr-opt" data-mob-terr-opt="france" data-fr="France" data-en="France" role="option">France</button></li>
        <li><button type="button" class="mob-terr-opt" data-mob-terr-opt="guadeloupe" data-fr="Guadeloupe" data-en="Guadeloupe" role="option">Guadeloupe</button></li>
        <li><button type="button" class="mob-terr-opt" data-mob-terr-opt="martinique" data-fr="Martinique" data-en="Martinique" role="option">Martinique</button></li>
        <li><button type="button" class="mob-terr-opt" data-mob-terr-opt="saint-martin" data-fr="Saint-Martin" data-en="Saint-Martin" role="option">Saint-Martin</button></li>
        <li><button type="button" class="mob-terr-opt" data-mob-terr-opt="guyane" data-fr="Guyane" data-en="Guiana" role="option">Guyane</button></li>
      </ul>
    </div>
    <div class="mob-lang">
      <button class="lang-btn active" data-lang="fr">FR</button><span>|</span>
      <button class="lang-btn" data-lang="en">EN</button>
    </div>
    <a href="contact.html" class="mob-cta" data-fr="Demander un devis →" data-en="Get a quote →">Demander un devis →</a>
  </div>
</div>

<nav class="${initialNavClass}" id="nav">
  <a href="index.html" class="nav__logo"><span class="hkh">HKH</span><span class="sub">Home Kit Home</span></a>
  <div class="nav__center">
    <div class="nav__has-drop">
      <a href="habitats.html"${ac('habitats.html')} data-fr="Nos Habitats" data-en="Our Homes">Nos Habitats</a>
      <div class="nav__drop">
        <div class="nav__drop-col">
          <span class="nav__drop-family">Essence · 20 m²</span>
          <a href="residence-essence.html">Essence</a>
          <a href="residence-essence-plus.html">Essence +</a>
        </div>
        <div class="nav__drop-col">
          <span class="nav__drop-family">Horizon · 36 m²</span>
          <a href="residence-horizon.html">Horizon</a>
          <a href="residence-horizon-t.html">Horizon T</a>
        </div>
        <div class="nav__drop-col">
          <span class="nav__drop-family">Signature · 46 m²</span>
          <a href="residence-signature.html">Signature</a>
          <a href="residence-signature-duo.html">Signature Duo</a>
        </div>
      </div>
    </div>
    <a href="partenaires.html"${ac('partenaires.html')} data-fr="Partenaires" data-en="Partners">Partenaires</a>
    <a href="projets.html"${ac('projets.html')} data-fr="Projets" data-en="Projects">Projets</a>
    <a href="investir.html"${ac('investir.html')} data-fr="Investir" data-en="Invest">Investir</a>
    <div class="nav__has-drop">
      <a href="blog.html"${ac('blog.html')} data-fr="Actualités" data-en="News">Actualités</a>
      <div class="nav__drop nav__drop--journal">
        <div class="nav__drop-col">
          <span class="nav__drop-family" data-fr="Le Journal" data-en="The Journal">Le Journal</span>
          <a href="blog.html#tous" data-fr="Tout" data-en="All">Tout</a>
          <a href="blog.html#architecture">Architecture</a>
          <a href="blog.html#investissement" data-fr="Investissement" data-en="Investment">Investissement</a>
          <a href="blog.html#partenariats" data-fr="Partenariats" data-en="Partnerships">Partenariats</a>
          <a href="blog.html#technique" data-fr="Technique" data-en="Technical">Technique</a>
          <a href="blog.html#logistique" data-fr="Logistique" data-en="Logistics">Logistique</a>
        </div>
      </div>
    </div>
    <a href="faq.html"${ac('faq.html')}>FAQ</a>
    <a href="visite-virtuelle.html"${ac('visite-virtuelle.html')} data-fr="Visite Virtuelle" data-en="Virtual Tour">Visite Virtuelle</a>
    <a href="contact.html"${ac('contact.html')} data-fr="Contact" data-en="Contact">Contact</a>
  </div>
  <div class="nav__right">
    <div class="nav__terr" data-terr-wrap>
      <button type="button" class="nav__terr-trigger" data-terr-trigger aria-haspopup="listbox" aria-expanded="false">
        <span class="nav__terr-label" data-terr-label>France</span>
        <span class="nav__terr-caret" aria-hidden="true">▾</span>
      </button>
      <ul class="nav__terr-menu" data-terr-menu role="listbox">
        <li><button type="button" class="nav__terr-opt" data-terr-opt="france" data-fr="France" data-en="France" role="option">France</button></li>
        <li><button type="button" class="nav__terr-opt" data-terr-opt="guadeloupe" data-fr="Guadeloupe" data-en="Guadeloupe" role="option">Guadeloupe</button></li>
        <li><button type="button" class="nav__terr-opt" data-terr-opt="martinique" data-fr="Martinique" data-en="Martinique" role="option">Martinique</button></li>
        <li><button type="button" class="nav__terr-opt" data-terr-opt="saint-martin" data-fr="Saint-Martin" data-en="Saint-Martin" role="option">Saint-Martin</button></li>
        <li><button type="button" class="nav__terr-opt" data-terr-opt="guyane" data-fr="Guyane" data-en="Guiana" role="option">Guyane</button></li>
      </ul>
    </div>
    <div class="nav__lang">
      <button class="lang-btn active" data-lang="fr">FR</button><span>|</span>
      <button class="lang-btn" data-lang="en">EN</button>
    </div>
    <a href="contact.html" class="nav__cta" data-fr="Demander un devis" data-en="Get a quote">Demander un devis</a>
  </div>
  <button class="nav__burger" id="navBurger" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>
`);

  /* ── Scroll → transparent / solid ───────────────────── */
  const navEl = document.getElementById('nav');
  // Pour les pages hero (data-nav="hero") : toggle nav--solid au scroll, avec animation
  // après le premier paint pour éviter une transition figée à l'init (bug Chrome
  // sur les tabs masqués → currentTime stuck at 0).
  if (hasHero) {
    function updateNav() {
      navEl.classList.toggle('nav--solid', window.scrollY > 50);
    }
    updateNav();
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ navEl.classList.add('nav--anim'); });
    });
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  /* ── Burger ──────────────────────────────────────────── */
  const burger = document.getElementById('navBurger');
  const mobOv  = document.getElementById('mobOv');
  const mobX   = document.getElementById('mobX');

  function openMenu()  { burger.classList.add('open');    mobOv.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function closeMenu() { burger.classList.remove('open'); mobOv.classList.remove('open'); document.body.style.overflow = ''; }

  burger.addEventListener('click', () => mobOv.classList.contains('open') ? closeMenu() : openMenu());
  mobX.addEventListener('click', closeMenu);
  mobOv.querySelectorAll('.mob-nav a').forEach(a => a.addEventListener('click', closeMenu));

  /* ── i18n — apply current lang to nav content ─────── */
  if (window.applyLang) window.applyLang(localStorage.getItem('hkh-lang') || 'fr');

  /* ── Territory selector ──────────────────────────── */
  (function initTerritorySelector() {
    var TERR_KEY = 'hkh-territory';
    var TERRITORIES = ['france', 'guadeloupe', 'martinique', 'saint-martin', 'guyane'];

    function getTerr() {
      var s = localStorage.getItem(TERR_KEY);
      return TERRITORIES.indexOf(s) !== -1 ? s : 'france';
    }

    function getLabel(slug) {
      var opt = document.querySelector('[data-terr-opt="' + slug + '"]');
      return opt ? opt.textContent.trim() : slug.charAt(0).toUpperCase() + slug.slice(1);
    }

    function closeAll() {
      var dt = document.querySelector('[data-terr-trigger]');
      var dm = document.querySelector('[data-terr-menu]');
      var mt = document.querySelector('[data-mob-terr-trigger]');
      var mm = document.querySelector('[data-mob-terr-menu]');
      if (dt) dt.setAttribute('aria-expanded', 'false');
      if (dm) dm.classList.remove('is-open');
      if (mt) mt.setAttribute('aria-expanded', 'false');
      if (mm) mm.classList.remove('is-open');
    }

    function syncActive(slug) {
      document.querySelectorAll('[data-terr-opt]').forEach(function(b) {
        b.classList.toggle('is-active', b.dataset.terrOpt === slug);
      });
      document.querySelectorAll('[data-mob-terr-opt]').forEach(function(b) {
        b.classList.toggle('is-active', b.dataset.mobTerrOpt === slug);
      });
    }

    function syncLabels(slug) {
      var lbl = getLabel(slug);
      document.querySelectorAll('[data-terr-label]').forEach(function(el) { el.textContent = lbl; });
      document.querySelectorAll('[data-mob-terr-label]').forEach(function(el) { el.textContent = lbl; });
    }

    function applyTerritory(slug) {
      if (TERRITORIES.indexOf(slug) === -1) slug = 'france';
      localStorage.setItem(TERR_KEY, slug);
      document.body.setAttribute('data-territory', slug);
      syncActive(slug);
      syncLabels(slug);
    }

    /* Init */
    var current = getTerr();
    applyTerritory(current);

    /* Desktop trigger */
    var dTrigger = document.querySelector('[data-terr-trigger]');
    var dMenu = document.querySelector('[data-terr-menu]');
    if (dTrigger && dMenu) {
      dTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        var open = dMenu.classList.contains('is-open');
        closeAll();
        if (!open) {
          dMenu.classList.add('is-open');
          dTrigger.setAttribute('aria-expanded', 'true');
        }
      });
    }

    /* Mobile trigger */
    var mTrigger = document.querySelector('[data-mob-terr-trigger]');
    var mMenu = document.querySelector('[data-mob-terr-menu]');
    if (mTrigger && mMenu) {
      mTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        var open = mMenu.classList.contains('is-open');
        closeAll();
        if (!open) {
          mMenu.classList.add('is-open');
          mTrigger.setAttribute('aria-expanded', 'true');
        }
      });
    }

    /* Option clicks — desktop */
    document.querySelectorAll('[data-terr-opt]').forEach(function(b) {
      b.addEventListener('click', function() {
        var slug = b.dataset.terrOpt;
        applyTerritory(slug);
        closeAll();
        window.dispatchEvent(new CustomEvent('hkh:territory-changed', { detail: { territory: slug } }));
      });
    });

    /* Option clicks — mobile */
    document.querySelectorAll('[data-mob-terr-opt]').forEach(function(b) {
      b.addEventListener('click', function() {
        var slug = b.dataset.mobTerrOpt;
        applyTerritory(slug);
        closeAll();
        window.dispatchEvent(new CustomEvent('hkh:territory-changed', { detail: { territory: slug } }));
      });
    });

    /* Click outside */
    document.addEventListener('click', function(e) {
      if (!e.target.closest('[data-terr-wrap],[data-mob-terr-wrap]')) closeAll();
    });

    /* ESC */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeAll();
    });

    /* Re-sync labels after lang change (i18n translates options, we re-read textContent) */
    window.addEventListener('hkh:lang-changed', function() {
      syncLabels(getTerr());
    });
  })();

  /* ── Email protection ────────────────────────────── */
  function activateEmails(root) {
    (root || document).querySelectorAll('.hkh-email').forEach(function(a) {
      try { a.href = 'mailto:' + atob(a.dataset.e); } catch(e) {}
    });
  }
  var _emailObs = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) activateEmails(node);
      });
    });
  });
  _emailObs.observe(document.body, { childList: true, subtree: true });

})();
