import React from 'react'
import { Box, Typography, Divider } from '@mui/material'

const MealDetails = ({ mealType, foods }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', border: 'solid 1px black', borderBottom: '0', pb: '0.5rem' }}>
      <Typography variant='h2' component="h2" align='center' >{mealType}</Typography>


      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: '0.5rem' }}>
        <Box variant="p" component="p" align='center' sx={{ width:'100%',maxWidth: '2rem', fontSize: '1.1rem', fontWeight: 700 }}></Box>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 700 }}>food</Typography>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 700 }}>Serving size</Typography>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', pr: '1rem', fontWeight: 700 }} >calories</Typography>
      </Box>
      {

        foods.map((food) =>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Box
              component="img"
              sx={{
                height: '2rem',
                width: '2rem',
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                flexShrink: 1
              }}
              alt="The house from the offer."
              src="https://nix-tag-images.s3.amazonaws.com/384_highres.jpg"
            />
            <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{food.name}</Typography>
            <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{food.qnty}</Typography>
            <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', pr: '1rem' }} >{`${food.cal} Cal`}</Typography>
          </Box>
        )
      }
      {foods.length > 0 &&
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="p" component="p" align='center' sx={{ width: '100%' }}>{ }</Typography>
          <Typography variant="p" component="p" align='center' sx={{ width: '100%' }}>{ }</Typography>
          <Box align='center' sx={{ width: '100%', pr: '1rem' }} >
            <Divider sx={{ mt: '0.5rem', borderBottomWidth: 2, bgcolor: 'black' }}></Divider>
          </Box>
        </Box>
      }

    </Box>
  )
}

export default MealDetails