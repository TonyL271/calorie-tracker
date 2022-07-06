import React from 'react'
import { Box, Typography, Divider, IconButton, Button } from '@mui/material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

import AddCircleIcon from '@mui/icons-material/AddCircle';


const MealDetails = ({ mealType, foods, setFood }) => {
  return (
    <Box className="meal-details" sx={{ width: '100%', border: 'solid 5px #4EDC8E',p:'1rem', pt: '0rem' }}>
      <Typography variant='h4' component="h2" align='center' sx={{
        bgcolor: '#4EDC8E',
        color: 'white',
        gridColumn: '1/-1',
        fontWeight: '900',
        mb:'1rem',
        mx:'-19px'
      }}>
        {mealType}
      </Typography>
      <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(6,auto)' }}>
        <Typography variant="p" component="p" align='center' sx={{ color: '#4edc9c', width: '100%', fontSize: '1.1rem', fontWeight: 700, gridColumn: '2/3' }}>Food</Typography>
        <Typography variant="p" component="p" align='center' sx={{ color: '#4edc9c', width: '100%', fontSize: '1.1rem', fontWeight: 700, }}>Serving Size</Typography>
        <Typography variant="p" component="p" align='center' sx={{ color: '#4edc9c', width: '100%', fontSize: '1.1rem', fontWeight: 700, }} >Calories</Typography>
        <Typography variant="p" component="p" align='center' sx={{ color: '#4edc9c', width: '100%', fontSize: '1.1rem', fontWeight: 700, gridColumn: '-2/-1' }} ></Typography>
        {
          foods.map((food, index) =>
            <React.Fragment key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box component="img" alt="The house from the offer." src="https://nix-tag-images.s3.amazonaws.com/384_highres.jpg" sx={{ height: '1.5rem', width: '1.5rem', }} />
              </Box>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{food.name}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{food.qnty}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{`${food.cal} cal`}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', color: '#4e80dc',fontWeight:'500' }}>details</Typography>
              <IconButton
                list-id={index}
                sx={{ zIndex: '10', display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap',p:0 }}
                onClick={(e) => {
                  const idx = e.currentTarget.getAttribute('list-id');
                  foods.pop(idx)
                  setFood([...foods])
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
        {foods.length > 0 &&
          <>

            <Box align='center' sx={{ width: '100%', gridColumn: '-4 / -3' }} >
              <Divider sx={{ mt: '0.5rem', borderBottomWidth: 2, bgcolor: 'black' }}></Divider>
            </Box>
            <Typography sx={{ gridColumn: '-5/-4', textAlign: 'center', fontWeight: '700' }}>Sum: </Typography>
            <Typography sx={{ gridColumn: '-4/-3', textAlign: 'center', fontWeight: '700' }}>{foods.map((food) => food.cal).reduce((rsf, curr) => rsf + curr, 0) + ' cal'}</Typography>
          </>
        }

      </Box>

    </Box>
  )
}

export default MealDetails