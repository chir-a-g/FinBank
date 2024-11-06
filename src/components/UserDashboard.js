import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const UserDashboard = () => {
  const [balance, setBalance] = useState(0);
  const [loans, setLoans] = useState([]);
  const [loanAmount, setLoanAmount] = useState('');
  const navigate = useNavigate();
  
  // Get bankId from local storage
  const bankId = localStorage.getItem('bankId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const balanceResponse = await axios.get(`http://localhost:5000/user/balance/${bankId}`);
        const loansResponse = await axios.get(`http://localhost:5000/user/loans/${bankId}`);
        setBalance(balanceResponse.data.balance);
        setLoans(loansResponse.data.loans);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [bankId]);

  const applyForLoan = async (e) => {
    e.preventDefault();
    
    console.log('Attempting to apply for a loan');  // Log function entry
    console.log('Loan Amount:', loanAmount);        // Log loan amount
    
    if (loanAmount <= 0) return alert('Please enter a valid loan amount');
  
    try {
      const response = await axios.post('http://localhost:5000/user/applyLoan', { bankId, amount: Number(loanAmount) });
      console.log('Loan application response:', response.data);  // Log response from API
      alert(response.data.message);
      setLoans(response.data.loans);
    } catch (error) {
      console.error('Error applying for loan:', error);  // Log error details
      alert('Loan application failed');
    }
  };
  

  const handleLogout = () => {
    setBalance(0);
    setLoans([]);
    localStorage.removeItem('bankId'); // Clear bankId from local storage
    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Button onClick={handleLogout} variant="outlined" color="secondary" sx={{ position: 'absolute', top: 16, right: 36 }}>
        Logout
      </Button>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Your Balance</Typography>
          <Typography variant="h4">${balance}</Typography>
        </CardContent>
      </Card>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Your Loans</Typography>
        <List>
          {loans.length > 0 ? loans.map((loan, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Amount: $${loan.amount}`} secondary={`Status: ${loan.status}`} />
            </ListItem>
          )) : <Typography>No loans yet</Typography>}
        </List>
      </Box>
      <Box component="form" onSubmit={applyForLoan}>
        <Typography variant="h6" sx={{ mb: 1 }}>Apply for a Loan</Typography>
        <TextField 
          fullWidth 
          type="number" 
          label="Loan Amount" 
          value={loanAmount} 
          onChange={(e) => setLoanAmount(e.target.value)} 
          sx={{ mb: 2 }} 
        />
        <Button fullWidth variant="contained" type="submit">Apply for Loan</Button>
      </Box>
    </Container>
  );
};

export default UserDashboard;
