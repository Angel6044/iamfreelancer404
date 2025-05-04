// scripts/convert-webp.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../src/assets');
const outputDir = path.join(__dirname, '../public/assets');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Procesar todas las imágenes
function processImages(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach(entry => {
    const inputPath = path.join(directory, entry.name);
    
    // Si es un directorio, procesarlo recursivamente
    if (entry.isDirectory()) {
      const subOutputDir = path.join(outputDir, path.relative(inputDir, inputPath));
      if (!fs.existsSync(subOutputDir)) {
        fs.mkdirSync(subOutputDir, { recursive: true });
      }
      processImages(inputPath);
      return;
    }
    
    // Si es una imagen, convertirla
    const ext = path.extname(entry.name).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const relativePath = path.relative(inputDir, directory);
      const targetDir = path.join(outputDir, relativePath);
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      const outputPath = path.join(
        targetDir,
        path.basename(entry.name, ext) + '.webp'
      );

      sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then(() => console.log(`✅ ${entry.name} → ${path.relative(outputDir, outputPath)}`))
        .catch(err => console.error(`❌ Error: ${entry.name}`, err));
    }
  });
}

// Iniciar el procesamiento
processImages(inputDir);
console.log('Convirtiendo imágenes a WebP...');
