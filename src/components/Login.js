import React from 'react';
import { Button, TextField, Box, Card, CardContent, Typography } from '@mui/material';
import Center from './Center';
import useForm from '../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from "react-router-dom";

const getFreshModel = () => ({
    name: "",
    email: ""
})

export default function Login() {

    const { context, setContext} = useStateContext();
    const navigate = useNavigate();


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const login = e => {
        e.preventDefault();
        if (validate()) 
            createAPIEndpoint(ENDPOINTS.participant)
                .post(values)
                .then(res => {
                    setContext({participantId: res.data.participantId});
                    navigate("/quiz");
                })
                .catch(err => console.log(err));
        // console.log(errors)
    }

    const validate = () => {
        let temp = {}
        temp.email = (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/).test(values.email) ? "" : "Email is not valid.";
        temp.name = values.name !== "" ? "" : "Name required";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    }

    return (
    <Center>
        <Card sx={{width: 400}}>
            <CardContent>
                <Typography variant="h3"
                        sx ={{my: 3}}>
                            Quiz App
                        </Typography>
                <Box sx={{
                    m: 3,
                    '& .MuiTextField-root':{
                        m: 1,
                        width: '90%'
                    }
                    }}>
                    <form noValidate autoComplete='on' onSubmit={login}>
                        <TextField
                            label="Email"
                            name="email"
                            value={values.email}
                            variant="outlined"
                            onChange={handleInputChange}
                            {...(errors.email && {error: true, helperText: errors.email})}
                            />
                        <TextField
                            label="Name"
                            name="name"
                            value={values.name}
                            variant="outlined"
                            onChange={handleInputChange}
                            {...(errors.name && {error: true, helperText: errors.name})}
                            />
                        <Button
                            type='submit'
                            variant='contained'
                            size='large'
                            sx={{width: '90%'}}
                            >Start</Button>
                    </form>
                </Box>
            </CardContent>
        </Card>
    </Center>
    
  )
}

