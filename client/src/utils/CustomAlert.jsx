import { useEffect } from "react";
import { Box } from "@mui/system"
import { Button, Paper, Typography } from "@mui/material";
import PropTypes from 'prop-types';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';


const CustomAlert = ({ alert, setAlert, }) => {
    // Show alert for the duration of timeout
    useEffect(() => {
        if (alert?.type === "timeout") {
            const timer = setTimeout(() => {
                alert && setAlert(null)
            }, alert.timeoutDuration);
            return () => clearTimeout(timer);
        }
    }, [alert])

    return (
        alert &&
        <Box sx={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: alert ? 100 : -1,
        }}>
            <Paper elevation={4} sx={{
                width: '300px',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '1.5rem',
            }}>
                {alert.icon === "success" ?
                    <CheckIcon sx={{ fontSize: 80, color: '#00d400' }} /> :
                    alert.icon === "failure" ?
                        <CloseIcon sx={{ fontSize: 80, color: '#ff0000' }} /> :
                        alert.icon === "warning" ?
                            <WarningIcon sx={{ fontSize: 80, color: 'orange' }} /> :
                            false
                }
                {typeof alert.msg === "string" ?
                    <Typography my="0.5rem" textAlign="center">
                        {alert.msg}
                    </Typography> :
                    alert.msg
                }
                {alert.type === "askUser" ?
                    <Box display="flex" width="100%" justifyContent="space-around">
                        <Button
                            variant="contained"
                            color="primary"
                            onPointerDown={() => alert.handleYes() && setAlert(null)}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onPointerDown={() => alert.handleNo() && setAlert(null)}
                        >
                            No
                        </Button>
                    </Box> :
                    alert.type === "confirm" ?
                        <Button
                            variant="contained"
                            color="primary"
                            onPointerDown={() => alert.handleYes() && setAlert(null)}
                        >
                            Okay
                        </Button> :
                        false
                }
            </Paper>
        </Box>
    )
}

CustomAlert.Prototype = {
    alert: {
        icon: PropTypes.string, // success, failure, warning
        msg: PropTypes.string,
        type: PropTypes.string, // timeout, askUser, confirm
        timeoutDuration: PropTypes.number,
        handleYes: PropTypes.func,
        handleNo: PropTypes.func,
    },
    setAlert: PropTypes.func,
}



export default CustomAlert