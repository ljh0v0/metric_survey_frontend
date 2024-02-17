import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Container, Paper } from '@mui/material';


export default function Question() {

  return (
    <Container>
        <Card elevation={0}>
                <CardContent>
                    Thank you for participating in our study. Your response has been recorded.
                </CardContent>
        </Card>
    </Container>
            
    
  );
}