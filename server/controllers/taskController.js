const db = require('../config/db');

const getAllTasks = async (req, res) => {
  try {
    const { status, page, limit } = req.query;

    let queryParams = [];
    let queryIndex = 1;
    let whereClause = '';

    if (status) {
      whereClause = `WHERE status = $${queryIndex}`;
      queryParams.push(status);
      queryIndex++;
    }

    const countQuery = `SELECT COUNT(*) FROM tasks ${whereClause}`;
    const countResult = await db.query(countQuery, queryParams);
    const totalCount = parseInt(countResult.rows[0].count, 10);

    const currentPage = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(limit, 10) || 10;
    const offset = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const dataQuery = `
      SELECT * FROM tasks 
      ${whereClause} 
      ORDER BY id ASC 
      LIMIT $${queryIndex} OFFSET $${queryIndex + 1}
    `;
    
    queryParams.push(itemsPerPage, offset);

    const { rows } = await db.query(dataQuery, queryParams);

    res.status(200).json({
      data: rows,
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
    const { rows } = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    const taskStatus = status || 'todo';
    
    const query = `
      INSERT INTO tasks (title, description, status, "dueDate")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [title, description, taskStatus, dueDate || null];
    
    const { rows } = await db.query(query, values);
    
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const fields = [];
    const values = [];
    let queryIndex = 1;

    if (title !== undefined) {
      fields.push(`title = $${queryIndex++}`);
      values.push(title);
    }
    if (description !== undefined) {
      fields.push(`description = $${queryIndex++}`);
      values.push(description);
    }
    if (status !== undefined) {
      fields.push(`status = $${queryIndex++}`);
      values.push(status);
    }
    if (dueDate !== undefined) {
      fields.push(`"dueDate" = $${queryIndex++}`);
      values.push(dueDate);
    }

    if (fields.length === 0) {
      const { rows } = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.status(200).json(rows[0]);
    }

    values.push(id);
    const query = `
      UPDATE tasks 
      SET ${fields.join(', ')} 
      WHERE id = $${queryIndex} 
      RETURNING *;
    `;

    const { rows } = await db.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { rows } = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *;', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
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
