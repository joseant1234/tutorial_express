// al importa se pone como ruta ..models el cual buscar por defecto un archivo index.js
const Task = require('../models').Task;

// nodejs aun no soporta export de JS (solo hace de manera experimental), sino usa commonjs con la prop exports del objeto module
module.exports = {
  home: function(req,res){
    Task.findAll().then(function(tasks){
      res.render('tasks/index',{tasks: tasks});
    });
  }
};
