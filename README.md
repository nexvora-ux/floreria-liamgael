# Florería Liam Gael — Aplicación PWA

Aplicación móvil HTML/CSS/JS (sin frameworks), basada en el mockup facilitado. Incluye cinco categorías, seis botones de contacto, redes sociales, botones de pedido, instalación, compartir y QR, iconos PWA y vista previa Open Graph.

## Publicar en GitHub Pages
1. Descomprime el ZIP.
2. Sube **los archivos y la carpeta `assets`** a la raíz de la rama publicada por GitHub Pages del repositorio `nexvora-ux/floreria-liamgael`.
3. En GitHub → Settings → Pages, selecciona **Deploy from a branch**, la rama principal y `/ (root)` (si aún no lo has hecho).
4. Abre `https://nexvora-ux.github.io/floreria-liamgael/` y recarga la página. Para probar instalación PWA usa HTTPS.

No es posible publicar en tu repositorio automáticamente sin acceso autorizado de escritura. El HTML puede visualizarse localmente abriendo `index.html`; para instalar o usar service worker hay que servirlo por HTTPS/localhost.

**Importante:** si modificas archivos después de publicarlos, actualiza la constante `CACHE` en `sw.js` para invalidar la versión anterior.
