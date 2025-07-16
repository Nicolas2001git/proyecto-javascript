const ciudades_argentina = [
  { ciudad: "Buenos Aires", precio: 3325},
  { ciudad: "Córdoba", precio: 2231},
  { ciudad: "Rosario", precio: 1365},
  { ciudad: "Mendoza", precio: 2124},
  { ciudad: "La Plata", precio: 552},
  { ciudad: "San Miguel de Tucumán", precio: 612},
  { ciudad: "Mar del Plata", precio: 1675},
  { ciudad: "Salta", precio: 2151},
  { ciudad: "Santa Fe", precio: 890},
  { ciudad: "San Juan", precio: 340},
];
const ciudades_brasil = [
  { ciudad: "Río de Janeiro", precio: 1124},
  { ciudad: "São Paulo", precio: 242},
  { ciudad: "Salvador", precio: 3410},
  { ciudad: "Brasilia", precio: 4550},
  { ciudad: "Fortaleza", precio: 500},
  { ciudad: "Belo Horizonte", precio: 600},
  { ciudad: "Recife", precio: 750},
  { ciudad: "Curitiba", precio: 800},
  { ciudad: "Manaus", precio: 700},
  { ciudad: "Porto Alegre", precio: 1000 }
];
const ciudades_uruguay = [
  { ciudad: "Montevideo", precio: 1030 },
  { ciudad: "Punta del Este", precio: 2009},
  { ciudad: "Colonia del Sacramento", precio: 1002},
  { ciudad: "Salto", precio: 4000},
  { ciudad: "Paysandú", precio: 5200},
  { ciudad: "Maldonado", precio: 6300},
  { ciudad: "Rivera", precio: 7300},
  { ciudad: "Tacuarembó", precio: 8200},
  { ciudad: "Artigas", precio: 3030},
  { ciudad: "Rocha", precio: 3005}
];
function mostrardestinos(destino) {
  console.log("Destinos disponibles:");
  for (let i = 0; i < destino.length; i++) {
    console.log(`${destino[i].ciudad}: $${destino[i].precio} USD`);
  }
}
function buscarDestino(ciudad, destino) {
  return destino.find(function(aceptar) {
    return aceptar.ciudad.toLowerCase() === ciudad.toLowerCase();
  });
}
let viajar = confirm("¿Te gusta viajar?");
if (viajar) {
  alert("Tengo una propuesta.");
  pasajeproceso();
} else {
  alert("Está bien, cada quien tiene sus gustos.");
}
function pasajeproceso() {
  let pais = prompt("¿A qué país quieres viajar? (Argentina / Brasil / Uruguay)").toLowerCase();
  let destino;
  switch (pais) {
  case "argentina":
    destino = ciudades_argentina;
    break;
  case "brasil":
    destino = ciudades_brasil;
    break;
  case "uruguay":
    destino = ciudades_uruguay;
    break;
  default:
    alert("País no disponible. Intenta de nuevo.");
    return;
  }
  alert("Consulta la consola del navegador para ver los destinos y precios. No te preocupes si cerrás esta parte. Solo tenés que recargar la página luego de abrir la consola del navegador para ver los destinos y precios.");
  mostrardestinos(destino);
  let ciudadseleccionada = prompt("Escribe el nombre de la ciudad que deseas:");
  let destinodefinido = buscarDestino(ciudadseleccionada, destino);
  if (!destinodefinido) {
  alert("Ciudad no encontrada. Por favor, escribila exactamente como aparece en la lista.");
  return;
  }
  if (destinodefinido){
    let precioFinal = destinodefinido.precio;
    if (pais === "uruguay"){
      precioFinal = precioFinal * 0.79;
      alert(`Te tengo excelentes noticias: al elegir Uruguay, recibís un descuento del 21%. Precio final: $${precioFinal.toFixed(2)} USD.`);
    }
    let mensajealcomprar = `El precio del pasaje a ${destinodefinido.ciudad} es de $${precioFinal.toFixed(2)} USD.`;
    if (pais === "argentina") {
    let cuotamensual = precioFinal / 12;
    mensajealcomprar += `Además, como beneficio exclusivo, ¡tenés 12 cuotas sin interés de $${cuotamensual.toFixed(2)} USD cada una!¿Querés comprarlo?`
  }
   if (pais === "brasil") {
    mensajealcomprar += ` ¡Y te llevás un cupón del 2x1 en caipirinhas en los bares de la playa!¿Queres tomar esta oportunidad?`;
  }
  let comprahecha = confirm(mensajealcomprar);
  if (comprahecha) {
    Swal.fire({
      title: "Muy bien!",
      text: `Vacaciones para vos en ${destinodefinido.ciudad}, a disfrutar!`,
      icon: "success"
    });
  } else {
    alert("Compra cancelada.");
  }
}
}
