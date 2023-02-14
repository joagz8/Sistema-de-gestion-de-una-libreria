const listaLibros = document.getElementById("listaLibros")
const listaClientes = document.getElementById("listaClientes")
const escribir = document.getElementById("prestados")
const cliente = document.getElementById("prestadosClientes")
const dniCliente = document.getElementById("dniCliente")
const btnEditarClientes = document.getElementById("btnEditarClientes")
const fechaEntrega = document.getElementById("fechaEntrega")
const fechaDevolucion = document.getElementById("fechaDevolucion")

let idCliente

listarLibros()
listarClientes()

//Mostrar libros en lista
async function listarLibros(){
    try {
        response = await axios.get("http://localhost:3000/prestamo")
        response.data.forEach(element => {
            listaLibros.innerHTML += "<br>"+ `<span>📘 ${element.librosNombre}`+ 
            '<button type="button" class="btn me-4" id="btnSeleccionar" onclick="seleccionar('+ element.id +')">🖐️</button>' +
            //'<button id="btnSeleccionar" onclick="seleccionar('+ element.id +')">🖐️</button>' +
            "<br>"

        });    
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente") 
    }
}
"<br>"
"<br>"
"<br>"
"<br>"
"<br>"

//Mostrar nombres en lista
async function listarClientes(){
    try {
        response = await axios.get("http://localhost:3000/prestamo")
        response.data.forEach(element => {
            listaClientes.innerHTML += "<br>" + `<span>📌 ${element.clientesNombre}` +
            //Botón Editar
            '<button type="button" class="btn me-4" id="btnEditarClientes" onclick="editarClientes('+ element.id +')">✏️</button>' +
            "<br>"
        });    
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente") 
    }
}

//Editar estudiante
async function editarClientes(id){
    try {
        identificador = id
        response = await axios.get("http://localhost:3000/prestamo/" + id)
        escribir.value = response.data.clientesNombre
        dniCliente.value = response.data.clientesDni
        idCliente = response.data.clientesId
        fechaEntrega.value = response.data.fechaEntrega
        fechaDevolucion.value = response.data.fechaDevolucion 

        escribir.hidden = false
        btnActualizarAlumno.hidden = false
        dniCliente.hidden = false
        dniCliente.disabled = false
        labelDniCliente.hidden = false
        labelEntrega.hidden = false
        labelDevolucion.hidden = false
        fechaEntrega.hidden = false
        fechaEntrega.disabled = false
        fechaDevolucion.hidden = false
        fechaDevolucion.disabled = false 
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente")
    }
}

//Actualizar cliente
async function actualizarAlumno(){
    try {
        response = await axios.put("http://localhost:3000/prestamo/" + identificador, {librosId: response.data.librosId, librosNombre: response.data.librosNombre, clientesId: response.data.clientesId, clientesNombre: escribir.value, clientesDni: dniCliente.value, fechaEntrega: fechaEntrega.value, fechaDevolucion: fechaDevolucion.value})
        //response = await axios.put("http://localhost:3000/prestamo/" + identificador, {clientesNombre: escribir.value})
        responseDos = await axios.put("http://localhost:3000/clientes/" + idCliente, {nombre: escribir.value, dni: dniCliente.value})
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente")
    }
}

//Seleccionar
async function seleccionar(id){
    try {
        identificador = id
        response = await axios.get("http://localhost:3000/prestamo/" + id)
        escribir.value = response.data.librosNombre
        cliente.value = response.data.clientesNombre
        dniCliente.value = response.data.clientesDni
        fechaEntrega.value = response.data.fechaEntrega
        fechaDevolucion.value = response.data.fechaDevolucion

        escribir.hidden = false
        escribir.disabled = true
        btnDevuelto.hidden = false
        prestadosClientes.hidden = false
        dniCliente.hidden = false
        labelPrestadosClientes.hidden = false
        labelDniCliente.hidden = false
        labelEntrega.hidden = false
        labelDevolucion.hidden = false
        fechaEntrega.hidden = false
        fechaDevolucion.hidden = false

    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente")
        
    }
}

//Devolver
async function devolver(){
    try {
        response = await axios.delete("http://localhost:3000/prestamo/" + identificador)     
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente")
    }
    
}
