import React from 'react'
import { Box, TextField, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const handleLogin = (e) => {
    e.preventDefault()
    console.log('login')
}

const LoginForm = () => {
    const navigate = useNavigate();
    const TextFieldStyled = styled(TextField)({
        "& div": {
            backgroundColor: 'white',
            border: '1px solid black'
        },
        marginRight: '1rem'
    })
    return (
        <form onSubmit={handleLogin}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                <Button type="submit" variant="contained" color="primary" sx={{ mr: '1rem' }}>Login</Button>
                <Button type="button" variant="contained" color="secondary" onClick={() => navigate('/register')}>create Account</Button>
            </Box>
        </form>
    )
}

export default LoginForm