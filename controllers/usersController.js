const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Importar bcrypt para encriptar contraseñas

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
      console.error(`Error al obtener usuarios: ${error.stack}`);
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

      // Asignar rol por defecto 'usuario' si no se especifica
      user.rol = user.rol || "usuario";

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(user.password, 10);
      console.log("Contraseña encriptada:", hashedPassword);

      // Crear el usuario en la base de datos
      const data = await User.Create({ ...user, password: hashedPassword });

      return res.status(201).json({
        success: true,
        message: "Usuario creado con éxito",
        data: data.no_control, // Asegúrate de usar el campo correcto aquí
      });
    } catch (error) {
      console.error(`Error al crear usuario: ${error.stack}`);
      return res.status(500).json({
        success: false,
        message: "Error al crear el usuario",
        error: error.message,
      });
    }
  },

  // Iniciar sesión de un usuario
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log("Datos recibidos para login:", { email, password });

      // Verificar si el usuario existe en la base de datos
      const user = await User.getByEmail(email);
      if (!user) {
        console.log("Usuario no encontrado");
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }
      console.log("Usuario encontrado:", user);

      // Comparar la contraseña ingresada con la almacenada (encriptada)
      const isPasswordValid = await bcrypt.compare(password, user.password); // Comparar usando bcrypt
      console.log("Contraseña ingresada:", `'${password}'`);
      console.log("Contraseña almacenada:", `'${user.password}'`);
      console.log("Resultado de la comparación:", isPasswordValid);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Contraseña incorrecta",
        });
      }

      // Generar token JWT con los datos del usuario, incluyendo el rol
      const token = jwt.sign(
        { id: user.no_control, email: user.email, rol: user.rol },
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
};