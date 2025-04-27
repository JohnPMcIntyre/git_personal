const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define the routes
router.get('/tasks', taskController.getTasks);  // Get all tasks
router.post('/tasks', taskController.createTask);  // Create a new task

module.exports = router;
