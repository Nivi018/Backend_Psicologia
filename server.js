const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const logger = require('morgan');
const cors = require('cors');

// Importar las rutas
const users = require('./rutas/usersRoutes');
const admin = require('./rutas/aminRoutes');
const expediente = require('./rutas/expedienteRutas');

// Importar middlewares
const { verifyToken } = require('./middlewares/authorization');

// Middleware de logging y parsing
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Evitar que el encabezado X-Powered-By se muestre en las respuestas
app.set('x-powered-by', false);

const port = 3000;

// Registrar los routers con sus rutas base
app.use('/api/users', users);
app.use('/api/admin', admin);
app.use('/api/expediente', expediente);

// Ruta raíz de prueba
app.get('/', (req, res) => {
    res.send('Ruta raíz del backend');
});

// Ruta de prueba
app.get('/test', (req, res) => {
    res.send('Ruta TEST');
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({
        success: false,
        message: err.message || 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.stack : {},
    });
});

// Configuración del servidor
server.listen(port, '0.0.0.0', () => {
    console.log(`Aplicación de NodeJS iniciada en el puerto ${port}`);
});

module.exports = { app, server };