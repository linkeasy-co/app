import React, { createContext, useContext, useState } from 'react';
import '../styles/SnackBar.scss';

// Criando o contexto
const SnackbarContext = createContext();

// Hook personalizado para usar o contexto do Snackbar
export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ message: '', severity: 'error', open: false });

  const showSnackbar = (message, severity = 'error', duration = 3000) => {
    setSnackbar({ message, severity, open: true });

    // Fechar automaticamente após a duração
    setTimeout(() => {
      setSnackbar({ message: '', severity: 'error', open: false });
    }, duration);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.open && (
        <div className={`snackbar ${snackbar.severity}`}>
          {snackbar.message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
