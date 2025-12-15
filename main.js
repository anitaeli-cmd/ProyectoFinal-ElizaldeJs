
const nombreUsuario = "David ";
const fechaHoy = new Date();
let totalPendientesHoy = 3;
let tieneEventoTarde = true;


function saludoprincipal(usuario, fecha, pendientes, evento, comprasArray) {
    let mensajeSaludo = ("Bienvenido "+usuario);

    const listaDeCompras = [
    "fruta",
    "verdura",
    "arroz",
    "leche",
    "birra",
    "pan",
    "cereales",
    "fideos",
    "manteca", 
    "harina",
    "azucar",
];
   
    mensajeSaludo += ("Hoy es ") + fecha.toLocaleDateString() ;

    mensajeSaludo += (" Tenés " + pendientes )+ " pendientes hoy. ";







