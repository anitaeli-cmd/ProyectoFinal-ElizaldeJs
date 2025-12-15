

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




