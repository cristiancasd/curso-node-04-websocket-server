
//on  : escuchar un evento
//emit: emitir un evento


// Que hace el backend al escuchar un evento proveniente del cliente
const socketController = (socket)=>{
    console.log('cliente conectado',socket.id);  

    socket.on('disconnect', ()=>{
        console.log('Cliente desconectado',socket.id)
    });

    socket.on('enviar-mensaje',(payload, callback)=>{
        const id = 1234;
        callback(id); //Enviar al cliente un dato con socket
        
        //Desde el backend Broadcast permite enviar mensaje a todos menos al cliente que lo envío
        socket.broadcast.emit('enviar-mensaje',payload)

    })
} 

module.exports={
    socketController
}