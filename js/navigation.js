(function () {
  'use strict';

  var landing = document.getElementById('landingPage');
  var game = document.getElementById('gamePage');

  function renderPage() {
    var showGame = window.location.hash === '#game';

    if (landing) {
      landing.hidden = showGame;
    }
    if (game) {
      game.hidden = !showGame;
    }

    document.body.classList.toggle('on-landing', !showGame);
    document.title = showGame ? 'Race - Retro Racing League' : 'Retro Racing League';
  }

  function normalizePage() {
    var hash = window.location.hash;
    if (hash !== '#landing' && hash !== '#game') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search + '#landing');
    }
    renderPage();
  }

  window.addEventListener('hashchange', renderPage);
  normalizePage();
}());