import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { CustomAppBar, MealDetails, AddFoodMenu } from '.'
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import IcecreamIcon from '@mui/icons-material/Icecream';

const CreateMeal = ({ breakfast, lunch, dinner, snacks, setBreakfast, setLunch, setDinner, setSnacks }) => {
  const [addBreakFast, setAddBreakFast] = useState('');
  const [addLunch, setAddLunch] = useState('');
  const [addDinner, setAddDinner] = useState('');
  const [addSnacks, setAddSnacks] = useState('');

  const breakfastCals = breakfast.reduce((total, food) => (total + food.cal), 0);
  const lunchCals = lunch.reduce((total, food) => (total + food.cal), 0);
  const dinnerCals = dinner.reduce((total, food) => (total + food.cal), 0);
  const snacksCals = snacks.reduce((total, food) => (total + food.cal), 0);
  const totalCals = breakfastCals + lunchCals + dinnerCals + snacksCals;
  return (
    <Box >
      <CustomAppBar />
      <Box className="main" sx={theme => ({
        display: 'grid',
        width: '80%',
        margin: 'auto',
        bgcolor: 'ghostwhite',
        boxShadow: '0 0 8px',
        borderRadius: '4px',
        columnGap: '2rem',
        rowGap: '2rem',
        padding: '2rem',
        gridTemplateColumns: {
          mobile: 'repeat(auto-fit,auto)',
          desktop: 'repeat(2,auto)'
        },
      })}>
        <MealDetails
          mealType="Breakfast"
          Icon={<FreeBreakfastIcon sx={{ mr: '1rem' }} />}
          foodList={breakfast}
          addFood={addBreakFast}
          setFoodList={setBreakfast}
          setAddFood={setAddBreakFast}
        />
        <MealDetails
          mealType="Lunch"
          Icon={<LunchDiningIcon sx={{ mr: '1rem' }} />}
          foodList={lunch}
          addFood={addLunch}
          setFoodList={setLunch}
          setAddFood={setAddLunch}
        />
        <MealDetails
          mealType="Dinner"
          Icon={<RestaurantIcon sx={{ mr: '1rem' }} />}
          foodList={dinner}
          addFood={addDinner}
          setFoodList={setDinner}
          setAddFood={setAddDinner}
        />
        <MealDetails
          mealType="Snacks"
          Icon={<IcecreamIcon sx={{ mr: '1rem' }} />}
          foodList={snacks}
          addFood={addSnacks}
          setFoodList={setSnacks}
          setAddFood={setAddSnacks}
        />
        <Typography sx={{ width: '100%', mt: '1rem', fontWeight: '700', color: '#f50057' }}>{`Daily total: ${totalCals} calories`}</Typography>
      </Box>
    </Box >
  )
}

export default CreateMeal