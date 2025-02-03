const db = require('../config/config');

const Agenda = {};

// Obtener todos los eventos de la agenda
Agenda.getAll = () => {
    const sql = `SELECT * FROM agenda`;
    return db.manyOrNone(sql);
};

// Crear un nuevo evento en la agenda
Agenda.create = async (event) => {
    const sql = `
        INSERT INTO agenda (
            no_control_user,
            no_control_admin,
            title,
            session_number,
            start_time,
            end_time,
            estatus   
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING id`;

    return db.oneOrNone(sql, [
        event.no_control_user,
        event.no_control_admin,
        event.title,
        event.session_number,
        event.start_time,
        event.end_time,
        event.status

        
    ]);
};

// Obtener eventos de un usuario específico por no_control
Agenda.getByNoControl = (no_control) => {
    const sql = `SELECT * FROM agenda WHERE no_control_user = $1`;
    return db.manyOrNone(sql, [no_control]);
};

// Actualizar un evento de la agenda
Agenda.update = async (id, event) => {
    const sql = `
        UPDATE agenda
        SET
            title = $1,
            session_number = $2,
            start_time = $3,
            end_time = $4,
            estatus = $5
        WHERE id = $6 RETURNING *`;

    return db.oneOrNone(sql, [
        event.title,
        event.session_number,
        event.start_time,
        event.end_time,
        event.status,
        id  
    ]);
};

// Eliminar un evento de la agenda
Agenda.delete = async (id) => {
    const sql = `DELETE FROM agenda WHERE id = $1 RETURNING *`;
    return db.oneOrNone(sql, [id]);
};

module.exports = Agenda;
