const prisma = require('../prisma');

const getAllTasks = async (req, res) => {
  try {
    const { status, page, limit } = req.query;

    const where = {};
    if (status) {
      where.status = status;
    }

    const currentPage = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(limit, 10) || 10;
    const offset = (currentPage - 1) * itemsPerPage;

    const totalCount = await prisma.task.count({ where });
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const tasks = await prisma.task.findMany({
      where,
      skip: offset,
      take: itemsPerPage,
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      data: tasks,
      metadata: {
        totalCount,
        currentPage,
        totalPages
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id, 10) }
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const taskStatus = status || 'todo';
    
    const defaultUser = await prisma.user.findFirst();

    if (!defaultUser) {
        return res.status(500).json({ message: 'No default user found' });
    }
    
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: taskStatus,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: defaultUser.id
      }
    });
    
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const existingTask = await prisma.task.findUnique({
      where: { id: parseInt(id, 10) }
    });

    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const data = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (status !== undefined) data.status = status;
    if (dueDate !== undefined) data.dueDate = dueDate ? new Date(dueDate) : null;

    const task = await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data
    });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingTask = await prisma.task.findUnique({
      where: { id: parseInt(id, 10) }
    });

    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await prisma.task.delete({
      where: { id: parseInt(id, 10) }
    });
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
