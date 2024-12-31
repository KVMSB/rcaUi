import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const loggedInn = sessionStorage.getItem("loggedinn");
  const email = sessionStorage.getItem("Email");
  const navigate = useNavigate();

  const logOut = () => {
    sessionStorage.clear();
    navigate('/');
  }
  return (
    <AppBar position="static" className='header'>

      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img src="/DeepForrest_logo.svg" class="logo" />
            <Typography
              variant="h6"
              noWrap
              component="div"
              class="logodiv"
              sx={{ display: { xs: 'block' } }}
            >
              - RCA
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

          </Box>
          {loggedInn?.toString() == "true" ?
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 0 }}>
              <NotificationsIcon sx={{ color: '#fff' }} />
              <Avatar sx={{ bgcolor: '#ff9800' }}>{"userName".split(' ')[0][0] || 'U'}</Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {email}
                </Typography>
                <Typography variant="caption" sx={{ color: '#fff' }} >
                  <a
                    href="#"
                    style={{ color: "#fff" }}
                    onClick={logOut}
                  >LogOut</a>
                </Typography>
              </Box>
            </Box> : null}
        </Toolbar>

      </Container>
    </AppBar>
  );
};

export default Header;
