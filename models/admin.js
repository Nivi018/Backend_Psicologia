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
    no_control,
    nombre,
    apellido,
    email,
    password
) 
VALUES ($1, $2, $3, $4, $5) RETURNING id`;

    try {
        return await db.oneOrNone(sql, [
            admin.no_control,
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

// Obtener un administrador por no_control
Admin.getById = (id) => {
    const sql = `SELECT * FROM administradores WHERE id = $1`;
    return db.oneOrNone(sql, [id]);
};

Admin.comparePassword = (inputPassword, storedPassword) => {
    return bcrypt.compareSync(inputPassword, storedPassword); 
}

module.exports = Admin;