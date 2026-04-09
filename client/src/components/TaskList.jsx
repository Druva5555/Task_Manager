import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import api from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await api.get('/tasks');
        // Our API returns an object { data: [...], metadata: {...} } or [...]
        setTasks(response.data.data !== undefined ? response.data.data : response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className="task-list">
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;
