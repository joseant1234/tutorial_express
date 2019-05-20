const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');

const app = express();

const taksRoutes = require('./routes/tasks_routes');
const registrationsRoutes = require('./routes/registrations_routes');
const sessionsRoutes = require('./routes/sessions_routes');
const categoriesRoutes = require('./routes/categories_routes');

const findUserMiddleware = require('./middlewares/find_user');
const authUser = require('./middlewares/auth_user');

app.use(bodyParser.urlencoded({extended: true}));
// estrategia: parametros query con _method, para metodos put, ...
// POST http://localhost:3000/tasks/2?_method=PUT
app.use(methodOverride('_method'));
app.set('view engine','pug');

// saveUninitialized indica q si se debe guardar una sesion sin valor al ser inicializada
// resave indica si se debe de guardar de manera constante, incluso si no ha siod modificada
app.use(session({
  secret: ['dasdasddsad123dasd','dasdasd132123'],
  saveUninitialized: false,
  resave: false
}));

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

app.use(findUserMiddleware);
app.use(authUser);

app.use(taksRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);
app.use(categoriesRoutes);


app.get('/', function(req, res){
  res.render('home',{ user: req.user});
})

app.listen(3000,function(){
  console.log('RUN SERVER')
})
