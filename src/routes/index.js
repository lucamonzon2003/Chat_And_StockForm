const express = require('express');
const productosRouter = require('./productos');
const router = express.Router();

router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        health: 'Up',
        enviroment: process.env.ENVIROMENT || 'not found'
    })
});

router.use('/productos', productosRouter);


module.exports = router;