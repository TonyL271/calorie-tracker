import React from 'react'
import { Box, TextField, Button, styled } from '@mui/material';

const handleLogin = (e) => {
    e.preventDefault()
    console.log('login')
}

const LoginForm = () => {
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
            />
            <Button type="submit" variant="contained" color="primary" sx={{mr:'1rem'}}>Login</Button>
            <Button type="submit" variant="contained" color="secondary">createAccount</Button>
        </Box>
    </form>
)
}

export default LoginForm