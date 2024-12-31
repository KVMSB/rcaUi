import { Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ChecklistIcon from '@mui/icons-material/Checklist';
import Grid from "@mui/material/Grid2";
import FinalRootCause from "./FinalRootCause";
import FlagIcon from '@mui/icons-material/Flag';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { conclusionSummary, trainingMaterial } from "../services/apiService";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Conclusion = (props) => {
    const event = useSelector(state => state.event);
    const establishment = useSelector((state) => state.establishment);
    const imapact = useSelector((state) => state.impactAssesment);
    const finalRootCause = establishment.establishmentSummary.filter(x => x.approve == "true");
    const [html, setHtml] = useState();
    useEffect(() => {
        if (event && imapact && finalRootCause) {
            props.setLoading(true);
            let req = {
                incident: event,
                impact_assessment: imapact,
                final_root_cause: finalRootCause[0]
            }
            conclusionSummary(req).then((res) => {
                setHtml(res.data?.html_output);
                props.setLoading(false);
            }).catch(err=>{
                console.error(err);
                props.setLoading(false);
            })
        }
    }, [event, imapact, establishment])


    const downloadTrainingMaterial = () => {
        let req = {
            incident: event,
            final_root_cause: finalRootCause[0]?.root_cause
        }
        props.setLoading(true);
        trainingMaterial(req).then((response) => {
            let fileName = response?.data?.filename;
            let base64String = response?.data?.file;

            const binaryString = atob(base64String);
            const binaryLength = binaryString.length;

            // Create a Uint8Array to hold the binary data
            const binaryData = new Uint8Array(binaryLength);
            for (let i = 0; i < binaryLength; i++) {
                binaryData[i] = binaryString.charCodeAt(i);
            }

            // Create a Blob from the binary data
            const blob = new Blob([binaryData], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
            // Create a download link
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = fileName;

            // Programmatically trigger the download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            props.setLoading(false);
        }).catch((error) => {
            props.setLoading(false);
            console.error("Error downloading file:", error);
        });
    }
    return (
        <>
            <Box sx={{ background: '#f5f5f5' }}>

                <Typography variant="h5" gutterBottom>
                    <ChecklistIcon /> <p>Conclusion</p>
                </Typography>
                <Grid container>

                    <Grid size={{ xs: 3 }}>
                        <Box sx={{ p: 2, background: "#fff", border: '1px solid #ccc', borderRadius: 2, mb: 2 }}>

                            <Typography variant="h6" gutterBottom>
                                <FlagIcon /> <p>FInal Root Cause</p>
                            </Typography>
                            <FinalRootCause />

                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            style={{
                                backgroundColor: '#f5f5f5',
                                color: '#000',
                                textTransform: 'none',
                                boxShadow: 'none',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                fontWeight: 'bold',
                            }}
                        >
                            Download RCA Report
                        </Button>
                        <br />
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            style={{
                                backgroundColor: '#f5f5f5',
                                color: '#000',
                                textTransform: 'none',
                                boxShadow: 'none',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                fontWeight: 'bold',
                            }}
                            onClick={downloadTrainingMaterial}
                        >
                            Download Training material
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 9 }}>
                        <Box p={3} pt={1} ml={1} sx={{ background: "#fff", border: '1px solid #ccc', borderRadius: 2 }}>
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Conclusion;