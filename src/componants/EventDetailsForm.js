import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../redux/slices/eventSlice';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Header from './Header';
import Grid from '@mui/material/Grid2';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const EventDetailsForm = () => {
    const dispatch = useDispatch();
    const eventState = useSelector((state) => state.event);

    const handleChange = (field) => (event) => {
        dispatch(updateField({ field, value: event.target.value }));
    };

    const handleChangeSelect = (event,field) => {
        dispatch(updateField({ field, value: event.target.value }));
      };

    const onDrop = (acceptedFiles) => {
        console.log("Uploaded files:", acceptedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/svg+xml": [],
            "image/png": [],
            "image/jpeg": [],
            "image/gif": [],
        },
        maxFiles: 1,
        maxSize: 800 * 600, // Adjust file size as needed
    });

    return (
        <Box padding={4} sx={{background:"#fff", border:"1px solid #f5f5f5", borderRadius:2}}>
            <Typography variant="h5" gutterBottom>
                Event Details
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Event No."
                                value={eventState.eventNo}
                                onChange={handleChange('eventNo')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Event Description."
                                value={eventState.event_description}
                                onChange={handleChange('event_description')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Test Name"
                                value={eventState.test_name}
                                onChange={handleChange('test_name')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Equipment/Instrument Name"
                                value={eventState.instrument_name}
                                onChange={handleChange('instrument_name')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Equipment/Instrument Number"
                                value={eventState.instrument_number}
                                onChange={handleChange('instrument_number')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Description of Incident"
                                value={eventState.description_of_incident}
                                onChange={handleChange('description_of_incident')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Box
                                {...getRootProps()}
                                sx={{
                                    border: "2px dashed #d0d0d0",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    backgroundColor: isDragActive ? "#f0f8ff" : "white",
                                    "&:hover": { borderColor: "#007bff" },
                                    maxWidth: "400px",
                                    margin: "0 auto",
                                }}
                            >
                                <input {...getInputProps()} />
                                <CloudUploadIcon sx={{ fontSize: "40px", color: "#007bff" }} />
                                <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
                                    <Button
                                        component="span"
                                        variant="text"
                                        sx={{
                                            textDecoration: "underline",
                                            color: "#007bff",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Click to upload
                                    </Button>{" "}
                                    or drag and drop
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    SVG, PNG, JPG, or GIF (max 800x600px)
                                </Typography>
                            </Box>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Incident Type</InputLabel>

                            <Select
                                fullWidth
                                label="Incident Type"
                                value={eventState.incident_type}
                                onChange={(event)=>handleChangeSelect(event,'incident_type')}
                            >
                                <MenuItem value="Phase-I">Phase-I</MenuItem>
                                <MenuItem value="Phase-II">Phase-II</MenuItem>
                                <MenuItem value="Phase-III">Phase-III</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                value={eventState.product_name}
                                onChange={handleChange('product_name')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Analyst"
                                value={eventState.analyst}
                                onChange={handleChange('analyst')}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Detail Visual Symptoms"
                                value={eventState.detail_visual_symptoms}
                                onChange={handleChange('detail_visual_symptoms')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Immediate Actions Taken"
                                value={eventState.immediate_actions}
                                onChange={handleChange('immediate_actions')}
                            />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    );
};

export default EventDetailsForm;
