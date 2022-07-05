import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';


const MealDetails = ({ mealType, foods }) => {
  return (
    <Box sx={{ width: '100%', border: 'solid 1px black', borderBottom: '0', pb: '0.5rem' }}>
      <Typography variant='h2' component="h2" align='center' sx={{ gridColumn: '1/-1' }} >{mealType}</Typography>
      <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(6,auto)' }}>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, gridColumn: '2/3' }}>food</Typography>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, }}>Serving size</Typography>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, }} >calories</Typography>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, gridColumn: '-2/-1' }} ></Typography>
        {

          foods.map((food) =>
            <>
              <Box sx={{display:'flex',justifyContent:'center',alignContent:'center'}}>
                <Box component="img" alt="The house from the offer." src="https://nix-tag-images.s3.amazonaws.com/384_highres.jpg" sx={{ height: '2rem', width: '2rem', }} />
              </Box>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{food.name}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{food.qnty}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} >{`${food.cal} cal`}</Typography>
              <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>details</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
                <ClearRoundedIcon sx={{ color: 'red', stroke: "red", strokeWidth: 1 }} />
              </Box>
            </>
          )
        }
        {foods.length > 0 &&
          <>

            <Box align='center' sx={{ width: '100%', pr: '1rem', gridColumn: '-3 / -2' }} >
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