
const saludoH1 = document.getElementById('saludo');
const botonNombre = document.getElementById('btnCambiarNombre');

function cargarNombre() {
    const nombreEnStorage = localStorage.getItem('nombreUsuario');
    
    if (nombreEnStorage) {
        saludoH1.textContent = `¡Hola, ${nombreEnStorage}!`;
    } else {
        saludoH1.textContent = "Hola, usuario";
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

//// fecha /// NO LOGRE PONER DIA ANTES DE LA FECHA (EJ: LUNES)

const fechaActual = new Date();

const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1; 
const anio = fechaActual.getFullYear(); 

const fechaFormateada = `${dia}/${mes}/${anio}`;

const fechafinal = document.getElementById('fecha-actual');

fechafinal.textContent = `Hoy es ${fechaFormateada}`;





//RECORDATORIOS

const palabra = document.getElementById('palabraMagica');

palabra.addEventListener('click', function() {

    let respuesta = alert ("Tenes que tomar la pastilla y No olvides comprar comida de perro");

    
})


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
    
    if (input.value.trim() === "") return alert("Tarea agregada");

    const nuevaTarea = {
        id: Date.now(),
        titulo: input.value,
        completada: false
    };

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
            <button onclick="bajaTarea(${tarea.id})">Eliminar</button>
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

const itemInput = document.getElementById('itemInput');
const listaCompras = document.getElementById('listaCompras');
let items = []; 

function agregarItem() {
    const item = itemInput.value.trim(); 
    if (item !== "") { 
        items.push(item);
        renderizarLista(); 
        itemInput.value = '';
        itemInput.focus(); 
    }
}

function eliminarItem(index) {
    items.splice(index, 1); 
    renderizarLista();
}

function renderizarLista() {
    listaCompras.innerHTML = ''; 
    items.forEach((item, index) => {
        const li = document.createElement('li'); 
        li.innerHTML = `
            <span>${item}</span>
            <button onclick="eliminarItem(${index})">Eliminar</button>
        `;
        listaCompras.appendChild(li); 
    });
}

//PARA AGREGAR EL PROD CON ENTER!!!!
itemInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarItem();
    }
});

renderizarLista();

/*

HASTA ACA ENTREGA N2

function saludoPrincipal(usuario, fecha, pendientes, evento, comprasArray) {
    let mensajeSaludo = ("Bienvenido " + usuario);


    mensajeSaludo += ("Hoy es ") + fecha.toLocaleDateString();


    mensajeSaludo += (" Hay " + pendientes) + " pendientes. ";


    if (evento) {
        mensajeSaludo += "Tenés un evento a la tarde ";
    } else {
        mensajeSaludo += "No tenés eventos importantes ";
    }

    }

    return mensajeSaludo;
}

//Llamo mi funcion principal:

const mensajeFinal = saludoPrincipal(
    nombreUsuario,
    fechaHoy,
    totalPendientesHoy,
    tieneEventoTarde,
    listaDeCompras
);


alert(mensajeFinal);


// estaria bueno ver como poner en el prompt opciones de fecha, si es trea, evento, pendiente o lista de compras. 

let agregar = prompt("queres agregar algo a tu agenda? Hacelo a continuacion...");





////////////Array eventoss este mes//////////////////////

//lista random de eventos:
const eventosDiciembre = [
    { descripcion: "Hilario entrega final", fecha: new Date(2025, 11, 5, 10, 0) },
    { descripcion: "Cumple Juana", fecha: new Date(2025, 11, 15, 19, 0) },
    { descripcion: "Reunion carpetas", fecha: new Date(2025, 10, 16, 9, 30) },
    { descripcion: "Navidad con la flia", fecha: new Date(2025, 11, 24, 9, 30) },
    { descripcion: "dermatologo", fecha: new Date(2025, 11, 20, 11, 0) },
    { descripcion: "viaje a Bs.As", fecha: new Date(2026, 11, 10, 12, 0) },
    { descripcion: "Año nuevooooooooo", fecha: new Date(2025, 11, 31, 9, 30) },
    { descripcion: "Dentista bel", fecha: new Date(2026, 9, 10, 12, 0) }
];

function Eventosdelmes(listaEventos) {
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const añoActual = hoy.getFullYear();

    console.log("Eventos para " + hoy.toLocaleString('es-AR', { month: 'long', year: 'numeric' }));
    let eventosEncontrados = 0;

listaEventos.forEach(evento => {
   let mesEvento = evento.fecha.getMonth();
  let añoEvento = evento.fecha.getFullYear();


if (mesEvento === mesActual && añoEvento === añoActual) {
const dia = evento.fecha.getDate();
   const hora = evento.fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
   */







//No borrar, para que cargue siempre mi storage
window.onload = cargarDeStorage;