import { Box, Button, Checkbox, Divider, FormControlLabel, Link, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";
import BackupIcon from '@mui/icons-material/Backup';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useDispatch, useSelector } from "react-redux";
import { downloadHypothesisReport, establishmentSummary, getResearchLinks } from "../services/apiService";
import { updateEstablishmentField, updateestablishmentField } from "../redux/slices/establishmentSlice";
import DownloadIcon from '@mui/icons-material/Download';

const EstablishmentCause = (props) => {
    const establishment = useSelector((state) => state.establishment);
    const rootCasueSummary = establishment.establishmentSummary.find(x => x.root_cause == props.page.root_cause);
    console.log("roorCause", rootCasueSummary);
    const [hypothesis, sethypothesis] = useState(rootCasueSummary?.hypothesis == true);
    const [report, setreport] = useState(rootCasueSummary?.report == true);
    const [reportText, setreportText] = useState(rootCasueSummary?.reportText);
    const [research, setresearch] = useState(rootCasueSummary?.research == true);
    const [approve, setApprpve] = useState(rootCasueSummary?.approve);
    const [researchLinks, setResearchLinks] = useState(rootCasueSummary?.researchLinks || []);
    const eventState = useSelector((state) => state.event);
    const [selectedPaper, setSelectedPaper] = useState(rootCasueSummary?.selectedPapers || []);
    const [researchSummary, setResearchSummary] = useState(rootCasueSummary?.researchSummary);
    const [comprehensiveSummary, setComprehensiveSummary] = useState(rootCasueSummary?.comprehensiveSummary);
    const [justifyContent, setjustifuContent] = useState(rootCasueSummary?.justifyContent);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateEstablishmentField({
            ...props.page, field: "report", value: report
        }));
        if (!research) {
            setreportText(null);
            dispatch(updateEstablishmentField({
                ...props.page, field: "reportText", value: null
            }));
        }
    }, [report]);

    useEffect(() => {
        dispatch(updateEstablishmentField({
            ...props.page, field: "research", value: research
        }));
        if (!research) {
            setResearchLinks([]);
            dispatch(updateEstablishmentField({
                ...props.page, field: "reseachLinks", value: []
            }));
        }
    }, [research]);

    useEffect(() => {
        dispatch(updateEstablishmentField({
            ...props.page, field: "reportText", value: reportText
        }));
    }, [reportText]);

    useEffect(() => {
        dispatch(updateEstablishmentField({
            ...props.page, field: "hypothesis", value: hypothesis
        }));
    }, [hypothesis]);

    useEffect(() => {
        dispatch(updateEstablishmentField({
            ...props.page, field: "justifyContent", value: justifyContent
        }))
    }, [justifyContent])

    const generateRootCause = () => {
        let req = {
            "product_name": eventState.product_name,
            "instrument_name": eventState.instrument_name,
            "test_name": eventState.test_name,
            "root_cause": props.page.root_cause
        }
        props.setLoading(true);
        getResearchLinks(req).then(res => {
            let articles = JSON.parse(res.data);
            setResearchLinks(articles.articles)
            dispatch(updateEstablishmentField({
                ...props.page, field: "researchLinks", value: articles.articles
            }))
            props.setLoading(false);
        }).catch(err => {
            props.setLoading(false);
        })
    }

    const handleRootcauseResponseChange = (e) => {
        setApprpve(e);
        dispatch(updateEstablishmentField({
            ...props.page, field: "approve", value: e
        }))
    }

    const onPaerSelect = (e, paper) => {
        debugger;
        let pap = [...selectedPaper];
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
        dispatch(updateEstablishmentField({
            ...props.page, field: "selectedPapers", value: pap
        }))
    }

    const getResearchSummary = () => {
        let sum = '';
        selectedPaper.map(x => {
            sum = sum + x.article_summary + '\n\n';
        })
        setResearchSummary(sum);
        dispatch(updateEstablishmentField({
            ...props.page, field: "researchSummary", value: sum
        }))
    }

    const getComprehenSiveSummary = () => {
        props.setLoading(true);
        let req = {
            event_details: eventState,
            relevant_research_work: selectedPaper,
            oem_sme_report: reportText
        }
        establishmentSummary(req).then(res => {
            setComprehensiveSummary(res.data);
            dispatch(updateEstablishmentField({
                ...props.page, field: "comprehensiveSummary", value: res.data
            }));
            props.setLoading(false);
        })
    }

    const downloadHypothesis = () => {
        props.setLoading(true);
        downloadHypothesisReport({ ...eventState, root_cause: props.page.root_cause }).then((response) => {
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
        })
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                {props.page.root_cause}
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid size={{ xs: 6 }}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, background: "#fff" }}>
                        <FormControlLabel control={<Checkbox onChange={(e) => sethypothesis(e.target.checked)} checked={hypothesis} />} label="Hypothesis Report" />
                        {hypothesis ? <>
                            <br></br>

                            <Button variant="outlined" component="label" startIcon={<DownloadIcon />} sx={{ width: '100%', py: 2 }}
                                onClick={downloadHypothesis}>
                                Download hypothesis document
                            </Button></>
                            : null}
                    </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, background: "#fff" }}>
                        <FormControlLabel
                            control={<Checkbox onChange={(e) => setreport(e.target.checked)} checked={report} />}
                            label="Report From OEM/SME" />
                        {report ? <>
                            <br></br>
                            <Typography variant="h8" sx={{ mt: 2 }}>
                                Details and Reference Number
                            </Typography>
                            <TextField fullWidth multiline
                                rows={4} placeholder="Input text"
                                variant="outlined" sx={{ mt: 1, mb: 2 }}
                                onChange={(e) => setreportText(e.target.value)}
                                value={reportText} />
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
                                <FormControlLabel control={<Checkbox onChange={(e) => setresearch(e.target.checked)} checked={research} />} label="Research Paper" />
                            </Grid>
                            <Grid size={{ xs: 4 }} sx={{ display: "flex", marginTop: "-24px" }}>
                                {research == true ? <>
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
                        {researchLinks ? <>
                            {researchLinks?.map(x => {
                                return (
                                    <>
                                        <FormControlLabel
                                            control={<Checkbox onChange={(e) => onPaerSelect(e, x)} checked={selectedPaper.findIndex(y => y.article_title == x.article_title) != -1} />}
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
                                    <Typography variant="h6" gutterBottom>
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
                                            onClick={getComprehenSiveSummary}
                                        >
                                            Generate Comprehensive Summary
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                            <TextField
                                fullWidth
                                multiline
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
                                    <Typography variant="h6" gutterBottom>
                                        Justification
                                    </Typography>

                                    <Divider />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <br />

                                    <Grid container>
                                        <Grid size={{ xs: 3 }}>
                                            <RadioGroup
                                                row
                                                value={approve}
                                                onChange={(e) => handleRootcauseResponseChange(e.target.value)}
                                            >
                                                <FormControlLabel value={true} control={<Radio />} label={"Approve"} />
                                                <FormControlLabel value={false} control={<Radio />} label={"Rule Out"} />
                                            </RadioGroup>
                                        </Grid>
                                        <Grid size={{ xs: 9 }}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                value={justifyContent}
                                                placeholder="content"
                                                sx={{ color: "#000 !important" }}
                                                onChange={e => setjustifuContent(e.target.value)}
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