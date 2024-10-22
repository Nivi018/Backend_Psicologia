const AdminController = require('../controllers/adminController');
const {verifyToken, authorizeAdmin} = require = require('../middlewares/authorization')

module.exports =  (app) =>{
   // Ruta para obtener todos los usuarios (solo para administradores)
   app.get('/api/admin/getAllAdmin',  AdminController.getAllAdmin);

   // Ruta para registrar un nuevo usuario
   app.post('/api/admin/createAdmin', AdminController.registerAdmin);

   // Ruta para iniciar sesión
   app.post('/api/admin/loginAdmin', AdminController.loginAdmin);
};