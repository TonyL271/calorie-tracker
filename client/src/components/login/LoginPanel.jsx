import { useContext, useState } from 'react'
import UserContext from '../../context/UserContext'
import { Box, Typography, TextField, Button, styled, Stack, Tabs, Tab } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { login } from '../../apiCalls'

const LoginPanel = ({ children, value, index, ...other }) => {
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

    return (
        <Box hidden={value !== index} sx={{my:'auto'}}>
            {value === index && (
                <Box sx={{}}>
                    <Typography variant="h4" component="h1" align='center' sx={{
                        fontWeight: '500',
                        lineHeight: '0.8',
                        marginBottom: '2rem'
                    }}>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleLogin}
                        sx={{
                            height: '100%',
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
                            </Stack>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                sx={{
                                    my: '1.5rem',
                                    width: '150px',
                                    height: '40px',
                                    mx: 'auto',
                                }} >
                                Sign In
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default LoginPanel