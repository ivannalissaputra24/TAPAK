// Menyalin library ke www/lib agar aplikasi 100% offline
const fs=require('fs'),p=require('path');const n='node_modules/';
fs.mkdirSync('www/lib',{recursive:true});
[['leaflet/dist/leaflet.js'],['leaflet/dist/leaflet.css'],['pdfjs-dist/build/pdf.min.js'],['pdfjs-dist/build/pdf.worker.min.js'],
['proj4/dist/proj4.js'],['jszip/dist/jszip.min.js'],['piexifjs/piexif.js'],['@mapbox/shp-write/shpwrite.js']]
.forEach(([f])=>{try{fs.copyFileSync(n+f,'www/lib/'+p.basename(f));console.log('ok',f)}catch(e){console.warn('GAGAL',f)}});
