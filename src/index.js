import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import App from './App';
import { ContextProvider } from './hooks/useStateContext';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography:{
        fontFamily: 'Akshar'
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </ContextProvider>

);
