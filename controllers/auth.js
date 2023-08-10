const {response} = require('express')
const bcrypt  = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response)=>{

    const {email, password} = req.body;
    try {


        //Validar si el correo existe Verificar Email
        const usuarioDB = await Usuario.findOne({email})

        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'Usuario o contraseña incorrecto11'
            })
        }
        //Verificar contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                mgs: 'Usuario o contraseña incorrecta 22'
            });
        }
        //Se validó correctamente usuario y contraseña
        //GENERAR EL TOKEN   JWT
        const token = await generarJWT(usuarioDB.id)


        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el Administrador'
        })
    }

}

module.exports ={login} ;