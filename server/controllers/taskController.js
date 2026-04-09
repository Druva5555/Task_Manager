const db = require('../config/db');

const getAllTasks = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tasks');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createTask = (req, res) => {
  res.status(201).json({ message: 'Create new task', data: req.body });
};

const updateTask = (req, res) => {
  res.json({ message: `Update task with ID: ${req.params.id}`, data: req.body });
};

const deleteTask = (req, res) => {
  res.json({ message: `Delete task with ID: ${req.params.id}` });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
