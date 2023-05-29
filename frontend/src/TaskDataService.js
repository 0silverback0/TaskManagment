import axios from 'axios';

const TaskDataService = {
  getAllTasks: () => {
    return axios.get('http://127.0.0.1:5000/tasks');
  },
  
  addNewTask: (task) => {
    return axios.post('http://127.0.0.1:5000/tasks', task);
  },

  deleteTask: (task) => {
    return axios.delete(`http://127.0.0.1:5000/task/${task.id}`)
  },

  editTask: (task_id, task) => {
    return axios.patch(`http://127.0.0.1:5000/task/${task_id}`, task)
  }
};
 
export default TaskDataService;

