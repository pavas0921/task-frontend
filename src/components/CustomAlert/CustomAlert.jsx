import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const CustomAlert = ({
    open,          // Controla si la alerta está visible
    onClose,       // Función para cerrar la alerta
    message,       // Mensaje a mostrar
    severity,      // Tipo de alerta (error, warning, info, success)
    autoHideDuration, // Duración antes de cerrar automáticamente (opcional)
    variant = 'standard', // Estilo de la alerta (opcional)
    action,        // Acción adicional (opcional)
    sx
}) =>{
    return (
        <Snackbar
          open={open}
          autoHideDuration={autoHideDuration}
          onClose={onClose}
        >
          <Alert
            onClose={onClose}
            severity={severity}
            variant={variant}
            action={action}
            sx={sx}
          >
            {message}
          </Alert>
        </Snackbar>
      );
}

export default CustomAlert;