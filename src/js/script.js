document.addEventListener("DOMContentLoaded", function () {
  // Texto dinámico del index
  const textos = [
    "Freelancer Creativo",
    "Diseñador Web",
    "Desarrollador",
    "Tu Aliado Digital",
  ];
  let indice = 0;
  const textoCambio = document.getElementById("cambio-texto");

  // Verificamos que el elemento exista antes de configurar el intervalo
  if (textoCambio) {
    // Añadimos una transición de desvanecimiento
    setInterval(() => {
      // Desvanecemos el texto actual
      textoCambio.style.opacity = 0;

      setTimeout(() => {
        // Cambiamos el texto y lo hacemos visible nuevamente
        textoCambio.textContent = textos[indice];
        textoCambio.style.opacity = 1;
        indice = (indice + 1) % textos.length;
      }, 500); // Esperamos 500ms para cambiar el texto
    }, 3000); // Cambia cada 3 segundos
  }

  // Ya no necesitamos el código para el navbar responsive porque Bootstrap
  // maneja esto automáticamente con navbar-toggler y collapse

  // Ya no necesitamos el código para el modal porque Bootstrap
  // maneja esto automáticamente con los atributos data-bs-*

  // Sin embargo, si quieres alguna funcionalidad adicional para el modal:
  const infoModal = document.getElementById("infoModal");
  if (infoModal) {
    infoModal.addEventListener("show.bs.modal", function () {
      console.log("Modal abriéndose");
      // Puedes añadir código adicional aquí si necesitas hacer algo cuando se abre el modal
    });
  }
});
