const promise = require('bluebird');

// Opciones de configuración para pg-promise
const options = {
    promiseLib: promise,
    query: (e) => {
        console.log('Consulta ejecutada:', e.query); // Agregar log de consultas ejecutadas
    }
};

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;

// Solución para el tipo de dato TIMESTAMP (1114) en PostgreSQL
types.setTypeParser(1114, function (stringValue) {
    return stringValue; // Evitar que se convierta en objeto Date
});

// Configuración de la conexión a la base de datos
const dataBaseConfig = {
    host: '127.0.0.1',
    port: 5432,
    database: 'Psicologia',
    user: 'ivan',
    password: '12345'
};

const db = pgp(dataBaseConfig);

module.exports = db;
