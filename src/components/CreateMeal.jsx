import { Box,} from '@mui/material';
import { CustomAppBar, MealDetails, Summation } from '.'

const CreateMeal = () => {
  return (
    <Box>
      <CustomAppBar/>
      <Box className="main" sx={{ display: 'flex', width: '80%', margin: 'auto', flexDirection: 'column' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', }}>
          <MealDetails name="Breakfast" foods={['salsa','burrito','tomato']}/>
          <MealDetails name="Lunch" foods={[]}/>
          <MealDetails name="Dinner" foods={[]}/>
          <MealDetails name="Snacks" foods={[]}/>
        </Box>
        <Box sx={{ border: 'solid 3px purple' }}>
          <Summation  />
        </Box>
      </Box>
    </Box>
  )
}

export default CreateMeal