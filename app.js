import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import sequelize from './db/db.js'
import index from './routes/index'
import users from './routes/users'
import products from './routes/products'

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept')
    next();
});

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, *')
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200)
    } else {
        next();
    }
});

app.use('/', index);
app.use('/users', users);
app.use('/products', products)

sequelize
    .authenticate()
    .then(() => {
        app.listen(8080, () => {
            console.log("Successfully established the Connection and Listening on port: 8080")
        })
    })
    .catch(err => {
        console.error('Unable to connect to the database');
    });

module.exports = app;