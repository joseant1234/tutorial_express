// al importa se pone como ruta ..models el cual buscar por defecto un archivo index.js
const Task = require('../models').Task;


// nodejs aun no soporta export de JS (solo hace de manera experimental), sino usa commonjs con la prop exports del objeto module
module.exports = {
  index: function(req,res){
    Task.findAll().then((tasks)=>{
      res.render('tasks/index',{tasks: req.user.tasks});
    });
  },
  show: function(req,res){
    // los wildcard de una ruta esta en req.params
    // se puede enviar en el include un hash con el nombre del modelo. Se coloca as, porque se puso como nombre a la relacion user
    // {
    //   model: User,
    //   as: 'user'
    // }
    Task.findById(req.params.id,{
      include: [
        'user', 'categories'
      ]
    }).then((task)=>{
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
      description: req.body.description,
      userId: req.user.id
    }).then(result => {
      res.json(result);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
  },
  update: function(req,res){
    let task = Task.findById(req.params.id).then(task=>{
      task.description = req.body.description;
      task.userId = req.user.id
      task.save().then(()=>{
        let categoryIds = req.body.categories.split(",")

        task.addCategories(categoryIds).then(()=>{
          res.redirect(`/tasks/${task.id}`);
        })
      })
    })
  },
  new:  function(req,res){
    res.render('tasks/new');
  }
};
