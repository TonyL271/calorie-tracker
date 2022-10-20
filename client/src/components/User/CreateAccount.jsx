import { useState, useEffect } from 'react'
import { Box, Typography, TextField, Button, styled, Alert, Collapse } from '@mui/material'

const CreateAccount = () => {
    const handleRegister = (e) => {
        setAlert('')
        e.preventDefault();
        // post to server
        if (e.target.password.value !== e.target.confirmPassword.value) {
            setAlert('Passwords do not match');
            return;
        }
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value
            })
        })
            .then(res => {
                res.json().then(data => {
                    if (data.success) {
                        setAlert('Account created successfully')
                    } else {
                        setAlert(data.message)
                    }
                })
            })
            .catch(err => console.log(err))
    }

    const TextFieldStyled = styled(TextField)({
        "& div": {
            backgroundColor: 'white',
            border: '1px solid black'
        },
        marginBottom: '1rem'
    })

    const [alert, setAlert] = useState('')
    useEffect(() => {
        if (alert.length) {
            setTimeout(() => {
                setAlert('')
            }, 4000)
        }
    }, [alert])

    return (
        <Box sx={{ width: '100%', minHeight: 'calc(100vh - 6vh)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                <Typography variant="h3" component="h1" align='center' sx={{ my: '0.9rem', lineHeight: '0.8', marginBottom: '4rem' }}>Create Acccount</Typography>
                <Collapse in={Boolean(alert.length)}>
                    <Alert severity="error" variant='filled' icon={false}
                        sx={{
                            mb: '1rem'
                        }}
                    >{alert}</Alert>
                </Collapse>
                <Box component="form" onSubmit={handleRegister}
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
                    <Button type="submit" variant="contained" color="secondary" sx={{ mb: '1rem' }} >create Account</Button>
                </Box>
            </Box>
        </Box >
    )
}

export default CreateAccount