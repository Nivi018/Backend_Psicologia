const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

// Definir las rutas de la agenda
router.get('/getAllEvents', agendaController.getAllEvents); // http://localhost:3000/api/agenda/getAllEvents
router.post('/createEvent', agendaController.createEvent); // http://localhost:3000/api/agenda/createEvent
router.get('/getEvents/:no_control', agendaController.getEventsByNoControl); // http://localhost:3000/api/agenda/getEvents/:no_control
router.put('/updateEvent/:id', agendaController.updateEvent); // http://localhost:3000/api/agenda/updateEvent/:id
router.delete('/deleteEvent/:id', agendaController.deleteEvent); // http://localhost:3000/api/agenda/deleteEvent/:id

// Exportar el router
module.exports = router;
