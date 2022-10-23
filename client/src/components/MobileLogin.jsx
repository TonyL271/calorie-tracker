import { useContext } from 'react'
import UserContext from '../context/UserContext'
import { Box, Typography, TextField, Button, styled, Alert, Collapse } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { login } from '../apiCalls'


const MobileLogin = () => {
    const { user, saveUser } = useContext(UserContext);
    const navigate = useNavigate();

    const TextFieldStyled = styled(TextField)({
        "& div": {
            backgroundColor: 'white',
            border: '1px solid black'
        },
        marginBottom: '1rem'
    })

    const handleLogin = (e) => {
        e.preventDefault()
        login(e.target.username.value, e.target.password.value)
            .then(data => {
                if (data.success) {
                    saveUser({ ...data.user })
                    navigate('/')
                } else {
                    alert(data.message)
                }
            })
            .catch(err => console.log(err.message))
    }

    const handleLogout = () => {
        saveUser(null)
    }

    return (
        <Box sx={{ width: '100%', minHeight: 'calc(100vh - 65px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '350px',
                    minHeight: '400px',
                    height: '50%',
                    margin: 'auto',
                    border: 'solid 8px #4EDC8E',
                    bgcolor: 'white',
                    borderRadius: '10px',
                    padding: '0.5rem'
                }}>
                <Typography variant="h3" component="h1" align='center' sx={{ my: '0.9rem', lineHeight: '0.8', marginBottom: '4rem' }}>Login</Typography>
                <Box component="form" onSubmit={handleLogin}
                    sx={{
                        height: '250px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                    <TextFieldStyled
                        label="Username"
                        name="username"
                        variant="outlined"
                        size="small"
                    />
                    <TextFieldStyled
                        label="Password"
                        name="password"
                        variant="outlined"
                        size="small"
                        type="password"
                    />
                    <TextFieldStyled
                        label="Confirm Password"
                        name="confirmPassword"
                        variant="outlined"
                        size="small"
                        type="password"
                    />
                    <Button type="submit" variant="contained" color="secondary" sx={{ mb: '1rem' }} >Sign In</Button>
                </Box>
            </Box>
        </Box >
    )
}

export default MobileLogin