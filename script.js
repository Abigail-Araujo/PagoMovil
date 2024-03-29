//esta es la funcion de la hora
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var d = today.getDate();
    var mo = today.getMonth() + 1;
    var y = today.getFullYear();
    var ampm = h >= 12 ? 'p.m.' : 'a.m.';
    h = h % 12;
    h = h ? h : 12;
    m = checkTime(m);

    // Actualiza todos los elementos con la clase 'hora'
    var horas = document.getElementsByClassName('hora');
    for (var i = 0; i < horas.length; i++) {
        horas[i].textContent = h + ":" + m + " " + ampm;
    }

    // Actualiza todos los elementos con la clase 'fecha'
    var fechas = document.getElementsByClassName('fecha');
    for (var i = 0; i < fechas.length; i++) {
        fechas[i].textContent = d + "/" + mo + "/" + y;
    }

    // Vuelve a ejecutar la función cada 500 milisegundos
    setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}


document.addEventListener('DOMContentLoaded', function() {
    startTime();
});
  //esta es la funcion generica, oculta una pantalla y muestra la siguente
function openApp() {
    document.getElementById('fondotlf').style.display = 'none';
    document.getElementById('appContent').style.display = 'block';
}

//funcion de volver
function closeP1(){
    document.getElementById('appContent').style.display='none';
    document.getElementById('fondotlf').style.display = 'block';
}

function openSms(){
    document.getElementById('fondotlf').style.display='none';
    document.getElementById('pantallaSMS').style.display ='block';
}

function closeSMS1(){
    document.getElementById('pantallaSMS').style.display ='none';
    document.getElementById('fondotlf').style.display='block';

}


// esta de aca oculta la pantalla inicial de la app y muestra la del registro
function iniciarSesion(){
    document.getElementById('appContent').style.display = 'none';
    document.getElementById('loginContent').style.display = 'block';
}

//esta es la funcion de volver de la pantalla  de login
function closeP2(){
    document.getElementById('loginContent').style.display='none';
    document.getElementById('appContent').style.display = 'block';

}



 //aqui pasa el pago por sms
 function enviarMensaje() {
    // Obtiene el mensaje del input y el contenedor de los mensajes
    const mensajeInput = document.getElementById("mensaje");
    const mensajesEl = document.querySelector(".mensajes");

    const mensaje = mensajeInput.value; // Obtiene el mensaje del input

    if (!mensaje) {
        return;
    }

    // Crear un nuevo elemento para el mensaje enviado
    const mensajeEnviandoEl = document.createElement("div");
    mensajeEnviandoEl.classList.add("mensaje", "enviado");
    mensajeEnviandoEl.textContent = mensaje;

    // Agregar el mensaje enviado al contenedor de mensajes
    mensajesEl.appendChild(mensajeEnviandoEl);

    // Verifica si el mensaje comienza con la palabra "Pagar"
    if (mensaje.startsWith("Pagar ")) {
        // Extrae el código del banco, el número de celular y el monto del mensaje
        const partes = mensaje.split(' ');
        const codigoBanco = partes[1];
        const numeroCelular = partes[2];
        const monto = partes[3];

        // Verifica que el código del banco tenga exactamente 4 dígitos, que el número de celular solo contenga dígitos y que el monto sea un número válido
        if (codigoBanco.length === 4 && !isNaN(codigoBanco) && !isNaN(numeroCelular) && !isNaN(monto.replace(',', '.'))) {
            // Simular la recepción del mensaje de confirmación de pago
            setTimeout(() => {
                const mensajeRecibidoEl = document.createElement("div");
                mensajeRecibidoEl.classList.add("mensaje", "recibido");
                mensajeRecibidoEl.textContent = "Pago realizado exitosamente. Número de transacción: " + Math.floor(Math.random() * 1000000) + ". Código de banco: " + codigoBanco + ". Monto transferido: " + monto + ".";

                // Agregar el mensaje recibido al contenedor de mensajes
                mensajesEl.appendChild(mensajeRecibidoEl);

                verificarScroll();
            }, 1000);
        }
    }

    // Limpiar el input una vez enviado el mensaje
    mensajeInput.value = "";

    // Hace que la barra de mensajes suba automáticamente al enviar un nuevo mensaje
    mensajesEl.scrollTop = mensajesEl.scrollHeight;
}

