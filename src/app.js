const express = require('express');

const errorMiddleware = require('./middlewares/errorMiddlewar.js');

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

class Productos{
    constructor(){}

    getProducts(){
        return listaProductos
    }

    postProduct(producto){
        listaProductos.push(producto)
    }

}
const Productos1 = new Productos;

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
        productos: Productos1.getProducts()
    })}
    catch(err){
        next(err)
    }
});



io.on('connection', (socket) => {
    console.info('Nuevo cliente conectado')
    socket.on('NEW_MESSAGE_CLI', message => {
        io.emit('NEW_MESSAGE_SERVER', message)
    });

    socket.on('NEW_PRODUCT_CLI', producto => {
        Productos1.postProduct(producto);
        console.log(producto);
        io.sockets.emit('NEW_PRODUCT_SERVER', producto);
    });
});

module.exports = http;