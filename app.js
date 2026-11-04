const track=document.getElementById('categoryTrack');
const feedback=document.getElementById('feedback');
const dialog=document.getElementById('hoursDialog');
const tell=(message)=>{feedback.textContent=message;};
document.getElementById('prev').addEventListener('click',()=>track.scrollBy({left:-track.clientWidth*.64,behavior:'smooth'}));
document.getElementById('next').addEventListener('click',()=>track.scrollBy({left:track.clientWidth*.64,behavior:'smooth'}));
document.getElementById('hours').addEventListener('click',()=>{if(dialog.showModal)dialog.showModal();else alert('Atención las 24 horas, todos los días del año, incluidos domingos y feriados. ¡Delivery a todo Lima!');});
let installEvent;
window.addEventListener('beforeinstallprompt',(event)=>{event.preventDefault();installEvent=event;});
document.getElementById('install').addEventListener('click',async()=>{
  if(installEvent){const p=installEvent;installEvent=null;await p.prompt();return;}
  tell('Android: ⋮ > Instalar app. iPhone: Compartir > Añadir a pantalla de inicio.');
  alert('Para guardar la aplicación:\n\nAndroid: abre el menú ⋮ del navegador y selecciona "Instalar aplicación".\n\niPhone: toca Compartir y luego "Añadir a pantalla de inicio".');
});
window.addEventListener('appinstalled',()=>tell('¡Aplicación instalada!'));
document.getElementById('share').addEventListener('click',async()=>{
  const data={title:'Florería Liam Gael',text:'¡Arreglos florales para cada ocasión, delivery a todo Lima y atención 24 horas!',url:location.href};
  try{if(navigator.share){await navigator.share(data)}else if(navigator.clipboard&&isSecureContext){await navigator.clipboard.writeText(data.url);tell('¡Enlace copiado!')}else{prompt('Copia este enlace:',data.url)}}catch(error){if(error.name!=='AbortError')tell('No se pudo compartir. Copia la dirección desde el navegador.');}
});
if('serviceWorker'in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){
 window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
}
