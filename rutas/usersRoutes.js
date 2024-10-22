const UsersController = require('../controllers/usersController');
const { verifyToken, authorizeAdmin } = require('../middlewares/authorization'); // Importar los middlewares de autenticación y autorización

module.exports = (app) => {
    // Ruta para obtener todos los usuarios (solo para administradores)
    app.get('/api/users/getAll',  UsersController.getAll);

    // Ruta para registrar un nuevo usuario
    app.post('/api/users/create', UsersController.register);

    // Ruta para iniciar sesión
    app.post('/api/users/login', UsersController.login);
}
