import { Box, AppBar, Toolbar, Typography, Button, IconButton, } from '@mui/material';
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Link,useLocation } from 'react-router-dom';



const CustomAppBar = () => {
    const location = useLocation();
    const isRoot = location.pathname === '/';
    return (
        <AppBar sx={{
            height: '6vh',
            backgroundColor: '#4EDC8E',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'sticky',
            top: '0',
            left: '0',
            mb: {
                mobile: '0rem',
                tablet: '3rem'
            }
        }} >
            <Toolbar sx={{ width: '100%', height: '100%', }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Link style={{backgroundColor:'red'}} to={isRoot ? '/calendar' : '/'}>{isRoot ? 'Calendar' : 'Add Food'}</Link>
                <Typography variant="h1" component="h1" sx={{ fontWeight: '600', textAlign: 'center', flexGrow: 1, fontSize: '1.5rem' }}>
                    <FastfoodIcon sx={{ mr: '1rem' }} />
                    Calorie Tracker
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar