import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateComplainceField, updatePracticeField, updateProcessField, updateProductField } from '../redux/slices/impactAssesmentSlice';

const ImpactAssessmentQuestions = (props) => {
  const [rows, setRows] = useState();

  useEffect(()=>{
    setRows(props.questions);
  },[props.questions]);

  const impactAssement = useSelector(state => state.impactAssesment);
  const dispacth = useDispatch();
  const ans = impactAssement[props?.type?.toLowerCase()];
  const onAnswer = (e, id) => {
    let qes = rows.map(row => ({ ...row }));

    // Find the index of the item to update
    const index = qes.findIndex(item => item.id === id);

    // Update the answer for the specific row
    if (index !== -1) {
        qes[index] = { ...qes[index], answer: e.target.value };
    }

setRows(qes);
    switch (props?.type.toLowerCase()) {
      case "product":
        dispacth(updateProductField(qes[index]));
        break;
      case "process":
        dispacth(updateProcessField(qes[index]));
        break;
      case "practice":
        dispacth(updatePracticeField(qes[index]));
        break;
      case "regulatory compliance":
        dispacth(updateComplainceField(qes[index]));
        break;
      default:
        break;
    }
  }


  return (

    <>

      <TableContainer component={Paper}>
        <Table border={1}>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Descriptive Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell width={"300"}>{row.question}</TableCell>
                <TableCell style={{ color: '#007bff', cursor: 'pointer' }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    onChange={(e) => onAnswer(e, row.id)}
                    value={row.answer}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ImpactAssessmentQuestions;
