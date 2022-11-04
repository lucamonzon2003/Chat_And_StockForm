const express = require('express');

const router = express.Router();

const productosA = [];

class Productos{
    constructor(){}

    getProducts(){
        return productosA
    }

    postProducts(pr){
        productosA.push(pr)
    }

}

const Productos1 = new Productos

router.get('/', (_req, res, next) => {
    try{
        res.status(200).render('main.ejs')
    }catch(err){
        next(err)
    }
});

router.post('/', (req, res, next) => {
   try{
   const { body } = req
   Productos1.postProducts(body)
   res.status(200).render('main.ejs')
   }catch(err){
        next(err)
    }
   
});

router.get('/productos', (_req, res, next) => {
    try{

        res.status(200).render('data.ejs', {
            productos: Productos1.getProducts()
        })
    }catch(err){
        next(err)
    }
});

module.exports = router;