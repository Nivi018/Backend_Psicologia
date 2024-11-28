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
            no_control,
            title,
            session_number,
            start_time,
            end_time   
        ) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id`;

    return db.oneOrNone(sql, [
        event.no_control,
        event.title,
        event.session_number,
        event.start_time,
        event.end_time 
        
    ]);
};

// Obtener eventos de un usuario específico por no_control
Agenda.getByNoControl = (no_control) => {
    const sql = `SELECT * FROM agenda WHERE no_control = $1`;
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
            end_time = $4
        WHERE id = $5 RETURNING *`;

    return db.oneOrNone(sql, [
        event.title,
        event.session_number,
        event.start_time,
        event.end_time,
        id  
    ]);
};

// Eliminar un evento de la agenda
Agenda.delete = async (id) => {
    const sql = `DELETE FROM agenda WHERE id = $1 RETURNING *`;
    return db.oneOrNone(sql, [id]);
};

module.exports = Agenda;