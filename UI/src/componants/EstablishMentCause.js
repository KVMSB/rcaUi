import { Box, Button, Checkbox, Divider, FormControlLabel, Link, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import BackupIcon from '@mui/icons-material/Backup';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useDispatch, useSelector } from "react-redux";
import { getResearchLinks } from "../services/apiService";
import { updateestablishmentField } from "../redux/slices/establishmentSlice";

const EstablishmentCause = (props) => {
    const [hypothesis, sethypothesis] = useState(false);
    const [report, setreport] = useState(false);
    const [research, setresearch] = useState(false);
    const [approve, setApprpve] = useState(false);
    const [summary, setSummary] = useState();
    const [reseachLinks, setResearchLinks] = useState([]);
    const establishment = useSelector((state) => state.establishment);
    const eventState = useSelector((state) => state.event);
    const [selectedPaper, setSelectedPaper] = useState([]);
    const [researchSummary, setResearchSummary] = useState();
    const [comprehensiveSummary, setComprehensiveSummary] = useState();
    const [justifyContent, setjustifuContent] = useState();
    const dispatch = useDispatch();

    const generateRootCause = () => {
        let req = {
            "product_name": eventState.product_name,
            "instrument_name": eventState.instrument_name,
            "test_name": eventState.test_name,
            "root_cause": props.root_cause
        }
        props.setLoading(true);
        getResearchLinks(req).then(res => {
            setResearchLinks(res?.data?.articles)
            props.setLoading(false);
        }).catch(err => {
            props.setLoading(false);
        })
    }

    const handleRootcauseResponseChange=(e)=>{
        setApprpve(e);
        dispatch(updateestablishmentField({
            ...props.page, approve:e
        }))
    }

    const onPaerSelect = (e, paper) => {
        let pap = selectedPaper;
        if (!e.target.checked) {
            let ind = pap.findIndex(x => x.article_url == paper.article_url);
            if (ind != -1) {
                pap.slice(ind, 1);
            }
        }
        else {
            pap.push(paper);
        }
        setSelectedPaper(pap);
    }

    const getResearchSummary = () => {
        setResearchSummary("Deviation might have occurred during layer separation or filtration of the reaction mass through centrifuge. Although no critical process parameters were associated, the process might have been compromised")
    }

    const getComprehenSiveSummary = () => {
        setComprehensiveSummary("Deviation might have occurred during layer separation or filtration of the reaction mass through centrifuge. Although no critical process parameters were associated, the process might have been compromised")
    }

    const onChangeJustifyContent = (event) => {
        setjustifuContent(event.target.value);
    }
    return (
        <>
            <Typography variant="h6" className="header" gutterBottom>
                {props.page.root_cause}
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid size={{ xs: 6 }}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, background: "#fff" }}>
                        <FormControlLabel control={<Checkbox onChange={(e) => sethypothesis(e.target.checked)} />} label="Hypothesis Report" />
                        {hypothesis ? <>
                            <br></br>
                            <Typography variant="h8" sx={{ mt: 2 }}>
                                Details and Reference Number
                            </Typography>
                            <TextField fullWidth multiline rows={4} placeholder="Input text" variant="outlined" sx={{ mt: 1, mb: 2 }} />
                            <Button variant="outlined" component="label" startIcon={<BackupIcon />} sx={{ width: '100%', py: 2 }} >
                                Click to upload or drag and drop PDF
                                <input type="file" hidden />
                            </Button></>
                            : null}
                    </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, background: "#fff" }}>
                        <FormControlLabel
                            control={<Checkbox onChange={(e) => setreport(e.target.checked)} />}
                            label="Report From OEM/SME" />
                        {report ? <>
                            <br></br>
                            <Typography variant="h8" sx={{ mt: 2 }}>
                                Details and Reference Number
                            </Typography>
                            <TextField fullWidth multiline
                                rows={4} placeholder="Input text"
                                variant="outlined" sx={{ mt: 1, mb: 2 }} />
                            <Button variant="outlined" component="label" startIcon={<BackupIcon />} sx={{ width: '100%', py: 2 }} >
                                Click to upload or drag and drop PDF
                                <input type="file" hidden />
                            </Button></>
                            : null}
                    </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, background: "#fff" }}>
                        <Grid container>

                            <Grid size={{ xs: 8 }}>
                                <FormControlLabel control={<Checkbox onChange={(e) => setresearch(e.target.checked)} />} label="Research Paper" />
                            </Grid>
                            <Grid size={{ xs: 4 }} sx={{ display: "flex", marginTop: "-24px" }}>
                                {research ? <>
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
                                            Generate Suggestions
                                        </Button>

                                    </Box>

                                </>
                                    : null}
                            </Grid>

                        </Grid>
                        <Divider />
                        {reseachLinks ? <>
                            {reseachLinks?.map(x => {
                                return (
                                    <>
                                        <FormControlLabel
                                            control={<Checkbox onChange={(e) => onPaerSelect(e, x)} />}
                                            label={x.article_url ? <Link href={x.article_url} target="_blank" rel="noopener">
                                                {x.article_title} </Link> : <p>{x.article_title}</p>} />
                                    </>)
                            })}
                        </> : null}
                        <Divider />
                        {selectedPaper.length > 1 ?
                            <Box sx={{ color: "gray", pt: "1rem" }}>
                                <Grid container>
                                    <Grid size={{ xs: 8 }}>
                                        <p>Selected Research Paper Summary</p>
                                    </Grid>
                                    <Grid size={{ xs: 4 }} sx={{ display: "flex", marginTop: "-30px" }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-end", // Aligns the button to the right
                                                width: "100%", // Ensure it takes the full width of its container
                                                padding: "16px", // Optional padding around the button
                                            }}>
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
                                                onClick={getResearchSummary}>
                                                Generate Summary
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <TextField
                                    fullWidth
                                    multiline
                                    InputProps={{ readOnly: true, }}
                                    value={researchSummary}
                                    sx={{ color: "#000 !important" }}
                                    rows={4} />
                            </Box>
                            : null}
                    </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, background: "#fff" }}>

                        <Box sx={{ color: "#000", pt: "1rem" }}>
                            <Grid container>
                                <Grid size={{ xs: 7 }}>
                                    <Typography variant="h6" className="header" gutterBottom>
                                        Establishment Summary
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 5 }} sx={{ display: "flex", marginTop: "-30px" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end", // Aligns the button to the right
                                            width: "100%", // Ensure it takes the full width of its container
                                            padding: "16px", // Optional padding around the button
                                        }}>
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
                                            onClick={getComprehenSiveSummary}>
                                            Generate Comprehensive Summary
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                            <TextField
                                fullWidth
                                multiline
                                InputProps={{ readOnly: true, }}
                                value={comprehensiveSummary}
                                sx={{ color: "#000 !important" }}
                                rows={4} />
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, background: "#fff" }}>

                        <Box sx={{ color: "#000", pt: "1rem" }}>
                            <Grid container>
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="h6" className="header" gutterBottom>
                                        Justification
                                    </Typography>

                                    <Divider />
                                    </Grid>
                                <Grid size={{ xs: 12 }}>
                                <br/>

                                    <Grid container>
                                        <Grid size={{ xs: 3 }}>
                                            <RadioGroup
                                                row
                                                value={approve}
                                                onChange={(e) => handleRootcauseResponseChange(e.target.value)}
                                            >
                                                <FormControlLabel value={true} control={<Radio />} label={"Approve"} />
                                                <FormControlLabel value={false} control={<Radio />} label={"Role Out"} />
                                            </RadioGroup>
                                        </Grid>
                                        <Grid size={{ xs: 9 }}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                value={justifyContent}
                                                placeholder="content"
                                                sx={{ color: "#000 !important" }}
                                                rows={4} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default EstablishmentCause;