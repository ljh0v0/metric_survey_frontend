import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Question from './Question';
import Paper from '@mui/material/Paper';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ThanksPage from './ThanksPage';
import UserEmail from './UserEmail';

export default function UserForm() {
    const[questionsList,setQuestionsList]=useState([])
    const[qIndex,setQIndex]=useState(0)
    const[emailAdd, setEmailAdd]=useState("form")

    function handleEmailChange(value){
        console.log(value)
        setEmailAdd(value)
    }

    function addQIndex(){
        if (qIndex===questionsList.length-1){
            window.location.href="/thanks";
        }else{
            setQIndex(qIndex+1)
        }
    }

    useEffect(()=>{
        fetch("http://localhost:8080/questions/getAll")
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            setQuestionsList(result.data);
        })
    },[])


    return (
        <Container>
            <Paper>
                <Router>
                    <Routes>
                    <Route path="/" element={<UserEmail handleEmailChange={handleEmailChange}></UserEmail>}></Route>
                    <Route path="/survey" exact 
                    element={<Question currentQuestion={questionsList[qIndex]} addQIndex={addQIndex} email={emailAdd}></Question>}>
                    </Route>
                    <Route path="/thanks" element={<ThanksPage></ThanksPage>}></Route>
                    </Routes>
                </Router>
            </Paper>
            
        </Container>
    );
}