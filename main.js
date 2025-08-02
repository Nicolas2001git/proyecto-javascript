const ciudades_argentina = JSON.parse(localStorage.getItem("ciudades_argentina")) || [
  { ciudad: "Buenos Aires", precio: 3325 },
  { ciudad: "Córdoba", precio: 2231 },
  { ciudad: "Rosario", precio: 1365 },
  { ciudad: "Mendoza", precio: 2124 },
  { ciudad: "La Plata", precio: 552 },
  { ciudad: "San Miguel de Tucumán", precio: 612 },
  { ciudad: "Mar del Plata", precio: 1675 },
  { ciudad: "Salta", precio: 2151 },
  { ciudad: "Santa Fe", precio: 890 },
  { ciudad: "San Juan", precio: 340 }
];
const ciudades_brasil = JSON.parse(localStorage.getItem("ciudades_brasil")) || [
  { ciudad: "Río de Janeiro", precio: 1124 },
  { ciudad: "São Paulo", precio: 242 },
  { ciudad: "Salvador", precio: 3410 },
  { ciudad: "Brasilia", precio: 4550 },
  { ciudad: "Fortaleza", precio: 500 },
  { ciudad: "Belo Horizonte", precio: 600 },
  { ciudad: "Recife", precio: 750 },
  { ciudad: "Curitiba", precio: 800 },
  { ciudad: "Manaus", precio: 700 },
  { ciudad: "Porto Alegre", precio: 1000 }
];
const ciudades_uruguay = JSON.parse(localStorage.getItem("ciudades_uruguay")) || [
  { ciudad: "Montevideo", precio: 1030 },
  { ciudad: "Punta del Este", precio: 2009 },
  { ciudad: "Colonia del Sacramento", precio: 1002 },
  { ciudad: "Salto", precio: 4000 },
  { ciudad: "Paysandú", precio: 5200 },
  { ciudad: "Maldonado", precio: 6300 },
  { ciudad: "Rivera", precio: 7300 },
  { ciudad: "Tacuarembó", precio: 8200 },
  { ciudad: "Artigas", precio: 3030 },
  { ciudad: "Rocha", precio: 3005 }
];
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
  const numero = Math.floor(Math.random() * 9000) + 500;
  return `TCK-${numero}`;
}
formularioPais.addEventListener("submit", (event) => {
  event.preventDefault();
  const pais = seleccionarPais.value;
  switch (pais) {
    case "argentina":
      destinosActuales = ciudades_argentina;
      break;
    case "brasil":
      destinosActuales = ciudades_brasil;
      break;
    case "uruguay":
      destinosActuales = ciudades_uruguay;
      break;
  }
  if (destinosActuales.length > 0) {
    mostrarDestinos(destinosActuales);
    formularioFiltro.style.display = "block";
    resultadosFiltro.innerHTML = "";
    const ticket = generarTicket();
    localStorage.setItem(ticket, JSON.stringify(destinosActuales));
    Swal.fire({
      icon: "success",
      title: "¡Destinos cargados!",
      text: `Tu número de ticket es: ${ticket}. Usalo para recuperar tus destinos más tarde.`,
    });
  }
});
formularioFiltro.addEventListener("submit", (event) => {
  event.preventDefault();
  const precioMax = parseFloat(inputPrecio.value);
  resultadosFiltro.innerHTML = `<p class="texto-inner"><strong>Filtrado por precio:</strong></p>`;
  const filtrados = destinosActuales.filter(ciudad => ciudad.precio <= precioMax);
  switch (true) {
    case isNaN(precioMax) || precioMax <= 0:
      resultadosFiltro.innerHTML += `<p class="texto-inner">⚠️ Ingresá un precio válido.</p>`;
      break;
    case filtrados.length === 0:
      resultadosFiltro.innerHTML += `<p class="texto-inner">❌ No se encontraron destinos por debajo de $${precioMax}.</p>`;
      Swal.fire({
        icon: "error",
        title: "Sin resultados",
        text: `No se encontraron destinos con precio menor o igual a $${precioMax}.`,
      });
      break;
    default:
      filtrados.forEach(ciudad => {
        resultadosFiltro.innerHTML += `<p class="texto-inner">🔍 ${ciudad.ciudad}: $${ciudad.precio}</p>`;
      });
      const ticketFiltrado = generarTicket();
      localStorage.setItem(ticketFiltrado, JSON.stringify(filtrados));
      Swal.fire({
        icon: "success",
        title: "¡Filtrado exitoso!",
        text: `Los resultados filtrados se guardaron con el ticket: ${ticketFiltrado}`,
      });
      break;
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