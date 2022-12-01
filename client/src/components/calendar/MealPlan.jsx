import React, { useRef } from 'react'
import { Box, Typography } from '@mui/material';
import MealDetails from './MealDetails';
import CloseIcon from '@mui/icons-material/Close';
import MealTabs from '../createmeal/MealTabs';
import { useState, useEffect } from 'react';
import { MealCard, MealGrid } from '../createmeal';

const MealPlan = ({ showDietPlan, setShowDietPlan }) => {
    let totalCalories = 0;
    if (Object.entries(showDietPlan).length) {
        totalCalories += showDietPlan.breakfast.reduce((total, food) => food.nf_calories_scaled + total, 0)
        totalCalories += showDietPlan.lunch.reduce((total, food) => food.nf_calories_scaled + total, 0)
        totalCalories += showDietPlan.dinner.reduce((total, food) => food.nf_calories_scaled + total, 0)
        totalCalories += showDietPlan.snacks.reduce((total, food) => food.nf_calories_scaled + total, 0)
    }

    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
    const dailyMeal = [showDietPlan.breakfast, showDietPlan.lunch, showDietPlan.dinner, showDietPlan.snacks]


    const [value, setValue] = useState('0')
    const tabContainer = useRef(null)
    const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResizeWindow = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            // unsubscribe "onComponentDestroy"
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    return (
        Boolean(Object.entries(showDietPlan).length) &&
        <Box
            onClick={() => { setShowDietPlan({}) }}
            sx={{
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
            <Box
                onClick={(e) => { e.stopPropagation() }}
                sx={{
                    position: 'relative',
                    bgcolor: 'white',
                    width: '90vw',
                    border: 'solid 7px #4EDC8E',
                    borderRadius: '30px'
                }}>
                <Box ref={tabContainer} sx={{ m: '1rem', borderRadius: '10px' }}>
                    <CloseIcon
                        onClick={() => { setShowDietPlan({}) }}
                        sx={{
                            position: 'absolute',
                            color: 'red',
                            right: '0.5rem',
                            top: '0.5rem',
                            stroke: 'red',
                        }} />
                    <MealTabs value={value} setValue={setValue} mealTypes={mealTypes} container={tabContainer} warning={{ warn: false, emptyMeal: false }} rounded={true}>
                        {dailyMeal.map((meal, idx) => (
                            <Box className="boxerino" sx={{ margin: '0.8rem', bgcolor: 'white', borderRadius: '10px' }} key={idx}>
                                <Box className="boxerino" sx={{ margin: '0.8rem', bgcolor: 'white', minHeight: '50vh' }} key={idx}>
                                    <MealGrid foodList={meal} viewport={viewport} deletable={false} />
                                </Box>
                            </Box>
                        ))}
                    </MealTabs>
                    <Typography variant="h6" component="h6">{`Total calories: ${Math.floor(totalCalories)}`}</Typography>
                </Box>
            </Box>
        </Box >
    )
}

export default MealPlan