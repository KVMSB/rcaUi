import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Avatar, Typography, IconButton, TextField } from '@mui/material';
import Header from '../componants/Header';
import LoginPage from './login';

const investigations = [
  {
    eventNo: 'LIR000111',
    description: 'Sudden Spike of Chromatography chart of dolo 10 products',
    status: 'Open',
    activityBy: { name: 'Sri Ram', phone: '9876543211' },
    activityOn: '13 July 2024 | 14:30',
  },
  // Add more rows as needed
];

const Investigations = () => {
  const navigate = useNavigate();
  const loggedInn = sessionStorage.getItem("loggedinn");
  const handleRowClick = (eventNo) => {
    navigate(`/event/${eventNo}`); // Navigate to the Event Information tabs
  };
  const handleNewInvestigation = () => {
    navigate(`/event/new`); // Navigate to Event Information with a new state
  };

  return (
    <>

    {loggedInn?.toString()=="true"?
    <>
    <Header/>

    <Box sx={{ p: 3 }}>
      {/* Header */}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Investigations</Typography>
        <Button variant="contained" color="primary" onClick={handleNewInvestigation}>
          + New Investigation
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField label="Search by" variant="outlined" size="small" />
        <Button variant="outlined">This Week</Button>
        <Button variant="text" color="primary">
          Open
        </Button>
        <Button variant="text" color="default">
          Closed
        </Button>
      </Box>

      {/* Results Summary */}
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        08 Results Found
      </Typography>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event No.</TableCell>
              <TableCell>Event Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Activity By</TableCell>
              <TableCell>Activity On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investigations.map((row, index) => (
              <TableRow
                key={index}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(row.eventNo)}
              >
                <TableCell>{row.eventNo}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Typography color="orange">{row.status}</Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ bgcolor: 'orange' }}>
                      {row.activityBy.name.split(' ').map((word) => word[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography>{row.activityBy.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {row.activityBy.phone}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{row.activityOn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>:<LoginPage/>}
    </>
  );
};

export default Investigations;
