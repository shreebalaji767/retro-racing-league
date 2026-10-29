(()=>{'use strict';
const installButton=document.getElementById('installApp');
const installStatus=document.getElementById('installStatus');
let installPrompt=null;
const setStatus=message=>{if(installStatus)installStatus.textContent=message};
const isStandalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
function updateInstallUi(){
 if(!installButton)return;
 if(isStandalone()){
  installButton.hidden=true;
  setStatus('App is installed · ready to race');
  return;
 }
 installButton.hidden=false;
 installButton.textContent=installPrompt?'⬇ INSTALL GAME':'＋ INSTALL APP';
 installButton.setAttribute('aria-label','Install Retro Racing League as an app');
}
window.addEventListener('beforeinstallprompt',()=>{
 // Allow the browser's native install banner to appear. Deferring this event
 // with preventDefault() requires calling prompt() later and suppresses the
 // native banner until the user activates the custom button.
 installPrompt=null;
 updateInstallUi();
 setStatus('Install is available · use your browser install banner or menu');
});
window.addEventListener('appinstalled',()=>{
 installPrompt=null;
 updateInstallUi();
 setStatus('Installed successfully · launch from your home screen');
});
if(installButton)installButton.addEventListener('click',async()=>{
 if(installPrompt){
  const promptEvent=installPrompt;
  installPrompt=null;
  try{
   await promptEvent.prompt();
   const choice=await promptEvent.userChoice;
   updateInstallUi();
   setStatus(choice&&choice.outcome==='accepted'?'Install accepted':'Install dismissed · you can install later from your browser menu');
  }catch{
   updateInstallUi();
   setStatus('The browser could not open installation. Try the browser menu instead.');
  }
  return;
 }
 if(isStandalone()){
  setStatus('Already installed · enjoy the race!');
  return;
 }
 const ua=navigator.userAgent||'';
 if(/iphone|ipad|ipod/i.test(ua)){
  setStatus('On iPhone/iPad: open this page in Safari, tap Share, then “Add to Home Screen”.');
 }else if(/android/i.test(ua)){
  setStatus('If installation is available, open your browser menu and choose “Install app” or “Add to Home screen”.');
 }else{
  setStatus('Open your browser menu and choose “Install app” or “Create shortcut”. Use HTTPS or localhost.');
 }
});
updateInstallUi();
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){
 window.addEventListener('load',async()=>{
  try{
   const registration=await navigator.serviceWorker.register('./service-worker.js');
   await navigator.serviceWorker.ready;
   if(!isStandalone())setStatus('Offline support ready · install from this browser when available');
   registration.addEventListener('updatefound',()=>{
    const worker=registration.installing;
    if(worker)worker.addEventListener('statechange',()=>{
     if(worker.state==='installed'&&navigator.serviceWorker.controller)setStatus('Update ready · refresh to load the latest game');
    });
   });
   navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if(!isStandalone())setStatus('App shell updated · refresh to load the latest game');
   });
  }catch{
   setStatus('Offline support could not start. Check the connection and reload this HTTPS page.');
  }
 });
}
})();