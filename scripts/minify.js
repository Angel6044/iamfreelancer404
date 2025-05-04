// scripts/minify.js
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Asegurarse que existan los directorios de salida
const cssOutputDir = path.join(__dirname, '../public/css');
const jsOutputDir = path.join(__dirname, '../public/js');

if (!fs.existsSync(cssOutputDir)) {
  fs.mkdirSync(cssOutputDir, { recursive: true });
}

if (!fs.existsSync(jsOutputDir)) {
  fs.mkdirSync(jsOutputDir, { recursive: true });
}

// Encontrar todos los archivos JS en src/js
const jsFiles = fs.readdirSync(path.join(__dirname, '../src/js'))
  .filter(file => file.endsWith('.js'))
  .map(file => path.join(__dirname, '../src/js', file));

// Encontrar todos los archivos CSS en src/css
const cssFiles = fs.readdirSync(path.join(__dirname, '../src/css'))
  .filter(file => file.endsWith('.css'))
  .map(file => path.join(__dirname, '../src/css', file));

// Minificar JS
if (jsFiles.length > 0) {
  esbuild.build({
    entryPoints: jsFiles,
    outdir: jsOutputDir,
    minify: true,
    bundle: false,
  }).then(() => {
    console.log('✅ Archivos JS minificados en public/js');
  }).catch(err => {
    console.error('❌ Error al minificar JS:', err);
    process.exit(1);
  });
}

// Minificar CSS
if (cssFiles.length > 0) {
  esbuild.build({
    entryPoints: cssFiles,
    outdir: cssOutputDir,
    minify: true,
    bundle: false,
  }).then(() => {
    console.log('✅ Archivos CSS minificados en public/css');
  }).catch(err => {
    console.error('❌ Error al minificar CSS:', err);
    process.exit(1);
  });
}
