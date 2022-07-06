import { Box, AppBar, Toolbar, Typography, Button, IconButton, } from '@mui/material';
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import FastfoodIcon from '@mui/icons-material/Fastfood';


const CustomAppBar = () => {
    return (
        <AppBar sx={{
            height: '6%',
            backgroundColor: '#4EDC8E',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'sticky',
            top: '0',
            left: '0',
            mb:'3rem'
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
                <Typography variant="h6" component="div" sx={{textAlign: 'center', flexGrow: 1, fontSize: '1.5rem' }}>
                    <FastfoodIcon sx={{mr:'1rem'}}/>
                    Calorie Tracker
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar