const db = require('../config/config');

const User = {};

// Obtener todos los usuarios
User.getAll = () => {
    const sql = `SELECT * FROM usuario`;
    return db.manyOrNone(sql);
}

// Crear un nuevo usuario
User.Create = async (user) => {
    const sql = `
        INSERT INTO usuario (
            no_control,
            nombre,
            apellido,
            sexo,
            edad,
            estado_civil,
            direccion,
            telefono,  
            ingenieria,
            modalidad,
            semestre,
            fecha_registro,
            email,
            password,
            rol
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING no_control`;

    return db.oneOrNone(sql, [
        user.no_control,
        user.nombre,
        user.apellido,
        user.sexo,
        user.edad,
        user.estado_civil,
        user.direccion,
        user.telefono,
        user.ingenieria,
        user.modalidad,
        user.semestre,
        user.fecha_registro,
        user.email,
        user.password,
        user.rol || 'usuario'  
    ]);
}

// Obtener un usuario por email
User.getByEmail = (email) => {
    const sql = `SELECT * FROM usuario WHERE email = $1`;
    return db.oneOrNone(sql, [email]);
}

User.comparePassword = (inputPassword, storedPassword) => {
    return inputPassword === storedPassword; 
}

module.exports = User;