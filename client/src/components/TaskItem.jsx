import React, { useState } from 'react';

const TaskItem = ({ task, onStatusChange, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!task) return null;

  return (
    <div className={`task-item ${task.status}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <button 
          onClick={() => setShowConfirm(true)}
          className="btn-delete"
        >
          Delete
        </button>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}
      
      <div className="task-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={`badge badge-${task.status === 'in_progress' ? 'progress' : task.status}`}>
            {task.status.replace('_', ' ')}
          </span>
          <select 
            value={task.status} 
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            style={{ padding: '2px 5px', borderRadius: '4px', width: 'auto' }}
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {task.dueDate && (
          <span style={{ color: 'var(--text-muted)' }}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {showConfirm && (
        <div className="confirm-overlay">
          <p style={{ fontWeight: '700', marginBottom: '1rem' }}>Delete this task?</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => { onDelete(task.id); setShowConfirm(false); }}
              className="btn-delete"
            >
              Confirm
            </button>
            <button 
              onClick={() => setShowConfirm(false)}
              className="btn-primary"
              style={{ width: 'auto', background: '#cbd5e1', color: '#1e293b' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
