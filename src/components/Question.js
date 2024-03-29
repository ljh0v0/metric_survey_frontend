import * as React from 'react';
import PropTypes from 'prop-types';
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
import LinearProgress from '@mui/material/LinearProgress';

function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={props.current / props.total * 100} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
          {props.current} / {props.total}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  };

export default function Question({currentQuestion, addQIndex, minusQIndex, currentId, totalIds}) {
    const prevPropsRef = React.useRef();
    const[question, setQuestion]=useState([])
    const[v1Url, setV1Url]=useState("")
    const[v2Url, setV2Url]=useState("")
    const[v3Url, setV3Url]=useState("")
    const[answer1, setAnswer1]=useState(0)
    const[answer2, setAnswer2]=useState(0)
    const[answer3, setAnswer3]=useState(0)
    const[open, setOpen]=useState(false)
    const[alertText, setAlertText]=useState("")

    useEffect(()=>{
            if (prevPropsRef.current) {
                if (JSON.stringify(prevPropsRef.current.currentQuestion) !== JSON.stringify(currentQuestion)) {
                    fetch("http://3.128.234.246:8080/questions/" + currentQuestion.questionId)
                    //fetch("http://localhost:8080/questions/" + currentQuestion.questionId)
                    .then(res=>res.json())
                    .then((result)=>{
                        console.log(result)
                        setQuestion(result.data);
                        setV1Url(result.data.videoUrls[0])
                        setV2Url(result.data.videoUrls[1])
                        setV3Url(result.data.videoUrls[2])
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
        setOpen(false);
    }

    const handlePrev = (e) => {
        e.preventDefault();
        minusQIndex();
    }

    const calcMode = (answer1, answer2, answer3) => {
        if(answer1 === answer2){
            return answer1
        }else{
            return answer3
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(question.questionId)
        let emailAdd = localStorage.getItem("email")
        if (emailAdd === null){
            window.location.href="/";
        }else{
            let answer = calcMode(answer1, answer2, answer3)
            fetch("http://3.128.234.246:8080/answers/add", {
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
                //console.log(answer)
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
                //console.error('Error:', error);
                setOpen(true)
                setAlertText("An unknown error occurred. Please contact me with johannahliew@gmail.com.")
            });
        }       
    }

  return (
    <Card elevation={0}>
        <Box sx={{ pb: 3,}}>
        <CardContent>
          <Typography component="div" variant="h5">
            Question {question.questionId}
            <LinearProgressWithLabel current={currentId} total={totalIds} />
          </Typography>
        </CardContent>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <form>
                <Card elevation={0}>
                    <CardMedia
                        component="iframe"
                        //sx={{ width: 700, height: 256, display: 'inline',}}
                        height={256}
                        src={v1Url}
                        controls
                        autoPlay
                    />
                    <CardContent>
                        Video 1 (left) vs. Video 2 (right)   
                    </CardContent>
                    <FormControl>
                        <FormLabel id="group-label">Which video is better?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="group-label"
                                name="row-radio-buttons-group"
                                value={answer1}
                                onChange={(e)=>setAnswer1(e.target.value)}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Video 1" />
                                <FormControlLabel value={1} control={<Radio />} label="Video 2" />
                            </RadioGroup>        
                        </FormControl>
                </Card>  
                <Card elevation={0}>
                    <CardMedia
                        component="iframe"
                        //sx={{ width: 700, height: 256, display: 'inline',}}
                        height={256}
                        src={v2Url}
                        controls
                        autoPlay
                    />
                    <CardContent>
                        Video 1 (left) vs. Video 2 (right)    
                    </CardContent>
                    <FormControl>
                        <FormLabel id="group-label">Which video is better?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="group-label"
                                name="row-radio-buttons-group"
                                value={answer2}
                                onChange={(e)=>setAnswer2(e.target.value)}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="Video 1" />
                                <FormControlLabel value="1" control={<Radio />} label="Video 2" />
                            </RadioGroup>        
                        </FormControl>
                </Card>   
                <Card elevation={0}>
                    <CardMedia
                        component="iframe"
                        //sx={{ width: 700, height: 256, display: 'inline',}}
                        height={256}
                        src={v3Url}
                        controls
                        autoPlay
                    />
                    <CardContent>
                        Video 1 (left) vs. Video 2 (right)    
                    </CardContent>
                    <FormControl>
                        <FormLabel id="group-label">Which video is better?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="group-label"
                                name="row-radio-buttons-group"
                                value={answer3}
                                onChange={(e)=>setAnswer3(e.target.value)}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="Video 1" />
                                <FormControlLabel value="1" control={<Radio />} label="Video 2" />
                            </RadioGroup>        
                        </FormControl>
                </Card>   
                <div>
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" onClick={handleSubmit}>
                    Save and Next
                </Button>  
                </div>         
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
            <Button onClick={handleNext}>skip question</Button>
            </DialogActions>
        </Dialog>
        </Box>
    </Card>
    
  );
}