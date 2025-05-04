// build.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando proceso de construcción...');

// Asegurar que exista el directorio public
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copiar index.html de src a public
console.log('📄 Copiando index.html...');
try {
  const srcIndexPath = path.join(__dirname, 'src', 'index.html');
  const publicIndexPath = path.join(__dirname, 'public', 'index.html');
  
  if (fs.existsSync(srcIndexPath)) {
    fs.copyFileSync(srcIndexPath, publicIndexPath);
    console.log('✅ index.html copiado correctamente');
  } else {
    console.warn('⚠️ No se encontró src/index.html');
  }
} catch (error) {
  console.error('❌ Error al copiar index.html:', error);
}

// Ejecutar minificación de JS y CSS
console.log('\n🔧 Minificando archivos JS y CSS...');
exec('node scripts/minify.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error en la minificación: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Advertencia: ${stderr}`);
  }
  console.log(stdout);
  
  // Después de minificar, convertir imágenes
  console.log('\n🖼️ Convirtiendo imágenes a WebP...');
  exec('node scripts/convert-webp.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error en la conversión de imágenes: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Advertencia: ${stderr}`);
    }
    console.log(stdout);
    
    // Copiar otros archivos estáticos si existen
    console.log('\n📁 Copiando archivos estáticos adicionales...');
    const otherAssets = ['favicon.ico', 'robots.txt', 'manifest.json'];
    
    otherAssets.forEach(file => {
      const srcPath = path.join(__dirname, 'src', file);
      const destPath = path.join(__dirname, 'public', file);
      
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ ${file} copiado correctamente`);
      }
    });
    
    console.log('\n✨ Construcción completada con éxito!');
    console.log('📦 Los archivos optimizados están en la carpeta "public"');
  });
});
