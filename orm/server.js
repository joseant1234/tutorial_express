const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const Sequelize = require('sequelize');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

/* recibe de 3 a 4 argumentos: nombre de la bd, nombre de usuario, contraseña, JSON de configuracion con opciones especificas parar la conexion */
// si el motor es sqlite se debe especificar la ruta en donde se va almacenar la bd
const sequelize = new Sequelize('proyecto-backend',null,null, {
	dialect: 'sqlite',
	storage: './proyecto-backend'
});


app.post("/pendientes",function(req,res){
	res.send('Insercion realizada');
});

app.listen(3000)
