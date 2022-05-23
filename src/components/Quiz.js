import { Card, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItemButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api';
import { getFormatedTime } from '../helper';
import useStateContext from '../hooks/useStateContext'
import Center from './Center';
import { useNavigate } from "react-router-dom";

export default function Quiz() {
    const {context, setContext} = useStateContext();
    const [qns, setQns] = useState([]);
    const [qnIndex, setQnIndex] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);
    const navigate = useNavigate();

    let timer;
    const startTimer = () => {
        timer = setInterval(() => {
            setTimeTaken(prev => prev + 1)
        }, 1000)
    }

   useEffect(() => {
       setContext({
           timeTaken: 0,
           selectedOptions: []
       })
       createAPIEndpoint(ENDPOINTS.question)
       .fetch()
       .then(res => {
           setQns(res.data);
           startTimer();
       })
       .catch(console.log)

       return () => clearInterval(timer)
   }, [])   

   const updateAnswer = (qnId, optionIdx) => {
       const temp = [...context.selectedOptions];
        temp.push({
            qnId,
            selected: optionIdx
        })

        if (qnIndex < 4){
            setContext({selectedOptions: [...temp]})
            setQnIndex(qnIndex + 1);
        }
        else{
            setContext({selectedOptions: [...temp], timeTaken});
            navigate("/result")
        }
        
   }

    return (
        qns.length === 0
        ? null : 
        <Center>
            <Card sx={{maxWidth: 640, minWidth: 400, mx: "auto", mt: 5}}>
                <CardHeader title={`Question ${qnIndex + 1} of 5`} 
                    action={<Typography>{getFormatedTime(timeTaken)}</Typography>}/>
                <Box>
                    <LinearProgress variant="determinate" value={(qnIndex + 1) * 100 / 5} />
                </Box>
                {qns[qnIndex].imageName === null
                ? null
                : <CardMedia component="img"
                    image={BASE_URL + "images/" + qns[qnIndex].imageName}
                    sx={{width: "130px", m: "auto"}} />}
                <CardContent>
                    <Typography variant='h5'>
                        {qns[qnIndex].qnInWords}
                    </Typography>
                    <List>
                        {qns[qnIndex].options.map((item, idx) =>
                            <ListItemButton key={idx} onClick={() => updateAnswer(qns[qnIndex].qnId, idx)}>
                                <Typography>
                                   <b>{String.fromCharCode(65 + idx) + ") "} </b>{item}
                                </Typography>
                            </ListItemButton>
                        )}
                    </List>
                </CardContent>
            </Card> 
        </Center>

    )
}
