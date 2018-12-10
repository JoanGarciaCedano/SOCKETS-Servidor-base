import { Socket } from "socket.io";

//Desconectar un cliente

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}