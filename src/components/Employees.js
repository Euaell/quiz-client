import React, {useEffect, useState} from 'react';
import {
    Box, Button, Card, CardActionArea,
    CardActions,
    CardContent, CardMedia, Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import {BASE_URL, createAPIEndpoint, ENDPOINTS} from "../api";
import {Container} from "@mui/system";
import {grey} from "@mui/material/colors";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers";
import Center from "./Center";
import {useNavigate} from "react-router";

const formatDate = (d) => {
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
}

export function Employees() {
    const [employees, setEmployees] = useState([]);
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.employee)
            .fetch()
            .then(res => {
                setEmployees(res.data);
            })
            .catch(console.log)
    }, [])
    
    return (
        <Container className="root-container">
            <Typography variant={"h2"}>
                Employees
            </Typography>
            <br/>
            <Grid className="sample-grid" container spacing={3}>
                {employees.map((employee, index) => {
                    return <Employee employee={employee} key={index}/>
                })}
            </Grid>
        </Container>
        
        
    );
}

export function Employee({employee}) {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }} >
            <CardActionArea>
                <CardMedia component="img"
                           height="140"
                           image={BASE_URL + "images/" + employee.PhotoFileName}
                           alt=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {employee.EmployeeName}
                    </Typography>
                    <Typography variant="h4" sx={{color: grey[400]}}>
                        Department: {employee.Department}
                    </Typography>
                    <Typography variant="h5" sx={{color: grey[500]}}>
                        Joined: {employee.DateOfJoining}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>
    )
}

export function EmployeeInputWithIcon() {
    const [departments, setDepartments] = useState([]);
    
    const [department, setDepartment] = useState("");
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    
    const [preview, setPreview] = useState(false);
    const [preSrc, setPreSrc] = useState("/image/anonymous.png");
    
    const navigate = useNavigate();
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.department)
            .fetch()
            .then(res => {
                setDepartments(res.data.map(item => item.DepartmentName));
            })
    }, [])
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    function handleDepartment(event) {
        setDepartment(event.target.value);
    }
    
    function submit(event) {
        event.preventDefault();
        if (!preview) return;
        
        let formData = new FormData();
        formData.append("EmployeeName", name);
        formData.append("Department", department);
        formData.append("PhotoFileName", image);
        formData.append("StartDate", formatDate(startDate))
        
        createAPIEndpoint(ENDPOINTS.employee)
            .post(formData)
            // .then(console.log)
            .then(() => navigate("/employee"))
            .catch(console.log)
    }

    function addImage(event) {
        if (event.target.files && event.target.files[0]){
            let imageFile = event.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setImage(imageFile);
                setPreSrc(x.target.result);
            }
            reader.readAsDataURL(imageFile);
            setPreview(true);
        }
    }

    return (
        <Center>
            <form noValidate autoComplete='on' onSubmit={submit}>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Full Name"
                        value={name}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        onChange={handleNameChange}
                    />
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>


                    <InputLabel id="demo-select-small">Department</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={department}
                        label="Age"
                        sx={{width: 100}}
                        onChange={handleDepartment}
                    >
                        {departments.map((item, index) => {
                            return <MenuItem key={index} value={item}> {item} </MenuItem>
                        })}
                    </Select>
                    <br />
                    {preview === true ? <Box>
                        <CardMedia component="img"
                                   height="60"
                                   image={ preSrc }/>
                    </Box> :  null}
                    <Button variant="contained" component="label" color="primary">
                        <AddIcon/> Upload a Photo
                        <input type="file" accept="image/*" hidden onChange={addImage}/>
                    </Button>
                    <Button variant="contained"
                            type="submit">
                        Submit
                    </Button>
                </Box>
            </form>
        </Center>
    );
}