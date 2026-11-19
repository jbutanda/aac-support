/* Robust demo AAC device: 60 core words, a folder bar, folder pages and an ABC keyboard.
   Usage: const d=AAC.Device(el,{lang:()=>'en',onPick:item=>{}});  item = {id,en,es,c,img}
   Needs core.js and vocab.js loaded first. */
(function(){
const A=window.AAC,FOLD=window.AAC_FOLDERS||[];
const vimg=n=>n?'../shared/symbols/v/'+n+'.svg':null;
FOLD.forEach(f=>f.items=f.w.map(([s,en,es,img])=>{const it={id:'f:'+f.id+':'+s,en,es,c:f.c,img:vimg(img)};A.byId[it.id]=it;return it}));
const KB=['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','ñ','z','x','c','v','b','n','m','’'];
A.Device=(root,opts)=>{
 const S={page:'core',spell:''};const L=()=>opts.lang();root.classList.add('dvroot');
 const key=(it,extra='')=>`<button class="k ${it.c}${it.img?'':' txt'}" data-id="${it.id}" aria-label="${A.esc(it[L()])}" ${extra}>${it.img?`<img src="${it.img}" alt="">`:''}<span class="w">${A.esc(it[L()])}</span></button>`;
 const fkey=f=>`<button class="fk${S.page===f.id?' on':''}" data-f="${f.id}" aria-label="${A.esc(f[L()])}">${f.img?`<img src="${vimg(f.img)}" alt="">`:''}<span>${A.esc(f[L()])}</span></button>`;
 const abc={id:'abc',en:'ABC',es:'ABC'};
 const render=()=>{const es=L()==='es';
  const bar=`<div class="fbar"><button class="fk home${S.page==='core'?' on':''}" data-f="core"><img src="../talker/symbols/i.svg" alt=""><span>${es?'Inicio':'Core'}</span></button>${FOLD.map(fkey).join('')}<button class="fk${S.page==='abc'?' on':''}" data-f="abc"><span class="abc">ABC</span><span>${es?'Teclado':'Spell'}</span></button></div>`;
  let grid;
  if(S.page==='core')grid=A.W.map(w=>key(w)).join('');
  else if(S.page==='abc')grid=`<div class="spell"><b>${A.esc(S.spell)||'<span class="ph">'+(es?'Escriba una palabra...':'Type a word...')+'</span>'}</b></div>${KB.map(c=>`<button class="k kb" data-k="${c}">${c}</button>`).join('')}<button class="k kb" data-k="del" aria-label="${es?'Borrar letra':'Delete letter'}">⌫</button><button class="k kb add" data-k="add">${es?'Agregar':'Add'} ✓</button>`;
  else{const f=FOLD.find(x=>x.id===S.page);grid=f.items.map(it=>key(it)).join('')}
  root.innerHTML=bar+`<div class="dgrid${S.page==='abc'?' kbd':''}">${grid}</div>`};
 root.addEventListener('click',e=>{const fb=e.target.closest('[data-f]');if(fb){S.page=fb.dataset.f;render();opts.onNav&&opts.onNav(S.page);return}
  const kb=e.target.closest('[data-k]');if(kb){const k=kb.dataset.k;if(k==='del')S.spell=S.spell.slice(0,-1);else if(k==='add'){const w=S.spell.trim();if(w){const it={id:'t:'+w.toLowerCase(),en:w,es:w,c:'det',img:null};A.byId[it.id]=it;S.spell='';render();opts.onPick(it);return}}else S.spell+=k;render();return}
  const b=e.target.closest('.k[data-id]');if(b&&A.byId[b.dataset.id])opts.onPick(A.byId[b.dataset.id],b)});
 render();
 return {render,get page(){return S.page},home(){S.page='core';render()},keyEl:id=>root.querySelector(`.k[data-id="${CSS.escape(id)}"]`),
  folderOf:id=>{const m=/^f:([^:]+):/.exec(id);return m?m[1]:'core'},go(p){S.page=p;render()}};
};
})();
