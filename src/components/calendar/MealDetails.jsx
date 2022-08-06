import React from 'react'
import { Box, Typography } from '@mui/material';

const MealDetails = ({ mealType, meal }) => {
    return (
        <Box>
            <Typography variant="h4" component="h4" sx={{ textDecoration: 'underline' }}>{mealType}</Typography>
            <Box sx={{minHeight:'2rem'}}>{
                meal.map((food, idx) => {
                    return (
                        <Box key={idx} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Box sx={{ width: '2rem', height: '2rem' }} component="img" src={food.photo.thumb}></Box>
                            <Box key={idx}>{food.food_name.charAt(0).toUpperCase() + food.food_name.slice(1)}</Box>
                            <Box sx={{ width: '2rem', height: '2rem' }} ></Box>
                            <Typography>{`${Math.floor(food.nf_calories_scaled)} Calories`}</Typography>
                        </Box>
                    )
                })
            }
            </Box>
        </Box>
    )
}

export default MealDetails