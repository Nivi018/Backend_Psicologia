const User = require('../models/user');


module.exports ={
    
    async getAll (req,res, next){
        try{
        const data =await User.getAll();
        console.log(`Usuarios: ${data}`);
        return res.status(201).json(data);
        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            })
        }
    },

    async register(req, res, next){

        try{
           const user = req.body;
           const data = await User.Create(user);
           
           return res.status(201).json({
            success: true,
            message: 'Usuario creado con exito',
            data: data.id
           })

        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al crear el usuario',
                error: error
            })
        }

    },
    
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Verificar si el usuario existe en la base de datos
            const user = await User.getByEmail(email);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            // Verificar si la contraseña es correcta
            const isPasswordValid = User.comparePassword(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Contraseña incorrecta'
                });
            }

            // Si el usuario y la contraseña son válidos, enviar una respuesta exitosa
            return res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                user: {
                    id: user.id,
                    email: user.email
                    // Otros datos del usuario que quieras enviar al frontend
                }
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                success: false,
                message: 'Error al iniciar sesión',
                error: error.message
            });
        }
    }
}
