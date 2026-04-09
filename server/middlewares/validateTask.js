const validateTask = (req, res, next) => {
  const { title, status } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required and must be a valid, non-empty string.' });
  }

  const validStatuses = ['todo', 'in-progress', 'done'];
  
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ 
      message: `Invalid status: '${status}'. Allowed values are: ${validStatuses.join(', ')}.` 
    });
  }

  next();
};

module.exports = validateTask;
