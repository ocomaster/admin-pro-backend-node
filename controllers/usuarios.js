//Importar el modelo
const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) =>{
//res.status(400).json({

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    }); 
}

const crearUsuario = async (req, res = response) =>{
    //res.status(400).json({
     const {email, password, nombre} = req.body;

    


    //Validacion correo duplicado

    try {
        const existeEmail = await Usuario.findOne({email});
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra registrado'
            });
        }

       const usuario = new Usuario(req.body);
        
       //Encriptar contraseña antes de guardar
       const salt = bcrypt.genSaltSync();
       usuario.password = bcrypt.hashSync(password, salt);


        //Guardar Usuario
       await usuario.save();

       //GENERAR EL TOKEN   JWT
       const token = await generarJWT(usuario.id)



        res.json({
            ok: true,
            usuario,
            token
        }); 
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado... revisar logs'
        });
            
    }

}

const actualizarUsuario = async (req, res = response) =>{
    //TODO: Validar token y comprobar si es el usuario correcto
    //Captura de id
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese id'
            });
        }
         //Ya tenemos la instancia del usuario, pasaremos con las actualizaciones  
          const { password, google, email, ...campos} = req.body;

          if (usuarioDB.email !== email) {
        
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    mgs: 'Ya existe usuario con ese email'
                });
            }
          }
         //delete campos.password; //Se eliminan campos que al momento no se quieren actualizar
        campos.email = email;
         const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});



        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
        
    }
}
const borrarUsuario = async(req, res = response) =>{

    const uid = req.params.id;

    try {
         const usuarioDb = await Usuario.findById(uid);

         if (!usuarioDb) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe usuario con este id'
            });
            
         }
        
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado al eliminar usuario'
        })
    }    
}



module.exports ={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}