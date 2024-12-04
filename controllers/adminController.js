const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Clave secreta para firmar los tokens JWT (usa una variable de entorno en producción)
const secretKey = process.env.JWT_SECRET || "hT7gHJfdfK83hL9hsTgFgk98JHjL7lgfsdKJfgh98Ddf7g3dFdfgdfgH";

module.exports = {
  // Obtener todos los administradores
  async getAllAdmin(req, res, next) {
    try {
      const data = await Admin.getAll();
      console.log(`Administradores: ${data}`);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Error al obtener administradores: ${error.stack}`);
      return res.status(500).json({
        success: false,
        message: "Error al obtener los administradores",
      });
    }
  },

  // Registrar un nuevo administrador
  async registerAdmin(req, res, next) {
    try {
        const admin = req.body;
        console.log("Datos del administrador recibidos:", admin);  // Para depurar

        // Validar datos de entrada
        if (!admin.email || !admin.password || !admin.nombre || !admin.apellido) {
            return res.status(400).json({
                success: false,
                message: "Faltan campos requeridos: nombre, apellido, email y password",
            });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        console.log("Contraseña encriptada:", hashedPassword);

        // Crear el administrador en la base de datos
        const data = await Admin.Create({ 
            ...admin, 
            password: hashedPassword 
        });

        return res.status(201).json({
            success: true,
            message: "Administrador creado con éxito",
            data: data.id, // Usamos el campo id devuelto por la base de datos
        });
    } catch (error) {
        console.error(`Error al crear administrador: ${error.stack}`);
        return res.status(500).json({
            success: false,
            message: "Error al crear el administrador",
            error: error.message,
        });
    }
},

  // Iniciar sesión de un administrador
  async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body;

      // Verificar si el administrador existe en la base de datos
      const admin = await Admin.getByEmail(email);
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Administrador no encontrado",
        });
      }

      // Comparar la contraseña ingresada con la almacenada (encriptada)
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Contraseña incorrecta",
        });
      }

      // Generar token JWT con los datos del administrador
      const token = jwt.sign(
        { id: admin.id, email: admin.email, rol: 'admin' },
        secretKey,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        token: token,
      });
    } catch (error) {
      console.error(`Error al iniciar sesión: ${error.stack}`);
      return res.status(500).json({
        success: false,
        message: "Error al iniciar sesión",
        error: error.message,
      });
    }
  },

// Obtener datos del administrador autenticado
async getAdminData  (req, res, next) {
  try {
      const { id, rol } = req.user;

      // Asegurarse de que sea un administrador
      if (rol !== 'admin') {
          return res.status(403).json({
              success: false,
              message: "No tiene permisos para acceder a esta información",
          });
      }

      // Obtener los detalles del administrador por id
      const admin = await Admin.getById(id);
      if (!admin) {
          return res.status(404).json({
              success: false,
              message: "Administrador no encontrado",
          });
      }

      return res.status(200).json({
          success: true,
          id: admin.id,
          no_control: admin.no_control,
          rol: 'admin',
          email: admin.email,
      });
  } catch (error) {
      console.error(`Error al obtener datos del administrador: ${error.stack}`);
      return res.status(500).json({
          success: false,
          message: "Error al obtener datos del administrador",
          error: error.message,
      });
  }
},
};