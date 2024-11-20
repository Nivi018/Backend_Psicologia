const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const { verifyToken, authorizeAdmin } = require('../middlewares/authorization');

// Ruta para obtener todos los usuarios (solo para administradores)
router.get('/getAllAdmin', AdminController.getAllAdmin);

// Ruta para registrar un nuevo usuario
router.post('/createAdmin', AdminController.registerAdmin);

// Ruta para iniciar sesión
router.post('/loginAdmin', AdminController.loginAdmin);

module.exports = router;