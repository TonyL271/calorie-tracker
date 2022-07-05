import { Box, } from '@mui/material';
import { CustomAppBar, MealDetails, Summation } from '.'

const CreateMeal = ({ breakfast, lunch, dinner, snacks, setBreakfast, setLunch, setDinner, setSnacks }) => {
  return (
    <Box>
      <CustomAppBar />
      <Box className="main" sx={{
        display: 'grid',
        width: '95%',
        margin: 'auto',
        gridTemplateColumns: {
          mobile: 'repeat(auto-fit,auto)',
          tablet: 'repeat(2,auto)',
          desktop: 'repeat(2,auto)'
        }
      }}>
        <MealDetails mealType="Breakfast" foods={breakfast} setFood={setBreakfast} />
        <MealDetails mealType="Lunch" foods={lunch}  setFood={setLunch} />
        <MealDetails mealType="Dinner" foods={dinner}  setFood={setDinner} />
        <MealDetails mealType="Snacks" foods={snacks}  setFood={setSnacks} />
        <Summation breakfast={breakfast} lunch={lunch} dinner={dinner} snacks={snacks} />
      </Box>
    </Box>
  )
}

export default CreateMeal