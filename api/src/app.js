require('dotenv/config')

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const customerRouter = require('./routes/customer');
const courseRouter = require('./routes/course');
const categoryRouter = require('./routes/category');
const middlewares = require('./middlewares');
const authRouter = require('./routes/auth');
const minio = require('./minio');


const app = express();

// Adding Basic Middlewares
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(middlewares.allowCrossDomain);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/customer', customerRouter);
app.use('/course', courseRouter);
app.use('/category', categoryRouter);
app.use('/', authRouter);

minio.init;

module.exports = app;
