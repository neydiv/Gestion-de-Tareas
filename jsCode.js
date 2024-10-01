//Definimos una clase para las tareas  "Task"
var Task = /** @class */ (function () {
    function Task(taskName, taskencargado) {
        this.id = Date.now(); //el id es timeStamp al momento de crearlo
        this.name = taskName;
        this.encargado = taskencargado;
    }
    return Task;
}());
var tasks = []; // Array de tareas con objetos del tipo Task
var editMode = false; // Indica si estamos editando o no
var editIndex = 0; // contiene el indice de la tarea que se esta editando
//Detectamos si la pagina ha cargado completamente
document.addEventListener('DOMContentLoaded', paginaCargada);
function paginaCargada() {
    var addButton = document.getElementById("agregarTarea");
    addButton.addEventListener('click', addTask);
}
function addTask() {
    var input = document.getElementById('nuevaTarea');
    var input2 = document.getElementById('nuevoEncargado');
    var taskName = input.value;
    var taskencargado = input2.value;
    if (taskName !== "") {
        var newTask = new Task(taskName, taskencargado); // creo el objeto y le paso el texto de la tarea (taskName)
        tasks.push(newTask); // agregamos el objeto al Array
        input.value = "";
        renderList(); //actulizar la vista (interface)
    }
    else {
        alert("Debe ingresar una tarea >:(");
    }
}
function renderList() {
    var taskTableBody = document.getElementById('listaTareas');
    taskTableBody.innerHTML = ""; // vaciamos el contenido del tablabody
    tasks.forEach(function (task, index) {
        var tr = document.createElement('tr');
        var tdID = document.createElement('td');
        var tdTask = document.createElement('td');
        var tdencargado = document.createElement('td');
        var tdAction = document.createElement('td');
        tdID.innerHTML = (index + 1).toString();
        tdTask.innerHTML = task.name;
        tdencargado.innerHTML = task.encargado;
        // creamos los 4 iconos
        var editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit'; //icono del lapiz
        editIcon.setAttribute('data-index', index.toString());
        editIcon.addEventListener('click', editTask);
        editIcon.style.padding = '0 5px';
        editIcon.style.cursor = 'pointer';
        var deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash'; //icono del tacho
        deleteIcon.setAttribute('data-index', index.toString());
        deleteIcon.addEventListener('click', deleteTask);
        deleteIcon.style.padding = '0 5px';
        deleteIcon.style.cursor = 'pointer';
        var arrowUp = document.createElement('i');
        arrowUp.className = 'fas fa-arrow-up'; //icono del felcha arriba
        arrowUp.setAttribute('data-index', index.toString());
        arrowUp.addEventListener('click', moveTaskUp);
        arrowUp.style.padding = '0 5px';
        arrowUp.style.cursor = 'pointer';
        var arrowDown = document.createElement('i');
        arrowDown.className = 'fas fa-arrow-down'; //icono del lapiz
        arrowDown.setAttribute('data-index', index.toString());
        arrowDown.addEventListener('click', moveTaskDown);
        arrowDown.style.padding = '0 5px';
        arrowDown.style.cursor = 'pointer';
        //insertamos los 4 iconos (<i>) dentro de la celda tdAction
        tdAction.appendChild(editIcon);
        tdAction.appendChild(deleteIcon);
        tdAction.appendChild(arrowUp);
        tdAction.appendChild(arrowDown);
        // inserto las 3 celdas dentro del la fila (<tr>)
        tr.appendChild(tdID);
        tr.appendChild(tdTask);
        tr.appendChild(tdencargado);
        tr.appendChild(tdAction);
        // inserta la fila en la tabla (tablebody)
        taskTableBody.appendChild(tr);
    }); /// fin de foreach
} // fin de renderlist()
function editTask() {
}
function deleteTask() {
}
function moveTaskUp() {
    var index = parseInt(this.getAttribute('data-index'));
    if (index > 0) {
        var temp = tasks[index]; // 
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;
        renderList();
    }
}
function moveTaskDown() {
    var indice = parseInt(this.getAttribute('data-index'));
    if (indice < tasks.length - 1) {
        var temp = tasks[indice]; // guarda la tarea actual en una mem temporal			
        tasks[indice] = tasks[indice + 1];
        tasks[indice + 1] = temp;
        renderList();
    }
}
