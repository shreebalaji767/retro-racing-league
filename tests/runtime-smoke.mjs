import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html=fs.readFileSync('index.html','utf8');
const source=fs.readFileSync('js/game.js','utf8');
let now=0,nextRaf=1;
const rafQueue=new Map(),storage=new Map(),listeners={};
const ctx=new Proxy({}, {get:(target,key)=>key in target?target[key]:(()=>{}),set:(target,key,value)=>(target[key]=value,true)});
class FakeElement {
 constructor(id=''){this.id=id;this.value='';this.textContent='';this.dataset={};this.style={};this.disabled=false;this.files=[];this._html='';this.options=[];this.handlers={};this.classList={set:new Set(),toggle:(name,force)=>{const on=force===undefined?!this.classList.set.has(name):!!force;if(on)this.classList.set.add(name);else this.classList.set.delete(name);return on},contains:name=>this.classList.set.has(name)}}
 set innerHTML(v){this._html=String(v);if(this.tagName==='SELECT')this.options=[]}
 get innerHTML(){return this._html}
 addEventListener(type,fn){(this.handlers[type]??=[]).push(fn)}
 dispatch(type,event={}){for(const fn of this.handlers[type]||[])fn({preventDefault(){},target:this,...event})}
 click(){this.dispatch('click')}
 appendChild(el){this.options.push(el);if(!this.value)this.value=el.value;return el}
 setPointerCapture(){}
 getContext(){return ctx}
}
const elements=new Map();
for(const [,id] of html.matchAll(/\bid="([^"]+)"/g))elements.set(id,new FakeElement(id));
for(const id of ['difficulty','mode','track','weather','quality','challenge'])elements.get(id).value=({difficulty:'normal',mode:'grandprix',track:'neon',weather:'dry',quality:'high',challenge:'clean'})[id];
elements.get('game').tagName='CANVAS';
elements.get('trackPreview').tagName='CANVAS';
for(const id of ['car','paint','track','replaySelect'])elements.get(id).tagName='SELECT';
elements.get('game').getContext=()=>ctx;
elements.get('trackPreview').getContext=()=>ctx;
const document={
 getElementById:id=>{if(!elements.has(id))elements.set(id,new FakeElement(id));return elements.get(id)},
 createElement:tag=>{const e=new FakeElement();e.tagName=tag.toUpperCase();return e},
 querySelectorAll:()=>[],
 addEventListener:(type,fn)=>(listeners[type]??=[]).push(fn),
 body:new FakeElement('body')
};
const window={addEventListener:(type,fn)=>(listeners['window:'+type]??=[]).push(fn),__RRL_TEST__:null};
const localStorage={getItem:k=>storage.has(k)?storage.get(k):null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)};
const sandbox={document,window,localStorage,console,performance:{now:()=>now},requestAnimationFrame:fn=>{const id=nextRaf++;rafQueue.set(id,fn);return id},cancelAnimationFrame:id=>rafQueue.delete(id),setTimeout,clearTimeout,Date,Math,JSON,Blob:class{},URL:{createObjectURL:()=>'',revokeObjectURL:()=>{}},FileReader:class{},confirm:()=>true};
vm.runInNewContext(source,sandbox,{filename:'js/game.js'});
function dispatchDocument(type,event){for(const fn of listeners[type]||[])fn({preventDefault(){},...event})}
function raceAtDifficulty(level){
 elements.get('difficulty').value=level;
 dispatchDocument('keydown',{key:'ArrowUp'});
 elements.get('startBtn').click();
 let frames=0;
 while(window.__RRL_TEST__.getState().state==='racing'&&frames<2400){
  const entry=rafQueue.entries().next().value;
  assert.ok(entry,'race animation should keep scheduling frames');
  rafQueue.delete(entry[0]);now+=32;entry[1](now);frames++;
 }
 dispatchDocument('keyup',{key:'ArrowUp'});
 const state=window.__RRL_TEST__.getState();
 assert.equal(state.state,'finished',level+' race should finish without hanging');
 assert.equal(state.lap,3,level+' race should complete exactly three laps');
 assert.ok(state.saveData.races>=1,'finished race should persist career progress');
 assert.ok(state.replayCurrent.length>0,'race should record replay frames');
 assert.ok(frames<2400,level+' race should finish within smoke-test frame budget');
 return frames;
}
const timings={};
for(const level of ['easy','normal','hard','expert'])timings[level]=raceAtDifficulty(level);
const replays=JSON.parse(storage.get('rrl-replays')||'[]');
assert.equal(replays.length,4,'each completed race should save a local replay');
assert.ok(replays.every(r=>r.frames.length>0&&r.track==='neon'),'saved replays should contain frames and circuit identity');
console.log('Runtime smoke tests passed: complete 3-lap Grand Prix races on all four difficulties; career saves and local replay recording verified. Frames: '+JSON.stringify(timings));
