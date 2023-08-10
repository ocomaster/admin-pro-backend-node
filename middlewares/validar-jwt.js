const jwt =   require('jsonwebtoken');
const validarjwt = (req, res, next) =>{
    //Leer el token desde los headers request
    const token = req.header('x-token')
    //console.log(token)

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        console.log(uid);
        
    } catch (error) {
        return res.status(401).json({
           ok:false,
           msg: 'Token no válido' 
        });
    }



    next();
}

module.exports = {
    validarjwt
}