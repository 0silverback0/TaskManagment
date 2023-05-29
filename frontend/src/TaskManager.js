import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import TaskDataService from './TaskDataService';

const getInitialTaskState = () => ({
  title: '',
  description: '',
  status: '',
  created_at: '',
  created_by: '',
  priority: '',
});

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState(getInitialTaskState());
  const [newTask, setNewTask] = useState(getInitialTaskState());

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    TaskDataService.getAllTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log('Error fetching task list:', error);
      });
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleAddTaskClick = () => {
    setShowAddForm(!showAddForm);
    setEditMode(false);
    setEditTask(getInitialTaskState());
    setNewTask(getInitialTaskState());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'created_at') {
      // Format the date value to "yyyy-MM-dd"
      const formattedDate = new Date(value).toLocaleDateString('en-CA');
      if (editMode) {
        setEditTask({ ...editTask, [name]: formattedDate });
      } else {
        setNewTask({ ...newTask, [name]: formattedDate });
      }
    } else {
      if (editMode) {
        setEditTask({ ...editTask, [name]: value });
      } else {
        setNewTask({ ...newTask, [name]: value });
      }
    }
  };  

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      TaskDataService.editTask(editTask.id, editTask)
        .then((response) => {
          console.log('Task updated successfully:', response.data);
          setEditMode(false);
          setEditTask(getInitialTaskState());
          fetchTasks();
        })
        .catch((error) => {
          console.log('Error updating task:', error);
        });
    } else {
      TaskDataService.addNewTask(newTask)
        .then((response) => {
          console.log('Task created successfully:', response.data);
          setNewTask(getInitialTaskState());
          setShowAddForm(false);
          fetchTasks();
        })
        .catch((error) => {
          console.log('Error creating task:', error);
        });
    }
  };

  const handleDeleteTask = (taskId) => {
    TaskDataService.deleteTask({ id: taskId })
      .then(() => {
        console.log('Task deleted successfully');
        fetchTasks();
      })
      .catch((error) => {
        console.log('Error deleting task:', error);
      });
  };

  const handleEditTask = (task) => {
    setEditMode(true);
    setShowAddForm(true);
    setEditTask({ ...task });
    setSelectedTask(task);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tasks
          </Typography>
          <Button color="inherit" onClick={handleAddTaskClick}>
            Add Task
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            disablePadding
            sx={{
              '&:hover': {
                backgroundColor: '#f5f5f5',
                cursor: 'pointer',
              },
            }}
            onClick={() => handleTaskClick(task)}
          >
            <ListItemText primary={task.title} secondary={task.description} />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </Button>
            <Button variant="outlined" color="primary" onClick={() => handleEditTask(task)}>
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
      {showAddForm && (
        <form onSubmit={handleAddTaskSubmit}>
          <TextField
            type="text"
            name="title"
            value={editMode ? editTask.title : newTask.title}
            onChange={handleInputChange}
            label="Task Title"
            fullWidth
            margin="normal"
          />
          <TextField
            type="text"
            name="description"
            value={editMode ? editTask.description : newTask.description}
            onChange={handleInputChange}
            label="Task Description"
            fullWidth
            margin="normal"
          />
          <TextField
            type="text"
            name="status"
            value={editMode ? editTask.status : newTask.status}
            onChange={handleInputChange}
            label="Task Status"
            fullWidth
            margin="normal"
          />
          <TextField
            type="date"
            name="created_at"
            value={editMode ? editTask.created_at : newTask.created_at}
            onChange={handleInputChange}
            label="Task Created_at"
            fullWidth
            margin="normal"
          />
          <TextField
            type="text"
            name="created_by"
            value={editMode ? editTask.created_by : newTask.created_by}
            onChange={handleInputChange}
            label="Task Created_by"
            fullWidth
            margin="normal"
          />
          <TextField
            type="text"
            name="priority"
            value={editMode ? editTask.priority : newTask.priority}
            onChange={handleInputChange}
            label="Task Priority"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </form>
      )}
      {selectedTask && (
        <div>
          <h2>Title: {selectedTask.title}</h2>
          <p>Desc: {selectedTask.description}</p>
          <p>Status: {selectedTask.status}</p>
          <p>Created At: {selectedTask.created_at}</p>
          <p>Created By: {selectedTask.created_by}</p>
          <p>Priority: {selectedTask.priority}</p>
        </div>
      )}
    </div>
  );
}

export default TaskManager;
