const Agenda = require('../models/agenda');
const agendaController = {};

// Obtener todos los eventos de la agenda
agendaController.getAllEvents = async (req, res) => {
    try {
        const events = await Agenda.getAll();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ message: 'Error al obtener eventos' });
    }
};

// Crear un nuevo evento en la agenda
agendaController.createEvent = async (req, res) => {
    try {
        const newEvent = await Agenda.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error al crear evento:', error);
        res.status(500).json({ message: 'Error al crear evento' });
    }
};

// Obtener eventos por no_control
agendaController.getEventsByNoControl = async (req, res) => {
    const noControl = req.params.no_control;
    try {
        const events = await Agenda.getByNoControl(noControl);
        if (events && events.length > 0) {
            res.status(200).json(events);
        } else {
            res.status(404).json({ message: 'No se encontraron eventos para el usuario' });
        }
    } catch (error) {
        console.error('Error al obtener eventos por no_control:', error);
        res.status(500).json({ message: 'Error al obtener eventos' });
    }
};

// Actualizar un evento en la agenda
agendaController.updateEvent = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedEvent = await Agenda.update(id, req.body);
        if (updatedEvent) {
            res.status(200).json(updatedEvent);
        } else {
            res.status(404).json({ message: 'No se encontró el evento' });
        }
    } catch (error) {
        console.error('Error al actualizar evento:', error);
        res.status(500).json({ message: 'Error al actualizar evento' });
    }
};

// Eliminar un evento de la agenda
agendaController.deleteEvent = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedEvent = await Agenda.delete(id);
        if (deletedEvent) {
            res.status(200).json({ message: 'Evento eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'No se encontró el evento' });
        }
    } catch (error) {
        console.error('Error al eliminar evento:', error);
        res.status(500).json({ message: 'Error al eliminar evento' });
    }
};

module.exports = agendaController;
