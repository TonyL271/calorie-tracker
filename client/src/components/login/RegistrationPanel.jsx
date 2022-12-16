

import { Box, Typography, TextField, Button, styled, Stack, } from '@mui/material'
import { register } from '../../apiCalls'
import UserContext from '../../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

const RegistrationPanel = ({ children, value, index, setAlert, ...other }) => {
    const { user, saveUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // post to server only if passwords match
        if (e.target.password.value !== e.target.confirmPassword.value) {
            setAlert({
                icon: 'failure',
                msg: 'Passwords do not match',
                type: 'timeout',
                timeoutDuration: 2000,
            });
            return;
        }
        register(e.target.username.value, e.target.password.value)
            .then(({ success, msg, user }) => {
                if (success) {
                    saveUser({ ...user })
                    navigate('/')
                } else {
                    setAlert({
                        icon: 'failure',
                        msg,
                        type: 'timeout',
                        timeoutDuration: 2000,
                    });
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