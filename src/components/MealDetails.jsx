import React from 'react'
import { Box, Typography, Divider, IconButton } from '@mui/material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';


const MealDetails = ({ mealType, foods, setFood }) => {
  return (
    <Box sx={{ width: '100%', border: 'solid 1px black', pb: '0.5rem' }}>
      <Typography variant='h2' component="h2" align='center' sx={{ gridColumn: '1/-1' }} >{mealType}</Typography>
      <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(6,auto)' }}>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, gridColumn: '2/3' }}>food</Typography>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, }}>Serving size</Typography>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, }} >calories</Typography>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, gridColumn: '-2/-1' }} ></Typography>
        {
          foods.map((food, index) =>
            <React.Fragment key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Box component="img" alt="The house from the offer." src="https://nix-tag-images.s3.amazonaws.com/384_highres.jpg" sx={{ height: '2rem', width: '2rem', }} />
              </Box>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{food.name}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{food.qnty}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{`${food.cal} cal`}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', color: 'blue' }}>details</Typography>
              <IconButton
                list-id={index}
                sx={{ zIndex: '10', display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}
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

            <Box align='center' sx={{ width: '100%', gridColumn: '-3 / -2' }} >
              <Divider sx={{ mt: '0.5rem', borderBottomWidth: 2, bgcolor: 'black' }}></Divider>
            </Box>
            <Typography sx={{ gridColumn: '-4/-3', textAlign: 'center', fontWeight: '700' }}>Sum: </Typography>
            <Typography sx={{ gridColumn: '-3/-2', textAlign: 'center', fontWeight: '700' }}>{foods.map((food) => food.cal).reduce((rsf, curr) => rsf + curr, 0) + ' cal'}</Typography>
          </>
        }

      </Box>
    </Box>
  )
}

export default MealDetails