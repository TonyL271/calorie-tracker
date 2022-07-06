import { Box, Typography } from '@mui/material';
import { CustomAppBar, MealDetails, } from '.'
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import IcecreamIcon from '@mui/icons-material/Icecream';

const CreateMeal = ({ breakfast, lunch, dinner, snacks, setBreakfast, setLunch, setDinner, setSnacks }) => {

  const breakfastCals = breakfast.reduce((total, food) => (total + food.cal), 0);
  const lunchCals = lunch.reduce((total, food) => (total + food.cal), 0);
  const dinnerCals = dinner.reduce((total, food) => (total + food.cal), 0);
  const snacksCals = snacks.reduce((total, food) => (total + food.cal), 0);
  const totalCals = breakfastCals + lunchCals + dinnerCals + snacksCals;
  return (
    <Box >
      <CustomAppBar />
      <Box className="main" sx={{
        display: 'grid',
        width: '80%',
        margin: 'auto',
        bgcolor: 'ghostwhite',
        boxShadow: '0 0 8px',
        borderRadius: '4px',
        columnGap: '2rem',
        rowGap: '2rem',
        padding: '2rem',
        // '& > div.meal-details:nth-of-type(1)>h2': {
        //   borderRadius:'12px 0 0 0'
        // },
        // '& > div.meal-details:nth-of-type(2)>h2': {
        //   borderRadius:'0 12px 0 0'
        // },
        gridTemplateColumns: {
          mobile: 'repeat(auto-fit,auto)',
          tablet: 'repeat(2,auto)',
          desktop: 'repeat(2,auto)'
        },
        // '& > div.meal-details:nth-of-type(1)': {
        //   borderradius:'12px 0 0 0',
        // },
        // '& > div.meal-details:nth-of-type(2)': {
        //   borderradius:'0 12px 0 0',
        // },
        // '& > div.meal-details:nth-of-type(3)': {
        //   borderBottom: 0,
        //   borderLeft: 0,
        // },
        // '& > div.meal-details:nth-of-type(4)': {
        //   borderBottom: 0,
        //   borderRight: 0,
        // },

      }}>
        <MealDetails mealType="Breakfast" Icon={<FreeBreakfastIcon sx={{ mr: '1rem' }} />} foods={breakfast} setFood={setBreakfast} />
        <MealDetails mealType="Lunch" Icon={<LunchDiningIcon sx={{ mr: '1rem' }} />} foods={lunch} setFood={setLunch} />
        <MealDetails mealType="Dinner" Icon={<RestaurantIcon sx={{ mr: '1rem' }} />} foods={dinner} setFood={setDinner} />
        <MealDetails mealType="Snacks" Icon={<IcecreamIcon sx={{ mr: '1rem' }} />} foods={snacks} setFood={setSnacks} />
        <Typography sx={{ width: '100%', mt: '1rem', fontWeight: '700', color: '#f50057' }}>{`Daily total: ${totalCals} calories`}</Typography>
      </Box>
    </Box>
  )
}

export default CreateMeal