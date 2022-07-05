import { Box, } from '@mui/material';
import { CustomAppBar, MealDetails, Summation } from '.'

const CreateMeal = ({ breakfast, lunch, dinner, snacks, setBreakfast, setLunch, setDinner, setSnack }) => {
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
        <MealDetails mealType="Breakfast" foods={breakfast} />
        <MealDetails mealType="Lunch" foods={lunch} />
        <MealDetails mealType="Dinner" foods={dinner} />
        <MealDetails mealType="Snacks" foods={snacks} />
        <Summation breakfast={breakfast} lunch={lunch} dinner={dinner} snacks={snacks} />
      </Box>
    </Box>
  )
}

export default CreateMeal