# Simulador de Viajes

Este proyecto es un simulador interactivo de precios de viajes desarrollado con HTML, CSS y JavaScript, que permite a los usuarios explorar destinos turísticos en distintos países, aplicar filtros de precios y recuperar tickets guardados.

El diseño está enfocado en la experiencia del usuario y es 100% responsive, adaptándose tanto a pantallas de escritorio como a dispositivos móviles.

# Características principales

Selección de país: el usuario elige entre Argentina, Brasil, Uruguay, Paraguay o Chile.

Visualización de destinos: se muestran en pantalla las ciudades disponibles con sus precios.

Filtro de precios: opción de establecer un precio máximo y ver solo los destinos que cumplen con el criterio.

Generación de tickets: cada vez que se consultan destinos, se genera un número de ticket único que puede ser almacenado en localStorage.

Recuperación de tickets: permite reconsultar los destinos previos usando el número de ticket.

Consulta de capitales: integración con la API de RestCountries para mostrar la capital del país seleccionado.

Responsive Design: estilos adaptados con CSS y media queries para que se vea correctamente en móviles, tablets y PC

Interfaz moderna: uso de fuentes de Google Fonts, sombras, transiciones y SweetAlert2 para alertas y mensajes interactivos

# 🛠️ Tecnologías utilizadas
HTML5 → estructura principal del simulador.

CSS3 → diseño responsive, tipografías y estilos modernos.

JavaScript (ES6+) → lógica de interacción, filtrado de datos, uso de localStorage y consumo de APIs externas.

JSON → archivo ciudades.json con la base de datos de ciudades y precios.

Bootstrap 5 → soporte para componentes y grillas responsive.

SweetAlert2 → librería para alertas visuales y modernas.


# Cómo usarlo

Abrir el proyecto en el navegador (index.html).

Seleccionar un país y ver la lista de destinos disponibles.

Usar el filtro de precio máximo para reducir las opciones.

Guardar el número de ticket generado para recuperar la información más tarde.

Ingresar un ticket en el formulario de recuperación para volver a ver los destinos.

# Responsive Design

El simulador fue diseñado para adaptarse automáticamente a cualquier dispositivo:

Desktop 

Tablet 

Mobile 
