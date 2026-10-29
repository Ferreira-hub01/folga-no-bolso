'use strict';
(() => {
 const config = window.FOLGA_CONFIG;
 if (!config || !Array.isArray(config.offers)) return;
 const money = value => new Intl.NumberFormat(config.locale, {style:'currency',currency:config.currency}).format(value);
 const validHttps = value => { try { const u = new URL(value); return u.protocol === 'https:' && !!u.hostname && !u.username && !u.password; } catch { return false; } };
 const validCheckout = value => {if(!validHttps(value))return false;return new URL(value).hostname==='pay.cakto.com.br';};
 const create = (tag, className, text) => {const el=document.createElement(tag); if(className) el.className=className; if(text!==undefined)el.textContent=text; return el;};
 document.querySelectorAll('[data-start-price]').forEach(el=>el.textContent=money(Math.min(...config.offers.map(o=>o.price))));
 const offers = document.getElementById('offer-grid');
 const checkoutDialog = document.getElementById('checkout-dialog');
 const imageDialog = document.getElementById('image-dialog');
 let lastFocus = null;
 const showDialog=(dialog)=>{lastFocus=document.activeElement;dialog.showModal();document.body.classList.add('modal-open');updateSticky();};
 const closeDialog=dialog=>dialog.close();
 [checkoutDialog,imageDialog].forEach(dialog=>{
  dialog.addEventListener('keydown',event=>{if(event.key!=='Tab')return;const focusables=[...dialog.querySelectorAll('button,a[href],[tabindex]')].filter(el=>!el.disabled&&el.tabIndex>=0&&el.getClientRects().length);if(!focusables.length)return;const index=focusables.indexOf(document.activeElement);event.preventDefault();focusables[(index+(event.shiftKey?-1:1)+focusables.length)%focusables.length].focus();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastFocus?.focus({preventScroll:true});updateSticky();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog);}});
 });
 config.offers.forEach((offer,index)=>{
  const card=create('article',`offer-card${offer.id==='intermediaria'?' featured':''}`);card.dataset.offer=offer.id;
  if(offer.id==='intermediaria'){card.append(create('span','offer-accent'));const badge=create('span','offer-recommendation','Recomendada');badge.id='recommendation-intermediaria';card.append(badge);card.setAttribute('aria-describedby',badge.id);}
  card.append(create('p','offer-label',`Opção 0${index+1}`),create('h3','',offer.name),create('p','offer-purpose',offer.purpose),create('p','price',money(offer.price)),create('p','payment-note','Pagamento único'),create('p','offer-pages',offer.pages));
  const priceNode=card.querySelector('.price'); const priceText=money(offer.price); const split=priceText.indexOf('\u00a0'); if(split>=0){priceNode.replaceChildren(document.createTextNode(priceText.slice(0,split)),document.createElement('wbr'),document.createTextNode(priceText.slice(split)));}
  const list=create('ul');offer.items.forEach(item=>list.append(create('li','',item)));card.append(list);
  const checkoutReady=config.salesEnabled === true && validCheckout(offer.checkoutUrl);
  const btn=create(checkoutReady?'a':'button','button','Quero comprar agora');btn.append(create('span','','↗'));btn.lastChild.setAttribute('aria-hidden','true');
  btn.setAttribute('aria-label',`Quero comprar agora: opção ${offer.name}, ${money(offer.price)}`);
  if(checkoutReady){btn.href=offer.checkoutUrl;btn.rel='noopener';} else {btn.type='button';btn.addEventListener('click',()=>{document.getElementById('checkout-title').textContent=`Opção ${offer.name}`;document.getElementById('checkout-price').textContent=`${money(offer.price)} · pagamento único`;showDialog(checkoutDialog);});}
  card.append(btn,create('p','offer-footnote',offer.footnote));offers.append(card);
 });
 const allCheckoutsReady=config.offers.every(o=>validCheckout(o.checkoutUrl));
 if(config.salesEnabled === true && allCheckoutsReady){document.getElementById('preview-notice').hidden=true;document.getElementById('delivery-answer').textContent=config.deliveryText;}
 if(config.seller?.name){const container=document.getElementById('seller-info');container.append(create('span','',config.seller.name));[['contactUrl','Atendimento'],['termsUrl','Condições de compra'],['privacyUrl','Privacidade']].forEach(([key,label])=>{if(validHttps(config.seller[key])){const a=create('a','',label);a.href=config.seller[key];container.append(a);}});}
 document.getElementById('checkout-close').addEventListener('click',()=>closeDialog(checkoutDialog));
 document.getElementById('checkout-back').addEventListener('click',()=>closeDialog(checkoutDialog));
 const gallery=document.getElementById('gallery');const samples=[...gallery.querySelectorAll('.sample')];
 const prev=document.getElementById('gallery-prev'),next=document.getElementById('gallery-next'),status=document.getElementById('gallery-status');
 let activeIndex=0,scrollFrame;
 const galleryUpdate=()=>{const r=gallery.getBoundingClientRect();let distance=Infinity; samples.forEach((sample,i)=>{const d=Math.abs(sample.getBoundingClientRect().left-r.left);if(d<distance){distance=d;activeIndex=i;}});const max=gallery.scrollWidth-gallery.clientWidth;prev.disabled=gallery.scrollLeft<3;next.disabled=gallery.scrollLeft>=max-3;status.textContent=`${activeIndex+1} / ${samples.length}`;};
 const moveGallery=direction=>{const itemWidth=samples[0].getBoundingClientRect().width+parseFloat(getComputedStyle(gallery).gap);gallery.scrollBy({left:direction*itemWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
 prev.addEventListener('click',()=>moveGallery(-1));next.addEventListener('click',()=>moveGallery(1));
 gallery.addEventListener('scroll',()=>{cancelAnimationFrame(scrollFrame);scrollFrame=requestAnimationFrame(galleryUpdate);},{passive:true});
 gallery.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();moveGallery(event.key==='ArrowRight'?1:-1);}});
 window.addEventListener('resize',galleryUpdate);galleryUpdate();
 const image=document.getElementById('dialog-image'),area=document.getElementById('dialog-image-area'),zoom=document.getElementById('zoom-toggle');
 gallery.querySelectorAll('[data-full]').forEach(button=>button.addEventListener('click',()=>{image.src=button.dataset.full;image.alt=button.querySelector('img').alt;document.getElementById('image-caption').textContent=button.dataset.caption;area.classList.remove('zoomed');zoom.textContent='Ampliar imagem';zoom.setAttribute('aria-pressed','false');showDialog(imageDialog);area.scrollTo(0,0);}));
 document.getElementById('image-close').addEventListener('click',()=>closeDialog(imageDialog));
 zoom.addEventListener('click',()=>{const enabled=area.classList.toggle('zoomed');zoom.setAttribute('aria-pressed',String(enabled));zoom.textContent=enabled?'Ajustar à tela':'Ampliar imagem';area.scrollTo(0,0);});
 const sticky=document.getElementById('mobile-buy'),hero=document.querySelector('.hero'),offersSection=document.getElementById('opcoes');
 function updateSticky(){const offerRect=offersSection.getBoundingClientRect();const heroRect=hero.getBoundingClientRect();const offersVisible=offerRect.top<innerHeight&&offerRect.bottom>0;sticky.hidden=innerWidth>600||heroRect.bottom>0||offersVisible||document.body.classList.contains('modal-open');}
 new ResizeObserver(entries=>{const h=entries[0].target.getBoundingClientRect().height;document.documentElement.style.scrollPaddingTop=(h+22)+'px';}).observe(document.querySelector('.header'));
 window.addEventListener('scroll',updateSticky,{passive:true});window.addEventListener('resize',updateSticky);updateSticky();
})();
