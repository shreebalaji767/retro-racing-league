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
 event.preventDefault();
 installPrompt=event;
 updateInstallUi();
 setStatus('Ready to install on this device');
});
window.addEventListener('appinstalled',()=>{
 installPrompt=null;
 updateInstallUi();
 setStatus('Installed successfully · launch from your home screen');
});
if(installButton)installButton.addEventListener('click',async()=>{
 if(installPrompt){
  installPrompt.prompt();
  const choice=await installPrompt.userChoice;
  installPrompt=null;
  updateInstallUi();
  setStatus(choice&&choice.outcome==='accepted'?'Install accepted':'Install dismissed · you can install later from your browser menu');
  return;
 }
 if(isStandalone()){
  setStatus('Already installed · enjoy the race!');
  return;
 }
 const ua=navigator.userAgent||'';
 if(/iphone|ipad|ipod/i.test(ua)){
  setStatus('On iPhone/iPad: tap Share in Safari, then “Add to Home Screen”.');
 }else if(/android/i.test(ua)){
  setStatus('If installation is available, open your browser menu and choose “Install app” or “Add to Home screen”.');
 }else{
  setStatus('Open your browser menu and choose “Install app” or “Create shortcut”. Use HTTPS or localhost.');
 }
});
updateInstallUi();
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')){
 window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').then(reg=>{
  setStatus(isStandalone()?'App is installed · offline support enabled':'Install when ready · offline support enabled');
  reg.addEventListener('updatefound',()=>{const worker=reg.installing;if(worker)worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)setStatus('Update ready · refresh to use the latest version')})});
 }).catch(()=>setStatus('Install requires HTTPS; offline caching could not start on this visit.')));
}
})();