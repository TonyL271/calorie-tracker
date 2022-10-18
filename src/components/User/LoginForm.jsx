import React, { useContext } from 'react'
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';



const LoginForm = () => {
    const navigate = useNavigate();
    const { user, saveUser } = useContext(UserContext);

    const handleLogin = (e) => {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: e.target.username.value.toLowerCase(),
                password: e.target.password.value
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    saveUser({ ...data.user })
                } else {
                    alert(data.message)
                }
            })
            .catch(err => console.log(err.message))
    }

    const handleLogout = () => {
        saveUser(null)
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const TextFieldStyled = styled(TextField)({
        '& div': {
            backgroundColor: 'rgba(255,255,255,1)',
        },
        '& label.Mui-focused': {
            color: '#dc50a0',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '2px solid black',
            },
            '&:hover fieldset': {
                border: '2px solid #dc50a0',
            },
            '&.Mui-focused fieldset': {
                border: '2px solid #dc50a0',
            },
        },
        marginRight: '1rem'
    })
    return (
        user === null || user === 'new-user' ?
            (
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
                        <Button type="submit" variant="contained" color="primary" sx={{ mr: '1rem',bgcolor:'secondary.main',color:'primary.contrast' }}>Login</Button>
                        <Button type="button" variant="contained" color="secondary" onClick={() => navigate('/register')}>create Account</Button>
                    </Box>
                </form>
            ) :
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" component="h2" sx={{ mr: '7rem' }}>Welcome {`${capitalizeFirstLetter(user.username)}`}</Typography>
                <Button sx={{ bgcolor: 'secondary.main', color: 'primary.contrast' }} type="button" variant="contained" onClick={handleLogout}>Logout</Button>
            </Box>
    )
}

export default LoginForm