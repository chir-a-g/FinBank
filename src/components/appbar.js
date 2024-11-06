import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Import Button component
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Step 1: Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#000080', // Set primary color to navy blue
    },
  },
});

export default function SearchAppBar() {
  return (
    // Step 2: Wrap the component in ThemeProvider
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        {/* Set position to fixed */}
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Fin Bank
            </Typography>
            <Box sx={{ display: 'flex', gap: 6, marginLeft: 'auto', marginRight: '40px', alignItems: 'flex-start' }}> {/* Increased gap */}
              <Typography 
                variant="body1" 
                component={Link} 
                to="/" 
                style={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer', marginTop: '5px' }} // Added marginTop for vertical adjustment
              >
                HOME
              </Typography>
              <Typography 
                variant="body1" 
                component={Link} 
                to="/about" 
                style={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer', marginTop: '5px' }} // Added marginTop for vertical adjustment
              >
                ABOUT US
              </Typography>
              {/* Change LOGIN to a Button with specified color */}
              <Button 
                component={Link} 
                to="/login" 
                variant="contained" 
                sx={{ backgroundColor: '#FAFAFA', color: '#000080', '&:hover': { backgroundColor: '#E0E0E0' } }} // Set custom color and hover effect
              >
                LOGIN
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ mt: 8, p: 2 }}>
          {/* Other content goes here */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
