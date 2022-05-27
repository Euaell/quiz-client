import React, {useEffect, useState} from 'react';
import {
    Typography,
    Box,
    Container,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Button,
    Link
} from "@mui/material"
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import useForm from "../../hooks/useForm";
import useStateContext from "../../hooks/useStateContext";
import {createAPIEndpoint, ENDPOINTS} from "../../api";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                N.E.R.D.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const getAddr = () => ({
    address: "",
    city: "",
    country: "",
    quantity: 1,
    orderDate: formatDate(new Date())
})

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

export default function Order() {
    const {context,  item, setOrder, resetOrder } = useStateContext();
    
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm values={values} errors={errors} setErrors={setErrors} handleInputChange={handleInputChange}/>;
            case 1:
                return <PaymentForm values={values} errors={errors} setErrors={setErrors} handleInputChange={handleInputChange}/>;
            case 2:
                return <Review item={item} values={values} context={context}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getAddr);
    
    useEffect(() => {
        resetOrder();
    }, []);
    
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if (activeStep === steps.length - 1) {
            let temp = {
                ...values,
                itemId: item.itemId,
                totalPrice: item.price,
                userId: context.userId
            };
            setOrder(temp);
            let formData = new FormData();
            formData.append("address", temp.address);
            formData.append("city", temp.city);
            formData.append("country", temp.country);
            formData.append("itemId", temp.itemId);
            formData.append("orderDate", temp.orderDate);
            formData.append("quantity", temp.quantity);
            formData.append("totalPrice", temp.totalPrice);
            formData.append("userId", temp.userId);
            createAPIEndpoint(ENDPOINTS.order)
                .post(formData)
                .then(console.log)
                .catch(console.log)
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h4" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    We have emailed your order confirmation, and will send 
                                    you an update when your order has shipped.
                                </Typography>
                            </>
                        ) : (
                            <>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </>
                </Paper>
                <Copyright />
            </Container>
        </>
    );
}