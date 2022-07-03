import React from 'react'
import { Box, Typography, List, Divider, } from "@mui/material"
import { MealPlan } from "./";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { borderRadius } from '@mui/system';

const CustomList = ({ itemList, color }) => {
    return (

        <List >
            <Box key="add" sx={{
                display: 'flex',
                mx: 'auto',
                py: '0.5rem',
                width: '85%',
                my: '1rem',
                justifyContent: 'space-between',
                px: '0.5rem',
                border: 'solid 2px',
                borderColor: 'secondary.main',
                borderRadius: '10px'
            }} >
                <Typography sx={{ color: 'secondary.main', fontFamily: 'Roboto', fontSize: '1.2rem', fontWeight: '700', }} >Add upcoming plan</Typography>
                <AddCircleIcon fontSize='medium' sx={{ color: 'secondary.main', stroke: "secondary.main", strokeWidth: '1' }} />
            </Box>
            <Divider key="divider" sx={{ bgcolor: 'white', height: '2px' }} />
            {itemList.map((item, idx) => <MealPlan key={idx} item={item} color={color} icon={<DeleteIcon fontSize='medium' sx={{ color: 'black' }} />} />)}
        </List>
    )
}

export default CustomList