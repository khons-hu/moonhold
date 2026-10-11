// Keep the first paint, browser chrome and toggle in step with the chosen theme.
(()=>{
 const key='moonhold-theme',root=document.documentElement;
 const preference=matchMedia('(prefers-color-scheme: light)');
 const normalize=value=>value==='light'||value==='dark'?value:null;
 let saved=null;
 try{saved=normalize(localStorage.getItem(key));}catch{}
 function apply(){
  const theme=saved||(preference.matches?'light':'dark');
  root.dataset.theme=theme;
  document.querySelector('meta[name="theme-color"]').setAttribute('content',theme==='light'?'#e7ebef':'#0b111a');
  const button=document.querySelector('#theme-toggle');
  if(button){
   button.textContent=theme==='light'?'☾':'☀';
   const label=theme==='light'?'Switch to dark mode':'Switch to light mode';
   button.setAttribute('aria-label',label);button.title=label;
  }
 }
 apply();
 preference.addEventListener('change',()=>{if(!saved)apply();});
 addEventListener('storage',event=>{
  if(event.key!==key&&event.key!==null)return;
  saved=normalize(event.newValue);apply();
 });
 document.addEventListener('DOMContentLoaded',()=>{
  apply();
  document.querySelector('#theme-toggle').addEventListener('click',()=>{
   saved=root.dataset.theme==='light'?'dark':'light';
   try{localStorage.setItem(key,saved);}catch{}
   apply();
  });
 });
})();
