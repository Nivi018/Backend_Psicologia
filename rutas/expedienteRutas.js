const express = require('express');
const router = express.Router();
const expedienteController = require('../controllers/expedienteController');




// Definir las rutas
router.get('/getAllExpediente', expedienteController.getAllExpedientes); // http://localhost:3000/expediente/getAllExpediente
router.post('/crearExpediente', expedienteController.createExpediente); //http://localhost:3000/api/expediente/crearExpediente


// Exportar el router
module.exports = (app) => {
    app.use('/api/expediente', router); 
    console.log("Rutas de expediente registradas");
};


