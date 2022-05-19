const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controller.sockets');

class Server{
    constructor(){                              //En el constructor van las propiedades
        this.app = express();                   //servir contenido estatico
        this.port = process.env.PORT;               

        this.server = require('http').createServer(this.app)
        this.io     = require('socket.io')(this.server)       //toda la información de los sockets conectados

        this.paths={}
        
        this.middlewares();   //Funciión que siempre va a ejecutarse cuando levantemos nuestro servidor
        this.routes();                
        this.sockets();       // Sockets     
    }

    middlewares(){      //(.use es la palabra para saber que es un middleware)
        this.app.use(cors());          //API solo ciertas páginas web pueden acceder a ellas, proteges tu servidor       
        this.app.use(express.static('public'))  //Directorio publico  (busca el index)
    }

    routes(){       //Defino las rutas de mi aplicación
        //this.app.use(this.paths.auth,require('../routes/auth')); 
        }

    sockets(){
        this.io.on('connection', socketController) //Configuarción socket
    }

    listen(){       
        this.server.listen(this.port, ()=>{       // Metodo express ... escuchar en el puerto
            console.log('servidor corriendo en port',this.port)
        });
    }
}
module.exports=Server


