import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
	TextField,
	Typography
} from "@mui/material";
import Center from "../Center";
import AddIcon from "@mui/icons-material/Add";
import useForm from "../../hooks/useForm";
import {useNavigate} from "react-router";
import {BASE_URL, createAPIEndpoint, ENDPOINTS} from "../../api";
import useStateContext from "../../hooks/useStateContext";
import {red} from "@mui/material/colors";
import axios from 'axios'
import fileDownload from 'js-file-download'

const getService = () => ({
		serviceId: null,
		name: "",
		price: 0,
		description: "",
		quantity: 0,
		file: null
	})

export default function Services() {

	const {context} = useStateContext();
	
	const {
		values,
		errors,
		handleInputChange
	} = useForm(getService);

	const [file, setFile] = useState(null);
	const [pre, setPre] = useState(false);
	
	// const navigate = useNavigate();

	function submit(event) {
		event.preventDefault();
		if (!pre) return;
		
		let formData = new FormData();
		formData.append("iduser", context.userId);
		formData.append("desc", values.description);
		formData.append("quantity", values.quantity);
		formData.append("file", file);
		createAPIEndpoint(ENDPOINTS.services)
			.post(formData)
			.then(console.log)
			// .then(() => navigate("/items"))
			.catch(console.log)
	}

	function addFile(event) {
		if (event.target.files && event.target.files[0]){
			let file = event.target.files[0];
			setFile(file);
			setPre(true);
		}
	}
	
	return (
		<Center>
			<Card sx={{width: 400}}>
				<CardContent>
					<Typography variant="h3"
					            sx ={{my: 3, alignSelf: "center"}}>
						Order Services
					</Typography>
					<Typography variant="body1" >
						Please fill out the form below to order services.
					</Typography>
					<Box
						sx={{
							m: 3,
							display: "flex",
							flexDirection: "column",
							alignItems: "center"
						}}
					>
						<form noValidate autoComplete='on' onSubmit={submit}>
							<TextField
								label="Description"
								name="description"
								value={values.description}
								multiline
								rows={3}
								onChange={handleInputChange}
								{...(errors.desc && { error: true, helperText: errors.desc })}
							/>
							<br />
							<br />
							<TextField
								label="Quantity"
								name="quantity"
								value={values.quantity}
								variant={'outlined'}
								onChange={handleInputChange}
								{...(errors.quantity && { error: true, helperText: errors.quantity })}
							/>
							<br />
							<Button variant="contained"
							        component="label"
							        color="primary"
							        sx={{m: 2}}
							>
								<AddIcon/> Upload the Model File
								{/*File Upload*/}
								<input type="file" accept="model/*" hidden onChange={addFile}/>
							</Button>
							<Button variant="contained"
							        type="submit">
								Submit
							</Button>
						</form>
					</Box>
			
				</CardContent>
			</Card>
		</Center>
	);
}

export function AdminServices() {
	const [services, setServices] = useState([]);
	const navigate = useNavigate();

	function setOrds() {
		createAPIEndpoint(ENDPOINTS.services)
			.fetch()
			.then((res) => {
				console.log(res.data);
				setServices(res.data);
			})
			.catch(console.error);
	}
	useEffect(() => {
		setOrds();
	}, [])
	
	function handleDownload(url, fileName) {
		axios.get(url, {
			responseType: 'blob',
		}).then((res) => {
			fileDownload(res.data, fileName)
		})
	}

	const handleClick = (id) => {
		createAPIEndpoint(ENDPOINTS.services)
			.delete(id)
			.then((res) => {
				console.log(id)
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
				<TableContainer component={Card}>
					<Table sx={{ minWidth: 650 }} size="small">
						<TableHead>
							<TableRow>
								<TableCell align="right">Custormer Name</TableCell>
								<TableCell align="right">Phone</TableCell>
								<TableCell align="right">Email</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Quantity</TableCell>
								<TableCell align="right">File</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{services.map((service) => (
								<TableRow
									key={service.idservices}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{service.name}
									</TableCell>
									<TableCell align="right">{service.phone}</TableCell>
									<TableCell align="right">{service.email}</TableCell>
									<TableCell align="right">{service.desc}</TableCell>
									<TableCell align="right">{service.email}</TableCell>
									<TableCell align="right">
										<Button
											onClick={() => handleDownload(BASE_URL + "Images/" + service.fileName, service.fileName)}
											// sx={{color: red[600]}}
										>
											Download
										</Button>
									</TableCell>
									<TableCell align="right">
										<Button onClick={() => handleClick(service.idservices)}
										        sx={{color: red[600]}}
										>
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