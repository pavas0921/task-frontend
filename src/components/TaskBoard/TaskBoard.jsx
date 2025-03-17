import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Chip, IconButton, Box, Stack, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Switch } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearState, getTask, selectTaskState, updateTask} from '../../features/tasks/taskSlice';
import { AddButton } from "../AddButton";
import { CustomAlert } from "../CustomAlert";

const TaskBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskResponse = useSelector(selectTaskState);
  const { loading, content, flag, message, status } = taskResponse;
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: "", title: "", description: "", completed: false });

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      navigate("/");
    } else {
      dispatch(getTask(userId));
    }
  }, [dispatch, navigate]);

  const handleEdit = (task) => {
    setCurrentTask(task);
    setOpen(true);
    dispatch(clearState())
  };

  const handleDelete = (taskId) => {
    console.log("Eliminar tarea con id:", taskId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    dispatch(clearState());
    dispatch(updateTask(currentTask))
    handleClose();
  };

  return (
    <>
      <Grid container spacing={3} padding={3}>
        {loading ? (
          <Typography variant="h6">Cargando tareas...</Typography>
        ) : content.length === 0 ? (
          <Typography variant="h6">No se encontraron tareas para este usuario.</Typography>
        ) : (
          content.map((task, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.description}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                      <Chip
                        label={task.completed ? "Completada" : "Pendiente"}
                        color={task.completed ? "success" : "warning"}
                      />
                      <IconButton color="primary" onClick={() => handleEdit(task)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <AddButton />

      {/* Modal de Edición */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Tarea</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Título"
            name="title"
            value={currentTask.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Descripción"
            name="description"
            value={currentTask.description}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Switch checked={currentTask.completed} onChange={handleChange} name="completed" />}
            label="Completada"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
      <CustomAlert
          open={flag}
          onClose={handleCloseAlert}
          message={message}
          severity={status || ""}
          autoHideDuration={6000}
        />
    </>
  );
};

export default TaskBoard;
