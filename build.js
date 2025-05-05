// build.js
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { minify } = require("html-minifier-terser");

const srcDir = path.join(__dirname, "src");
const pagesDir = path.join(srcDir, "pages");
const publicDir = path.join(__dirname, "public");

// 🧹 Limpiar carpeta public/
console.log("🧼 Limpiando carpeta public...");
if (fs.existsSync(publicDir)) {
  fs.rmSync(publicDir, { recursive: true, force: true });
}
fs.mkdirSync(publicDir, { recursive: true });

// ✂️ Opciones de minificación HTML
const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
  minifyCSS: true,
  minifyJS: true,
};

// 📄 Función para copiar y minificar HTML
async function copyAndMinifyHTML(srcPath, destPath) {
  try {
    const html = fs.readFileSync(srcPath, "utf-8");
    const minified = await minify(html, minifyOptions);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, minified, "utf-8");
    console.log(`✅ ${path.relative(__dirname, destPath)}`);
  } catch (err) {
    console.error(`❌ Error procesando ${srcPath}:`, err);
  }
}

// 🚀 Iniciar proceso
(async () => {
  console.log("🚀 Iniciando proceso de construcción...");

  // Copiar y minificar index.html
  const srcIndex = path.join(srcDir, "index.html");
  const destIndex = path.join(publicDir, "index.html");
  if (fs.existsSync(srcIndex)) {
    await copyAndMinifyHTML(srcIndex, destIndex);
  }

  // Copiar y minificar todos los HTML de src/pages/
  function processPages(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(srcDir, fullPath);
      const destPath = path.join(publicDir, relativePath);

      if (entry.isDirectory()) {
        processPages(fullPath); // Recursivo
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        await copyAndMinifyHTML(fullPath, destPath);
      }
    });
  }

  if (fs.existsSync(pagesDir)) {
    processPages(pagesDir);
  }

  // 🔧 Minificar JS y CSS
  console.log("\n🔧 Minificando archivos JS y CSS...");
  exec("node scripts/minify.js", (error, stdout, stderr) => {
    if (error) return console.error(`❌ Error minificando: ${error.message}`);
    if (stderr) console.error(`⚠️ Advertencia: ${stderr}`);
    console.log(stdout);

    // 🖼️ Convertir imágenes a WebP
    console.log("\n🖼️ Convirtiendo imágenes a WebP...");
    exec("node scripts/convert-webp.js", (error, stdout, stderr) => {
      if (error)
        return console.error(
          `❌ Error en conversión de imágenes: ${error}`
        );
      if (stderr) console.error(`⚠️ Advertencia: ${stderr}`);
      console.log(stdout);

      // 📁 Copiar archivos estáticos adicionales
      console.log("\n📁 Copiando archivos estáticos adicionales...");
      const otherAssets = ["favicon.ico", "robots.txt", "manifest.json"];
      otherAssets.forEach((file) => {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(publicDir, file);
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`✅ ${file} copiado correctamente`);
        }
      });

      console.log("\n✨ Construcción completada con éxito!");
      console.log('📦 Archivos listos en la carpeta "public/"');
    });
  });
})();
