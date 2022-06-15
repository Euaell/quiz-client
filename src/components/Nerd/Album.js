import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Stack,
	Box,
	Typography,
	Container,
	Link
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {BASE_URL, createAPIEndpoint, ENDPOINTS} from "../../api";
import useStateContext from "../../hooks/useStateContext";
import {useNavigate} from "react-router-dom";
import {Facebook, Instagram, LinkedIn, Telegram, Twitter, YouTube} from "@mui/icons-material";

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://nerdethiopia.com/">
				N.E.R.D
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

function Footer() {
	return (
		<Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">

			<Box sx={{margin: "auto",
				flexGrow: 1,
			}}>

			</Box>

			<Typography variant="h6" align="center" gutterBottom>
				<Link color="inherit" href="https://telegram.org/" target={"_blank"}>
					<Telegram color={"primary"} />
				</Link>
				<Link color="inherit" href="https://www.instagram.com/nerds_center" target={"_blank"}>
					<Instagram color={"primary"} />
				</Link>
				<Link color="inherit" href="https://www.linkedin.com/in/natnael-kebede-7b0438174" target={"_blank"}>
					<LinkedIn color={"primary"} />
				</Link>
				<Link color="inherit" href="https://www.youtube.com/channel/UCQdmiY6mZHeYFR_T0-CLVMg" target={"_blank"}>
					<YouTube color={"primary"} />
				</Link>
				<Link color="inherit" href="https://twitter.com/nerd68792965/" target={"_blank"}>
					<Twitter color={"primary"} />
				</Link>
				<Link color={"inherit"} href="https://www.facebook.com/Neerrdd" target={"_blank"}>
					<Facebook color={"primary"} />
				</Link>
			</Typography>
			<Box sx={{margin: "auto",
				flexGrow: 1,
				width: "40%",
			}}>
				<Typography
					variant="subtitle1"
					align="center"
					color="text.secondary"
					component="p"
				>
					N.E.R.D (New Era Research & Development) provides a hacker space, educational content,
					and private research and development including prototyping, development, and research.
				</Typography>
				<br/>
				<Copyright />
			</Box>
		</Box>
	);
}

export default function Album() {
	const { context } = useStateContext();
	const navigate = useNavigate();

	return (
		<>
			<main>
				<Box
					sx={{
						bgcolor: 'background.paper',
						pt: 8,
						pb: 8,
					}}
				>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="text.primary"
							gutterBottom
						>
							New Era Research and Development
						</Typography>
						<Typography variant="h5" align="center" color="text.secondary" paragraph>
							To realize a prosperous society brimming with hope,
							we are working in co-creation with a wide range of stakeholders
							to accelerate innovation
						</Typography>
						<Stack
							sx={{ pt: 4 }}
							direction="row"
							spacing={2}
							justifyContent="center"
						>
							<Button
								variant="contained"
								onClick={() => navigate('/items')}
							>Machines</Button>
							{context.userId == null ?
								<Button variant="outlined"
								        onClick={() => navigate('/login')}
								>SignIn</Button> :
								null
							}

						</Stack>
					</Container>
				</Box>
			</main>

			{/* Footer */}
			<Footer />
			{/* End footer */}
		</>
	);
}

export function Machines() {
	const [items, setItems] = useState([]);
	const {context, setItem, resetItem} = useStateContext();
	const navigate = useNavigate();

	function handleDelete(id) {
		createAPIEndpoint(ENDPOINTS.item)
			.delete(id)
			.then((res) => {
				console.log(res)
				setItems(items.filter(item => item.id !== id));
			})
			.catch(console.log)
	}
	useEffect(() => {
		resetItem();
		createAPIEndpoint(ENDPOINTS.item)
			.fetch()
			.then(res => {
				setItems(res.data);
			})
			.catch(console.error);
	}, [])

	function edit(itemId) {
		createAPIEndpoint(ENDPOINTS.item)
			.fetchById(itemId)
			.then(res => {
				setItem(res.data[0]);
				navigate('/edit');
			})
			.catch(console.error);
	}

	function order(itemId) {
		createAPIEndpoint(ENDPOINTS.item)
			.fetchById(itemId)
			.then(res => {
				setItem(res.data[0]);
				navigate('/order');
			})
			.catch(console.error);
	}

	return (
		<Container sx={{ py: 8 }} maxWidth="md">
			<Grid container spacing={4}>
				{items.map((item) => (
					<Grid item key={item.itemId} xs={12} sm={6} md={4}>
						<Card
							sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
						>
							<CardMedia
								component="img"
								sx={{ pt: 0, height: '140px' }}
								image={ BASE_URL + "images/" + item.pic }
								alt="random"
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography gutterBottom variant="h5" component="h2">
									{ item.name }
								</Typography>
								<Typography>
									{ item.desc }
								</Typography>
								<br/>
								<Typography variant="h4">
									{ item.price } Birr
								</Typography>
							</CardContent>
							<CardActions>
								{context.IsAdmin === "true" ?
									<>
										<Button size="small"
										        onClick={() => {edit(item.itemId)}}
										>
											Edit
										</Button>
										<Button size="small"
										        sx={{color: "red"}}
										        onClick={() => {handleDelete(item.itemId)}}
										> Delete </Button>
									</> :
									<Button size="small"
									        onClick={() => {order(item.itemId)}}
									>
										Order
									</Button>
								}
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	)
}