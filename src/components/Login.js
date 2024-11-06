import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [bankId, setBankId] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('user'); // Default to user
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await axios.post('http://localhost:5000/login', { bankId, password, type });
      if (response.data.status === 'success') {
        localStorage.setItem('bankId', bankId); // Store the bankId
        if (response.data.type === 'user') {
          navigate('/user-dashboard');
        } else if (response.data.type === 'employee') {
          navigate('/employee-dashboard');
        }
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, p: 3, borderRadius: 2, boxShadow: 3, bgcolor: '#f5f5f5' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Bank Login
        </Typography>
        <form onSubmit={handleLogin}>
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
