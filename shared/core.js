/* Shared helpers for the RUSD AAC interactive tools.
   Board words, symbol paths, speech, confetti and the language toggle live here
   so every tool stays consistent. Symbols: OpenMoji (openmoji.org), CC BY-SA 4.0. */
(function(){
const R=[
['i','I','yo','🙋','pro'],['me','me','a mí','☝️','pro'],['want','want','quiero','🤲','verb'],['go','go','ir','🏃','verb'],['help','help','ayuda','🤝','verb'],['look','look','mira','👀','verb'],['more','more','más','➕','desc'],['again','again','otra vez','🔁','desc'],['this','this','esto','👇','det'],['yes','yes','sí','✅','soc'],
['you','you','tú','🧑','pro'],['mine','mine','mío','🧡','pro'],['like','like','me gusta','❤️','verb'],['come','come','ven','↩️','verb'],['make','make','hacer','🔨','verb'],['see','see','ver','👁️','verb'],['big','big','grande','🐘','desc'],['little','little','pequeño','🐭','desc'],['that','that','eso','↗️','det'],['no','no','no','❌','neg'],
['he','he','él','👦','pro'],['your','your','tu','👉','pro'],['have','have','tengo','🎒','verb'],['stop','stop','para','🛑','verb'],['wait','wait','espera','⏳','verb'],['open','open','abrir','📦','verb'],['good','good','bien','👍','desc'],['bad','bad','mal','👎','desc'],['here','here','aquí','📍','det'],['please','please','por favor','🙏','soc'],
['she','she','ella','👧','pro'],['what','what','qué','❓','q'],['need','need','necesito','❗','verb'],['turn','turn','turno','🔄','verb'],['play','play','jugar','🧸','verb'],['give','give','dar','🎁','verb'],['happy','happy','feliz','😀','desc'],['sad','sad','triste','😢','desc'],['in','in','dentro','📥','det'],['thanks','thanks','gracias','🙌','soc'],
['we','we','nosotros','👥','pro'],['where','where','dónde','🧭','q'],['feel','feel','siento','💭','verb'],['put','put','pon','⬇️','verb'],['eat','eat','comer','🍎','verb'],['read','read','leer','📖','verb'],['hot','hot','caliente','🔥','desc'],['cold','cold','frío','🧊','desc'],['on','on','encima','🔛','det'],['alldone','all done','terminé','🏁','soc'],
['they','they','ellos','👫','pro'],['who','who','quién','👤','q'],['know','know','sé','💡','verb'],['get','get','agarra','✊','verb'],['drink','drink','tomar','🥤','verb'],['say','say','decir','💬','verb'],['different','different','diferente','🔀','desc'],['same','same','igual','⚖️','desc'],['up','up','arriba','⬆️','det'],['hi','hi','hola','👋','soc']];
const W=R.map(([id,en,es,e,c])=>({id,en,es,c,img:'../talker/symbols/'+id+'.svg'}));
const byId=Object.fromEntries(W.map(w=>[w.id,w]));
const sym=n=>'../shared/symbols/'+n+'.svg';
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
let voices=[];
const vl=v=>(v.lang||'').toLowerCase().replace('_','-');
const score=(v,l)=>{const n=v.name.toLowerCase();let s=0;if(/natural|neural/.test(n))s+=60;if(/premium/.test(n))s+=45;if(/enhanced/.test(n))s+=40;if(/siri/.test(n))s+=35;if(/google/.test(n))s+=25;if(/compact|espeak/.test(n))s-=40;const g=vl(v);if(l==='en'&&g==='en-us')s+=8;if(l==='es'&&(g==='es-us'||g==='es-mx'))s+=8;return s};
const voicesFor=l=>voices.filter(v=>vl(v).startsWith(l)).sort((a,b)=>score(b,l)-score(a,l));
const saved={};try{Object.assign(saved,JSON.parse(localStorage.getItem('tat-voice')||'{}'))}catch(e){}
const pickV=l=>{const list=voicesFor(l);return list.find(v=>v.name===saved[l])||list[0]||null};
const listeners=[];
const loadV=()=>{try{voices=speechSynthesis.getVoices()}catch(e){voices=[]}listeners.forEach(f=>{try{f()}catch(e){}})};
loadV();try{speechSynthesis.addEventListener('voiceschanged',loadV)}catch(e){}
const speak=(txt,lang,cb)=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(txt);u.lang=lang==='es'?'es-US':'en-US';const v=pickV(lang);if(v)u.voice=v;u.rate=.95;if(cb){u.onend=cb;u.onerror=cb}speechSynthesis.speak(u)}catch(e){if(cb)setTimeout(cb,500)}};
const hush=()=>{try{speechSynthesis.cancel()}catch(e){}};
const voiceSelect=(sel,getLang)=>{const fill=()=>{const l=getLang(),list=voicesFor(l),cur=pickV(l);sel.innerHTML=list.length?list.map(v=>`<option value="${esc(v.name)}"${cur&&v.name===cur.name?' selected':''}>${esc(v.name)}</option>`).join(''):`<option value="">${l==='es'?'Voz del dispositivo':'Device default'}</option>`};
 listeners.push(fill);sel.addEventListener('change',()=>{saved[getLang()]=sel.value;try{localStorage.setItem('tat-voice',JSON.stringify(saved))}catch(e){}speak(getLang()==='es'?'Hola, así sueno yo.':'Hi, this is how I sound.',getLang())});fill();return fill};
