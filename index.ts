import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';


const server = Server.instance;

//Configuramos el bodyParser para recibir datos
//parse application/x-www-form-urlencoded
server.app.use(bodyParser.urlencoded({extended : true}));
//parse application/json
server.app.use(bodyParser.json());

//CORS - configuración del CORS para el acceso desde diferentes hostings
server.app.use( cors({ origin: true, credentials: true}));

//Rutas de servicios
server.app.use('/', router);

server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port}`);
});