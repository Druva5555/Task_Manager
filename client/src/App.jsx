import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import api from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [metadata, setMetadata] = useState({ totalCount: 0, currentPage: 1, totalPages: 1 });

  const fetchTasks = async (page = 1) => {
    try {
      setLoading(true);
      const params = { page, limit: 10 };
      if (filter !== 'all') params.status = filter;
      
      const response = await api.get('/tasks', { params });
      
      if (response.data && response.data.data) {
        setTasks(response.data.data);
        setMetadata(response.data.metadata);
      } else {
        setTasks(response.data);
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(1);
  }, [filter]);

  const handleStatusChange = async (taskId, newStatus) => {
    const previousTasks = [...tasks];
    
    setTasks(prev => {
      if (filter !== 'all' && newStatus !== filter) {
         return prev.filter(task => task.id !== taskId);
      }
      return prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      );
    });

    try {
      await api.patch(`/tasks/${taskId}`, { status: newStatus });
    } catch (err) {
      setTasks(previousTasks);
      alert('Failed to update task status: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks(metadata.currentPage);
    } catch (err) {
      alert('Failed to delete task: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      
      <TaskForm onTaskCreated={() => fetchTasks(1)} />
      
      <div className="filter-section">
        <strong>Filter:</strong>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <TaskList 
        tasks={tasks} 
        loading={loading} 
        error={error} 
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {metadata.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          <button 
            disabled={metadata.currentPage === 1}
            onClick={() => fetchTasks(metadata.currentPage - 1)}
            className="btn-primary"
            style={{ width: 'auto' }}
          >
            Previous
          </button>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            Page {metadata.currentPage} of {metadata.totalPages}
          </span>
          <button 
            disabled={metadata.currentPage === metadata.totalPages}
            onClick={() => fetchTasks(metadata.currentPage + 1)}
            className="btn-primary"
            style={{ width: 'auto' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
