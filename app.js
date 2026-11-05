'use strict';
const PUBLIC_URL='https://nexvora-ux.github.io/floreria-liamgael/';
const slider=document.querySelector('#categorySlider');
const items=[...slider.querySelectorAll('.category-card')];
const dots=document.querySelector('#sliderDots');
items.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Ir a categoría ${i+1}`);b.addEventListener('click',()=>items[i].scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'}));dots.appendChild(b)});
function updateDots(){const idx=Math.min(items.length-1,Math.max(0,Math.round(slider.scrollLeft/(items[1].offsetLeft-items[0].offsetLeft))));[...dots.children].forEach((el,i)=>el.classList.toggle('active',i===idx))}
slider.addEventListener('scroll',updateDots,{passive:true});window.addEventListener('resize',updateDots);updateDots();
document.querySelector('.slider-arrow.prev').addEventListener('click',()=>slider.scrollBy({left:-(items[1].offsetLeft-items[0].offsetLeft),behavior:'smooth'}));
document.querySelector('.slider-arrow.next').addEventListener('click',()=>slider.scrollBy({left:(items[1].offsetLeft-items[0].offsetLeft),behavior:'smooth'}));
const modal=document.querySelector('#modal'),modalTitle=document.querySelector('#modalTitle'),modalContent=document.querySelector('#modalContent');
function showModal(title,content){modalTitle.textContent=title;modalContent.innerHTML=content;if(!modal.open)modal.showModal()}
document.querySelector('#closeModal').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
document.querySelector('#hoursButton').addEventListener('click',()=>showModal('Nuestro horario','<div class="modal-body"><p>ATENCIÓN LAS 24 HORAS, TODOS LOS DÍAS DEL AÑO, INCLUIDOS DOMINGOS Y FERIADOS.</p><p class="subline">DELIVERY A TODO LIMA</p></div>'));
document.querySelector('#qrButton').addEventListener('click',()=>showModal('Escanea nuestro QR',`<div class="modal-body"><img src="./assets/qr.png" alt="Código QR de Florería Liam Gael"><p>Escanea para abrir nuestra aplicación</p><small>${PUBLIC_URL}</small></div>`));
let deferredPrompt;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredPrompt=event});
window.addEventListener('appinstalled',()=>{deferredPrompt=null});
document.querySelector('#saveButton').addEventListener('click',async()=>{
 if(deferredPrompt){const p=deferredPrompt;deferredPrompt=null;try{await p.prompt();await p.userChoice}catch(e){}return}
 const isApple=/iPad|iPhone|iPod/.test(navigator.userAgent);
 const text=isApple?'En iPhone: abre esta página en Safari, toca Compartir (cuadrado con flecha) y selecciona “Añadir a pantalla de inicio”.':'En Android: abre esta página en Chrome, toca el menú ⋮ y elige “Instalar aplicación” o “Añadir a pantalla principal”.';
 showModal('Guardar aplicación',`<div class="modal-body"><p>${text}</p><p class="subline">Para instalarla, visita nuestro enlace HTTPS publicado en GitHub Pages.</p></div>`);
});
document.querySelector('#shareButton').addEventListener('click',async()=>{
 const info={title:'Florería Liam Gael',text:'Arreglos florales para cada ocasión. Delivery a todo Lima.',url:PUBLIC_URL};
 if(navigator.share){try{await navigator.share(info);return}catch(err){if(err.name==='AbortError')return}}
 try{await navigator.clipboard.writeText(PUBLIC_URL);showModal('Enlace copiado','<div class="modal-body"><p>El enlace de nuestra florería se copió al portapapeles.</p></div>')}
 catch(e){showModal('Compartir aplicación',`<div class="modal-body"><p>Copia nuestro enlace:</p><small>${PUBLIC_URL}</small></div>`)}
});
if('serviceWorker' in navigator && location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
