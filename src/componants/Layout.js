import React, { useEffect, useState } from 'react';
import { AppBar, Tabs, Tab, Box, Button, Typography, Container, Grid2 } from '@mui/material';
import EventDetailsForm from './EventDetailsForm';
import Header from './Header';
import { useSelector } from 'react-redux';
import Checklist from './probable_cause';
import { ApiCallWithLoader } from './loader';
import Establishment from './Establishment';
import FinalRootCause from './FinalRootCause';
import ImpactAssessment from './ImpactAssessment';
import Conclusion from './Conclusion';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      hidden={value !== index}
      sx={{
        flex: 1, // Ensures it fills available space
        overflowY: 'auto', // Adds vertical scroll
        padding: 2,
      }}
    >
      {value === index && children}
    </Box>
  );
}

const Layout = (params) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [eventNum, setEventNum] = useState(params.eventNo) // Get the event number from the URL
  const eventState = useSelector((state) => state.event);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEventNum(eventState.eventNo)
  }, [eventState])

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleNextTab = (nextIndex) => {
    setTabIndex(nextIndex);
  };

  return (
    <Box >
      {eventNum != 'new' ?
        <Typography variant="h6" sx={{ p: 2 }}>
          Event Information: {eventNum}
        </Typography> :
        <Typography variant="h6" sx={{ p: 2 }}>
          Create new Event
        </Typography>
      }
      {/* AppBar and Tabs */}
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          fullWidth
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="navigation tabs"
        >
          <Tab label="Event Details" />
          <Tab label="Probable Cause" />
          <Tab label="Establishment" />
          <Tab label="Final Root Cause" />
          <Tab label="Impact Assessment" />
          <Tab label="Conclusion" />
        </Tabs>
      </AppBar>
      <ApiCallWithLoader loading={loading} />

      <Box sx={{ background: "rgb(247,248,249)"}}>
        {/* Tab Panels */}
        <TabPanel value={tabIndex} index={0} onNext={handleNextTab}>
          <Container fixed>
            <EventDetailsForm />
          </Container>

        </TabPanel>
        <TabPanel value={tabIndex} index={1} onNext={handleNextTab}>
          <Checklist setLoading={setLoading} />
        </TabPanel>
        <TabPanel value={tabIndex} index={2} onNext={handleNextTab}>
          <Establishment setLoading={setLoading} />
        </TabPanel>
        <TabPanel value={tabIndex} index={3} onNext={handleNextTab}>
          <Container fixed>
            <FinalRootCause />
          </Container>

        </TabPanel>
        <TabPanel value={tabIndex} index={4} onNext={handleNextTab}>
         <ImpactAssessment setLoading={setLoading} />
        </TabPanel>
        <TabPanel value={tabIndex} index={5} onNext={handleNextTab}>
          <Conclusion setLoading={setLoading} />
        </TabPanel>
      </Box>
      <Box display="flex" justifyContent="end" pt={1} mt={1} sx={{
        backgroundColor: 'white',
        boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)',
        padding: 2,
        display: 'flex',
        justifyContent: 'end',
        zIndex: 1000,
      }}>
        {tabIndex < 5 ? (
          <>
            <Grid2 container columnSpacing={1} mr={3.5}>
              <Grid2 size={{ xs: 9 }}>
                <Button variant="outlined" onClick={() => { }}>
                  Save as Draft
                </Button>
              </Grid2>
              <Grid2 size={{ xs: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNextTab(tabIndex + 1)}
                >
                  Next
                </Button>
              </Grid2>
            </Grid2>
          </>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={() => alert('Process Completed!')}
          >
            Completed
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Layout;
