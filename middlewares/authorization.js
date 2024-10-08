const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'No se proporcionó el token.'
        });
    }

    jwt.verify(token, 'hT7gHJfdfK83hL9hsTgFgk98JHjL7lgfsdKJfgh98Ddf7g3dFdfgdfgH', (err, decoded) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Fallo la autenticación del token.'
            });
        }

        // Guardar la información decodificada en req.user
        req.user = decoded;
        next();
    });
};

// Middleware para verificar si el usuario es administrador
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para realizar esta acción.'
        });
    }
    next();
};

module.exports = { verifyToken, authorizeAdmin };
