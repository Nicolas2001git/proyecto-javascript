let lista = {};              // 👉 ahora se llama lista
async function cargarLista() {
  try {
    const respuesta = await fetch("ciudades.json");
    lista = await respuesta.json();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo cargar las ciudades"
    });
  }
}
async function mostrarCapital(paisSeleccionado) {
  const paisSeleccion = {
    argentina: "argentina",
    brasil: "brazil",
    uruguay: "uruguay",
    paraguay: "paraguay",
    chile: "chile",
  };
  const nombrePais = paisSeleccion[paisSeleccionado];
  if (!nombrePais) return;
  try {
    const respuesta = await fetch(
      `https://restcountries.com/v3.1/name/${nombrePais}?fullText=true&fields=capital`
    );
    const data = await respuesta.json();
    const capital = (data[0].capital[0]);
    contenedorDestinos.innerHTML =
      `<p class="texto-inner"><strong>Capital de ${nombrePais}:</strong> ${capital}</p>` +
      contenedorDestinos.innerHTML;
  } catch (error) {
    console.error("Error al cargar capital:", error);
  }
}
const inicioViaje = document.getElementById("inicioViaje");
const formularioPais = document.getElementById("formularioPais");
const seleccionarPais = document.getElementById("pais");
const contenedorDestinos = document.getElementById("contenedorDestinos");
const formularioFiltro = document.getElementById("formularioFiltro");
const inputPrecio = document.getElementById("precioFiltro");
const resultadosFiltro = document.getElementById("resultadosFiltro");
const formularioRecuperar = document.getElementById("formularioRecuperar");
const inputTicket = document.getElementById("inputTicket");
const recuperacionResultado = document.getElementById("recuperacionResultado");
document.addEventListener("DOMContentLoaded", cargarLista);
let destinosActuales = [];
function mostrarDestinos(lista) {
  contenedorDestinos.innerHTML = `<p class="texto-inner"><strong>Destinos disponibles:</strong></p>`;
  lista.forEach(ciudad => {
  contenedorDestinos.innerHTML += `<p class="texto-inner">✅ ${ciudad.ciudad}: $${ciudad.precio}</p>`;
});
}
inicioViaje.addEventListener("click", () => {
  console.log("¿Queres irte de viaje?");
  Swal.fire({
    icon: "question",
    title: "¿Te gusta viajar?",
    text: "Elegí un país para ver los destinos disponibles.",
    confirmButtonText: "¡Vamos!"
  });
});
function generarTicket() {
  const numero = Math.floor(Math.random() * 9000) + 900;
  return `TCK-${numero}`;
}
formularioPais.addEventListener("submit", async (event) => {
  event.preventDefault();
  const pais = seleccionarPais.value;
  switch (pais) {
    case "argentina":
      destinosActuales = lista.argentina;
      break;
    case "brasil":
      destinosActuales = lista.brasil;
      break;
    case "uruguay":
      destinosActuales = lista.uruguay;
      break;
    case "chile":
      destinosActuales = lista.chile;
      break;
    case "paraguay":
      destinosActuales = lista.paraguay;
      break;
    default:
      destinosActuales = [];
  }
  if (destinosActuales.length > 0) {
    mostrarDestinos(destinosActuales);
    await mostrarCapital(pais);
    formularioFiltro.style.display = "block";
    resultadosFiltro.innerHTML = "";
    const ticket = generarTicket();
    localStorage.setItem(ticket, JSON.stringify(destinosActuales));
    Swal.fire({
      icon: "success",
      title: "¡Destinos cargados!",
      text: `Tu número de ticket es: ${ticket}. Usalo para recuperar tus destinos más tarde.`,
    });
  } else {
    formularioFiltro.style.display = "none";
    resultadosFiltro.innerHTML = "";
    contenedorDestinos.innerHTML = `<p class="texto-inner">❌ No hay destinos para ese país.</p>`;
  }
});
formularioFiltro.addEventListener("submit", (event) => {
  event.preventDefault();
  const maxPrecio = Number(inputPrecio.value);
  if (Number.isNaN(maxPrecio) || maxPrecio <= 0) {
    resultadosFiltro.innerHTML = `<p class="texto-inner">❌ Ingresá un número válido mayor a 0.</p>`;
  } else if (!destinosActuales || destinosActuales.length === 0) {
    resultadosFiltro.innerHTML = `<p class="texto-inner">⚠️ Elegí primero un país para ver destinos.</p>`;  
  } else {
    const filtrados = destinosActuales.filter(destinos => destinos.precio <= maxPrecio);
    if (filtrados.length === 0) {
      resultadosFiltro.innerHTML = `<p class="texto-inner">😕 No hay destinos con precio <= $${maxPrecio}.</p>`;
    } else {
      let html = `<p class="texto-inner"><strong>Filtrados <= $${maxPrecio}:</strong></p>`;
      filtrados.forEach(destino => {
        html += `<p class="texto-inner"> ${destino.ciudad} - $${destino.precio}</p>`;
      });
      resultadosFiltro.innerHTML = html;
    }
  }
}); 
formularioRecuperar.addEventListener("submit", (event) => {
  event.preventDefault();
  const ticketIngresado = inputTicket.value.trim();
  const datosGuardados = localStorage.getItem(ticketIngresado);
  if (datosGuardados) {
    const destinos = JSON.parse(datosGuardados);
    recuperacionResultado.innerHTML = `<p class="texto-inner"><strong>Destinos recuperados con el ticket ${ticketIngresado}:</strong></p>`;
    destinos.forEach(ciudad => {
      recuperacionResultado.innerHTML += `<p class="texto-inner">📍 ${ciudad.ciudad} - $${ciudad.precio}</p>`;
    });
  } else {
    recuperacionResultado.innerHTML = `<p class="texto-inner">❌ No se encontró ningún ticket con ese número.</p>`;
  }
});