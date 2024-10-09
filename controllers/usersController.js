const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Clave secreta para firmar los tokens JWT (usa una variable de entorno en producción)
const secretKey =
  process.env.JWT_SECRET ||
  "hT7gHJfdfK83hL9hsTgFgk98JHjL7lgfsdKJfgh98Ddf7g3dFdfgdfgH";

module.exports = {
  // Obtener todos los usuarios
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();
      console.log(`Usuarios: ${data}`);
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Error al obtener usuarios: ${error.stack}`); // Registro detallado del error
      return res.status(500).json({
        success: false,
        message: "Error al obtener los usuarios",
      });
    }
  },

  // Registrar un nuevo usuario
  async register(req, res, next) {
    try {
      const user = req.body;

      // Validar datos de entrada
      if (!user.email || !user.password) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos requeridos: email y password",
        });
      }

      // Asignar rol por defecto 'user' si no se especifica
      user.role = user.role || "user";

      // Encriptar la contraseña antes de almacenarla
      user.password = await bcrypt.hash(user.password, 10);
      console.log("Contraseña encriptada:", user.password); // Log para verificar la encriptación

      // Crear el usuario en la base de datos
      const data = await User.Create(user);

      return res.status(201).json({
        success: true,
        message: "Usuario creado con éxito",
        data: data.id,
      });
    } catch (error) {
      console.error(`Error al crear usuario: ${error.stack}`); // Registro detallado del error
      return res.status(500).json({
        success: false,
        message: "Error al crear el usuario",
        error: error.message, // Incluir mensaje de error específico
      });
    }
  },

  // Iniciar sesión de un usuario
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log("Datos recibidos para login:", { email, password }); // Log de datos recibidos

      // Verificar si el usuario existe en la base de datos
      const user = await User.getByEmail(email);
      if (!user) {
        console.log("Usuario no encontrado");
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }
      console.log("Usuario encontrado:", user); // Log del usuario encontrado

      // Comparar contraseñas
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Contraseña ingresada:", `'${password}'`); // Usar comillas simples para asegurar que se imprima bien
      console.log("Hash almacenado:", `'${user.password}'`);
      console.log("Resultado de la comparación:", isPasswordValid);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Contraseña incorrecta",
        });
      }

      // Generar token JWT con los datos del usuario
      const token = jwt.sign(
        { id: user.no_control, email: user.email, role: user.role },
        secretKey, // Clave secreta para firmar el token
        { expiresIn: "1h" } // El token expira en 1 hora
      );

      // Si el inicio de sesión es exitoso, devolver el token
      return res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        token: token,
      });
    } catch (error) {
      console.error(`Error al iniciar sesión: ${error.stack}`); // Registro detallado del error
      return res.status(500).json({
        success: false,
        message: "Error al iniciar sesión",
        error: error.message, // Incluir mensaje de error específico
      });
    }
  },
};