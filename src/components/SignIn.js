import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [bankId, setBankId] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('user'); // Default to user
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Convert balance to an integer (in case the user enters a string or decimal)
    const balanceInt = parseInt(balance, 10);

    try {
      const response = await axios.post('http://localhost:5000/signup', { bankId, password, type, balance: balanceInt });
      if (response.data.status === 'success') {
        alert(response.data.message || 'Sign Up successful');
        navigate('/login'); // Redirect to Login page after successful sign up
      } else {
        alert(response.data.message || 'Sign Up failed');
      }
    } catch (error) {
      console.error('Sign Up error:', error);
      alert('An error occurred during Sign Up. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, p: 3, borderRadius: 2, boxShadow: 3, bgcolor: '#f5f5f5' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Bank Sign Up
        </Typography>
        <form onSubmit={handleSignUp}>
          <TextField
            fullWidth
            label="Bank ID"
            variant="outlined"
            margin="normal"
            value={bankId}
            onChange={(e) => setBankId(e.target.value)}
            required
            sx={{ mb: 2 }} // Margin-bottom for spacing
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }} // Margin-bottom for spacing
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 4, mt: 2 }}> {/* Add margin-top for more spacing */}
            <InputLabel>User Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="User Type"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Initial Balance"
            type="number"
            variant="outlined"
            margin="normal"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            sx={{ mb: 2 }} // Optional, for user account
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
