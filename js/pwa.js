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
window.addEventListener('beforeinstallprompt',event=>{
 // Keep the browser's deferred prompt and show it only after the user clicks.
 event.preventDefault();
 installPrompt=event;
 updateInstallUi();
 setStatus('Ready to install · click INSTALL APP');
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
  updateInstallUi();
  try{
   await promptEvent.prompt();
   const choice=await promptEvent.userChoice;
   if(choice&&choice.outcome==='accepted'){
    setStatus('Install accepted · launch from your app menu');
   }else{
    setStatus('Install dismissed · you can try again from the browser menu');
   }
  }catch(error){
   setStatus('Browser could not open installation · use the browser menu instead');
  }
  return;
 }
 if(isStandalone()){
  setStatus('Already installed · enjoy the race!');
  return;
 }
 const ua=navigator.userAgent||'';
 if(/iphone|ipad|ipod/i.test(ua)){
  setStatus('On iPhone/iPad: open in Safari, tap Share, then “Add to Home Screen”.');
 }else if(/android/i.test(ua)){
  setStatus('No install prompt yet. Open Chrome menu and choose “Install app” or “Add to Home screen”.');
 }else{
  setStatus('Install is not available yet. Use Chrome/Edge menu → “Install app” or “Create shortcut”. Ensure the site is HTTPS.');
 }
});
updateInstallUi();
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){
 window.addEventListener('load',async()=>{
  try{
   const registration=await navigator.serviceWorker.register('./service-worker.js');
   await navigator.serviceWorker.ready;
   if(!isStandalone())setStatus('Offline support ready · install may be available from your browser');
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