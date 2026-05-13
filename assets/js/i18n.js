/* ═══════════════════════════════════════════════════════
   HKH — Internationalisation FR / EN
   Expose window.applyLang(l) — appelée par nav.js et les
   callbacks footer. Câble automatiquement tous les .lang-btn
   présents dans le DOM au chargement.
════════════════════════════════════════════════════════ */
(function () {
  var lang = localStorage.getItem('hkh-lang') || 'fr';

  function applyLang(l) {
    lang = l;
    localStorage.setItem('hkh-lang', l);
    document.querySelectorAll('[data-fr]').forEach(function (el) {
      var v = el.getAttribute('data-' + l);
      if (!v) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = v;
      else el.innerHTML = v;
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === l);
    });
    window.dispatchEvent(new CustomEvent('hkh:lang-changed', { detail: { lang: l } }));
  }

  window.applyLang = applyLang;

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.dataset.lang); });
    });
    applyLang(lang);
  });
})();
