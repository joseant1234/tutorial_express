const express = require('express');
let TasksController = require('../controllers/tasks');

let router = express.Router();

router.route('/tasks').get(function(req,res){
  res.send('Hola desde una ruta de route');
}).post(TasksController.create);

router.get('/tasks/new', TasksController.new);

module.exports = router;