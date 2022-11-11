const express = require('express');

// const errorMiddleware = require('./src/middlewares/errorMiddleware');
const routerPag = require('./views/route')

const { Server: HttpServer } = require('http');
const { Server: IoServer } = require('socket.io');

require ('dotenv').config();


const app = express();

const http = new HttpServer(app);
const io = new IoServer(http);

app.use(express.static(__dirname + '/public'));

// app.use(errorMiddleware);
app.use(routerPag);

app.set('view engine', 'ejs');

app.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        environment: process.env.ENVIRONMENT || 'undefined',
        health: 'Up!'
    })
});



io.on('connection', (socket) => {
    console.info('Nuevo cliente conectado')
});

module.exports = http;