const propiedadesJSON = [
  {
    name: "Casa de campo",
    description: "Un lugar ideal para descansar de la ciudad",
    src:
      "https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg",
    rooms: 2,
    m: 170
  },
  {
    name: "Casa de playa",
    description: "Despierta tus días oyendo el oceano",
    src:
      "https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg",
    rooms: 2,
    m: 130
  },
  {
    name: "Casa en el centro",
    description: "Ten cerca de ti todo lo que necesitas",
    src:
      "https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg",
    rooms: 1,
    m: 80
  },
  {
    name: "Casa rodante",
    description: "Conviertete en un nómada del mundo sin salir de tu casa",
    src:
      "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
    rooms: 1,
    m: 6
  },
  {
    name: "Departamento",
    description: "Desde las alturas todo se ve mejor",
    src:
      "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
    rooms: 3,
    m: 200
  },
  {
    name: "Mansión",
    description: "Vive una vida lujosa en la mansión de tus sueños ",
    src:
      "https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg",
    rooms: 5,
    m: 500
  }
];

// Funcion limpiar filtros
function limpiarFiltros() {
  document.querySelector("#cantidad-cuartos").value = "";
  document.querySelector("#metros-desde").value = "";
  document.querySelector("#metros-hasta").value = "";
}

// Plantilla para una card
function crearCard(name, description, src, rooms, m) {
  const plantilla = `
    <div class="propiedad">
      <div class="img" style="background-image: url('${src}')"></div>
      <section>
        <h5>${name}</h5>
        <div class="d-flex justify-content-between">
          <p>Cuartos: ${rooms}</p>
          <p>Metros: ${m}</p>
        </div>
        <p class="my-3">${description}</p>
        <button class="btn btn-info ">Ver más</button>
      </section>
    </div>
  `;
  return plantilla;
}

function actualizarTotal(propiedades) {
  let spanTotal = document.querySelector("#total");
  spanTotal.innerHTML = propiedades.length;
}

// Funcion para cargar todos los datos de los Dptos
function cargarCards(propiedades) {
  let divPropiedades = document.querySelector(".propiedades");
  divPropiedades.innerHTML = "";
  for (const propiedad of propiedades) {
    divPropiedades.innerHTML += crearCard(propiedad.name, propiedad.description, propiedad.src, propiedad.rooms, propiedad.m);
  }

  actualizarTotal(propiedades);
}

// Funcion que permite buscar segun preferencias
function buscar() {
  let cantidadCuartos = parseInt(document.querySelector("#cantidad-cuartos").value);
  let metrosDesde = parseInt(document.querySelector("#metros-desde").value);
  let metrosHasta = parseInt(document.querySelector("#metros-hasta").value);

  // Validacion de campos vacios
  if (Number.isInteger(cantidadCuartos) == false || Number.isInteger(metrosDesde) == false || Number.isInteger(metrosHasta) == false) {
    alert("Por favor complete todos los campos");
    return;
  }

  // Si ingresan valores 0 arrojar mensaje de ingresar valor validos
  if (cantidadCuartos === 0 || metrosDesde === 0 || metrosHasta === 0) {
    alert("Por favor ingrese valores validos");
    return;
  }

  /*
    Habitaciones: El resultado sera siempre igual o mayor al ingresado por el usuario.
    Y
    Metros cuadrados: El resultado sera siempre entre el rango desde hasta ingresado por el usuario.
  */
  let propiedadesFiltradas = [];
  for (const propiedades of propiedadesJSON) {
    if (propiedades.rooms >= cantidadCuartos && propiedades.m >= metrosDesde && propiedades.m <= metrosHasta) {
      propiedadesFiltradas.push(propiedades);
    }
  }
  cargarCards(propiedadesFiltradas);
}

// Aqui voy a cargar el evento click del boton BUSCAR
function cargarEventoBotonBuscar() {
  const botonBuscar = document.querySelector("#boton-buscar");
  botonBuscar.addEventListener("click", function () {
    buscar();
  })
}
//  
function cargarInicial() {
  cargarCards(propiedadesJSON);
  cargarEventoBotonBuscar();
  limpiarFiltros();
}

cargarInicial();