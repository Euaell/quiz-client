import {AppBar, Avatar, Button, IconButton, Toolbar, Typography} from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router';
import {Link, useNavigate} from "react-router-dom";
import useStateContext from '../hooks/useStateContext';

export default function Layout() {
    const {context, resetContext} = useStateContext();
    const navigate = useNavigate();

    function goLogin() {
        navigate('/login');
    }

    function goSignUp() {
        navigate('/signup');
    }
    
    const logout = () => {
        resetContext();
        navigate("/");
    }
    
    return (
      <>
          <AppBar position="static">
              <Toolbar>
                  <IconButton
                      onClick={() => navigate("/")}
                      sx={{ p: 0 }}>
                      <Avatar alt="Logo" src="/image/owl.png" />
                  </IconButton>
                  <Typography variant="h3" 
                              component="div" 
                              color="inherit" 
                              sx={{flexGrow: 1}}>
                      NERD
                  </Typography>
                  {context.name &&
                      <Typography variant="h5"
                               component="div"
                               color="inherit"
                               sx={{flexGrow: 1}}>
                      Welcome, {context.name}
                  </Typography>}
                  {context.IsAdmin === "true" && 
                      <Button color="inherit" onClick={() => navigate("/add")}>
                          Add</Button>
                  }
                  {context.userId == null ?
                      <>
                          <Button color="inherit" onClick={goLogin}>
                              Login
                          </Button>
                          <Button color="inherit" onClick={goSignUp}>
                              Sign Up
                          </Button>
                      </>
                      :
                      <Button color="inherit" onClick={logout}>
                      Log Out
                      </Button>
                  }
                  
              </Toolbar>
              
          </AppBar>
          <Outlet />
      </>
      
      
  )
}
