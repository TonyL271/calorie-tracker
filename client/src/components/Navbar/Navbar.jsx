import { AppBar, Toolbar, Typography, Button, Box, Slide } from '@mui/material';
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
            <Toolbar sx={{ position: 'relative', width: '100%', height: '100%', alignItems: 'center', justifyContent: { tablet: 'center', smallest: 'flex-start', } }}>
                <HamburgerButton />
                <Box sx={{}}>
                    <Button onClick={() => { navigate('/') }} variant="h1" component="h1"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            fontWeight: '600',
                            textAlign: 'center',
                            width: { smallest: '80px', tablet: '320px' },
                            fontSize: {
                                smallest: '1rem',
                                tablet: '1.5rem'
                            },
                            lineHeight: '1.0',
                            padding: '0',
                        }}>
                        <FastfoodIcon sx={{ mr: { smallest: 0, tablet: '1rem' } }} />
                        Calorie Tracker
                    </Button>
                </Box>
                {user && user.username && (
                    <Box sx={{
                        display: { smallest: 'flex', },
                        position: { smallest: 'static', tablet: 'absolute' },
                        right: '2rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: { smallest: '100%', tablet: 'auto' },
                        paddingRight: '42px'
                    }}>
                        <Typography variant="h5" component="h2"
                            sx={{
                                lineHeight: '1',
                                color: 'primary.lightContrast',
                                fontSize: '1.3rem',
                                textAlign: 'center',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                            }}>
                            Welcome
                            <br />
                            {`${capitalizeFirstLetter(user.username)}`}
                        </Typography>
                    </Box>
                )}
            </Toolbar>
        </AppBar >
    )
}

export default Navbar