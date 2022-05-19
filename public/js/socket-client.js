
const lblOnline=document.querySelector('#lblOnline');
const lblOffline=document.querySelector('#lblOffline');
const txtMensaje=document.querySelector('#txtMensaje');
const btnEnviar=document.querySelector('#btnEnviar');

//Es el socket del cliente 
//(aquí va el comportamiento de todos los clientes conectados al servidor)
const socket = io();

//on  : escuchar un evento
//emit: emitir un evento

socket.on('connect', ()=>{      //Saber cuando me conecto al servidor
    console.log('Conectado');
    lblOffline.style.display='none';
    lblOnline.style.display=''     //mensaje en el front
})

socket.on('disconnect',()=>{
    console.log('Desconectado del servidor')
    lblOffline.style.display=''; //Cuando paro el servidor aparece este mensaje en el front
    lblOnline.style.display='none'
})

btnEnviar.addEventListener('click',()=>{  //boton enviar en el html
    const mensaje = txtMensaje.value;
    const payload = {                           // creo un payload
        mensaje,
        id:'12dsds',
        fecha: new Date().getTime()
    }

    //socket.emit('enviar-mensaje',payload);
    socket.emit('enviar-mensaje',payload,(id)=>{ //emito al backend 'enviar-mensaje' (controller.sockets)
        console.log('Desde el server',id);       //Enviar al cliente un dato con soccets
    })
})

socket.on('enviar-mensaje',(payload)=>{                  // recibir mensaje desde backend 
    console.log("estoy en socket -client", payload)      // se muestra mensaje recibido
})

