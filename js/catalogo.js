const escribirLibro = document.getElementById("escribirLibro")
const escribirAutor = document.getElementById("escribirAutor")
const lista = document.getElementById("lista")
const btnActualizar = document.getElementById("btnActualizar")
let identificador
listar()

//Guardar libro
async function guardar(){
    try {
        response = await axios.post("http://localhost:3000/libros", {titulo: escribirLibro.value, autor: escribirAutor.value, estado: 0})      
    } catch (error) {
       alert("Lo sentimos, se produjo un error. Intentelo nuevamente") 
    }
}

//Mostrar libros en lista
async function listar(){
    try {
        response = await axios.get("http://localhost:3000/libros")
        response.data.forEach(element => {
            lista.innerHTML += "<br>" + `<span>📘 ${element.titulo}`+
            //Botón Editar
            '<button type="button" class="btn me-4" id="btnEditar" onclick="editar('+ element.id +')">✏️</button>' +
            //'<button id="btnEditar" onclick="editar('+ element.id +')">✏️</button>' +
            //Botón borrar
            '<button type="button" class="btn me-4" id="btnBorrar" onclick="borrar('+ element.id +')">🗑️</button>' +
            //'<button id="btnBorrar" onclick="borrar('+ element.id +')">🗑️</button>' +
            "<br>"

            lista.innerHTML += `<span>— ${element.autor}` +
            //element.autor +
            //Botón editar autor
            '<button type="button" class="btn me-4" id="btnEditarAutor" onclick="editarAutor('+ element.id +')">✏️</button>' +
            //'<button id="btnEditarAutor" onclick="editarAutor('+ element.id +')">✏️</button>' +
            "<br>"
        });    
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente") 
    }

}

//Ejecución de botón borrar
async function borrar(id){
    try {
        responseDos = await axios.get("http://localhost:3000/libros/" + id)
        //Condición de borrar si no se prestó antes
        if (responseDos.data.estado == 0) {
            response = await axios.delete("http://localhost:3000/libros/" + id)   
        }
        else {
            alert("Lo siento, este libro no se puede borrar ya que se prestó antes")
        }
        //response = await axios.delete("http://localhost:3000/libros/" + id)     
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente")
    }
    
}

//Ejecución de botón editar para mostrarlo en input
async function editar(id){
    try {
        identificador = id
        response = await axios.get("http://localhost:3000/libros/" + id)
        escribirLibro.value = response.data.titulo
        btnActualizar.hidden = false
        btnEditarAutor.hidden = true
        escribirAutor.hidden = true
        btnGuardar.hidden = true
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente")
    }
}

//Editar autor de libro
async function editarAutor(id){
    try {
        identificador = id
        response = await axios.get("http://localhost:3000/libros/" + id)
        escribirAutor.value = response.data.autor
        btnActualizarAutor.hidden = false
        btnEditar.hidden = true
        escribirLibro.hidden = true
        btnGuardar.hidden = true
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente")
    }
}

//Actualizar nombre de libro
async function actualizar(){
    try {
        response = await axios.put("http://localhost:3000/libros/" + identificador, {titulo: escribirLibro.value, autor: response.data.autor})
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente")
    }
}

//Actualizar nombre del autor
async function actualizarAutor(){
    try {
        response = await axios.put("http://localhost:3000/libros/" + identificador, {titulo: response.data.titulo, autor: escribirAutor.value})
    } catch (error) {
        alert("Lo sentimos, se produjo un error. Intentelo nuevamente")
    }
}