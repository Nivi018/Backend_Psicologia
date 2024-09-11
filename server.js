const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const logger = require('morgan');
const cors= require('cors');

/*rutas */
const users = require('./rutas/usersRoutes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors());
app.set('x-powered-by');

const port = 3000;


/*uso de metodo usersRoutes */
users(app);

/*Configuracion del servidor  */
server.listen(port, '0.0.0.0', function() {
    console.log('Aplicacion de NodeJS ' + port + '  Iniciada....')
});

//creando la primera ruta de prueba
app.get('/',(req, res)=>{
    res.send('Ruta raiz del backend');
})

/*Peticion TEST */
app.get('/test',(req, res)=>{
    res.send('Ruta TEST');
})

/*Manejo de errores */
app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
})

module.exports={
    app: app,
    server: server
}