import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Question({currentQuestion, addQIndex, email}) {
    const prevPropsRef = React.useRef();
    const[question, setQuestion]=useState([])
    const[answer, setAnswer]=useState("0")
    const[emailAdd, setEmailAdd]=useState("test")

    useEffect(()=>{
            if (prevPropsRef.current) {
                if (JSON.stringify(prevPropsRef.current.currentQuestion) !== JSON.stringify(currentQuestion)) {
                    fetch("http://localhost:8080/questions/" + currentQuestion.questionId)
                    .then(res=>res.json())
                    .then((result)=>{
                        console.log(result)
                        setQuestion(result.data);
                        setEmailAdd(email)
                    }
                    )
                }
            }
            prevPropsRef.current = { currentQuestion, addQIndex };
        })
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(question.questionId)
        fetch("http://localhost:8080/answers/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId: question.questionId,
                answer: answer,
                emailAddress: emailAdd
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            addQIndex();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

  return (
    <Paper>
        <Box sx={{ p: 3,}}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Card elevation={0}>
                    <CardMedia
                        component="iframe"
                        height="256"
                        src={question.v1Url}
                        controls
                        autoPlay
                    />
                    <CardContent>
                        Video 1
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card elevation={0}>
                    <CardMedia
                        component="iframe"
                        height="256"
                        src={question.v2Url}
                        controls
                        autoPlay
                    />
                    <CardContent>
                        Video 1
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel id="group-label">Which video is better?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="group-label"
                            name="row-radio-buttons-group"
                            value={answer}
                            onChange={(e)=>setAnswer(e.target.value)}
                        >
                            <FormControlLabel value="0" control={<Radio />} label="Video 1" />
                            <FormControlLabel value="1" control={<Radio />} label="Video 2" />
                        </RadioGroup>
                        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                            Save and Next
                        </Button>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
        </Box>
    </Paper>
    
  );
}