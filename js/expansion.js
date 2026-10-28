(()=>{'use strict';
const $=id=>document.getElementById(id);
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}};
const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}};
const safe=s=>String(s).replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
const save=()=>read('rrl-save',{});
function renderStandings(){
 const data=save();
 const results=Array.isArray(data.seasonResults)?data.seasonResults:[];
 const board=data.driverStandings&&typeof data.driverStandings==='object'?data.driverStandings:{};
 const entries=Object.entries(board).map(([name,s])=>({name,points:Number(s.points)||0,wins:Number(s.wins)||0,rounds:Number(s.rounds)||0}));
 if(!entries.some(r=>r.name==='YOU'))entries.push({name:'YOU',points:results.filter(r=>r.mode==='grandprix').reduce((n,r)=>n+(Number(r.points)||0),0),wins:results.filter(r=>r.mode==='grandprix'&&r.rank===1).length,rounds:results.filter(r=>r.mode==='grandprix').length});
 entries.sort((a,b)=>b.points-a.points||b.wins-a.wins||a.name.localeCompare(b.name));
 const rows=entries.map((r,i)=>'<tr><td>'+(i+1)+'</td><td>'+safe(r.name)+'</td><td>'+r.points+'</td><td>'+r.wins+'</td><td>'+r.rounds+'</td></tr>').join('');
 const recent=results.slice(-5).reverse().map(r=>{
  const result=r.mode==='timeattack'?Number(r.time).toFixed(2)+'s':'P'+r.rank+' · '+r.points+' pts';
  return '<li>'+safe(r.track)+' · '+safe(r.mode)+' · '+safe(result)+'</li>';
 }).join('');
 $('standings').innerHTML='<table><thead><tr><th>#</th><th>Driver</th><th>Pts</th><th>Wins</th><th>Rounds</th></tr></thead><tbody>'+rows+'</tbody></table><p class="muted">Recent results</p>'+(recent?'<ol>'+recent+'</ol>':'<p class="muted">Finish a Grand Prix race to build the local standings.</p>');
}
const challenges={
 clean:{track:'forest',difficulty:'normal',mode:'grandprix',weather:'dry',label:'Clean Racer'},
 rain:{track:'coast',difficulty:'hard',mode:'grandprix',weather:'wet',label:'Rain Runner'},
 time:{track:'neon',difficulty:'normal',mode:'timeattack',weather:'dry',label:'Time Trial'},
 enduro:{track:'mountain',difficulty:'easy',mode:'endurance',weather:'dry',label:'Endurance Test'},
 expert:{track:'canyon',difficulty:'expert',mode:'timeattack',weather:'dry',label:'Expert Lap'}
};
let activeChallenge=null,lastRaceCount=Number(save().races)||0;
function renderChallengeRecords(){
 const records=read('rrl-challenge-records',{});
 $('challengeRecord').textContent=Object.keys(records).length?Object.entries(records).map(([k,v])=>k+': '+Number(v).toFixed(2)+'s').join(' · '):'Personal challenge records are stored locally.';
}
function launchChallenge(){
 const challenge=challenges[$('challenge').value];if(!challenge)return;activeChallenge={...challenge,key:$('challenge').value};
 $('difficulty').value=challenge.difficulty;$('mode').value=challenge.mode;$('track').value=challenge.track;$('weather').value=challenge.weather;
 $('newRace').click();lastRaceCount=Number(save().races)||0;
}
function editorValues(){return{rx:Number($('editorWidth').value),wx:Number($('editorBend').value)/100,wy:Number($('editorAsymmetry').value)/100,wx2:Number($('editorBend').value)/500,wy2:Number($('editorAsymmetry').value)/500}}
function preview(){
 const cv=$('trackPreview'),ctx=cv.getContext('2d'),v=editorValues();ctx.clearRect(0,0,cv.width,cv.height);ctx.fillStyle='#28533d';ctx.fillRect(0,0,cv.width,cv.height);
 const points=[];for(let i=0;i<=360;i++){const a=-Math.PI/2+i/360*Math.PI*2;const rx=v.rx*.43,ry=v.rx*.27;points.push({x:160+rx*(Math.cos(a)+v.wx*Math.sin(3*a)+v.wx2*Math.sin(5*a)),y:90+ry*(Math.sin(a)+v.wy*Math.sin(2*a)+v.wy2*Math.sin(4*a))})}
 ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.lineWidth=35;ctx.strokeStyle='#e7e0d8';ctx.stroke();ctx.lineWidth=29;ctx.strokeStyle='#383846';ctx.stroke();ctx.lineWidth=1;ctx.strokeStyle='#ffeab0';ctx.setLineDash([5,5]);ctx.stroke();ctx.setLineDash([]);
 ctx.fillStyle='#baff00';ctx.fillRect(points[0].x-3,points[0].y-3,6,6);
}
function saveTrack(){
 const name=$('customTrackName').value.trim().slice(0,22)||'CUSTOM CIRCUIT',v=editorValues(),list=read('rrl-custom-tracks',[]);
 const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,16)||'circuit',id='custom-'+slug;
 const track={id,name,rx:v.rx,wx:v.wx,wy:v.wy,wx2:v.wx2,wy2:v.wy2};
 const next=[track,...list.filter(t=>t.id!==id)].slice(0,8);
 if(!write('rrl-custom-tracks',next)){$('editorStatus').textContent='Storage unavailable. Free browser space and retry.';return}
 if(window.__RRL_REGISTER_CUSTOM_TRACK)window.__RRL_REGISTER_CUSTOM_TRACK(track);
 const selector=$('track');let option=Array.from(selector.options).find(o=>o.value===id);if(!option){option=document.createElement('option');option.value=id;selector.appendChild(option)}option.textContent=name;selector.value=id;
 $('editorStatus').textContent='Saved '+name+'. Circuit is ready in the race selector.';preview();
}
function bindPreferences(){
 const buttons=[['contrastToggle','high-contrast','High contrast'],['largeTextToggle','large-text','Large text'],['reduceMotionToggle','reduce-motion','Reduced motion'],['cosmeticToggle','alt-theme','Alternate theme']];
 const prefs=read('rrl-accessibility',{});buttons.forEach(([id,cls,label])=>{document.body.classList.toggle(cls,!!prefs[cls]);$(id).setAttribute('aria-pressed',String(!!prefs[cls]));$(id).addEventListener('click',()=>{const on=document.body.classList.toggle(cls);const p=read('rrl-accessibility',{});p[cls]=on;write('rrl-accessibility',p);$(id).setAttribute('aria-pressed',String(on));$(id).textContent=(on?'✓ ':'')+label.toUpperCase()})});
}
$('launchChallenge').addEventListener('click',launchChallenge);
['editorWidth','editorBend','editorAsymmetry'].forEach(id=>$(id).addEventListener('input',preview));
$('saveCustomTrack').addEventListener('click',saveTrack);
bindPreferences();renderStandings();renderChallengeRecords();preview();
let previousRaceCount=lastRaceCount;
setInterval(()=>{
 const data=save(),count=Number(data.races)||0;
 if(count!==previousRaceCount){renderStandings();previousRaceCount=count;
  if(activeChallenge&&count>lastRaceCount){
   const results=Array.isArray(data.seasonResults)?data.seasonResults:[],r=results[results.length-1];
   if(r&&r.trackId===activeChallenge.track&&r.difficulty===activeChallenge.difficulty&&r.mode===activeChallenge.mode){
    const records=read('rrl-challenge-records',{}),key=activeChallenge.label;
    if(r.mode==='timeattack'){if(!records[key]||r.time<records[key])records[key]=r.time;write('rrl-challenge-records',records);renderChallengeRecords()}
    else{$('challengeRecord').textContent=key+' completed · position '+r.rank+'. Personal challenge completion saved in race history.'}
   }
   activeChallenge=null;
  }
 }
},800);
})();
