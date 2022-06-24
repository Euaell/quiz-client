import React, {useEffect, useState} from 'react';
import {
    Button,
    TextField,
    Box,
    Card,
    CardContent,
    Typography
} from '@mui/material';
import Center from '../Center';
import useForm from '../../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import useStateContext from '../../hooks/useStateContext';
import {useNavigate} from "react-router-dom";

const getSignUp = () => ({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
})

const getSignIn = () => ({
    email: "",
    password: ""
})

export function SignUp() {

    const { context, setContext, resetContext} = useStateContext();
    const navigate = useNavigate();

    const {
        values,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getSignUp);

    useEffect(() => {
        resetContext();
    }, [])


    const submit = e => {
        e.preventDefault();
        if (validate()) {
            let formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("phone", values.phone);
            formData.append("password", values.password)
            createAPIEndpoint(ENDPOINTS.user)
                .post(formData)
                .then(res => {
                    setContext(res.data[0]);
                    navigate("/items"); 
                })
                .catch(console.log);
        }
    }

    const validate = () => {
        let temp = {}
        temp.email = (/^[a-zA-Z\d]+@(?:[a-zA-Z\d]+\.)+[A-Za-z]+$/).test(values.email) ? "" : "Email is not valid.";
        temp.name = values.name !== "" ? "" : "Name required";
        temp.phone = "";
        temp.password = values.password.length >= 6 ? "" : "Password too Short";
        temp.confirmPassword = values.password === values.confirmPassword ? "" : "Password Doesn't Match";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");        
    }

    return (
        <Center>
            <Card sx={{width: 400}}>
                <CardContent>
                    <Typography variant="h3"
                                sx ={{my: 3, alignSelf: "center"}}>
                        Sign Up
                    </Typography>
                    <Box sx={{
                        m: 3,
                        '& .MuiTextField-root':{
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete='on' onSubmit={submit}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
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
                            <TextField
                                label="Phone"
                                name="phone"
                                value={values.phone}
                                variant="outlined"
                                onChange={handleInputChange}
                                {...(errors.phone && {error: true, helperText: errors.phone})}
                            />
                            
                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                value={values.password}
                                variant="outlined"
                                onChange={handleInputChange}
                                {...(errors.password && {error: true, helperText: errors.password})}
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                variant="outlined"
                                onChange={handleInputChange}
                                {...(errors.confirmPassword && {error: true, helperText: errors.confirmPassword})}
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                size='large'
                                sx={{width: '90%'}}
                            >Submit</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}

export function SignIn() {
    const { context, setContext, resetContext} = useStateContext();
    const navigate = useNavigate();

    const {
        values,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getSignUp);

    useEffect(() => {
        resetContext();
    }, [])

    const submit = e => {
        e.preventDefault();
        if (validate()) {
            let formData = new FormData();
            formData.append("email", values.email);
            formData.append("password", values.password)
            createAPIEndpoint(ENDPOINTS.login)
                .post(formData)
                .then(res => {
                    if (res.data == "Incorrect Password") {
                        let temp = {};
                        temp.password = "Incorrect Password";
                        setErrors({
                            ...temp
                        });
                        return
                    }
                    if (res.data == "Invalid email or password") {
                        let temp = {};
                        temp.email = "Invalid email or password";
                        setErrors({
                            ...temp
                        });
                        return
                    }
                    setContext(res.data[0]);
                    navigate("/items"); 
                })
                .catch(console.log);
        }
    }

    const validate = () => {
        let temp = {}
        temp.email = (/^[a-zA-Z\d]+@(?:[a-zA-Z\d]+\.)+[A-Za-z]+$/).test(values.email) ? "" : "Email is not valid.";
        temp.password = "";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    }

    return (
        <Center>
            <Card sx={{width: 400}}>
                <CardContent>
                    <Typography variant="h3"
                                sx ={{my: 3, alignSelf: "center"}}>
                        Sign In
                    </Typography>
                    <Box sx={{
                        m: 3,
                        '& .MuiTextField-root':{
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete='on' onSubmit={submit}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={values.email}
                                variant="outlined"
                                onChange={handleInputChange}
                                {...(errors.email && {error: true, helperText: errors.email})}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                value={values.password}
                                variant="outlined"
                                onChange={handleInputChange}
                                {...(errors.password && {error: true, helperText: errors.password})}
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                size='large'
                                sx={{width: '90%'}}
                            >Submit</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>

    )
}