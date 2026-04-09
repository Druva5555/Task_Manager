const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateTask = require('../middlewares/validateTask');

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', validateTask, taskController.createTask);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
