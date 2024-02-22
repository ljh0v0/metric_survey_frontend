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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';


export default function Question({currentQuestion, addQIndex, minusQIndex}) {
    const prevPropsRef = React.useRef();
    const[question, setQuestion]=useState([])
    const[answer, setAnswer]=useState("0")
    const[open, setOpen]=useState(false)
    const[alertText, setAlertText]=useState("")

    useEffect(()=>{
            if (prevPropsRef.current) {
                if (JSON.stringify(prevPropsRef.current.currentQuestion) !== JSON.stringify(currentQuestion)) {
                    fetch("http://18.224.135.27:8080/questions/" + currentQuestion.questionId)
                    //fetch("http://localhost:8080/questions/" + currentQuestion.questionId)
                    .then(res=>res.json())
                    .then((result)=>{
                        console.log(result)
                        setQuestion(result.data);
                    }
                    )
                }
            }
            prevPropsRef.current = { currentQuestion, addQIndex };
        })

    const handleClose = () => {
        setOpen(false);
        };

    const handleNext = (e) => {
        e.preventDefault();
        addQIndex();
    }

    const handlePrev = (e) => {
        e.preventDefault();
        minusQIndex();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(question.questionId)
        let emailAdd = localStorage.getItem("email")
        if (emailAdd === null){
            window.location.href="/";
        }else{
            console.log(emailAdd)
            fetch("http://18.224.135.27:8080/answers/add", {
            //fetch("http://localhost:8080/answers/add", {
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
                if (data.code === 0){
                    setOpen(true)
                    setAlertText(data.msg)
                }else if (data.code === 1){
                    addQIndex();
                }else{
                    setOpen(true)
                    setAlertText("An unknown error occurred. Please contact me with johannahliew@gmail.com.")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setOpen(true)
                setAlertText("An unknown error occurred. Please contact me with johannahliew@gmail.com.")
            });
        }       
    }

  return (
    <Card>
        <Box sx={{ pb: 3,}}>
        <CardContent>
          <Typography component="div" variant="h5">
            Question {question.questionId}
          </Typography>
        </CardContent>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card elevation={0}>
                    <CardMedia
                        component="iframe"
                        height="256"
                        src={question.videoUrl}
                        controls
                        autoPlay
                    />
                    <CardContent>
                        Video 1 (left) vs. Video 2 (right)
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <form>
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
                        <div>
                            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" onClick={handlePrev}>
                                previous
                            </Button>
                            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" onClick={handleSubmit}>
                                Save and Next
                            </Button>
                            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" onClick={handleNext}>
                                Next
                            </Button>
                        </div>                   
                    </FormControl>
                </form>
            </Grid>
        </Grid>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Submit failed!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {alertText}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
        </Box>
    </Card>
    
  );
}