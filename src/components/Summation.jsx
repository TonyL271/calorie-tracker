import { Box, Typography } from "@mui/material"
const Summation = ({ breakfast, lunch, dinner, snacks }) => {
  const breakfastCals = breakfast.reduce((total, food) => (total + food.cal), 0);
  const lunchCals = lunch.reduce((total, food) => (total + food.cal), 0);
  const dinnerCals = dinner.reduce((total, food) => (total + food.cal), 0);
  const snacksCals = snacks.reduce((total, food) => (total + food.cal), 0);
  const totalCals = breakfastCals + lunchCals + dinnerCals + snacksCals;
  return (

    <>
      <Typography sx={{ width: '100%', mt: '1rem',fontWeight:'700' }}>{`Daily total: ${totalCals} calories`}</Typography>
    </>
  )
}

export default Summation