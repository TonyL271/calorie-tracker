import { Box, Typography } from "@mui/material"
const Summation = ({ breakfast, lunch, dinner, snacks }) => {
  const breakfastCals = breakfast.reduce((total, food) => (total + food.cal), 0);
  const lunchCals = lunch.reduce((total, food) => (total + food.cal), 0);
  const dinnerCals = dinner.reduce((total, food) => (total + food.cal), 0);
  const snacksCals = snacks.reduce((total, food) => (total + food.cal), 0);
  const totalCals = breakfastCals + lunchCals + dinnerCals + snacksCals;
  return (

    <>
      <Typography>Total:</Typography>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
        <Box sx={{ width: '33.3333%', textAlign: 'center', pr: '1rem' }}>{`${breakfastCals} cals`}</Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
        <Box sx={{ width: '33.3333%', textAlign: 'center', pr: '1rem' }}>{`${lunchCals} cals`}</Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
        <Box sx={{ width: '33.3333%', textAlign: 'center', pr: '1rem' }}>{`${dinnerCals} cals`}</Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
        <Box sx={{ width: '33.3333%', textAlign: 'center', pr: '1rem' }}>{`${snacksCals} cals`}</Box>
      </Box>

      <Typography sx={{width:'100%', mt:'1rem'}}>{`Daily total: calories${totalCals}`}</Typography>

    </>
  )
}

export default Summation