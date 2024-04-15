import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import landimg from '../compontent/assets/land.png'
import NavBar from '../compontent/NavBar';


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];
function LandingPage() {

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
           Color Detect
          </Typography>
          <Divider />
         
        </Box>
      );
    const container = window !== undefined ? () => window().document.body : undefined;
  return (
<div style={{ backgroundImage: `url(${landimg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>

   <NavBar/>

</div>
);
}

export default LandingPage