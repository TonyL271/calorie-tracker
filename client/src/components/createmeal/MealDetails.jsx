import React from 'react'
import { Box, Typography, Divider, IconButton } from '@mui/material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { AddToggle, AddFoodMenu } from './addfood';
import NutrientLabel from '../NutrientLabel/NutrientLabel';

const MealDetails = ({ mealType, foodList, Icon, addFood, setFoodList, setAddFood }) => {
  const handleAddFood = (food) => {
    setFoodList([...foodList, food]);
    setAddFood('');
  }
  const capitalizeFirstLetter = (string) => (string.charAt(0).toUpperCase() + string.slice(1))
  return (
    <Box sx={{ width: '100%', border: 'solid 6px', borderColor: 'primary.main', borderTop: '0', p: '1rem', pt: '0rem', fontSize: { mobile: '0.8rem', tablet: '1rem' },borderRadius:'10px' }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        color: 'primary.contrast',
        gridColumn: '1/-1',
        mb: '1rem',
        mx: '-19px',
        height: '3.5rem',
        position: 'relative',
        borderTopLeftRadius:'8px',
        borderTopRightRadius:'8px',
      }}>
        <Box sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: { mobile: '3.5rem auto', tablet: '4.5rem auto' },
        }}>
          <AddToggle foodList={foodList} setFoodList={setFoodList} setAddFood={setAddFood} />
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
          }}>
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {Icon}
              <Typography variant='h4' component="h2" align='center' sx={{ fontWeight: '800', }}>{mealType}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{
        width: '100%',
        display: 'grid',
        gridGap:'4px',
        gridTemplateColumns: 'repeat(6,auto)',
        gridRowGap: '0.20rem',
        minHeight:'130px'
      }}>
        <Typography variant="p" component="p" align='center' sx={{ color: 'secondary.main', fontSize: { mobile: '0.8rem', tablet: '1.1rem' }, fontWeight: 700, gridColumn: '2/3' }}>Food</Typography>
        <Typography variant="p" component="p" align='center' sx={{ color: 'secondary.main', fontSize: { mobile: '0.8rem', tablet: '1.1rem' }, fontWeight: 700, }}>Amount</Typography>
        <Typography variant="p" component="p" align='center' sx={{ color: 'secondary.main', fontSize: { mobile: '0.8rem', tablet: '1.1rem' }, fontWeight: 700, }} >Calories</Typography>
        <Typography variant="p" component="p" align='center' sx={{ color: 'secondary.main', fontSize: { mobile: '0.8rem', tablet: '1.1rem' }, fontWeight: 700, gridColumn: '-2/-1' }} ></Typography>
        {
          foodList.map((food, index) =>
            <React.Fragment key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '2rem' }}>
                <Box component="img" alt="The house from the offer." src={food.photo.thumb} sx={{ width: '2.0rem', }} />
              </Box>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{capitalizeFirstLetter(food.food_name)}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{`${food.qty} ${food.selectedUnit || food.serving_unit}`}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{`${food.nf_calories_scaled.toFixed(0)} cal`}</Typography>
              <NutrientLabel food={food} />
              <Box
                list-id={index}
                sx={{
                  zIndex: '0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexWrap: 'wrap',
                  p: 0,
                  '&:hover': {
                    color: 'black',
                    transform: 'scale(1.5)'
                  }
                }}
                onClick={(e) => {
                  const idx = e.currentTarget.getAttribute('list-id');
                  foodList.pop(idx)
                  setFoodList([...foodList])
                }}>
                <ClearRoundedIcon sx={{
                  color: 'red',
                  stroke: "red",
                  strokeWidth: 1,
                }}
                />
              </Box>
            </React.Fragment>
          )
        }
        {foodList.length > 0 &&
          <>
            <Box align='center' sx={{ width: '100%', gridColumn: '-4 / -3' }} >
              <Divider sx={{ mt: '0.5rem', borderBottomWidth: 2, bgcolor: 'black' }}></Divider>
            </Box>
            <Typography sx={{ gridColumn: '-5/-4', textAlign: 'center', fontWeight: '700' }}>Sum: </Typography>
            <Typography sx={{ gridColumn: '-4/-3', textAlign: 'center', fontWeight: '700' }}>
              {
                foodList.reduce((prev, curr) => prev + curr.nf_calories_scaled, 0).toFixed(0) + ' cal'
              }</Typography>
          </>
        }
      </Box>
      <AddFoodMenu addFood={addFood} setAddFood={setAddFood} handleAddFood={handleAddFood} />
    </Box >
  )
}

export default MealDetails