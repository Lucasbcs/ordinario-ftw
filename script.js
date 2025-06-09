function mostrarMensaje() {
  alert("Preparate para conocer más sobre nueva york");
}

function validarFormulario() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  if (nombre === "" || email === "") {
    alert("Por favor, completa todos los campos obligatorios");
    return false;
  }

  alert("Formulario enviado con éxito");
  return true;
}

window.addEventListener("DOMContentLoaded", function () {
  // Si estamos en la página de lugares
  if (document.getElementById("tablaLugares")) {
    fetch("lugares.xml")
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        const lugares = xml.getElementsByTagName("lugar");
        const tbody = document.querySelector("#tablaLugares tbody");

        for (let i = 0; i < lugares.length; i++) {
          const nombre = lugares[i].getElementsByTagName("nombre")[0].textContent;
          const ubicacion = lugares[i].getElementsByTagName("ubicacion")[0].textContent;
          const descripcion = lugares[i].getElementsByTagName("descripcion")[0].textContent;

          const fila = document.createElement("tr");
          fila.innerHTML = `
            <td>${nombre}</td>
            <td>${ubicacion}</td>
            <td>${descripcion}</td>
          `;
          tbody.appendChild(fila);
        }
      })
      .catch(error => console.error("Error al cargar el XML:", error));
  }
});
