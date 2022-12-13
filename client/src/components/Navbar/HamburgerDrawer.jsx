import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Slider, Typography, Divider } from "@mui/material"
import { useState, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useTheme } from '@mui/material/styles';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import UserContext from "../../context/UserContext";
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useEffect } from "react";



const HamburgerMenu = ({ anchorRef, open, setOpen, setMode }) => {
    const { breakpoints } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, saveUser } = useContext(UserContext);

    const themes = ['light', 'dark']

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(anchorRef.current);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        saveUser(null)
    }



    return (
        <Drawer
            id="hamburger-menu"
            anchor={window.innerWidth < breakpoints.values.tablet ? 'right' : 'left'}
            open={open}
            onClick={handleClick}
            onClose={() => setOpen(false)}
            sx={{
                zIndex: 1,
            }}
        >
            <Box minWidth="300px">
                <List sx={{ marginTop: '70px' }}>
                    {/* Show sign in Button if user is not logged in */}
                    {!user && (
                        <ListItem >
                            <ListItemButton onClick={() => { navigate('/sign-in') }}>
                                <LockOpenIcon sx={{ mr: '1rem', color: 'orange' }} />
                                <ListItemText primary={"Sign-in"} />
                            </ListItemButton>
                        </ListItem>
                    )
                    }
                    <ListItem >
                        {location.pathname === '/' ? (
                            <ListItemButton onClick={() => { navigate('/calendar') }}>
                                <CalendarMonthIcon sx={{ mr: "1rem", color: 'primary.main' }} />
                                <ListItemText primary={"View Planner"} />
                            </ListItemButton>) : (
                            <ListItemButton onClick={() => { navigate('/') }}>
                                <FastfoodIcon sx={{ mr: "1rem", color: 'primary.main' }} />
                                <ListItemText primary={"Add Food"} />
                            </ListItemButton>
                        )
                        }
                    </ListItem>
                    {user && (
                        <ListItem >
                            <ListItemButton onClick={() => { handleLogout() }}>
                                <LockIcon sx={{ mr: '1rem', color: 'orange' }} />
                                <ListItemText primary={"Sign-out"} />
                            </ListItemButton>
                        </ListItem>
                    )}
                    <Divider />
                    <ListItem onClick={(e) => { e.stopPropagation() }}>
                        <Box display="flex" width="100%" justifyContent="center" alignItems="center" flexDirection="column">
                            <Typography sx={{ display: 'block' }} id="discrete-slider" gutterBottom>Theme</Typography>
                            <Slider
                                sx={{
                                    maxWidth: "180px"
                                }}

                                marks={
                                    [{ value: 0, label: 'Original' }, { value: 1, label: 'Simple' }]
                                }
                                onChange={(e, value) => {
                                    setMode(value  === 0 ? 'original' : 'simple');
                                }}
                                min={0}
                                max={1}
                                step={1}
                                valueLabelFormat={(value) => `${themes[value]}`}
                                valueLabelDisplay="auto"
                            />
                        </Box>
                    </ListItem>
                    <Divider />
                    <ListItem >
                        <ListItemButton onClick={() => { }}>
                            <FeedbackIcon sx={{ mr: "1rem", color: 'red' }} />
                            <ListItemText primary={"Send Feedback"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}

export default HamburgerMenu