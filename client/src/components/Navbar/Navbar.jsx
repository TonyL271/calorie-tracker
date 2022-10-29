import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HamburgerButton } from './';
import { useContext } from 'react';


import UserContext from '../../context/UserContext';


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, saveUser } = useContext(UserContext);
    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

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
            <Toolbar sx={{ position: 'relative', width: '100%', height: '100%', alignItems: 'center', justifyContent: { tablet: 'center', mobile: 'start' } }}>
                <HamburgerButton />
                <Box >
                    <Button onClick={()=>{navigate('/')}} variant="h1" component="h1" sx={{ fontWeight: '600', textAlign: 'center', flexGrow: 1, fontSize: '1.5rem' }}>
                        <FastfoodIcon sx={{ mr: '1rem' }} />
                        Calorie Tracker
                    </Button>
                </Box>
                {user && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5" component="h2" sx={{ mr: '7rem' }}>Welcome {`${capitalizeFirstLetter(user.username)}`}</Typography>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar