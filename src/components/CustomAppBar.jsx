import { Box, AppBar, Toolbar, Typography, Button, IconButton, } from '@mui/material';
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';


const CustomAppBar = () => {
    return (
        <AppBar sx={{
            height: '100%',
            backgroundColor: '#FFFFFF',
            color: '#8C8A8C',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'sticky',
            top: '0',
            left: '0',
            mb:'5rem'
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1.5rem' }}>
                    Calorie-Tracker
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar