import { LinkButton } from '@/assets/Custom/buttonStyle';
import { logo } from '@/assets/img';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import OurProductDropDown from './OurProductDropDown';
import UserDropdown from './UserDropdown';

const pages = [
   { name: 'Home', path: '/' },
   { name: 'Dashboard', path: '/dashboard', protected: true },
];

const mobilePages = [
   { name: 'Home', path: '/' },
   { name: 'Dashboard', path: '/dashboard' },
   { name: 'Flooring', path: '/flooring' },
   { name: 'Tiles', path: '/tiles' },
   { name: 'CounterTop', path: '/countertop' },
   { name: 'Vanities', path: '/vanities' },
   { name: 'Kitchen Faucets', path: '/kitchenFaucets' },
   { name: 'Bathroom Faucets', path: '/bathroomFaucets' },
   { name: 'Cabinets', path: '/cabinets' },
];

export default function NavigationBar() {
   const [anchorElNav, setAnchorElNav] = useState(null);
   const [userData, setUserData] = useState({});

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   useEffect(() => {
      const userData = typeof window !== "undefined" ? JSON.parse(window.sessionStorage.getItem('user')) : null;
      setUserData(userData);
   }, [])
   return (
      <AppBar position="static" sx={{ bgcolor: 'transparent', color: 'black', boxShadow: 'none', paddingBlock: 1 }}>
         <Container maxWidth="lg">
            <Toolbar disableGutters>
               <LinkButton
                  variant="text"
                  sx={{ display: { xs: 'none', md: 'flex' }, bgcolor: 'transparent', fontSize: 18, fontWeight: 600 }}
               >
                  <Link href="/">
                     <Image src={logo} width={100} height={65} alt="logo" priority />
                  </Link>
               </LinkButton>
               <Box
                  sx={{
                     flexGrow: 1,
                     display: { xs: 'flex', md: 'none' },
                     width: '50%',
                  }}
               >
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: 'block', md: 'none' },
                     }}
                  >
                     {mobilePages.map((page, i) => (
                        <MenuItem key={i}>
                           <Link href={page.path}>{page.name}</Link>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <Box
                  sx={{
                     flexGrow: 1,
                     display: { xs: 'none', md: 'flex' },
                     justifyContent: 'flex-end',
                     gap: '20px',
                  }}
               >
                  {/* {JSON.stringify(userData)}
                  {pages.map((page, i) => (
                     userData ? 
                     <Link href={page.path} key={i}>
                        <LinkButton variant="text">{page.name}</LinkButton>
                     </Link> : ""
                  ))} */}

                  <Link href={'/'}>
                     <LinkButton variant="text">Home</LinkButton>
                  </Link>

                  {/* show dashboard when login  */}
                  {userData && <Link href={'/dashboard'}>
                     <LinkButton variant="text">Dashboard</LinkButton>
                  </Link>}

                  <OurProductDropDown />
               </Box>
               {/* If user loggedIn */}
               <UserDropdown />
            </Toolbar>
         </Container>
      </AppBar>
   );
}
