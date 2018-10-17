// al importa se pone como ruta ..models el cual buscar por defecto un archivo index.js
const Task = require('../models').Task;

// nodejs aun no soporta export de JS (solo hace de manera experimental), sino usa commonjs con la prop exports del objeto module
module.exports = {
  index: function(req,res){
    Task.findAll().then((tasks)=>{
      res.render('tasks/index',{tasks: tasks});
    });
  },
  show: function(req,res){
    // los wildcard de una ruta esta en req.params
    Task.findById(req.params.id).then((task)=>{
      /*shorthand properties*/
      res.render('tasks/show',{task});
    });
  },
  edit: function(req,res){
    Task.findById(req.params.id).then((task)=>{
      res.render('tasks/edit',{task});
    });
  },
  destroy: function(req,res){
    Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(countDeletedElements){
      res.redirect('/tasks');
    });
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
  update: function(req,res){
    Task.update({description: req.body.description},{
      where: {
        id: req.params.id
      }
    }).then(function(response){
      res.redirect('/tasks/'+req.params.id);
    });
  },
  new:  function(req,res){
    res.render('tasks/new');
  }
};
