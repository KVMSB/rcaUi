import React, { useEffect, useState } from "react";
import { Box, Grid2, List, ListItem, ListItemButton, SvgIcon, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid2';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import EstablishmentCause from "./EstablishmentCause";

const Establishment = (props) => {
  const [pages, setPages] = useState([]);
  const eventState = useSelector((state) => state.event);
  const probabaleCause = useSelector((state) => state.probableCause);
  const establishment = useSelector((state) => state.establishment);
  const [selectedPage, setSelectedPage] = useState(probabaleCause?.probable_cause[0]?.root_cause);

  useEffect(() => {
    if (probabaleCause?.probable_cause) {
      setPages(probabaleCause?.probable_cause);
    }
  }, [probabaleCause])

  const changePage = (pageName) => {

    // page.setActive(); // Switch to the selected page
    setSelectedPage(pageName);

  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid size={{ xs: 3 }}>
          {/* Title Section */}
            <Grid size={{ xs: 12 }}>
              <Grid container>
                <Typography variant="h6" gutterBottom>

                  <SearchIcon sx={{ fontSize: 30, color: 'gray' }} />
                  <p>Establishment</p>
                </Typography>
                <List  sx={{color:"#627D91", alignItems:"baseline", fontSize:"14px"}} >
                  {pages.map((page) => {
                    return page.approve == "approve" ?
                      <ListItem
                        button
                        key={page.name}
                        className={selectedPage === page.root_cause ? 'selected' : ''}
                      >
                        <ListItemButton
                          selected={selectedPage === page?.root_cause}
                          className='listBtn'
                          onClick={() => changePage(page?.root_cause)}
                        >
                          {establishment?.establishmentSummary?.find(x => x?.approve == true)?.root_cause == page.root_cause ?
                            <CheckCircleOutlineIcon />
                            : establishment?.establishmentSummary?.find(x => x?.approve == false)?.root_cause == page.root_cause ?
                              <HighlightOffIcon />
                              : <PanoramaFishEyeIcon />}

                          {page.root_cause}
                        </ListItemButton>
                      </ListItem> : null
                  })}
                </List>
              </Grid>
            </Grid>
        </Grid>
        <Grid size={{ xs: 9 }}>
          {pages.map((page) => {
            return selectedPage == page.root_cause ? <EstablishmentCause page={page} setLoading={props.setLoading}/> : null
          })}
        </Grid>
      </Grid>
    </Box>
  );
};
export default Establishment;