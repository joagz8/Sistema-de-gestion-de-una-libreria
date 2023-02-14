const lista = document.getElementById("lista")
const libroSeleccionado = document.getElementById("libroSeleccionado")
const libroAPrestar = document.getElementById("libroAPrestar")
const nombreAlumno = document.getElementById("nombreAlumno")
const dniAlumno = document.getElementById("dniAlumno")
const fechaEntrega = document.getElementById("fechaEntrega")
const fechaDevolucion = document.getElementById("fechaDevolucion")

let identificador
let idCliente

listar()

//Mostrar libros en lista
async function listar(){
    try {
        response = await axios.get("http://localhost:3000/libros")
        response.data.forEach(element => {
            lista.innerHTML += "<br>" + `<span>📘 ${element.titulo}`+
            '<button type="button" class="btn me-4" id="btnSeleccionar" onclick="seleccionar('+ element.id +')">🖐️</button>' +
            "<br>" +
            `<span>— ${element.autor}` +
            //element.autor +
            "<br>"
        });    
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente") 
    }
}

//Seleccionar libro a prestar
async function seleccionar(id){
    try {
        identificador = id
        libroAPrestar.hidden = false
        nombreAlumno.hidden = false
        dniAlumno.hidden = false
        fechaEntrega.hidden = false
        fechaDevolucion.hidden = false
        response = await axios.get("http://localhost:3000/libros/" + id)
        libroAPrestar.value = response.data.titulo
        btnPrestar.hidden = false
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente")

    }
}

//Prestar el libro seleccionado
async function prestar(){
    try {
        responseUno = await axios.post("http://localhost:3000/clientes", {nombre: nombreAlumno.value, dni: dniAlumno.value})
        responseDos = await axios.get("http://localhost:3000/clientes")
        responseDos.data.forEach(element => {
            idCliente = element.id
        })
        let nombreLibro = libroAPrestar.value
        let clienteNombre = nombreAlumno.value
        responseTres = await axios.post("http://localhost:3000/prestamo", {librosId: identificador, librosNombre: nombreLibro, clientesId: idCliente, clientesNombre: clienteNombre, clientesDni: dniAlumno.value, fechaEntrega: fechaEntrega.value, fechaDevolucion: fechaDevolucion.value})
        if (fechaEntrega.value > fechaDevolucion.value) {
            alert("Esta mal colocada la fecha")
        }
        //Validación de no borrar libro prestado
        responseCuatro = await axios.get("http://localhost:3000/libros/" + identificador)
        responseCinco = await axios.put("http://localhost:3000/libros/" + identificador, {titulo: responseCuatro.data.titulo, autor: responseCuatro.data.autor, estado: 1})
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente")
    }
}



