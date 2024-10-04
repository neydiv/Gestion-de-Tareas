//Definimos una clase para las tareas  "Task"

class Task {
    id: number; name: string; encargado: string;

    constructor(taskName: string, taskencargado: string) {
        this.id = Date.now();//el id es timeStamp al momento de crearlo
        this.name = taskName;
        this.encargado = taskencargado; //agregamos la propiedad encargado

    }
}


let tasks: Task[] = []; // Array de tareas con objetos del tipo Task

let editMode: boolean = false; // Indica si estamos editando o no

let editIndex: number = 0; // contiene el indice de la tarea que se esta editando

//Detectamos si la pagina ha cargado completamente
document.addEventListener('DOMContentLoaded', paginaCargada);

function paginaCargada() {
    const addButton = document.getElementById("agregarTarea") as HTMLButtonElement;
    addButton.addEventListener('click', addTask);
}

function addTask() {
    const input = document.getElementById('nuevaTarea') as HTMLInputElement;
    const input2 = document.getElementById('nuevoEncargado') as HTMLInputElement; //guarda el valor del input 2
    const taskName: string = input.value;
    const taskencargado: string = input2.value; //hace referencia al valor del input 2

    //verificar si estamos en modo edicion



    if (editMode)//es igual a if (editMode ==true)
    {
        if (taskName !== "")  //ver que no este vacio el input
        {
            tasks[editIndex].name = taskName; //actualizamos al tarea en el array

            input.style.backgroundColor = "white";
            input.value = "";
            //hago una referencia a la fila en el tbody  

            const fila = (document.getElementById('listaTareas') as HTMLTableElement).rows[editIndex];
            fila.style.color = "black";

            //cambio el texto del boton
            (document.getElementById('agregarTarea') as HTMLTableElement).textContent = "Agregar Tarea";
            
            editMode = false;
            editIndex = 0;

            renderList();
        }
        else { alert("Debe ingrtesar una tarea >:("); }
    } //fin del modo editar

    else    // si no estamos editando , es decir estamos agregando
    {
        if (taskName !== "") {
            const newTask = new Task(taskName, taskencargado)// creo el objeto y le paso el texto de la tarea (taskencargado)
            tasks.push(newTask);// agregamos el objeto al Array
            input.value = "";
            renderList(); //actulizar la vista (interface)
        }

        else { alert("Debe ingresar una tarea >:("); }
    } // fin de modo agregar

} //fin de addTask()


function renderList() {

    const taskTableBody = document.getElementById('listaTareas') as HTMLTableSectionElement;

    taskTableBody.innerHTML = ""; // vaciamos el contenido del tablabody


    tasks.forEach((task, index) => {

        const tr = document.createElement('tr');
        const tdID = document.createElement('td');
        const tdTask = document.createElement('td');
        const tdencargado = document.createElement('td'); //agregamos una celda para el valor encargado
        const tdAction = document.createElement('td');

        tdID.innerHTML = (index + 1).toString();
        tdTask.innerHTML = task.name;
        tdencargado.innerHTML = task.encargado; //llama al valor encargardo para agregarse a la lista



        // creamos los 4 iconos

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit'; //icono del lapiz
        editIcon.setAttribute('data-index', index.toString());
        editIcon.addEventListener('click', editTask);
        editIcon.style.padding = '0 5px';
        editIcon.style.cursor = 'pointer';

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash'; //icono del tacho
        deleteIcon.setAttribute('data-index', index.toString());
        deleteIcon.addEventListener('click', deleteTask);
        deleteIcon.style.padding = '0 5px';
        deleteIcon.style.cursor = 'pointer';

        const arrowUp = document.createElement('i');
        arrowUp.className = 'fas fa-arrow-up'; //icono del felcha arriba
        arrowUp.setAttribute('data-index', index.toString());
        arrowUp.addEventListener('click', moveTaskUp);
        arrowUp.style.padding = '0 5px';
        arrowUp.style.cursor = 'pointer';

        const arrowDown = document.createElement('i');
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
        tr.appendChild(tdencargado);  //agregamos una celda para el encargado
        tr.appendChild(tdAction);

        // inserta la fila en la tabla (tablebody)

        taskTableBody.appendChild(tr);


    }

    );/// fin de foreach


} // fin de renderlist()


function editTask(this: HTMLObjectElement) {
    //extraemos el valor del atributo data-index
    const index = parseInt(this.getAttribute('data-index') as string);
    const input = document.getElementById('nuevaTarea') as HTMLInputElement;
    input.value = tasks[index].name;
    input.style.backgroundColor = "yellow";

    //hago una referencia a la fila en el tbody
    const fila = (document.getElementById('listaTareas') as HTMLTableElement).rows[index];

    fila.style.color = "red";

    // cambio el texto del boton
    (document.getElementById('agregarTarea') as HTMLTableElement).textContent = "Editar Tarea";

    // cambiamos las variables globales

    editMode = true;
    editIndex = index;


}

function deleteTask(this: HTMLObjectElement) {
    //Extraemos el valor del atrivuto in
    const index = parseInt(this.getAttribute('data-index') as string);

    if (confirm("Estas seguro que quieres borrar la tarea?")) {
        tasks.splice(index, 1);//borramos la tarea del array
        renderList();
    }
    else {

    }


}

function moveTaskUp(this: HTMLObjectElement) {

    const index = parseInt(this.getAttribute('data-index') as string);

    if (index > 0) {
        let temp = tasks[index]; // 
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;
        renderList()

    }


}

function moveTaskDown(this: HTMLObjectElement) {
    let indice = parseInt(this.getAttribute('data-index') as string);

    if (indice < tasks.length - 1) {
        let temp = tasks[indice]; // guarda la tarea actual en una mem temporal			
        tasks[indice] = tasks[indice + 1];
        tasks[indice + 1] = temp;
        renderList();

    }

}