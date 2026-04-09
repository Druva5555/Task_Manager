import React from 'react';

const TaskItem = ({ task }) => {
  if (!task) return null;

  return (
    <div className="task-item" style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{task.title}</h3>
      {task.description && <p style={{ margin: '0 0 10px 0' }}>{task.description}</p>}
      <p style={{ margin: 0 }}><strong>Status:</strong> {task.status}</p>
      {task.dueDate && <p style={{ margin: '5px 0 0 0' }}><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>}
    </div>
  );
};

export default TaskItem;
