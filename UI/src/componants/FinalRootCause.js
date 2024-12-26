import React from 'react';
import { Box, Typography, TextField, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import BeenhereIcon from '@mui/icons-material/Beenhere';

const FinalRootCause = () => {
    const establishment = useSelector((state) => state.establishment);

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, mb: 2 }}>
      <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight:600, fontSize:"1rem" }}>
        Improper Diluent Used
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value="The Diluent Bottle Near The Test Preparation Was Identified As Belonging To Atorvastatin Calcium Organic Impurities. This Suggests That The Incorrect Diluent May Have Been Used, Leading To The Retention Time (RT) Shift."
        variant="outlined"
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />
      <Box sx={{  border: '1px solid #ccc', borderRadius: 2 , color:"#447553"}}>
     <Box sx={{  borderBottom: '1px solid #ccc', bgcolor: '#DFEDE4', p:0.5 }}>
      <Typography variant="h6" component="div" sx={{ mb: 1,fontSize:"1rem" }}>
      
        <BeenhereIcon/><p>CAPA</p>
        
      </Typography>
     </Box>
      <TextField
        fullWidth
        multiline
        rows={2}
        value="Ensure All Reagents And Diluents Are Clearly Labeled And Stored In Designated Areas To Prevent Mix-Ups."
        variant="outlined"
        InputProps={{ readOnly: true }}
      />
      </Box>
    </Box>
  );
};

export default FinalRootCause;
