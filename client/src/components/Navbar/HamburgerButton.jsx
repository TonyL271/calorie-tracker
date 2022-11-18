import { Box } from '@mui/material'
import { useState, useRef } from 'react'
import HamburgerMenu from './HamburgerDrawer';

const HamburgerButton = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    return (
        <Box
            onClick={() => setOpen(!open)}
            ref={anchorRef}
            sx={{
                position: 'absolute',
                left: {smallest:"auto",tablet:"2rem"},
                right: {smallest:"1rem",tablet:"auto"},
                width: '40px',
                height: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px',
                cursor: 'pointer',
            }}>
            <Box sx={{
                width: '32px',
                height: '4px',
                borderRadius: '3px',
                bgcolor: 'white',
                transition: 'all .5s ease-in-out',
                background: open ? 'transparent' : 'white',
                transform: open ? 'translateX(-50px)' : '',

                '&::before': {
                    position: 'absolute',
                    content: '""',
                    width: '32px',
                    height: '4px',
                    borderRadius: '3px',
                    bgcolor: 'white',
                    transition: 'all .5s ease-in-out',
                    transform: open ? 'translate(50px,0px) rotate(-45deg)' : 'translate(0,-10px)',
                    backgroundColor: 'white',
                },
                '&::after': {
                    position: 'absolute',
                    content: '""',
                    width: '32px',
                    height: '4px',
                    borderRadius: '3px',
                    bgcolor: 'white',
                    transition: 'all .5s ease-in-out',
                    transform: open ? 'translate(50px,0px) rotate(45deg)' : 'translate(0, 10px)',
                    backgroundColor: 'white',
                }
            }} />
            {<HamburgerMenu anchorRef={anchorRef} open={open} setOpen={setOpen} />}
        </Box>
    )
}

export default HamburgerButton