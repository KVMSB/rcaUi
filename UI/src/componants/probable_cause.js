import React, { useEffect, useState } from 'react';
import { Container, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, Button, Box, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ChecklistIcon from '@mui/icons-material/Checklist';
import { getInvestigationQuestions, getProbableCause } from '../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { updateCauseField } from '../redux/slices/probabalecauseSlice';

const Checklist = (props) => {

  const eventState = useSelector((state) => state.event);
  const [gridRows, setGridRows] = useState([]);
  const [rootCauseRows, setRootCauseRows] = useState([]);
  const dispatch = useDispatch();
  const probabaleCause = useSelector((state) => state.probabalecause);

  useEffect(()=>{
    dispatch(updateCauseField({ field:'probable_cause_questions', value: gridRows }));
  },[gridRows])

  
  useEffect(()=>{
    dispatch(updateCauseField({ field:'probable_cause', value: rootCauseRows }));
  },[rootCauseRows])

  useEffect(() => {
    if (eventState && !probabaleCause) {
      props.setLoading(true);
      getInvestigationQuestions(eventState).then((res) => {
        if (res.status == 200) {
          let questions = res.data.questions;
          let rows = questions.map((question, index) => ({
            id: index + 1,
            question,
            answer: "Maybe", // Default response
          }));
          setGridRows(rows);
          props.setLoading(false);

        }
      }).catch((err) => {
        console.log(err);
        props.setLoading(false);
      });
    }

  }, [eventState, probabaleCause]);


  const handleResponseChange = (id, newResponse) => {
    setGridRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, answer: newResponse } : row
      )
    );
  };

  const handleRootcauseResponseChange = (id, newResponse) => {
    setRootCauseRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, approve: newResponse } : row
      )
    );
  };

  const handleRootcauseJustificationChange = (id, newResponse) => {
    setRootCauseRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, justification: newResponse } : row
      )
    );
  };

  const columns = [
    { field: "question", headerName: "Question", flex: 1 },
    {
      field: "answer",
      headerName: "Response",
      flex: 0.5,
      renderCell: (params) => (
        <RadioGroup
          row
          value={params.row.answer}
          onChange={(e) => handleResponseChange(params.row.id, e.target.value)}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          <FormControlLabel value="Maybe" control={<Radio />} label="Maybe" />
        </RadioGroup>
      ),
    },
  ];

  const rootCauseColumns = [
    {
      field: "root_cause", headerName: "Probable causes", width: 250, renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: 1.5 }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "details", headerName: "Description", width: 280, renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: 1.5 }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "capa", headerName: "CAPA", width: 250, renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', lineHeight: 1.5 }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "approve", headerName: "Approve/Role out", width: 150,
      renderCell: (params) => (
        <RadioGroup
          row
          value={params.row.approve}
          onChange={(e) => handleRootcauseResponseChange(params.row.id, e.target.value)}
        >
          <FormControlLabel value={"approve"} control={<Radio />} label={"Approve"} />
          <FormControlLabel value={"roleOut"} control={<Radio />} label={"Role Out"} />
        </RadioGroup>
      ),
    },

    {
      field: "justification", headerName: "Justification", width: 300,
      renderCell: (params) => (
        <div style={{ padding: "5px" }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={params.row.justification}
            onChange={(event) => handleRootcauseJustificationChange(params.row.id, event.target.value)}
          />
        </div>
      )
    },
  ]

  const generateRootCause = () => {
    let request = {
      incident: eventState,
      questions: gridRows
    }
    dispatch(updateCauseField({ field:'probable_cause_questions', value: gridRows }));
    props.setLoading(true);
    getProbableCause(request).then((res) => {
      if (res.status == 200) {
        let probable_root_causes = res.data.probable_root_causes;
        let rows = probable_root_causes.map((cause, index) => ({
          id: index + 1,
          ...cause,
          aprrove: null, // Default response
          justification: null
        }));
        setRootCauseRows(rows);
        props.setLoading(false);
      }
      props.setLoading(false);
    }).catch((err) => {
      console.log(err);
      props.setLoading(false);
    });
  }

  return (
    <div style={{ width: "100% !important" }}>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Probable Root Cause
        </Typography>
        <Typography variant="h6" gutterBottom>
          <ChecklistIcon /> <p>Checklist</p>
        </Typography>
        <DataGrid
          rows={gridRows}
          columns={columns}
          pagination={false} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Aligns the button to the right
            width: "100%", // Ensure it takes the full width of its container
            padding: "16px", // Optional padding around the button
          }}
        >
          <Button
            variant="outlined"
            startIcon={<AutoAwesomeIcon />}
            sx={{
              textTransform: "none", // Keeps text casing as provided
              color: "#0A74DA", // Blue text color
              borderColor: "#B8DDF9", // Light blue border color
              marginTop: "0.5rem",
              backgroundColor: "#F6FAFE", // Light background
              "&:hover": {
                backgroundColor: "#E9F5FF", // Slightly darker on hover
                borderColor: "#90C4F8", // Change border color on hover
              },
            }}
            onClick={generateRootCause}
          >
            Generate Probable Causes
          </Button>
        </Box>
      </Paper>
      {rootCauseRows.length > 1 ?
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            <CrisisAlertIcon /> <p>Probable Root Cause</p>
          </Typography>
          <DataGrid
            rows={rootCauseRows}
            columns={rootCauseColumns}
            pagination={false}
            getRowHeight={() => 'auto'} />
        </Paper> : null}
    </div>
  );
};

export default Checklist;
