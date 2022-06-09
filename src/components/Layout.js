import {AppBar, Avatar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router';
import {useNavigate} from "react-router-dom";
import useStateContext from '../hooks/useStateContext';
import {Box} from "@mui/system";

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
				<Container maxWidth={"xl"}>
					<Toolbar>
						<IconButton
							onClick={() => navigate("/")}
							sx={{ p: 0 }}>
							<Avatar alt="Logo" src="/image/owl.png" />
						</IconButton>
						<Typography variant="h3"
						            component="div"
						            color="inherit"
						            sx={{flexGrow: 0.1}}>
							NERD
						</Typography>
						<Box sx={{ flexGrow: 0.5, display: { xs: 'none', md: 'flex' } }}>
							<Button
								onClick={() => navigate("/")}
								sx={{ mx: 1, my: 2, color: 'white', display: 'block' }}
							>
								Home
							</Button>
							<Button
								onClick={() => navigate("/items")}
								sx={{ mx: 2, my: 2, color: 'white', display: 'block' }}
							>
								Machines
							</Button>
							<Button
								onClick={() => navigate("/services")}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								Services
							</Button>
						</Box>
						{context.name &&
							<Typography variant="h5"
							            component="div"
							            color="inherit"
							            sx={{flexGrow: 1}}>
								Welcome, {context.name}
							</Typography>}
						{context.IsAdmin === "true" &&
							<>
								<Button color="inherit" onClick={() => navigate("/add")}>
									Add</Button>
								<Button color="inherit" onClick={() => navigate("/viewOrders")}>
									View Orders </Button>
							</>
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
				</Container>

			</AppBar>
			<Outlet />
		</>


	)
}
