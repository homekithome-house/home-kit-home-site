/* HKH · Prix centralisés
   Source unique : data/prices.json
   Cible : tout élément [data-model][data-price-france]
   Événement après mise à jour : 'hkh:prices-loaded' */
(function(){
  var TERRITORIES = ['france','guadeloupe','martinique','saint-martin','guyane'];
  var slots = document.querySelectorAll('[data-model][data-price-france]');
  if(!slots.length) return;

  fetch('data/prices.json', { cache: 'no-cache' })
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(data){
      if(!data) return;
      var changed = false;
      slots.forEach(function(el){
        var prices = data[el.getAttribute('data-model')];
        if(!prices) return;
        TERRITORIES.forEach(function(t){
          var v = prices[t];
          if(v && v !== el.getAttribute('data-price-' + t)){
            el.setAttribute('data-price-' + t, v);
            changed = true;
          }
        });
      });
      if(changed) window.dispatchEvent(new CustomEvent('hkh:prices-loaded'));
    })
    .catch(function(){ /* fallback silencieux sur les attributs inline */ });
})();
