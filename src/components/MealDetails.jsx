import React from 'react'
import { Box } from '@mui/material'

const MealDetails = ({ foods }) => {
  return (
    <Box sx={{width:'50%',display: 'flex', flexDirection: 'column', border: 'solid 1px black' }}>
      {
        foods.map((food) =>
          <Box sx={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            {food}
            <Box>20</Box>
          </Box>
        )
      }
    </Box>
  )
}

export default MealDetails