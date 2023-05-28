import axios from 'axios';

const TaskDataService = {
  getAllTasks: () => {
    return axios.get('http://127.0.0.1:5000/tasks'); // Adjust the API endpoint as per your setup
  },
  // Add more methods for specific data operations, such as creating, updating, or deleting tasks
};

export default TaskDataService;
