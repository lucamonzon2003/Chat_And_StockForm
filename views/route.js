const express = require('express');
const router = express.Router();

const listaProductos = [];

class Productos{
    constructor(){}

    getProducts(){
        return listaProductos
    }

    postProducts(producto){
        listaProductos.push(producto)
    }

}

const Productos1 = new Productos;

router.get('/', (_req, res) => {
    res.status(200).render('index', {
        productos: Productos1.getProducts()
    })
});

router.post('/', (req, res) => {
    const { body } = req
    Productos1.postProducts(body)
    res.status(200)
    
 });

module.exports = router;