const reduced=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
const confetti=(el,n=70)=>{try{if(reduced()||!el)return;const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+Math.min(r.height/3,160);const cols=['#ffe066','#8ce99a','#8fc7ff','#d0b3ff','#ffb3d1','#ff9b9b','#ffffff'];for(let i=0;i<n;i++){const p=document.createElement('i');p.className='cf';p.style.cssText=`left:${cx}px;top:${cy}px;background:${cols[i%cols.length]};width:${6+Math.random()*6}px;height:${8+Math.random()*9}px`;document.body.appendChild(p);const a=Math.random()*Math.PI*2,v=120+Math.random()*280,dx=Math.cos(a)*v,dy=Math.sin(a)*v-200;p.animate([{transform:'translate(0,0) rotate(0deg)',opacity:1},{transform:`translate(${dx}px,${dy+420}px) rotate(${Math.random()*720-360}deg)`,opacity:0}],{duration:1100+Math.random()*800,easing:'cubic-bezier(.2,.6,.4,1)'}).onfinish=()=>p.remove()}}catch(e){}};
const langToggle=(box,get,set)=>{const draw=()=>box.querySelectorAll('[data-l]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===get()));box.addEventListener('click',e=>{const b=e.target.closest('[data-l]');if(!b)return;hush();set(b.dataset.l);draw()});draw();return draw};
const store={get:(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const keyHtml=(w,lang,extra='')=>`<button class="k ${w.c}${w.img?'':' txt'}" data-id="${w.id}" aria-label="${esc(w[lang])}" ${extra}>${w.img?`<img src="${w.img}" alt="">`:''}<span class="w">${esc(w[lang])}</span></button>`;
const pageLang=()=>{try{const q=new URLSearchParams(location.search).get('lang');if(q==='es'||q==='en')return q}catch(e){}return store.get('aac-lang','en')};
const deco=(el,list)=>{if(!el)return;el.innerHTML=list.map(([n,x,y,z,r],i)=>`<img src="${n.includes('/')?n:sym(n)}" alt="" style="left:${x}%;top:${y}%;width:${z}px;transform:rotate(${r}deg);animation-delay:${-i*1.7}s">`).join('')};
const page=(get,set,onChange)=>{const box=document.getElementById('langs');const sel=document.getElementById('voice');let fill=()=>{};if(sel)fill=voiceSelect(sel,get);if(box)langToggle(box,get,l=>{set(l);store.set('aac-lang',l);document.documentElement.lang=l;fill();onChange()});document.documentElement.lang=get();onChange()};
window.AAC={W,byId,sym,esc,speak,hush,voiceSelect,confetti,langToggle,store,keyHtml,reduced,pageLang,deco,page};
})();
