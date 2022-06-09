import React, {useEffect, useState} from 'react';
import {createAPIEndpoint, ENDPOINTS} from "../../api";
import {
	Button,
	Paper, Table,
	TableBody,
	TableCell, TableContainer, TableHead,
	TableRow
} from "@mui/material";
import {Box} from "@mui/system";
import {red} from "@mui/material/colors";
import {Navigate} from "react-router";
import {useNavigate} from "react-router-dom";

export function Orders () {
	const [orders, setOrders] = useState([]);
	const navigate = useNavigate();
	
	function setOrds() {
		createAPIEndpoint(ENDPOINTS.order)
			.fetch()
			.then((res) => {
				setOrders(res.data);
				console.log(res.data);
			})
			.catch(console.error);
	}
	useEffect(() => {
		setOrds();
	}, [])
	const [row, setRow] = useState([]);
	const [col, setCol] = useState([]);
	
	const handleClick = (id) => {
		createAPIEndpoint(ENDPOINTS.order)
			.delete(id)
			.then((res) => {
				setOrds();
				console.log(res);
			})
			.catch(console.error);
	};
	
	return (
		<>
			<Box
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					flexWrap: 'wrap',
				}}
			>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} size="small">
						<TableHead>
							<TableRow>
								<TableCell>Item Name</TableCell>
								<TableCell align="right">Order Date</TableCell>
								<TableCell align="right">Custormer Name</TableCell>
								<TableCell align="right">Phone</TableCell>
								<TableCell align="right">Email</TableCell>
								<TableCell align="right">Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.map((order) => (
								<TableRow
									key={order.orderId}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{order.itemName}
									</TableCell>
									<TableCell align="right">{new Date(order.orderDate).toDateString()}</TableCell>
									<TableCell align="right">{order.userName}</TableCell>
									<TableCell align="right">{order.phone}</TableCell>
									<TableCell align="right">{order.email}</TableCell>
									<TableCell align="right">
										<Button onClick={() => handleClick(order.orderId)}>
											delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
}
