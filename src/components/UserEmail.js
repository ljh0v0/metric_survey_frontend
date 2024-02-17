import * as React from 'react';
import { Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

export default function UserEmail({handleEmailChange}) {
    const[email, setEmail]=useState("")

    const handleClick=(e)=>{
        e.preventDefault()
        handleEmailChange(email)
        window.location.href="/survey"
    }
    
    

  return (
    <Paper>
        <Box sx={{ p: 3,}}>
        <form>
            <FormControl>
                <FormLabel id="group-label">Please provide your email</FormLabel>
                    <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" onClick={handleClick}>
                        Start Test
                    </Button>
            </FormControl>
        </form>
        </Box>
    </Paper>
    
  );
}