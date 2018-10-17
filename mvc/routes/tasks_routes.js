const express = require('express');
let TasksController = require('../controllers/tasks');

let router = express.Router();

router.route('/tasks').get(TasksController.index).post(TasksController.create);

/* se pone /new arriba, pues sino se creería q es wildcard id */
router.get('/tasks/new', TasksController.new);

router.get('/tasks/:id/edit',TasksController.edit);

router.route('/tasks/:id')
    .get(TasksController.show)
    .put(TasksController.update)
    .delete(TasksController.destroy);


module.exports = router;