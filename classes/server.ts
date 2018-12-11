import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
//usamos el intermediario http para usar express con socket.
import http from 'http';

import * as socket from '../sockets/socket';


export default class Server {
    //Singleton
    private static _instance: Server;

    public app : express.Application;
    public port : number;

    //Hacemos la variable para socket.io
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){

        this.app = express();
        this.port = SERVER_PORT;

        //Inicializamos io
        this.httpServer = new http.Server(this.app);
        //Configuramos io
        this.io = socketIO( this.httpServer );

        this.escucharSockets();

    }

    public static get instance(){
        
        return this._instance || (this._instance = new this());

    }

    //Escuchamos sockets
    private escucharSockets(){

        console.log('Escuchando conexiones - sockets');

        //Escuchamos la conexion de un cliente
        this.io.on('connection', cliente =>{
            console.log("Cliente conectado");

            //Mensajes
            socket.mensaje( cliente, this.io ); 

            //Desconectar
            socket.desconectar( cliente );
        });

    }

    start(callback : Function){

        this.httpServer.listen(this.port, callback);

    }

}