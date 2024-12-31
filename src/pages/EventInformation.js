import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import Layout from '../componants/Layout';
import Header from '../componants/Header';

const TabPanel = ({ children, value, index }) => {
  return (
    value === index && <Box sx={{ p: 3 }}>{children}</Box>
  );
};

const EventInformation = () => {
  const { eventNo } = useParams(); // Get the event number from the URL
  

  return (
    <>
    <Header/>

    <Box sx={{background:"rgb(247,248,249)"}}>
     
      <Layout eventNo={eventNo}/>
    </Box>
    </>
  );
};

export default EventInformation;
