const UsersController = require('../controllers/usersController');


module.exports = (app)=>{
    // Ruta para obtener todos los usuarios
    app.get('/api/users/getAll', UsersController.getAll);

    // Ruta para registrar un nuevo usuario
    app.post('/api/users/create', UsersController.register);

    // Ruta para iniciar sesión
    app.post('/api/users/login', UsersController.login);
}