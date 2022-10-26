const express = require('express')

const router = express.Router()

let products = []

router.get('/', (_req, res, next) => {
    try{
        res.status(200).json(products)
    }catch(err){
        next(err)
    }
});

router.get('/:id', (req, res, next) => {
    try{
        const id = req.params.id
        const object = products.find(i => i.id == id)
        if(object == undefined){
            res.status(400).send("producto no encontrado")
        }else{
        res.status(200).json(object)
        }
    }catch(err){
        next(err)
    }
})

router.post('/', (req, res) => {
    try{
        const { body } = req;
        let idMax = 0
        if(products.length == 0){
            Object.assign(body, {
                id: 1
            })
        }else{
            products.forEach(i => {
                if(i.id > idMax){
                    idMax = i.id
                }
            })
            
        Object.assign(body, {
            id: idMax + 1
        })
    }
        products.push(body)
        res.status(200).json(body)
    }catch(err){
        next(err)
    }
});

router.put('/:id', (req, res) => {
    try{
        const id = req.params.id
        const object = products.find(i => i.id == id)
        const { title, price, thumbnail } = req.body
        object.title = req.body.title
        object.price = req.body.price
        object.thumbnail = req.body.thumbnail
        res.status(200).json(object)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', (req, res, next) => {
    try {
        const id = req.params.id
        const object = products.find(i => i.id == id)
        products = products.filter((i) => i /= object)
        res.status(200).send("eliminado con exito")
    }catch(err){
        next(err)
    }
})


module.exports = router;