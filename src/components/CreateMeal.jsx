import { Box, } from '@mui/material';
import { CustomAppBar, MealDetails, Summation } from '.'

const CreateMeal = ({ breakfast, lunch, dinner, snacks, setBreakfast, setLunch, setDinner, setSnack }) => {
  return (
    <Box>
      <CustomAppBar />
      <Box className="main" sx={{ display: 'grid', width: '80%', margin: 'auto', gridTemplateColumns:'7% repeat(4,auto)'}}>
          <Box className="place-holder"></Box>
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