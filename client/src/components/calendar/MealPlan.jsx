import React, { useRef } from 'react'
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MealTabs from '../createmeal/MealTabs';
import { useState, useEffect } from 'react';
import { MealGrid } from '../createmeal';

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
                top: '65px',
                left: '0',
                width: '100vw',
                height: 'calc(100vh - 65px)',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'rgba(0,0,0,0.3)',
            }}>
            <Box
                onClick={(e) => { e.stopPropagation() }}
                ref={tabContainer}
                sx={{
                    position: 'relative',
                    bgcolor: 'white',
                    width: '97vw',
                    border: 'solid 7px #4EDC8E',
                    borderRadius: '10px',
                    padding: '0.5rem',
                    margin:'0.5rem',
                }}>
                <CloseIcon
                    onClick={() => { setShowDietPlan({}) }}
                    sx={{
                        position: 'absolute',
                        color: 'red',
                        right: '0.5rem',
                        top: '0.5rem',
                        stroke: 'red',
                    }} />
                <MealTabs
                    value={value}
                    setValue={setValue}
                    mealTypes={mealTypes}
                    warning={{ warn: false, emptyMeal: false }}
                    rounded={true}
                >
                    {dailyMeal.map((meal, idx) => (
                        <Box sx={{
                            padding: '0.8rem',
                            margin: '0.8rem',
                            bgcolor: 'white',
                            borderRadius: '10px',
                            fontSize: { smallest: '0.7rem', mobile: '0.8rem', tablet: '1rem' },
                        }} key={idx}>
                            <MealGrid foodList={meal} viewport={viewport} mutable={false} />
                        </Box>
                    ))}
                </MealTabs>
            </Box>
        </Box >
    )
}

export default MealPlan