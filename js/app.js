const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const variarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener("click", agregarCursos);
}
 


//Funciones
function agregarCursos(e) {
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")) { 
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
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
    cantidad: 1,
    }
    
    //agrega alementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();



    //recorrer el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
         ${curso.titulo}
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

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}