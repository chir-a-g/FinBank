// ServicesSection.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

export default function ServicesSection() {
  const services = [
    {
      title: 'Personalized Accounts',
      description: 'Flexible options to adapt to your life goals and finances.',
      imageUrl: 'https://a0.anyrgb.com/pngimg/1806/384/accounting-information-system-financial-analysis-financial-accounting-financial-management-financial-statement-accounting-software-bookkeeping-audit-accountant-account.png', // Replace with your actual image URL
    },
    {
      title: 'Investment Advisory',
      description: 'Guidance and tools to help you grow your wealth securely.',
      imageUrl: 'https://img.freepik.com/premium-vector/professional-business-advisor-with-client-office-consultation-meeting_1322553-61703.jpg', // Replace with your actual image URL
    },
    {
      title: 'Loan Solutions',
      description: 'Get loans with competitive rates and easy applications.',
      imageUrl: 'https://thumbs.dreamstime.com/b/black-history-comes-alive-as-group-students-sit-attentively-juneteenth-grants-workshop-absorbing-knowledge-316375379.jpg', // Replace with your actual image URL
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {/* Section Heading */}
      <Typography variant="h4" gutterBottom textAlign="center">
        Services We Offer
      </Typography>

      {/* Cards Layout */}
      <Grid container spacing={4} justifyContent="flex-start" sx={{ marginLeft: '20px' }}> {/* Add marginLeft to the Grid container */}
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={service.imageUrl}
                alt={service.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
