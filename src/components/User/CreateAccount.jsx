import React, { useEffect } from 'react'
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
                    console.log(data)
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

    const [alert, setAlert] = React.useState('')
    useEffect(() => {
        if (alert.length) {
            setTimeout(() => {
                setAlert('')
            }, 3000)
        }
    }, [alert])

    return (
        <Box sx={{ width: '100%', height: '100%', }}>
            <Box
                sx={{
                    width: '30%',
                    margin: 'auto',
                    border: 'solid 15px #4EDC8E',
                    bgcolor: 'white',
                }}>
                <Typography variant="h3" component="h1" align='center'>Create Acccount</Typography>
                <Collapse in={Boolean(alert.length)}>
                    <Alert severity="error" variant='filled' icon={false}
                        sx={{
                            mb: '1rem'
                        }}
                    >{alert}</Alert>
                </Collapse>
                <form onSubmit={handleRegister}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '50%', margin: 'auto' }}>
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
                </form>
            </Box>
        </Box >
    )
}

export default CreateAccount