const promise = require('bluebird');

// Opciones de configuración para pg-promise
const options = {
    promiseLib: promise,
    query: (e) => {
        console.log('Consulta ejecutada:', e.query); 
    }
};

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;


types.setTypeParser(1114, function (stringValue) {
    return stringValue;
});

// Configuración de la conexión a la base de datos
const dataBaseConfig = {
    host: 'aws-0-us-west-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.qzhfpoducmskqojyywth',  
    password: 'sFX4ZCL7W4luqQZp'
    
};

const db = pgp(dataBaseConfig);

module.exports = db;
