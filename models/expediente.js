const db = require('../config/config');

const Expediente = {};

// Obtener todos los expedientes
Expediente.getAll = () => {
    const sql = `SELECT * FROM expediente`;
    return db.manyOrNone(sql);
};

// Crear un nuevo expediente
Expediente.create = async (expediente) => {
    const sql = `
        INSERT INTO expediente (
            no_control,
            numero_sesiones,
            motivo_consulta,
            desencadenantes_motivo,
            plan_orientacion,
            seguimiento
        ) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING no_control`;

    return db.oneOrNone(sql, [
        expediente.no_control,
        expediente.numero_sesiones,
        expediente.motivo_consulta,
        expediente.desencadenantes_motivo,
        expediente.plan_orientacion,
        expediente.seguimiento
    ]);
};

/// Obtener la información del usuario y todos los expedientes por no_control
Expediente.getByNoControl = async (no_control) => {
    const sqlUsuario = `SELECT * FROM usuario WHERE no_control = $1`;  // Obtener datos del usuario
    const sqlExpediente = `SELECT * FROM expediente WHERE no_control = $1`;  // Obtener los expedientes

    try {
        // Obtener los datos del usuario
        const usuario = await db.oneOrNone(sqlUsuario, [no_control]);

        // Obtener los expedientes asociados al usuario
        const expedientes = await db.manyOrNone(sqlExpediente, [no_control]);

        // Si el usuario no se encuentra, se lanza un error
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Combinar los datos del usuario y los expedientes en un solo objeto
        return {
            usuario,
            expedientes
        };
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
};

// Obtener todos los expedientes de un usuario específico (opcional, si ya tienes getByNoControl)
Expediente.getByUserId = (no_control) => {
    const sql = `SELECT * FROM expediente WHERE no_control = $1`;
    return db.manyOrNone(sql, [no_control]);
};

// Actualizar un expediente existente
Expediente.update = async (id, expediente) => {
    const sql = `
        UPDATE expediente
        SET
            numero_sesiones = $1,
            motivo_consulta = $2,
            desencadenantes_motivo = $3,
            plan_orientacion = $4,
            seguimiento = $5
        WHERE id = $6 RETURNING *`;

    return db.oneOrNone(sql, [
        expediente.numero_sesiones,
        expediente.motivo_consulta,
        expediente.desencadenantes_motivo,
        expediente.plan_orientacion,
        expediente.seguimiento,
        id  
    ]);
};

// Eliminar un expediente
Expediente.delete = async (id) => {
    const sql = `DELETE FROM expediente WHERE id = $1 RETURNING *`;
    return db.oneOrNone(sql, [id]);
};

module.exports = Expediente;