const express = require('express');
const router = express.Router();
const expedienteController = require('../controllers/expedienteController');




// Definir las rutas
router.get('/getAllExpediente', expedienteController.getAllExpedientes); // http://localhost:3000/expediente/getAllExpediente
router.post('/crearExpediente', expedienteController.createExpediente); //http://localhost:3000/api/expediente/crearExpediente
// Ruta para obtener un expediente por número de control
router.get('/getExpediente/:no_control', expedienteController.getExpedienteByNoControl); // http://localhost:3000/api/expediente/getExpediente/:no_control

// Exportar el router
module.exports = (app) => {
    app.use('/api/expediente', router); 
    console.log("Rutas de expediente registradas");
};


