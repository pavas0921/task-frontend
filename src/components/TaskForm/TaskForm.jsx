import { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerTask, selectTaskState, clearState } from '../../features/tasks/taskSlice';
import { CustomAlert } from '../CustomAlert';

const TaskForm = () => {
    const [task, setTask] = useState({ title: '', description: '' });
    const [openAlert, setOpenAlert] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const taskRegisterResponse = useSelector(selectTaskState);
    const { loading, message, httpStatus, status, flag } = taskRegisterResponse;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description) {
      alert('Todos los campos son obligatorios');
      return;
    }else{
        task.userId = sessionStorage.getItem("userId")
        dispatch(registerTask(task))
    }
    
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    dispatch(clearState())
  }, []);



  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Crear Tarea
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Título"
            name="title"
            value={task.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="description"
            value={task.description}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Crear Tarea
          </Button>
        </form>
      </Box>
      <CustomAlert
          open={flag}
          onClose={handleCloseAlert}
          message={message}
          severity={status || ""}
          autoHideDuration={6000}
        />
    </Container>
  );
}

export default TaskForm