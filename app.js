const express = require('express');
require("dotenv").config();

const indexRouter = require('./src/routes/index');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(errorMiddleware);
app.use(indexRouter);

app.set('view engine', 'ejs');

module.exports = app;