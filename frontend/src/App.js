import './App.css';
import TaskManager from './TaskManager';
import React, { useEffect, useState } from 'react';
import TaskDataService from './TaskDataService';


function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks and update state
    TaskDataService.getAllTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <TaskManager tasks={tasks}/>
    </div>
  );
}

export default App;
