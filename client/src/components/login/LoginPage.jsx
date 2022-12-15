import { useState } from 'react'
import { Box, Tabs, Tab, Paper } from '@mui/material'
import LoginPanel from './LoginPanel'
import RegistrationPanel from './RegistrationPanel'
import { useSwipeable } from "react-swipeable";

const LoginPage = () => {
    const [tabValue, setTabValue] = useState(0)

    const config = {
        delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
        preventScrollOnSwipe: true,           // prevents scroll during swipe (*See Details*)
        trackTouch: true,                      // track touch input
        trackMouse: true,                     // track mouse input
        rotationAngle: 0,                      // set a rotation angle
        swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
        touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
    }

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            setTabValue((prev) => (
                (prev + 1) % 2
            ));
        },
        ...config,
    });

    return (
        <Box
            {...handlers}
            sx={{
                width: '100%',
                minHeight: 'calc(100vh - 65px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: { smallest: '320px', tablet: '500px' },
                    height: { smallest: '400px', tablet: '500px' },
                    margin: 'auto',
                    bgcolor: 'white',
                    borderRadius: '10px',
                    padding: { smallest: '0.5rem', tablet: '2rem' },
                }}>
                <Tabs
                    value={tabValue}
                    sx={{ borderBottom: 1, borderColor: 'divider', }}
                    onChange={(e, newValue) => {
                        setTabValue(newValue)
                    }}>
                    <Tab label="login" id="login" />
                    <Tab label="sign-up" id="registration" />
                </Tabs>
                <LoginPanel value={tabValue} index={0} />
                <RegistrationPanel value={tabValue} index={1} />
            </Paper>
        </Box >
    )
}

export default LoginPage