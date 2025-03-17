import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { CustomAlert } from "../CustomAlert";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Register, selectRegisterState, clearState } from '../../features/register/registerSlice';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    username: false,
    password: false,
  });

  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerResponse = useSelector(selectRegisterState);
  const { loading, message, httpStatus, status, flag } = registerResponse;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Resetear el error cuando el usuario empieza a escribir
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que todos los campos estén llenos
    const newErrors = {
        firstname: !formData.firstname,
        lastname: !formData.lastname,
        username: !formData.username,
        password: !formData.password,
    };

    setErrors(newErrors);

    // Si no hay errores, proceder con el registro
    if (!Object.values(newErrors).some((error) => error)) {
      dispatch(clearState());
      dispatch(Register(formData));
    }
  };

  useEffect(() => {
    if (flag) {
      setOpenAlert(true);
    }
  }, [flag]);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registro
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombres"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            error={errors.firstname}
            helperText={errors.firstname ? 'Este campo es obligatorio' : ''}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Apellidos"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            error={errors.lastname}
            helperText={errors.lastname ? 'Este campo es obligatorio' : ''}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Nombre de usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            helperText={errors.username ? 'Este campo es obligatorio' : ''}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password ? 'Este campo es obligatorio' : ''}
            margin="normal"
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrarse
            </Button>
          </Box>
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

export default RegisterForm;