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
import Feedback from "./Feedback";



const HamburgerMenu = ({ anchorRef, open, setOpen, setMode }) => {
    const { breakpoints } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, saveUser } = useContext(UserContext);
    const [modalIsOpen, setIsOpen] = useState(false);

    const themes = ['original', 'simple']
    const [value, setValue] = useState(0);

    const handleLogout = () => {
        saveUser(null)
    }

    return (
        <Box  >
            <Drawer
                id="hamburger-menu"
                anchor={window.innerWidth < breakpoints.values.tablet ? 'right' : 'left'}
                open={open}
                onClose={() => setOpen(false)}
                onPointerDown={(e) => e.stopPropagation()}
                sx={{
                    zIndex: 1,
                }}
            >
                <Box minWidth="300px">
                    <List sx={{ marginTop: '70px' }}>
                        {/* Show sign in Button if user is not logged in */}
                        {!user && (
                            <ListItem >
                                <ListItemButton onPointerDown={() => { navigate('/sign-in') }}>
                                    <LockOpenIcon sx={{ mr: '1rem', color: 'orange' }} />
                                    <ListItemText primary={"Sign-in"} />
                                </ListItemButton>
                            </ListItem>
                        )
                        }
                        <ListItem >
                            {location.pathname === '/' ? (
                                <ListItemButton onPointerDown={() => { navigate('/calendar') }}>
                                    <CalendarMonthIcon sx={{ mr: "1rem", color: 'primary.main' }} />
                                    <ListItemText primary={"View Planner"} />
                                </ListItemButton>) : (
                                <ListItemButton onPointerDown={() => { navigate('/') }}>
                                    <FastfoodIcon sx={{ mr: "1rem", color: 'primary.main' }} />
                                    <ListItemText primary={"Add Food"} />
                                </ListItemButton>
                            )
                            }
                        </ListItem>
                        {user && (
                            <ListItem >
                                <ListItemButton onPointerDown={() => { handleLogout() }}>
                                    <LockIcon sx={{ mr: '1rem', color: 'orange' }} />
                                    <ListItemText primary={"Sign-out"} />
                                </ListItemButton>
                            </ListItem>
                        )}
                        <Divider />
                        <ListItem onPointerDown={(e) => { e.stopPropagation() }}>
                            <Box display="flex" width="100%" justifyContent="center" alignItems="center" flexDirection="column">
                                <Typography sx={{ display: 'block' }} id="discrete-slider" gutterBottom>Theme</Typography>
                                <Slider
                                    sx={{
                                        maxWidth: "180px"
                                    }}
                                    value={value}
                                    marks={
                                        [{ value: 0, label: 'Original' }, { value: 1, label: 'Simple' }]
                                    }
                                    onChange={(e, value) => {
                                        console.log(value)
                                        setMode(themes[value]);
                                        setValue(value);
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
                            <ListItemButton onPointerDown={() => {
                                setIsOpen(true);
                                setOpen(false);
                            }}>
                                <FeedbackIcon sx={{ mr: "1rem", color: 'red' }} />
                                <ListItemText primary={"Send Feedback"} />
                            </ListItemButton>
                        </ListItem >
                    </List>
                </Box>
            </Drawer>
            <Feedback modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
        </Box>
    )
}

export default HamburgerMenu