//Ya la funcion esta lista, revisa si le falta algo a SMS


//esta es la funcion que valida el inicio de sesion
function validarCredenciales() {
    //las variables para entrar en el registro
    var nombreUsuario = "josue";
    var clave = "1512";

    var nombreUsuario2 = "abigail";
    var clave2 = "5678";

    var nombreUsuario3 = "Oriana"
    var clave3 = "0205"

    var nombreUsuario4 = "jefferson";
    var clave4 = "sacaron20";

    //con esto obtenemos lo que sea que el usuario coloque en el espacio del formulario en el html
    var usuario = document.getElementById('registerUsername').value;
    var contraseniaUsuario = document.getElementById('registerPassword').value;

    // y esta es la comparacion de las credenciales
    if(nombreUsuario == usuario && contraseniaUsuario == clave || nombreUsuario2 == usuario && contraseniaUsuario == clave2 || nombreUsuario3 == usuario && contraseniaUsuario == clave3 || nombreUsuario4 == usuario && contraseniaUsuario == clave4 ){
        document.getElementById('loginContent').style.display = 'none';
        document.getElementById('paginaPrincipal').style.display = 'block';
    }
    else{
        alert('Clave o Usuario incorrecto')
    }
}

//esta es la funcion de volver despues de haberte registrado
function closeP3(){
    document.getElementById('paginaPrincipal').style.display='none';
    document.getElementById('loginContent').style.display = 'block';

}

//verificaciones

//aqui estan mis funciones locas
function verificarOperaciones(){

    const saldo = 1000;
    const saldoIngresado = parseFloat(document.getElementById('monto').value);
    if(saldoIngresado > saldo){
        alert('El monto ingresado excede el limite de dinero que usted tiene en su cuenta');
    }

    document.getElementById("validacion").addEventListener("submit", function(event){
        var campos = ["telefono", "monto", "concepto", "numero-cedula"];
        var todoEsValido = true;

        campos.forEach(function(idCampo) {
          var campo = document.getElementById(idCampo);

          if(campo.value === "") {
            campo.style.border = "3px solid red";
            todoEsValido = false; // Si algún campo está vacío, marcamos todoEsValido como falso, asi evitamos enviar la vaina
          } else {
            campo.style.border = "2px solid rgb(255, 153, 102)";
          }
        });

        // Si todo es válido, mostramos el comprobante de pago.
        if (todoEsValido) {
            mostrarComprobante();
        }

        event.preventDefault(); // Evita que el formulario se envíe
    });
}


//aqui esta mi funcion mas loca JAJSJSJSJAJS

//esta es la variable
let num = 100000;
function mostrarComprobante(monto, concepto, numeroCedula) {
    num += 1;
    document.getElementById('paginaPrincipal').style.display='none';
    document.getElementById('pantallaComprobante').style.display = 'block';

    //aqui le estoy asignando los valores a mis variables
    var monto = document.getElementById('monto').value;
    var concepto = document.getElementById('concepto').value;
    var numeroCedula = document.getElementById('numero-cedula').value;

    // Inserta cada dato para mostrarlo
    //aqui muestro cada una de las variables
    document.getElementById('dineroP').innerText = monto + ",00 bs";
    document.getElementById('conceptoP').innerText = concepto;
    document.getElementById('numero-cedulaP').innerText = numeroCedula;
    document.getElementById('bancoP').innerText = banco;
    document.getElementById('operacion').innerText = "000"+num;
}




