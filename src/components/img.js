// ImageTextComponent.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ImageTextComponent() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 2}}>
      {/* Image on the left */}
      <Box
        component="img"
        src="https://images.shiksha.com/mediadata/shikshaOnline/mailers/2021/naukri-learning/oct/27oct/What-is-Consumer-Banking.jpg"
        alt="Description"
        sx={{ width: 750, height: 450, borderRadius: 0, marginRight: 2 }}
      />

      {/* Text on the right */}
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Typography variant="h3" gutterBottom >
            Welcome to Fin Bank
        </Typography>
        <Typography variant="h5">
            Where the world comes to BANK.
        </Typography>
      </Box>
    </Box>
  );
}
