const db = require('../config/config');

const User = {};

// Obtener todos los usuarios
User.getAll = () => {
    const sql = `SELECT * FROM usuario`;
    return db.manyOrNone(sql);
}

// Crear un nuevo usuario
User.Create = async (user) => {
    /**el problema estaba en esta parte, tu error fue que incritabas 2 veces tu contraseña,
     *  ya que el la funcion register tambien se volvia a incriptar por esa razon no coincidian las contraseñas  */
    const sql = `
        INSERT INTO usuario (
            no_control,
            nombre,
            apellido,
            edad,
            carrera,
            semestre,
            email,
            password
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING no_control`;

    return db.oneOrNone(sql, [
        user.no_control,
        user.nombre,
        user.apellido,
        user.edad,
        user.carrera,
        user.semestre,
        user.email,
        user.password 
    ]);
}

// Obtener un usuario por email
User.getByEmail = (email) => {
    const sql = `SELECT * FROM usuario WHERE email = $1`;
    return db.oneOrNone(sql, [email]);
}


User.comparePassword = (inputPassword, storedPassword) => {
    return inputPassword === storedPassword; // Comparar directamente
}

module.exports = User;