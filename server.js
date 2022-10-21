const express = require('express')
const Contenedor = require('./index')
require('dotenv').config()
const contenedor = require('./index')


const app = express()
const PORT = process.env.PORT

app.listen(PORT , () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})
//server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (_req, res) => {
res.send({mensaje: 'hola mundo'})
})

app.get('/productos', (_req, res) => {
    try{
    const contenedor1 = new Contenedor('productos')
    res.send(contenedor1.getAll())
    }catch(err){
        res.send(err)
    }
})

app.get('/productoRandom', (_req, res) => {
    try{
    const contenedor1 = new Contenedor('productos')
    const parsedData = JSON.parse(contenedor1.getAll())
    res.send(getById(Math.random(parsedData.length) + 1))
    }catch(err){
        res.send(err)
    }
})