import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import UserForm from './UserForm';
import Paper from '@mui/material/Paper';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ThanksPage from './ThanksPage';
import UserEmail from './UserEmail';

export default function Survey() {
    const[qIndex,setQIndex]=useState(0)
    const[length,setLength]=useState(0)

    function addQIndex(){
        if (qIndex>=length-1){
            localStorage.removeItem("email")
            window.location.href="/thanks";
        }else{
            setQIndex(qIndex+1)
        }
    }

    function minusQIndex(){
        if (qIndex<=0){
            return
        }else{
            setQIndex(qIndex-1)
        }
    }


    return (
        <Container>
            <Paper>
                <Router>
                    <Routes>
                    <Route path="/" element={<UserEmail></UserEmail>}></Route>
                    <Route path="/survey" exact 
                    element={<UserForm addQIndex={addQIndex} minusQIndex={minusQIndex} qIndex={qIndex} setLength={setLength}></UserForm>}>
                    </Route>
                    <Route path="/thanks" element={<ThanksPage></ThanksPage>}></Route>
                    </Routes>
                </Router>
            </Paper>
            
        </Container>
    );
}