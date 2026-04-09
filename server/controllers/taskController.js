const getAllTasks = (req, res) => {
  res.json({ message: 'Get all tasks' });
};

const getTaskById = (req, res) => {
  res.json({ message: `Get task with ID: ${req.params.id}` });
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
