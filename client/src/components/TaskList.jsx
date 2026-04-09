import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, loading, error, onStatusChange, onDelete }) => {
  if (loading) return <div className="loading-container">Loading tasks...</div>;
  if (error) return <div className="loading-container" style={{ color: 'var(--error)' }}>Error: {error}</div>;

  return (
    <div className="task-list">
      <h2 className="task-list-title">My Tasks</h2>
      {tasks.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No tasks found. Create one above!</p>
      ) : (
        tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
