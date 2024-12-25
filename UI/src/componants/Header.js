import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Grid from '@mui/material/Grid2';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
  
    return (
      <AppBar position="static">
          
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1}}>

            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            
           
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 0  }}>
        <NotificationsIcon sx={{ color: 'red' }} />
        <Avatar sx={{ bgcolor: '#ff9800' }}>{"userName".split(' ')[0][0] || 'U'}</Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            userName
          </Typography>
          <Typography variant="caption" sx={{ color: '#666' }}>
            userRole, userID
          </Typography>
        </Box>
      </Box>
      </Toolbar>

        </Container>
      </AppBar>
    );
};

export default Header;
