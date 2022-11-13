const express = require('express');

const errorMiddleware = require('./middlewares/errorMiddleware.js');

const { Server: HttpServer } = require('http');
const { Server: IoServer } = require('socket.io');
const { nextTick } = require('process');

require ('dotenv').config();


const app = express();

const http = new HttpServer(app);
const io = new IoServer(http);

//app.use(express.static(__dirname + '/public'));

app.use(errorMiddleware);

app.set('view engine', 'ejs');

const listaProductos = [];
const listaMensajes = [];

//const fecha = new Date(Date.now);

app.get('/health', (_req, res, next) => {
    try {
        res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || 'undefined',
        health: 'Up!'
    })}
    catch(err){
        next(err)
    }
});

app.get('/', (_req, res, next) => {
    try {
        res.status(200).render('index', {
        productos: listaProductos,
        mensajes: listaMensajes
    })}
    catch(err){
        next(err)
    }
});



io.on('connection', (socket) => {
    console.info('Nuevo cliente conectado')
    socket.on('NEW_MESSAGE_CLI', message => {
        message.fyh = new Date().toLocaleString();
        listaMensajes.push(message);
        io.sockets.emit('NEW_MESSAGE_SERVER', message);
    });

    socket.on('NEW_PRODUCT_CLI', producto => {
        listaProductos.push(producto);
        console.log(producto);
        io.sockets.emit('NEW_PRODUCT_SERVER', producto);
    });
});

module.exports = http;