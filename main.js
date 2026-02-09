
const saludoH1 = document.getElementById('saludo');
const botonNombre = document.getElementById('btnCambiarNombre');

function cargarNombre() {
    const nombreEnStorage = localStorage.getItem('nombreUsuario');
    
    if (nombreEnStorage) {
        saludoH1.textContent = `¡Hola, ${nombreEnStorage}!`;
    } else {
        saludoH1.textContent = "¡Hola, usuario!";
    }
}
function actualizarNombre() {
    const nuevoNombre = prompt("¿Cómo quieres que te llame la agenda?");
    
    if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
        localStorage.setItem('nombreUsuario', nuevoNombre.trim());
        
        saludoH1.textContent = `Hola, ${nuevoNombre}`;
    }
}

botonNombre.addEventListener('click', actualizarNombre);

cargarNombre();

const fechaActual = new Date();

const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1; 
const anio = fechaActual.getFullYear(); 
const queDia = fechaActual.toLocaleDateString("es-ES",{weekday:`long`});

const queDiaCapitalizado = queDia.charAt(0).toUpperCase() + queDia.slice(1);

const fechaFormateada = `${dia}/${mes}/${anio}`;

const fechafinal = document.getElementById('fecha-actual');

fechafinal.textContent = `Hoy es ${queDiaCapitalizado} ${fechaFormateada}`;


//CLIMA

document.getElementById("btnclima").addEventListener("click", ()=> {

Toastify({

text: "HACE CLIC ACA PARA IR A LA PAGINA DEL CLIMA",
gravity: "top",
position: "center",
duration: 5000,
destination: "https://www.meteored.com.ar/tiempo-en_Buenos+Aires-America+Sur-Argentina-Ciudad+Autonoma+de+Buenos+Aires-SABE-1-13584.html"

}).showToast();




})



//RECORDATORIOS

function sonarAlarma() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, context.currentTime);
    
    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.5);
    oscillator.stop(context.currentTime + 0.5);
}

function checkPastilla() {
    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "¿Tomaste la pastilla hoy?",
  icon: "question",
  showCancelButton: true,
  confirmButtonText: "Si",
  cancelButtonText: "No",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "¡Buenisimo!",
      text: "¡Que tengas un lindo dia!",
      icon: "success"
    });
  } else if (
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Ok",
      text: "Te lo recuerdo en unos minutos",
      icon: "warning"

 });
 setTimeout(() => {
                sonarAlarma();  
                checkPastilla();  
            }, 5000);
  }
});

}

const palabra = document.getElementById('palabraMagica');
if (palabra) {
    palabra.addEventListener('click', function() {
        checkPastilla(); 
    });
}


//TAREAS

    let agenda = [];

    function guardarEnStorage() {
    localStorage.setItem("mis_tareas_2026", JSON.stringify(agenda));
}

function cargarDeStorage() {
    const datosGuardados = localStorage.getItem("mis_tareas_2026");
    if (datosGuardados) {
        agenda = JSON.parse(datosGuardados);
        renderizarAgenda();
    }
}

//Agregar tarea
function altaTarea() {
    const input = document.getElementById("inputTarea");
    
    
    if (input.value.trim() === "") {
        Swal.fire({
  title: "No agregaste ninguna tarea",
  icon: "warning",
  draggable: true
});;
        return; 
    }

    const nuevaTarea = {
        id: Date.now(),
        titulo: input.value,
        completada: false
    };
Swal.fire({
  title: "¡Tarea agregada!",
  icon: "success",
  draggable: true
});

    input.value = "";

    agenda.push(nuevaTarea);
    input.value = ""; 
    guardarEnStorage();
    renderizarAgenda(); 
}

function renderizarAgenda() {
    const listaUI = document.getElementById("listaTareas");
    listaUI.innerHTML = ""; 

    agenda.forEach(tarea => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span style="${tarea.completada ? 'text-decoration: line-through' : ''}">
                ${tarea.titulo}
            </span>
            <button onclick="modificarTarea(${tarea.id})">Editar</button>
            <button onclick="bajaTarea(${tarea.id})">Completada</button>
        `;
        listaUI.appendChild(li);
    });
}

//borrar tarea
function bajaTarea(id) {
    agenda = agenda.filter(tarea => tarea.id !== id);
    guardarEnStorage();
    renderizarAgenda();
}

// editar tarea
function modificarTarea(id) {
    const tareaEncontrada = agenda.find(t => t.id === id);
    if (tareaEncontrada) {
        const nuevoNombre = prompt("Modificar tarea:", tareaEncontrada.titulo);
        if (nuevoNombre) {
            tareaEncontrada.titulo = nuevoNombre;
             guardarEnStorage();
             renderizarAgenda();
        }
    }
}
//COMPRAS

document.addEventListener('DOMContentLoaded', loadList);

function addItem() {
    const input = document.getElementById('itemInput');
    const text = input.value.trim();

    if (text !== "") {
        createListItem(text);
        saveToLocalStorage();
        input.value = "";
    }
}

function createListItem(text) {
    const list = document.getElementById('shoppingList');
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('delete-btn');

 
    btnEliminar.addEventListener('click', function() {
        li.remove(); 
        saveToLocalStorage(); 
    });

   
    li.appendChild(span);
    li.appendChild(btnEliminar);
    list.appendChild(li);
}

function saveToLocalStorage() {
    const items = [];
    document.querySelectorAll('#shoppingList span').forEach(span => {
        items.push(span.textContent); 
    });
    localStorage.setItem('myShoppingList', JSON.stringify(items));
}

function loadList() {
    const savedItems = localStorage.getItem('myShoppingList');
    if (savedItems) {
        const items = JSON.parse(savedItems);
        items.forEach(item => createListItem(item));
    }
}


// LISTA COMPRAS EN PAGINA PRINCIPAL
document.addEventListener('DOMContentLoaded', () => {
    loadList();
});

function loadList() {
    const list = document.getElementById('shoppingList');
    if (!list) return; 

    const savedItems = localStorage.getItem('myShoppingList');
    if (savedItems) {
        const items = JSON.parse(savedItems);
        list.innerHTML = ''; 
        items.forEach(item => createListItem(item));
    }
}

function createListItem(text) {
    const list = document.getElementById('shoppingList');
    if (!list) return;

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    
    
    btnEliminar.addEventListener('click', function() {
        li.remove(); 
        saveToLocalStorage(); 
    });

    li.appendChild(span);
    li.appendChild(btnEliminar);
    list.appendChild(li);
}

function saveToLocalStorage() {
    const items = [];
    document.querySelectorAll('#shoppingList span').forEach(span => {
        items.push(span.textContent); 
    });
    localStorage.setItem('myShoppingList', JSON.stringify(items));
}




//NO BORRAR---para que cargue siempre mi storage
window.onload = cargarDeStorage;
