import { useEffect } from "react";
import { Box } from "@mui/system"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from "@mui/material";

const CustomAlert = ({ alert, setAlert,overwriteMeal }) => {
    // Show alert for the duration of timeout
    useEffect(() => {
        if (alert?.timeout) {
            const timer = setTimeout(() => {
                alert && setAlert(null)
            }, alert.timeout);
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
            <Box sx={{
                width: '300px',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '1.5rem',
            }}>
                {alert.success ?
                    <CheckIcon sx={{ fontSize: 80, color: '#00d400' }} /> :
                    <CloseIcon sx={{ fontSize: 80, color: '#ff0000' }} />
                }
                <Typography my="0.5rem" textAlign="center">
                    {alert.msg}
                </Typography>
                {!alert.timeout ?
                    <Box display="flex" width="100%" justifyContent="space-around">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => overwriteMeal() && setAlert(null) }
                        >
                            Yes
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setAlert(null)}
                        >
                            No
                        </Button>
                    </Box> :
                    <div />
                }
            </Box>
        </Box>
    )
}

export default CustomAlert