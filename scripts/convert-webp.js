// scripts/convert-webp.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "../src/assets");
const outputDir = path.join(__dirname, "../public/assets");

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Procesar todas las imágenes
function processImages(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const inputPath = path.join(directory, entry.name);

    // Procesar recursivamente si es un subdirectorio
    if (entry.isDirectory()) {
      const subOutputDir = path.join(
        outputDir,
        path.relative(inputDir, inputPath)
      );
      if (!fs.existsSync(subOutputDir)) {
        fs.mkdirSync(subOutputDir, { recursive: true });
      }
      processImages(inputPath);
      return;
    }

    const ext = path.extname(entry.name).toLowerCase();
    const relativePath = path.relative(inputDir, directory);
    const targetDir = path.join(outputDir, relativePath);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copiar archivo original
    const destOriginal = path.join(targetDir, entry.name);
    fs.copyFileSync(inputPath, destOriginal);
    console.log(
      `📄 Copiado original: ${path.relative(outputDir, destOriginal)}`
    );

    // Si es imagen válida, convertir a .webp
    if ([".jpg", ".jpeg", ".png"].includes(ext)) {
      const outputPath = path.join(
        targetDir,
        path.basename(entry.name, ext) + ".webp"
      );

      sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then(() =>
          console.log(
            `✅ Convertido a WebP: ${path.relative(outputDir, outputPath)}`
          )
        )
        .catch((err) =>
          console.error(`❌ Error al convertir ${entry.name}`, err)
        );
    }
  });
}

console.log("🖼️ Convirtiendo imágenes a WebP y copiando originales...");
processImages(inputDir);
