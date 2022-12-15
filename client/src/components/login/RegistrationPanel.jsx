

import { useContext, useState } from 'react'
import UserContext from '../../context/UserContext'
import { Box, Typography, TextField, Button, styled, Stack, Tabs, Tab } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { register } from '../../apiCalls'

const RegistrationPanel = ({ children, value, index, ...other }) => {

    const handleRegister = (e) => {
        console.log(e);
        // setAlert('')
        e.preventDefault();
        // post to server only if passwords match
        if (e.target.password.value !== e.target.confirmPassword.value) {
            // setAlert('Passwords do not match');
            return;
        }
        register(e.target.username.value, e.target.password.value)
            .then(data => {
                if (data.success) {
                    // setAlert('Account created successfully')
                } else {
                    // setAlert(data.msg)
                }
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

    return (
        <Box hidden={value !== index} sx={{
            mt: { smallest: '2rem', tablet: '4rem' }
        }}> {value === index && (
            <Box>
                <Typography variant="h4" component="h1" align='center' sx={{
                    fontWeight: '500',
                    lineHeight: '0.8',
                    marginBottom: '2rem'
                }}>
                    Sign-Up
                </Typography>
                <Box component="form" onSubmit={handleRegister}
                    sx={{
                        height: '250px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                    <Stack sx={{
                        width: '80%',
                    }}>
                        <Stack >
                            <TextFieldStyled
                                className="Mui-focused"
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
                        </Stack>
                        <Stack flexDirection="row" justifyContent="space-around" width="100%">
                            <Button type="submit" variant="contained" color="secondary" sx={{ mb: '1rem' }} >sign-up</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        )}
        </Box>

    )
}

export default RegistrationPanel