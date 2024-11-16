const express = require('express');
const router = express.Router();
const expedienteController = require('../controllers/expedienteController');  // Asegúrate de que esta ruta sea correcta

// Definir las rutas
router.get('/getAllExpediente', expedienteController.getAllExpedientes); // Obtiene todos los expedientes
router.post('/expedientes', expedienteController.createExpediente); // Crea un nuevo expediente
router.get('/expedientes/:no_control', expedienteController.getExpedienteByNoControl);
router.put('/expedienteUpdate/:id', expedienteController.updateExpediente);
router.delete('/expedienteDelete/:id', expedienteController.deleteExpediente);

// Exportar el router
module.exports = router;