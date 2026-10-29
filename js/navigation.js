(()=>{'use strict';
const landing=document.getElementById('landingPage');
const game=document.getElementById('gamePage');
const setPage=()=>{
 const showGame=location.hash==='#game';
 landing.hidden=showGame;
 game.hidden=!showGame;
 document.body.classList.toggle('on-landing',!showGame);
 document.title=showGame?'Race · Retro Racing League':'Retro Racing League';
};
window.addEventListener('hashchange',setPage);
if(!location.hash||!['#landing','#game'].includes(location.hash))history.replaceState(null,'',location.pathname+location.search+'#landing';
setPage();
})();