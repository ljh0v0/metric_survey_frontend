import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Question from './Question';
import Paper from '@mui/material/Paper';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ThanksPage from './ThanksPage';
import UserEmail from './UserEmail';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function UserForm() {
    const[questionsList,setQuestionsList]=useState([])
    const[qIndex,setQIndex]=useState(0)
    const[emailAdd, setEmailAdd]=useState("form")
    const[open, setOpen]=useState(false)
    const[alertText, setAlertText]=useState("")

    function handleClose(){
        setOpen(false)
    }

    function handleEmailChange(value){
        console.log(value)
        setEmailAdd(value)
    }

    function addQIndex(){
        if (qIndex===questionsList.length-1){
            localStorage.removeItem("email")
            window.location.href="/thanks";
        }else{
            setQIndex(qIndex+1)
        }
    }

    function minusQIndex(){
        if (qIndex===0){
            return
        }else{
            setQIndex(qIndex-1)
        }
    }

    useEffect(()=>{
        fetch("http://localhost:8080/questions/getAll")
        .then(res=>res.json())
        .then((result)=>{
            if (result.code === 0){
                setOpen(true)
                setAlertText(result.msg)
            }else if (result.code === 1){
                console.log(result)
                setQuestionsList(result.data);
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
            <Paper>
                <Router>
                    <Routes>
                    <Route path="/" element={<UserEmail handleEmailChange={handleEmailChange}></UserEmail>}></Route>
                    <Route path="/survey" exact 
                    element={<Question currentQuestion={questionsList[qIndex]} addQIndex={addQIndex} minusQIndex={minusQIndex}></Question>}>
                    </Route>
                    <Route path="/thanks" element={<ThanksPage></ThanksPage>}></Route>
                    </Routes>
                </Router>
            </Paper>

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