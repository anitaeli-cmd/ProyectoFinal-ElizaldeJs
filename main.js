

//constantes que por ser una aplicacion con usuario ya ingresado no cambian
//los variables son segun el dia

const nombreUsuario = "David! ";
const fechaHoy = new Date();
let totalPendientesHoy = 3;
let tieneEventoTarde = true;

//Array

const listaDeCompras = [
   "verdura",
   "cereales",
   "shampoo",
   "huevos",
   "birra",
   "jamon",
   "leche",
   "dulce de leche",
   "pan"
];

function saludoPrincipal (usuario, fecha, pendientes, evento, comprasArray) {
 let mensajeSaludo = ("Bienvenido "+usuario);


   mensajeSaludo += ("Hoy es ") + fecha.toLocaleDateString() ;


   mensajeSaludo += (" Hay " + pendientes )+ " pendientes. ";


   if (evento) {
       mensajeSaludo += "Tenés un evento a la tarde ";
   } else {
       mensajeSaludo += "No tenés eventos importantes ";
   }

   //array compras

   if (comprasArray.includes("verdura")) {
       mensajeSaludo += "y no te olvides de ir al super a comprar verdura";
   } else {
       mensajeSaludo += "y tus compras están al día";
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



// estaria bueno ver como poner opciones de fecha, si es trea, evento, pendiente o lista de compras. 

let agregar = prompt ("queres agregar algo a tu agenda? Hacelo a continuacion...");





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