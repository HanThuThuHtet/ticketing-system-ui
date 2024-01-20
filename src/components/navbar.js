
import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AccountCircleRounded, Logout } from '@mui/icons-material';

const pages = ['tickets','queues','statuses'];

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [username,setUsername] = useState();

    const router = useRouter();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };


      const handleSubmit = async(e) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
        }

        let result = await axios({
            method: 'post',
            url: 'logout',
            baseURL: 'http://localhost:8080/api/',
            headers: headers
        });

        let response = result.data;
        console.log(response);

        if(response['success']){
            console.log("Logout success");
            localStorage.removeItem('token');
            localStorage.removeItem('auth');
            router.push('/user/login');
        }else{
            console.log("Logout failed");
        }

    }

    

      useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (auth) {
          const authUser = JSON.parse(auth);
          setUsername(authUser.name);
        }
      }, []); 
      

  return (
    
    <AppBar position="static" sx={{
        background: '#263238',
      }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'primary',
              textDecoration: 'none',
            }}
          >
            <Link href="/">Ticketing System</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" className='capitalize'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link href="/">Ticketing System</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
                className={router.pathname === `/${page}` ? 'bg-sky-100 text-sky-800' : 'text-white'}
              >
                <Link href={`/${page}`} className='capitalize'>{page}</Link>
              </Button>
            ))}
          </Box>

          <Link
              href="/tickets/create"
              type="button"
              className="relative rounded-md bg-sky-500 px-4 mx-4 py-2 text-white hover:bg-sky-800"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Create Ticket</span>
            <span>+ Create Ticket</span>
          </Link>

          <Box sx={{ flexGrow: 0 }}>
            
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 ,color: 'inherit'}} className='text-base font-sm'>
                <AccountCircleRounded  sx={{mr: 1, ml:2}}/>
                <span>Logged in as {username}</span>
              </IconButton>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleSubmit} >
                    <Logout />
                    <span className='ml-4'>Logout</span>
                  </Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
