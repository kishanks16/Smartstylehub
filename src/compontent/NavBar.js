import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navbar() {

    
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };
  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar component="nav"  sx={{ padding:'8px 16px', backgroundColor: "rgb(230 146 58)", color:'black' , }} >
      <Toolbar sx={{minHeight:'94px',padding:'8px 16px' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 3, display: { sm: 'none' } }}
        >
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >  Color Detect
        </Typography>
        <Box  sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '155px', fontSize: "48px" }}>
        <Button color="inherit" style={{ fontSize: '16px'}} component={Link} to="/">Home</Button>
        <Button color="inherit" style={{ fontSize: '16px'}} component={Link} to="/login">Login</Button>
        <Button color="inherit"  style={{ fontSize: '16px'}} component={Link} to="/register">Registration</Button>
        </Box>
      </Toolbar>
    </AppBar>
    {/* <nav>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </nav> */}
    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
     
    </Box>
  </Box>
  )
}

export default Navbar