import React from 'react'
import { Box, Typography, Divider, IconButton, Button } from '@mui/material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { AddButton, AddFoodMenu } from './';

const MealDetails = ({ mealType, foodList, Icon, addFood, setFoodList, setAddFood }) => {
  const handleAddFood = (foodInfo, ) => {
    

  }
  return (
    <Box className="meal-details" sx={{ width: '100%', border: 'solid 6px #4EDC8E', borderTop: '0', p: '1rem', pt: '0rem', }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#4EDC8E',
        color: 'white',
        gridColumn: '1/-1',
        mb: '1rem',
        mx: '-19px',
        height: '3.5rem',
        position: 'relative'
      }}>
        <AddButton foodList={foodList} setFoodList={setFoodList} setAddFood={setAddFood} />
        {Icon}
        <Typography variant='h4' component="h2" align='center' sx={{ fontWeight: '800', }}>{mealType}</Typography>
      </Box>
      <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(6,auto)' }}>
        <Typography variant="p" component="p" align='center' sx={{ color: '#4edc9c', width: '100%', fontSize: '1.1rem', fontWeight: 700, gridColumn: '2/3' }}>Food</Typography>
        <Typography variant="p" component="p" align='center' sx={{ color: '#4edc9c', width: '100%', fontSize: '1.1rem', fontWeight: 700, }}>Serving Size</Typography>
        <Typography variant="p" component="p" align='center' sx={{ color: '#4edc9c', width: '100%', fontSize: '1.1rem', fontWeight: 700, }} >Calories</Typography>
        <Typography variant="p" component="p" align='center' sx={{ color: '#4edc9c', width: '100%', fontSize: '1.1rem', fontWeight: 700, gridColumn: '-2/-1' }} ></Typography>
        {
          foodList.map((food, index) =>
            <React.Fragment key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2rem' }}>
                <Box component="img" alt="The house from the offer." src={food.imgSrc} sx={{ height: '1.5rem', width: '1.5rem', }} />
              </Box>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{food.name}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{food.qnty}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{`${food.cal} cal`}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', color: '#4e80dc', fontWeight: '500' }}>details</Typography>
              <IconButton
                list-id={index}
                sx={{ zIndex: '10', display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap', p: 0 }}
                onClick={(e) => {
                  const idx = e.currentTarget.getAttribute('list-id');
                  foodList.pop(idx)
                  setFoodList([...foodList])
                }}>
                <ClearRoundedIcon sx={{
                  color: 'red',
                  stroke: "red",
                  strokeWidth: 1,
                  '&:hover': {
                    color: 'black',
                    transform: 'scale(1.3)'
                  }
                }}
                />
              </IconButton>
            </React.Fragment>
          )
        }
        {foodList.length > 0 &&
          <>
            <Box align='center' sx={{ width: '100%', gridColumn: '-4 / -3' }} >
              <Divider sx={{ mt: '0.5rem', borderBottomWidth: 2, bgcolor: 'black' }}></Divider>
            </Box>
            <Typography sx={{ gridColumn: '-5/-4', textAlign: 'center', fontWeight: '700' }}>Sum: </Typography>
            <Typography sx={{ gridColumn: '-4/-3', textAlign: 'center', fontWeight: '700' }}>{foodList.map((food) => food.cal).reduce((rsf, curr) => rsf + curr, 0) + ' cal'}</Typography>
          </>
        }
      </Box>
      <AddFoodMenu addFood={addFood} setAddFood={setAddFood} />
    </Box>
  )
}

export default MealDetails