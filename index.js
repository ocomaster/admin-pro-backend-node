require('dotenv').config();

const express = require('express');
const cors = require('cors')

const {dbConnection} = require ('./database/config');
//Crear el servidor Express
const app = express();

app.use(cors());

//Base de datos
dbConnection();
// publicar variables de entorno.
//console.log(process.env);

app.get('/', (req, res) =>{

    res.status(400).json({
        ok: true,
        msg: 'Hola Mundo'
    }); 
} )

app.listen( process.env.PORT, () =>{
    console.log('Corriendo en el puerto '+ process.env.PORT );
});


