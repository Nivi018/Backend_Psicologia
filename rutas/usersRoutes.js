const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');
const { verifyToken, authorizeAdmin } = require('../middlewares/authorization'); // Importar los middlewares de autenticación y autorización


    // Ruta para obtener todos los usuarios (solo para administradores)
    router.get('/getAll', authorizeAdmin, UsersController.getAll);

    // Ruta para registrar un nuevo usuario
    router.post('/create', UsersController.register);

    // Ruta para iniciar sesión
    router.post('/login', UsersController.login);

    // Nueva ruta para obtener los datos del usuario autenticado
    router.get('/getUserData', verifyToken, UsersController.getUserData);

    module.exports = router;