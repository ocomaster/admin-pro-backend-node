const mongoose = require('mongoose');

// Funcion encargada en llamarla y que ejecute la conexion.
const dbConnection = async ()  =>{

    try {
        await mongoose.connect(process.env.DB_CNN,{
             useNewUrlParser: true,
             useUnifiedTopology: true
         });
         console.log('Conectado a base de datos');
        
    } catch (error) {
        throw new Error('Error al iniciar la BD  ver Logs');
    }
}
module.exports = {
    dbConnection
}

