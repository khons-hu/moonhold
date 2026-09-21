'use strict';
const note=document.querySelector('#note');
const state=document.querySelector('#save-state');
const intro=document.querySelector('#intro');
const holding=document.querySelector('#holding');
const timer=document.querySelector('#timer');
const status=document.querySelector('#status');
const start=document.querySelector('#start');
const end=document.querySelector('#end');
const clear=document.querySelector('#clear-note');
let minutes=10,interval,endAt=0;
try{note.value=localStorage.getItem('moonhold-note')||''}catch{}
const buttons=[...document.querySelectorAll('[data-minutes]')];
function choose(next){minutes=next;buttons.forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.minutes)===minutes)));start.textContent=`Start a ${minutes} minute hold`}
function format(seconds){return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`}
function tick(){const seconds=Math.max(0,Math.ceil((endAt-Date.now())/1000));timer.textContent=format(seconds);if(seconds===0){clearInterval(interval);interval=undefined;status.textContent='The hold is over. Read your note once, then decide.';end.hidden=true;document.title='Moonhold · take a breath'}}
function begin(){endAt=Date.now()+minutes*60_000;intro.hidden=true;holding.hidden=false;end.hidden=false;status.textContent='Stay here. You can change your mind later.';tick();interval=setInterval(tick,250);document.title='Moonhold · hold in progress'}
function stop(){clearInterval(interval);interval=undefined;holding.hidden=true;intro.hidden=false;document.title='Moonhold · take a minute'}
buttons.forEach(button=>button.addEventListener('click',()=>choose(Number(button.dataset.minutes))));
start.addEventListener('click',begin);end.addEventListener('click',stop);
note.addEventListener('input',()=>{try{localStorage.setItem('moonhold-note',note.value);state.textContent='Saved on this device'}catch{state.textContent='Could not save on this device'}});
clear.addEventListener('click',()=>{note.value='';try{localStorage.removeItem('moonhold-note')}catch{}state.textContent='Note cleared'});
choose(minutes);
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
