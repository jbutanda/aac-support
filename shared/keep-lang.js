/* Keeps the reader's language when they follow a link to another tool on this site.
   When the page is in Spanish, a link to another tool opens with ?lang=es (English gets ?lang=en). */
(function(){
  const fix=e=>{
    const a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
    const l=document.documentElement.lang;if(l!=='es'&&l!=='en')return;
    let u;try{u=new URL(a.getAttribute('href'),location.href)}catch(x){return}
    if(u.origin!==location.origin)return;
    const i=location.pathname.indexOf('/aac-support/');
    if(i>-1&&!u.pathname.startsWith(location.pathname.slice(0,i+13)))return;
    if(u.pathname===location.pathname)return;
    if(/\.[a-z0-9]+$/i.test(u.pathname)&&!/\.html?$/i.test(u.pathname))return;
    u.searchParams.set('lang',l);a.href=u.href;
  };
  document.addEventListener('click',fix,true);
  document.addEventListener('auxclick',fix,true);
  document.addEventListener('contextmenu',fix,true);
})();
