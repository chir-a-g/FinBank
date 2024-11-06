import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Card, CardContent} from '@mui/material';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const fetchUserData = async (bankId) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/details/${bankId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Error fetching user data');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!userId) return alert('Please enter a User ID');

    await fetchUserData(userId);
  };

  const handleApproveLoan = async () => {
    if (!userData) return alert('No user data available to approve loan.');

    try {
      const response = await axios.post(`http://localhost:5000/user/approveLoan`, { bankId: userData.bankId });
      alert(response.data.message);
      setStatus(response.data.status);
      fetchUserData(userData.bankId); // Refresh user data after approval
    } catch (error) {
      console.error('Error approving loan:', error);
      alert('Error approving loan');
    }
  };

  const handleLogout = () => {
    setUserData(null);
    setUserId('');
    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Button onClick={handleLogout} variant="outlined" color="secondary" sx={{ position: 'absolute', top: 16, right: 36 }}>
        Logout
      </Button>
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Search User</Typography>
        <TextField 
          fullWidth 
          label="User ID" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          sx={{ mb: 2 }} 
        />
        <Button fullWidth variant="contained" type="submit">Search</Button>
      </Box>
      {userData && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">User Details</Typography>
            <Typography variant="body1">Bank ID: {userData.bankId}</Typography>
            <Typography variant="body1">Balance: ${userData.balance}</Typography>
            <Typography variant="body1">Loans: {userData.loans.length}</Typography>
            <Typography variant="body1">Status: {status}</Typography>
          </CardContent>
        </Card>
      )}
      {userData && (
        <Box sx={{ mb: 3 }}>
          <Button variant="contained" color="primary" onClick={handleApproveLoan}>
            Approve Loan
          </Button>
        </Box>
      )}
    </Container>
  );
};
export default EmployeeDashboard;
