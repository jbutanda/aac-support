/* "Save to My Tools": a star button added to the top of every tool.
   Saved tools show up on the Start Here page. Saved in this browser only. */
(function(){
const KEY='aac-mytools',BASE='https://jbutanda.github.io/aac-support/';
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}};
const write=a=>{try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}};
const has=id=>read().includes(id);
const toggle=id=>{const a=read(),i=a.indexOf(id);if(i<0)a.unshift(id);else a.splice(i,1);write(a);return i<0};
window.AAC_MYTOOLS={read,write,has,toggle,url:id=>BASE+id+'/'};
const seg=location.pathname.split('/').filter(Boolean);
let id=seg[seg.length-1]==='index.html'?seg[seg.length-2]:seg[seg.length-1];
const cat=window.AAC_CATALOG||[];
if(!cat.some(t=>t.id===id)||id==='start-here')return;
const lang=()=>{const b=document.querySelector('[data-l][aria-pressed=true]');return b?b.dataset.l:'en'};
const T={en:{save:'Save to My Tools',saved:'Saved',msg:'Saved to My Tools. You can find it any time on the Start Here page.',off:'Removed from My Tools.',copy:'Copy link',copied:'Link copied',tip:'Want it on your phone? Open the menu in your browser and choose Add to Home Screen.',open:'Open Start Here'},
 es:{save:'Guardar en Mis herramientas',saved:'Guardada',msg:'Guardada en Mis herramientas. La encuentra en la página Empieza aquí.',off:'Se quitó de Mis herramientas.',copy:'Copiar enlace',copied:'Enlace copiado',tip:'¿La quiere en su teléfono? Abra el menú del navegador y elija Agregar a pantalla de inicio.',open:'Abrir Empieza aquí'}};
const star=f=>`<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" fill="${f?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;
const css=`.aacbm{display:inline-flex;align-items:center;gap:6px;font:inherit;font-weight:700;font-size:15px;min-height:44px;padding:8px 16px;border-radius:999px;border:1.5px solid color-mix(in srgb,currentColor 45%,transparent);background:transparent;color:inherit;cursor:pointer;white-space:nowrap}
.aacbm[aria-pressed=true]{background:#ffd43b;color:#2b2200;border-color:#ffd43b}
.aacbm:focus-visible{outline:3px solid #ffd43b;outline-offset:2px}
.aacbm.float{position:fixed;top:12px;right:12px;z-index:65;background:#1d2026;color:#fff;box-shadow:0 6px 18px rgba(0,0,0,.3)}
.bmtoast{position:fixed;z-index:70;left:50%;bottom:18px;transform:translateX(-50%);width:min(520px,calc(100vw - 24px));background:#fff;color:#16181d;border-radius:20px;padding:16px 18px;box-shadow:0 18px 50px rgba(0,0,0,.35);border-top:6px solid #ffd43b;font:16px/1.45 "Atkinson Hyperlegible",system-ui,sans-serif;animation:bmin .35s cubic-bezier(.2,1.4,.4,1)}
.bmtoast p{margin:6px 0 12px;color:#5b6170;font-size:15px}
.bmtoast .bmrow{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.bmtoast .bmb{font:inherit;font-weight:700;font-size:15px;min-height:42px;padding:8px 16px;border-radius:999px;border:1.5px solid #d6d9e0;background:#fff;color:#16181d;text-decoration:none;cursor:pointer;display:inline-flex;align-items:center}
.bmtoast .bmb.go{background:#2b8a3e;border-color:#2b8a3e;color:#fff}
.bmtoast .x{margin-left:auto;font:inherit;font-size:26px;line-height:1;background:none;border:0;color:#5b6170;cursor:pointer;min-width:44px;min-height:44px}
@keyframes bmin{from{transform:translate(-50%,40px);opacity:0}}
@media(prefers-color-scheme:dark){.bmtoast{background:#1b1d23;color:#eceef2}.bmtoast p{color:#a7adbb}.bmtoast .bmb{background:#22252c;color:#eceef2;border-color:#2c2f38}}
@media(prefers-reduced-motion:reduce){.bmtoast{animation:none}}
@media print{.bmtoast,.aacbm{display:none!important}}`;
const mount=()=>{
 const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 const b=document.createElement('button');b.className='aacbm';b.type='button';
 const l=document.querySelector('header [data-l]')||document.querySelector('[data-l]');
 const top=document.querySelector('header .top');
 if(l)l.parentNode.insertBefore(b,l);
 else if(top){const d=document.createElement('div');d.style.cssText='display:flex;align-items:center';d.appendChild(b);top.appendChild(d)}
 else{b.classList.add('float');document.body.appendChild(b)}
 const draw=()=>{const on=has(id),t=T[lang()];b.setAttribute('aria-pressed',on);b.innerHTML=star(on)+`<span>${on?t.saved:t.save}</span>`};
 let toast;
 const show=(on)=>{const t=T[lang()];if(toast)toast.remove();toast=document.createElement('div');toast.className='bmtoast';toast.setAttribute('role','status');
  toast.innerHTML=on?`<b>${t.msg}</b><p>${t.tip}</p><div class="bmrow"><button class="bmb go" data-a="copy">${t.copy}</button><a class="bmb" href="../start-here/" ${window.top!==window.self?'target="_blank" rel="noopener"':''}>${t.open}</a><button class="x" data-a="x" aria-label="Close">×</button></div>`:`<b>${t.off}</b>`;
  document.body.appendChild(toast);
  toast.addEventListener('click',async e=>{const a=e.target.closest('[data-a]');if(!a)return;if(a.dataset.a==='x'){toast.remove();return}
   try{await navigator.clipboard.writeText(BASE+id+'/');a.textContent=t.copied}catch(err){prompt(t.copy,BASE+id+'/')}});
  clearTimeout(show.t);show.t=setTimeout(()=>toast&&toast.remove(),on?9000:2500)};
 b.addEventListener('click',()=>{const on=toggle(id);draw();show(on)});
 document.addEventListener('click',e=>{if(e.target.closest('[data-l]'))setTimeout(draw,0)});
 draw()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
