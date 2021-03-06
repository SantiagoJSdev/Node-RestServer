const express = require('express');
var cors = require('cors');

const { dbConnection } = require('../database/config');


class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';


        //conectar a base de datos
        this.conectarDb();
        //middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    
    }

    async conectarDb(){

        await dbConnection();
    }

    middlewares(){
    //cors
        this.app.use( cors() );

    //parseo y lectura del body
        this.app.use( express.json() );

    //Directorio publico
        this.app.use( express.static('public') )
    }

    routes(){

        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('servidor corriendo en el puerto', + this.port)
        })
    }

}

module.exports = Server;