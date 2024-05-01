import { logoutHandle } from '@/Context/utility';
import { LinkButton } from '@/assets/Custom/buttonStyle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const settings = [
  // { name: 'Profile', path: '/dashboard/profile' },
  { name: 'All Product', path: '/all-product' },
  { name: 'Customer Cart', path: '/dashboard/customer-cart' }
];

export default function UserDropdown() {
  const userData =
    typeof window !== 'undefined' ? JSON.parse(window.sessionStorage.getItem('user')) : null;
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Link href="/my-cart" style={{ marginLeft: 7 }}>
        <LinkButton
          variant="text"
          sx={{ minWidth: 'max-content' }}
          startIcon={
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
            </Badge>
          }
        >
          My Cart
        </LinkButton>
      </Link>
      <Box sx={{ flexGrow: 0, marginLeft: '10px' }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar />
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {userData && (
            <Link href="/dashboard/profile">
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
            </Link>
          )}
          {settings.map((setting, i) => (
            <Link href={setting.path} key={i}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>
            </Link>
          ))}
          {userData ? (
            <MenuItem
              onClick={() => {
                logoutHandle();
                router.reload();
              }}
            >
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          ) : (
            <Link href="/login">
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Login</Typography>
              </MenuItem>
            </Link>
          )}
        </Menu>
      </Box>
    </>
  );
}
