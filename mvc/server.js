const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();

const tasks = require('./controllers/tasks');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','pug');

// conetarse una vez a la bd, es decir solo debe haber un objeto de la clase Sequelize
// sequelize usa el metodo import para traer modelo de otro archivo
// por la configuracion, en el archivo index.js de models se encargara de la conexion y manejo de los modelos definidos dentro de la carpeta models
// const sequelize = new Sequelize('proyecto-backend',nul,null,{
//   dialect: 'sqlite',
//   storage: './proyecto-backend'
// })
// funcion q reciba 2 argumentos y haga return de un modelo
// import esta q se usa en index.js de la carpeta models
// sequelize.import(funcion()..)

app.get('/tasks',tasks.home);

app.listen(3000,function(){
  console.log('RUN SERVER')
})
