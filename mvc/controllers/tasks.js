// al importa se pone como ruta ..models el cual buscar por defecto un archivo index.js
const Task = require('../models').Task;

// nodejs aun no soporta export de JS (solo hace de manera experimental), sino usa commonjs con la prop exports del objeto module
module.exports = {
  index: function(req,res){
    Task.findAll().then((tasks)=>{
      res.json(tasks);
    })
  },
  create: function(req,res){
    Task.create({
      description: req.body.description
    }).then(result => {
      res.json(result);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
  },
  new:  function(req,res){
    res.render('tasks/new');
  }
};
