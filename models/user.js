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
            edad,   
            carrera,
            semestre,
            email,
            password,
            rol
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING no_control`;

    return db.oneOrNone(sql, [
        user.no_control,
        user.nombre,
        user.apellido,
        user.edad,
        user.carrera,
        user.semestre,
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