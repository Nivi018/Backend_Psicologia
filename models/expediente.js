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
            sexo,
            edad,
            estado_civil,
            direccion,
            telefono,
            ingenieria,
            modalidad,
            semestre,
            fecha_registro,
            numero_sesiones
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING id`;

    return db.oneOrNone(sql, [
        expediente.no_control,
        expediente.sexo,
        expediente.edad,
        expediente.estado_civil,
        expediente.direccion,
        expediente.telefono,
        expediente.ingenieria,
        expediente.modalidad,
        expediente.semestre,
        expediente.fecha_registro,
        expediente.numero_sesiones
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
            sexo = $1,
            edad = $2,
            estado_civil = $3,
            direccion = $4,
            telefono = $5,
            ingenieria = $6,
            modalidad = $7,
            semestre = $8,
            fecha_registro = $9,
            numero_sesiones = $10
        WHERE id = $11 RETURNING *`;

    return db.oneOrNone(sql, [
        expediente.sexo,
        expediente.edad,
        expediente.estado_civil,
        expediente.direccion,
        expediente.telefono,
        expediente.ingenieria,
        expediente.modalidad,
        expediente.semestre,
        expediente.fecha_registro,
        expediente.numero_sesiones,
        id
    ]);
}

// Eliminar un expediente
Expediente.delete = async (id) => {
    const sql = `DELETE FROM expediente WHERE id = $1 RETURNING *`;
    return db.oneOrNone(sql, [id]);
}

module.exports = Expediente;