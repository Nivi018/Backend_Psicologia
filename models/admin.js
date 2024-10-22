const db = require ('../config/config')

const Admin= {};



// Obtener todos los admins
Admin.getAll = () => {
    const sql = `SELECT * FROM administradores`;
    return db.manyOrNone(sql);
}

///Crear un nuevo adminstrador 
Admin.Create = async (admin) => {
    const sql = `
INSERT INTO administradores (
    nombre,
    apellido,
    email,
    password
) 
VALUES ($1, $2, $3, $4) RETURNING id`;

    try {
        return await db.oneOrNone(sql, [
            admin.nombre,
            admin.apellido,
            admin.email,
            admin.password
        ]);
    } catch (error) {
        console.error(`Error al crear administrador: ${error.message}`);
        throw new Error('Error al crear administrador');
    }
}

// Obtener un adminstrador por email
Admin.getByEmail = (email) => {
    const sql = `SELECT * FROM administradores WHERE email = $1`;
    return db.oneOrNone(sql, [email]);
}

Admin.comparePassword = (inputPassword, storedPassword) => {
    return bcrypt.compareSync(inputPassword, storedPassword); 
}

module.exports = Admin;