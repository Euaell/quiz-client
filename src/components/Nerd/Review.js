import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react";

const products = [
    { name: 'Shipping', desc: '', price: 'Free' },
];

export default function Review({context, item, values, setValues}) {
    const [ords, setOrds] = useState([]);
    
    const payments = [
        { name: 'Pay type', detail: 'TeleBirr' },
        { name: 'Buyer Name', detail: 'Mr ' + context.name },
        { name: 'Buyer Phone no.', detail: '+251 xxx xxx-xxx' },
        { name: 'Order date', detail: new Date().toDateString() },
        { name: 'Order no.', detail: '123456789' },
    ];
    
    useEffect(() => {
        let temp = [];
        temp.push(item);
        setOrds(temp);
    }, [])
    
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {ords.map((ord) => (
                    <ListItem key={ord.itemId} sx={{ py: 1, px: 0 }}>
                        <ListItemText 
                            primary={ord.name} 
                            // secondary={ord.desc} 
                        />
                        <Typography variant="body2">{ord.price} Birr</Typography>
                    </ListItem>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Delivery" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Free
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {item.price} Birr
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{context.name}</Typography>
                    <Typography gutterBottom>{values.address}, {values.city}, {values.country}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}