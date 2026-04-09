import React, { useState } from 'react';
import api from '../services/api';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/tasks', { title, description, status, dueDate });
      setTitle('');
      setDescription('');
      setStatus('todo');
      setDueDate('');
      setError(null);
      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-form">
      <h2 style={{ marginBottom: '1.5rem' }}>Create New Task</h2>
      {error && <p style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            placeholder="What needs to be done?"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Description (Optional)</label>
          <textarea 
            placeholder="Add some details..."
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date (Optional)</label>
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
            />
          </div>
        </div>
        <button 
          type="submit" 
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
