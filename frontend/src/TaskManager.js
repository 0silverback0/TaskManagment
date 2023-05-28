import { Typography } from '@mui/material';

import { AppBar, Toolbar, Button } from '@mui/material';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { CheckBoxOutlineBlank, CheckBox, StarBorder, Star } from '@mui/icons-material';

function TaskManager({ tasks }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Bar
        </Typography>
        <Button color="inherit">Add Task</Button>
      </Toolbar>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} disablePadding>
            <ListItemIcon>
              {task.status === 'completed' ? <CheckBox /> : <CheckBoxOutlineBlank />}
            </ListItemIcon>
            <ListItemText primary={task.title} secondary={task.description} />
            <ListItemIcon>
              {task.priority === 'high' ? <Star /> : <StarBorder />}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </AppBar>
  );
}

export default TaskManager;