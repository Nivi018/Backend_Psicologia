
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

// Obtener expedientes por número de control
expedienteController.getExpedienteByNoControl = async (req, res) => {
    const noControl = req.params.no_control;
    try {
        // Obtener los datos del usuario y los expedientes asociados al número de control
        const { usuario, expedientes } = await expedienteModel.getByNoControl(noControl);
        
        if (usuario) {
            res.status(200).json({
                usuario,
                expedientes
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener expedientes por no_control:', error);
        res.status(500).json({ error: 'Error al obtener expedientes' });
    }
};

// Actualizar un expediente
expedienteController.updateExpediente = async (req, res) => {
    const { id } = req.params; // Obtener el ID del expediente desde los parámetros
    const expedienteData = req.body; // Obtener los datos del expediente desde el cuerpo de la solicitud

    try {
        const expedienteActualizado = await expedienteModel.update(id, expedienteData);

        if (expedienteActualizado) {
            res.status(200).json(expedienteActualizado);
        } else {
            res.status(404).json({ message: 'Expediente no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el expediente:', error);
        res.status(500).json({ message: 'Error al actualizar el expediente' });
    }
};

// Eliminar un expediente
expedienteController.deleteExpediente = async (req, res) => {
    const { id } = req.params; 
    try {
        const expedienteEliminado = await expedienteModel.delete(id);

        if (expedienteEliminado) {
            res.status(200).json({
                message: 'Expediente eliminado correctamente',
                expedienteEliminado
            });
        } else {
            res.status(404).json({ message: 'Expediente no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el expediente:', error);
        res.status(500).json({ message: 'Error al eliminar el expediente' });
    }
};
module.exports = expedienteController;