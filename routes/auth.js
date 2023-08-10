/*
  Path:  '/api/login'
*/

const {Router} = require('express');
const {login} = require('../controllers/auth');
const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

//se crea la instancia router
const router = Router();

router.post('/',
    [
        body ('email', 'El email es obligatorio').isEmail(),
        body ('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos

    ],
     login  
);



module.exports = router;