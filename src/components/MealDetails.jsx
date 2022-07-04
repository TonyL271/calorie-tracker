import React from 'react'
import { Box, Typography } from '@mui/material'

const MealDetails = ({ mealType, foods }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column',border: 'solid 1px black',borderBottom:'0', pb: '0.5rem' }}>
      <Typography variant='h2' component="h2" align='center' >{mealType}</Typography>


      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: '0.5rem' }}>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 600 }}>food</Typography>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 600 }}>Serving size</Typography>
        <Typography variant="p" component="p" align='center' sx={{ width: '100%', fontSize: '1.1rem', pr: '1rem', fontWeight: 600 }} >calories</Typography>
      </Box>
      {

        foods.map((food) =>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" component="p" align='center' sx={{ width: '100%' }}>{food.name}</Typography>
            <Typography variant="p" component="p" align='center' sx={{ width: '100%' }}>{food.qnty}</Typography>
            <Typography variant="p" component="p" align='center' sx={{ width: '100%', pr: '1rem' }} >{`${food.cal} Cal`}</Typography>
          </Box>
        )
      }
      {foods.length > 0 &&
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="p" component="p" align='center' sx={{ width: '100%' }}>{ }</Typography>
          <Typography variant="p" component="p" align='center' sx={{ width: '100%' }}>{ }</Typography>
          <Typography variant="p" component="p" align='center' sx={{ width: '100%', pr: '1rem' }} ><hr /></Typography>
        </Box>
      }

    </Box>
  )
}

export default MealDetails