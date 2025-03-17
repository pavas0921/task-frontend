import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { CustomAlert } from "../CustomAlert";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Login, selectLoginState, clearState } from '../../features/login/loginSlice';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginResponse = useSelector(selectLoginState);
  const { loading, message, httpStatus, status, flag, userId } = loginResponse;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(clearState());
    const body = {
      username: username,
      password: password,
    };
    dispatch(Login(body));
  };

  useEffect(() => {
    if (flag) {
      setOpenAlert(true);
    }
  }, [flag]);

  useEffect(() => {
    if(userId){
      sessionStorage.setItem("userId", userId)
      navigate("/dashboard")
    }
  }, [userId]);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>

          {/* Botón de registro */}
          <Button
            fullWidth
            variant="outlined" // Estilo de botón secundario
            sx={{ mt: 1, mb: 2 }} // Margen superior e inferior
            onClick={() => navigate('/userRegister')}
          >
            Registrarse
          </Button>
        </Box>

        <CustomAlert
          open={flag}
          onClose={handleCloseAlert}
          message={message}
          severity={status || ""}
          autoHideDuration={6000}
        />
      </Box>
    </Container>
  );
};

export default LoginForm;