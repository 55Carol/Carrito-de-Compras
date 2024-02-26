const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const variarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener("click", agregarCursos);

    //Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);
}



//Funciones
function agregarCursos(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        //Elimina del arreglo articulos carrito por el data -id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML(); //iterrar sobre el carrito y asi poder mostrar su html actualizado con lo borrado
    }
}



//lee los conteni del HTML al que le dimos click 
function leerDatosCurso(curso) {
    // console.log(curso);


    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
     }





    //agrega alementos al arreglo de carrito
   
    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();



    //recorrer el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
         <img src="${imagen}" whidth="100">
        </td>
        <td> ${titulo}</td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td> 
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>

        `;
        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

}


//Eliminar los cursos del tbody


function limpiarHTML() {
    //esta forma es mas lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}