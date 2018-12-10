import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
//usamos el intermediario http para usar express con socket.
import http from 'http';


export default class Server {

    public app : express.Application;
    public port : number;

    //Hacemos la variable para socket.io
    public io: socketIO.Server;
    private httpServer: http.Server;

    constructor(){

        this.app = express();
        this.port = SERVER_PORT;

        //Inicializamos io
        this.httpServer = new http.Server(this.app);
        //Configuramos io
        this.io = socketIO( this.httpServer );

        this.escucharSockets();

    }

    //Escuchamos sockets
    private escucharSockets(){

        console.log('Escuchando conexiones - sockets');

        //Escuchamos la conexion de un cliente
        this.io.on('connection', cliente =>{
            console.log("Cliente conectado");
        });

    }

    start(callback : Function){

        this.httpServer.listen(this.port, callback);

    }

}