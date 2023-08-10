/*
    Ruta: /api/usuarios
*/

const {Router} = require('express');
const {body} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')

const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios');
const { validarjwt } = require('../middlewares/validar-jwt');

const router = Router();

 router.get('/', validarjwt, getUsuarios  );
 router.post('/',
    [
        body('nombre', 'El campo nombre es obligatorio').notEmpty(),
        body('password', 'El password es obligatorio').notEmpty(),
        body('email','Debe ser un formato Email correcto').isEmail(),
        validarCampos,//Llamada del middleware validarCampos
    ],
    crearUsuario  );

    router.put('/:id',
    [
        validarjwt,
        body('nombre', 'El campo nombre es obligatorio').notEmpty(),
        body('email','El email es oblogatorio').isEmail(),
        body('role','El role es obliogatorio').notEmpty(),
        validarCampos
    ],
     actualizarUsuario);

     router.delete('/:id',
     validarjwt,
      borrarUsuario)


module.exports = router;