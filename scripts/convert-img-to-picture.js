// convert-img-to-picture.js

const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '../src'); // sube desde scripts hacia src

// Función para recorrer carpetas recursivamente
function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllHtmlFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith('.html')) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

// Función para convertir <img src="x.png"> en <picture>...</picture>
function convertImgsToPicture(html) {
    return html.replace(/<img\s+([^>]*?)src=["']([^"']+\.(png|jpe?g))["']([^>]*)>/gi, (match, beforeSrc, src, ext, afterSrc) => {
        const webpSrc = src.replace(/\.(png|jpe?g)$/i, '.webp');
        const altMatch = match.match(/alt=["'](.*?)["']/i);
        const alt = altMatch ? altMatch[1] : 'Imagen';

        return `<picture>
  <source srcset="${webpSrc}" type="image/webp" />
  <img ${beforeSrc}src="${src}"${afterSrc}>
</picture>`;
    });
}

// Procesamiento de todos los archivos .html
const htmlFiles = getAllHtmlFiles(htmlDir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const updatedContent = convertImgsToPicture(content);
    fs.writeFileSync(file, updatedContent, 'utf8');
    console.log(`✅ Procesado: ${file}`);
});
