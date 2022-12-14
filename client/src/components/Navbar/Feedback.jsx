import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { sendFeedback } from '../../apiCalls';

const customStyles = {
    overlay: {
        display: 'fixed',
        height: `${window.innerHeight - 65}px`,
        top: '65px',
        zIndex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    content: {
        position: 'relative',
        inset: 0,
        background: 'white',
        width: '300px',
        opacity: '1',
        padding: 0,
        border: 0,
    },
};

Modal.setAppElement('#root');

function Feedback({ modalIsOpen, setIsOpen }) {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [feedback, setFeedback] = useState('');

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Box onPointerDown={(e) => { e.stopPropagation() }} sx={{
        }}>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <FormControl sx={{
                    padding: '20px',
                    left: "0",
                    width: '100%',
                    zIndex: '100',
                    border: 'solid 4px #000',
                    borderColor: 'primary.main',
                    borderRadius: '8px',
                }}>
                    <CloseIcon sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        color: 'red',
                        stroke: 'red',
                        zIndex: '2',
                    }}
                        onPointerDown={closeModal}
                    />
                    <Typography variant="h4" textAlign="center" my="1.5rem" >Submit Feedback</Typography>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onInput={(e) => setName(e.target.value)}
                        sx={{
                            mb: "0.7rem",
                        }} />
                    <TextField
                        id="subject"
                        label="Subject"
                        variant="outlined"
                        value={subject}
                        onInput={(e) => setSubject(e.target.value)}
                        sx={{ mb: "0.7rem" }} />
                    <TextField
                        id="outlined-multiline-static"
                        label="feedback"
                        multiline
                        rows={4}
                        value={feedback}
                        onInput={(e) => setFeedback(e.target.value)}
                        sx={{ mb: "0.7rem" }}
                    />
                    <Button
                        variant="contained"
                        sx={{ mb: 0 }}
                        onPointerDown={() => {
                            sendFeedback(name, subject, feedback)
                                .then((res) => {
                                    console.log(res);
                                });
                        }}
                    >Submit</Button>
                </FormControl>
            </Modal>
        </Box>
    );
}

export default Feedback;
