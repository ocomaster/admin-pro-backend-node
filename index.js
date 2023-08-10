require('dotenv').config();

const express = require('express');
const cors = require('cors')

const {dbConnection} = require ('./database/config');
//Crear el servidor Express
const app = express();

app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();
// publicar variables de entorno.
//console.log(process.env);

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));




app.listen( process.env.PORT, () =>{
    console.log('Corriendo en el puerto '+ process.env.PORT );
});


