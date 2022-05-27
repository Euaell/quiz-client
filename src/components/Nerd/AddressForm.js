import React, {useState} from 'react';
import {
    Grid,
    Typography,
    TextField,
} from "@mui/material";
import useForm from "../../hooks/useForm";
import useStateContext from "../../hooks/useStateContext";

export default function AddressForm({values, errors, setErrors, handleInputChange}) {
    
    const {context, item, order, setOrder } = useStateContext();
    
    
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                
                <Grid item xs={12}>
                    <TextField
                        required
                        name="address"
                        label="Delivery Address"
                        value={values.address}
                        fullWidth
                        onChange={handleInputChange}
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        name="country"
                        value={values.country}
                        onChange={handleInputChange}
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                    />
                </Grid>
                
            </Grid>
        </>
    );
}