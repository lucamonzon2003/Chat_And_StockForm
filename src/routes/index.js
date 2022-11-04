const express = require('express');
const productosRouter = require('./productos');
const router = express.Router();

router.get('/health', (_req, res) => {
    res.status(200).json({
        succes: true,
        enviroment: process.env.enviroment || 'undefined',
        health: 'up'
    })
});

router.use(productosRouter);

module.exports = router;