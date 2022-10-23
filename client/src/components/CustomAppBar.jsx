import { AppBar, Toolbar, Typography, Button, } from '@mui/material';
import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Link, useLocation } from 'react-router-dom';
import LoginForm from './User/LoginForm';



const CustomAppBar = () => {
    const location = useLocation();
    const isRoot = location.pathname === '/';
    const NavButton = () => (isRoot ? (
        <Button component={Link} to="/calendar" variant="contained" color="secondary" startIcon={<CalendarMonthIcon />}>
            Planner
        </Button>
    ) : (
        <Button component={Link} to="/" variant="contained" color="secondary" startIcon={<AddIcon />}>
            Add Meal
        </Button>
    ))

    return (
        <AppBar sx={{
            height: '65px',
            backgroundColor: 'primary.main',
            color: 'primary.contrast',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'sticky',
            top: '0',
            left: '0',
        }} >
            <Toolbar sx={{ width: '100%', height: '100%', }}>
                <NavButton />
                <Typography variant="h1" component="h1" sx={{ fontWeight: '600', textAlign: 'center', flexGrow: 1, fontSize: '1.5rem' }}>
                    <FastfoodIcon sx={{ mr: '1rem' }} />
                    Calorie Tracker
                </Typography>
                <LoginForm />
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar