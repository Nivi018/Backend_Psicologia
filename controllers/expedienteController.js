const expedienteModel = require('../models/expediente');

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



module.exports = expedienteController;