const db = require('../config/config');


const User = {};

// Obtener todos los usuarios
User.getAll = () => {
    const sql = `SELECT * FROM usuario`;
    return db.manyOrNone(sql);
}

// Crear un nuevo usuario
const bcrypt = require('bcryptjs');

User.Create = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Encriptar la contraseña

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
        hashedPassword // Almacenar la contraseña encriptada
    ]);
}


// Obtener un usuario por email
User.getByEmail = (email) => {
    const sql = `SELECT * FROM usuario WHERE email = $1`;
    return db.oneOrNone(sql, [email]);
}

// Comparar la contraseña proporcionada con la almacenada (hasheada)
User.comparePassword = (inputPassword, storedPassword) => {
    // Utilizamos bcrypt para comparar la contraseña hasheada
    return bcrypt.compareSync(inputPassword, storedPassword);
}

module.exports = User;
