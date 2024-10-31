const Expediente = require('../models/expediente');
const expedienteModel = require('../models/expediente');
const User = require('../models/user');

const expedienteController = {};

// Obtener todos los expedientes
expedienteController.getAllExpedientes = async (req, res) => {
    try {
        const expedientes = await expedienteModel.getAll();
        res.status(200).json(expedientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener expedientes' });
    }
};

// Crear un nuevo expediente
expedienteController.createExpediente = async (req, res) => {
    try {
        const nuevoExpediente = await expedienteModel.create(req.body);
        res.status(201).json(nuevoExpediente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear expediente' });
    }
};

// Obtener un expediente y usuario por no_control
expedienteController.getExpedienteByNoControl = async (req, res) => {
    const noControl = req.params.no_control;
    try {
        const data = await Expediente.getByNoControl(noControl);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'No se encontró el expediente' });
        }
    } catch (error) {
        console.error('Error al obtener expediente por no_control:', error);
        res.status(500).json({ error: 'Error al obtener expediente' });
    }
};



module.exports = expedienteController;