## 📋 Descripción del Proyecto

Sitio web desarrollado con HTML5, CSS3, bootstrap y JavaScript, con automatización de tareas utilizando Node.js. Incluye optimización de imágenes en formato `.webp`, generación de archivos minificados  para HTML, CSS, SASS y JS.

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica de contenido
- **CSS3 y SASS** - Estilos modulares con variables personalizadas
- **JavaScript** - Funcionalidades interactivas
- **Node.js** - Entorno de desarrollo y scripts de automatización

## 🗂️ Estructura del Proyecto

```
IAMFREELANCER404/
├── scripts/                # Scripts de automatización
│   ├── convert-img-to-picture.js  # Adaptar html para utilizar <picture>
│   ├── convert-webp.js     # Conversión de imágenes a formato WebP
│   └── minify.js           # Minificación de archivos
├── src/                    # Código fuente (desarrollo)
│   ├── assets/             # Recursos estáticos originales
│   ├── css/                # Estilos modulares
│   │   ├── blog.css        # Estilos para el blog
│   │   ├── contact.css     # Estilos para la página de contacto
│   │   ├── index.css       # Estilos para la página principal
│   │   ├── portfolio.css   # Estilos para el portafolio
│   │   ├── services.css    # Estilos para servicios
│   │   └── styles.css      # Estilos globales y variables
│   ├── js/                 # Archivos JavaScript
│   └── pages/              # Páginas HTML
│   │   ├── blog.html       # Página de blog
│   │   ├── contact.html    # Página de contacto
│   │   ├── portfolio.html  # Página de portafolio
│   │   ├── services.html   # Página de servicios
│   │   └── index.html      # Página principal
│   └── sass/               # Carpeta principal de archivos SCSS para estilos
│       ├── base            # Estilos base y variables globales
│		│   ├── _variables.scss   # Variables Sass (colores, fuentes, tamaños)
│		│   ├── _global.scss      # Estilos globales generales, resets y básicos
│       ├── components      	  # Estilos para componentes reutilizables de la UI
│		│   ├── _animations.scss  # Animaciones CSS personalizadas
│		│   ├── _navbar.scss      # Estilos del menú de navegación
│		│   ├── _buttons.scss     # Estilos para botones
│		│   ├── _footer.scss      # Estilos del pie de página
│		│   ├── _modal.scss       # Estilos para ventanas modales
│       ├── blog.scss       # Estilos específicos para la página blog
│       ├── contact.scss    # Estilos específicos para la página contacto
│       ├── portfolio.scss  # Estilos específicos para la página portfolio
│       ├── services.scss   # Estilos específicos para la página servicios
│       └── index.scss      # Estilos específicos para la página principal (home)
├── .gitignore              # Archivos ignorados por Git
├── build.js                # Script de construcción principal
├── LICENSE                 # Licencia del proyecto
├── package.json            # Configuración del proyecto y dependencias
└── README.md               # Documentación del proyecto
└── robots.txt              # Guiar a los rastreadores y controlar el acceso
└── sitemap.xml             # Mejorar indexación por los motores de búsqueda
```

## ✨ Características

- **Diseño Responsivo**: Adaptable a diferentes dispositivos y tamaños de pantalla
- **Estructura Modular**: Organización clara de archivos por funcionalidad
- **Optimización de Recursos**: Scripts para convertir y optimizar imágenes
- **Sistema de Estilos Modular**: CSS y SASS organizado por componentes y páginas
- **Automatización de Procesos**: Scripts para minificación y construcción

## 🚀 Instalación

1. Clona este repositorio:

	`git clone https://github.com/Angel6044/iamfreelancer404.git` 
	`cd iamfreelancer404`

2. Instala las dependencias:

	`npm install`

3. Ejecuta el entorno de desarrollo:

	`npm run dev`

## 🔧 Scripts Disponibles

- **build**: Construye el proyecto para producción

	`npm run build`

- **convert-img-to-picture**: Adaptar html para utilizar picture

	`node scripts/convert-img-to-picture.js`

- **Para compilar sass**:

	`npm run sass`

## 📄 Licencia

Este proyecto está bajo la Licencia especificada en el archivo [LICENSE](https://monica.im/home/chat/Claude%203.7%20Sonnet/LICENSE).

## 📱 Páginas del Sitio

- **Inicio**: Presentación principal de la empresa y servicios
- **Servicios**: Detalle de los servicios ofrecidos
- **Portafolio**: Proyectos realizados y casos de éxito
- **Blog**: Artículos técnicos y noticias
- **Contacto**: Formulario de contacto e información

## 🔮 Características de Optimización

- Conversión automática de imágenes a formato WebP
- Implementación del elemento `<picture>` para imágenes responsivas
- Minificación de archivos CSS, JS y HTML para producción

### Optimización SEO

Este proyecto ha sido optimizado para mejorar su visibilidad y rendimiento en los motores de búsqueda mediante:

* **Meta Etiquetas:** Títulos, descripciones y palabras clave únicas y relevantes en cada página HTML.
* **Sitemap XML:** Archivo `sitemap.xml` generado para una mejor indexación por los motores de búsqueda.
* **Robots.txt:** Archivo `robots.txt` para guiar a los rastreadores y controlar el acceso al sitio.
* **Optimización de Imágenes:** Uso de formatos `webp` y atributos `alt` para mejorar la carga y accesibilidad.
* **URLs Amigables:** Estructura de URLs clara y descriptiva para facilitar la navegación y el rastreo.

Estas implementaciones buscan una mayor visibilidad y una mejor experiencia de usuario.

## 👤 Autor

**Angel6044**

- GitHub: [Angel6044](https://github.com/Angel6044)

- https://iamfreelancer404.netlify.app/

---

⭐️ Si encuentras útil este proyecto, ¡no dudes en darle una estrella en GitHub!
