import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Question from './Question';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


export default function UserForm({addQIndex, minusQIndex, qIndex, setLength}) {
    const[questionsList,setQuestionsList]=useState([])
    const[open, setOpen]=useState(false)
    const[alertText, setAlertText]=useState("")

    function handleClose(){
        setOpen(false)
    }

    useEffect(()=>{
        fetch("http://3.128.234.246:8080/questions/getAll")
        //fetch("http://localhost:8080/questions/getAll")
        .then(res=>res.json())
        .then((result)=>{
            if (result.code === 0){
                setOpen(true)
                setAlertText(result.msg)
            }else if (result.code === 1){
                console.log(result)
                setQuestionsList(result.data);
                setLength(result.data.length);
            }else{
                setOpen(true)
                setAlertText("An unknown error occurred. Please contact me with johannahliew@gmail.com.")
            }
        })
        .catch((error)=>{
            setOpen(true)
            setAlertText("An unknown error occurred. Please contact me with johannahliew@gmail.com.")
        })
    },[])


    return (
        <Container>
            <Question 
                currentQuestion={questionsList[qIndex]} 
                addQIndex={addQIndex} 
                minusQIndex={minusQIndex} 
                currentId={qIndex}
                totalIds={questionsList.length}>
            </Question>
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
        </Container>
    );
}