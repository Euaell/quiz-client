import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router';
import { useNavigate } from "react-router-dom";
import useStateContext from '../hooks/useStateContext';

export default function Layout() {
    const {resetContext} = useStateContext();
    const navigate = useNavigate();

    const logout = () => {
        resetContext();
        navigate("/");
    }

  return (
      <>
      <AppBar position='sticky'>
          <Toolbar sx={{width: 640, m: "auto"}}>
              <Typography
                variant='h4'
                align='center'
                sx={{flexGrow: 1}}>
                  Quiz App
              </Typography>
              <Button sx={{color: "red"}} onClick={logout}>Logout</Button>
          </Toolbar>
      </AppBar>
      <Outlet />
      </>
      
      
  )
}
