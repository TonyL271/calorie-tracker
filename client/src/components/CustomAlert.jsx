import { Box } from "@mui/system"
import CheckIcon from '@mui/icons-material/Check';

const CustomAlert = ({ message, showAlert }) => {
    return (
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
            zIndex: showAlert ? 100 : -1,

        }}>
            <Box sx={{
                width: '300px',
                height: '200px',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <CheckIcon sx={{ fontSize: 100, color: '#00d400' }} />
                {message}
            </Box>
        </Box>
    )
}

export default CustomAlert