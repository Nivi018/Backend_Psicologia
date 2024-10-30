const db = require('../config/config');

const Expediente = {};

// Obtener todos los expedientes
Expediente.getAll = () => {
    const sql = `SELECT * FROM expediente`;
    return db.manyOrNone(sql);
}

// Crear un nuevo expediente
Expediente.create = async (expediente) => {
    const sql = `
        INSERT INTO expediente (
            no_control,
            numero_sesiones,
            Motivo_consulta,
            Desencadenantes_motivo,
            Plan_orientacion,
            Seguimiento
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
}

// Obtener un expediente por no_control
Expediente.getByNoControl = (no_control) => {
    const sql = `SELECT * FROM expediente WHERE no_control = $1`;
    return db.oneOrNone(sql, [no_control]);
}

// Obtener todos los expedientes de un usuario específico
Expediente.getByUserId = (no_control) => {
    const sql = `SELECT * FROM expediente WHERE no_control = $1`;
    return db.manyOrNone(sql, [no_control]);
}

// Actualizar un expediente existente
Expediente.update = async (id, expediente) => {
    const sql = `
        UPDATE expediente
        SET
            numero_sesiones = $1,
            Motivo_consulta = $2,
            Desencadenantes_motivo = $3,
            Plan_orientacion = $4,
            Seguimiento = $5
        WHERE id = $6 RETURNING *`;

    return db.oneOrNone(sql, [
        expediente.numero_sesiones,
        expediente.motivo_consulta,
        expediente.desencadenantes_motivo,
        expediente.plan_orientacion,
        expediente.seguimiento,
        id  
    ]);
}

// Eliminar un expediente
Expediente.delete = async (id) => {
    const sql = `DELETE FROM expediente WHERE id = $1 RETURNING *`;
    return db.oneOrNone(sql, [id]);
}

module.exports = Expediente;