import { Box, } from '@mui/material';
import { CustomAppBar, MealDetails, Summation } from '.'

const CreateMeal = ({ breakfast, lunch, dinner, snacks, setBreakfast, setLunch, setDinner, setSnacks }) => {
  return (
    <Box >
      <CustomAppBar />
      <Box className="main" sx={{
        display: 'grid',
        width: '80%',
        margin: 'auto',
        bgcolor: 'white',
        boxShadow: '0 0 8px',
        borderRadius:'12px',
        columnGap:'2rem',
        rowGap:'2rem',
        padding:'2rem',
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
        <MealDetails mealType="Breakfast" foods={breakfast} setFood={setBreakfast} />
        <MealDetails mealType="Lunch" foods={lunch} setFood={setLunch} />
        <MealDetails mealType="Dinner" foods={dinner} setFood={setDinner} />
        <MealDetails mealType="Snacks" foods={snacks} setFood={setSnacks} />
        <Summation breakfast={breakfast} lunch={lunch} dinner={dinner} snacks={snacks} />
      </Box>
    </Box>
  )
}

export default CreateMeal