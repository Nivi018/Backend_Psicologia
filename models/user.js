const db = require('../config/config');

const User = {};

User.getAll= ()=>{
    const sql = 
    `SELECT
     *
     FROM 
     usuario`;

     return db.manyOrNone(sql);
}

User.Create = (user)=>{
    const sql= `
    INSERT INTO usuario(
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

User.getByEmail = (email) => {
    const sql = `SELECT * FROM usuario WHERE email = $1`;
    return db.oneOrNone(sql, [email]);
}
User.comparePassword = (password, storedPassword) => {
    // Comparar la contraseña proporcionada con la contraseña almacenada en texto plano
    return password === storedPassword;
}

module.exports= User;