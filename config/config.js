const promise = require('bluebird');
const options ={
    promiseLib: promise,
    query: (e) ={

    }
}

const pgp = require('pg-promise')(options);
const types=  pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
    return stringValue;
});

/*Configuracion de la conexión con la base de datos */
const dataBaseConfing={
    'host': '127.0.0.1',
    'port': 5432,
    'database': 'Psicologia',
    'user':'ivan',
    'password': '12345'
}

const db = pgp(dataBaseConfing);

module.exports= db;