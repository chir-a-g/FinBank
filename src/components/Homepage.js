import ImageTextComponent from './img';
import React from 'react';
import SearchAppBar from './appbar';
import ServicesSection from './services';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Homepage = () => {
  return (
    <div style={{ backgroundColor: '#FAFAFA' }}>
      <SearchAppBar />
      <div>
        <ImageTextComponent />
      </div>
      <ServicesSection />
      <Box
        component="img"
        src="https://static.vecteezy.com/system/resources/previews/024/268/985/non_2x/multinational-large-group-of-people-isolated-on-white-background-children-adults-and-teenagers-stand-together-illustration-vector.jpg"
        alt="Description"
        sx={{ width: 1450, height: 450, borderRadius: 0, marginRight: 2 }}
      />

      {/* SECURITY Section */}
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          SECURITY
        </Typography>
        <Typography variant="body1" color="text.secondary">
          At Fin Bank, your security is our top priority. We utilize advanced encryption technologies and multi-factor authentication to ensure that your financial information is always safe. Our dedicated team monitors accounts 24/7 to protect against fraud and unauthorized access. Trust us to keep your assets secure as you bank with confidence.
        </Typography>
      </Box>

      {/* Copyright Section */}
      <Box sx={{ textAlign: 'center', padding: 2, borderTop: '1px solid #e0e0e0', marginTop: '20px' }}>
        <Typography variant="body2" color="text.secondary">
          © 2024 Fin Bank. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default Homepage;

