import React from 'react'
import { Box, Typography } from '@mui/material';
import MealDetails from './MealDetails';
import CloseIcon from '@mui/icons-material/Close';

const MealPlan = ({ showDietPlan,setShowDietPlan }) => {
    let totalCalories = 0;
    if (Object.entries(showDietPlan).length) {
        totalCalories += showDietPlan.breakfast.reduce((total, food) => food.nf_calories_scaled + total, 0)
        totalCalories += showDietPlan.lunch.reduce((total, food) => food.nf_calories_scaled + total, 0)
        totalCalories += showDietPlan.dinner.reduce((total, food) => food.nf_calories_scaled + total, 0)
        totalCalories += showDietPlan.snacks.reduce((total, food) => food.nf_calories_scaled + total, 0)
    }

    return (
        Boolean(Object.entries(showDietPlan).length) &&
        <Box sx={{
            display: 'flex',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(0,0,0,0.3)',
        }}>
            <Box sx={{
                position: 'relative',
                bgcolor: 'white',
                'minWidth': '350px',
                border: 'solid 7px #4EDC8E',
                borderRadius: '25px'
            }}>
                <Box sx={{ m: '1rem' }}>
                    <CloseIcon
                    onClick={()=>{setShowDietPlan({})}}
                     sx={{
                        position: 'absolute',
                        color: 'red',
                        right: '0.3rem',
                        top: '0rem'
                    }} />
                    <MealDetails mealType="Breakfast" meal={showDietPlan.breakfast} />
                    <MealDetails mealType="Lunch" meal={showDietPlan.lunch} />
                    <MealDetails mealType="Dinner" meal={showDietPlan.dinner} />
                    <MealDetails mealType="Snack" meal={showDietPlan.snacks} />
                    <Typography variant="h6" component="h6">{`Total calories: ${Math.floor(totalCalories)}`}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default MealPlan