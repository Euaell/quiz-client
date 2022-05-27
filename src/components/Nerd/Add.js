import React, {useState} from 'react';
import {
    Box, Button, Card, CardContent,
    CardMedia,
    InputAdornment,
    TextField, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {createAPIEndpoint, ENDPOINTS} from "../../api";
import Center from "./../Center";
import {useNavigate} from "react-router";
import useForm from "../../hooks/useForm";

const getItem = () => ({
        name: '',
        desc: '',
        quantity: 0,
        price: 0
    });

export function Add() {
    const {
        values,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getItem);

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(false);
    const [preSrc, setPreSrc] = useState("/image/anonymous.png");

    const navigate = useNavigate();
    
    function submit(event) {
        event.preventDefault();
        if (!preview) return;

        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("desc", values.desc);
        formData.append("quantity", values.quantity);
        formData.append("price", values.price);
        formData.append("pic", image);
        createAPIEndpoint(ENDPOINTS.item)
            .post(formData)
            // .then(console.log)
            .then(() => navigate("/items"))
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
            <Card sx={{width: 400}}>
                <CardContent>
                    <Typography variant="h3"
                                sx ={{my: 3, alignSelf: "center"}}>
                        Add Item
                    </Typography>
                    <Box sx={{
                        m: 3,
                        "& .MuiTextField-root": {
                            m: 2,
                            width: "90%"
                        }
                    }}>
                        <form noValidate autoComplete='on' onSubmit={submit}>
                            <TextField
                                label="Device Name"
                                name="name"
                                value={values.name}
                                variant="outlined"
                                onChange={handleInputChange}
                                {...(errors.name && { error: true, helperText: errors.name })}
                            />
                            <TextField
                                label="Device Description"
                                name="desc"
                                value={values.desc}
                                multiline
                                rows={4}
                                onChange={handleInputChange}
                                {...(errors.desc && { error: true, helperText: errors.desc })}
                            />
                            <TextField
                                label="Display Price"
                                name="price"
                                value={values.price}
                                variant="outlined"
                                onChange={handleInputChange}
                                {...(errors.price && { error: true, helperText: errors.price })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Birr</InputAdornment>,
                                }}
                            />
                            <TextField
                                label="Quantity"
                                name="quantity"
                                value={values.quantity}
                                variant="outlined"
                                onChange={handleInputChange}
                                {...(errors.quantity && { error: true, helperText: errors.quantity })}
                            />
                            <br />
                            {preview === true ? <Box>
                                <CardMedia component="img"
                                           height="60"
                                           image={ preSrc }/>
                            </Box> :  null}
                            <Button variant="contained" 
                                    component="label" 
                                    color="primary"
                                    sx={{m: 2}}
                            >
                                <AddIcon/> Upload a Photo
                                <input type="file" accept="image/*" hidden onChange={addImage}/>
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