import { Box, Typography, Divider, Input, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Nutrients } from '../apiCalls';

const AddFoodMenu = ({ addFood, setAddFood }) => {
  const handleChange = (e) => {
  };
  useEffect(
    () => {
      if (addFood.length > 0) {
        Nutrients(addFood).then((resp) => {
          console.log(resp);
        })
      }
    }
    , [addFood])

  return (
    <Box onClick={(e) => setAddFood('')}
      sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: addFood.length ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        zIndex: 11
      }}>
      <Box onClick={(e) => e.stopPropagation()}
        sx={{
          display: 'flex',
          width: '30%',
          height: '60%',
          backgroundColor: '#FFFFFF',
          flexDirection: 'column',
          px: '1rem'
        }}>
        <Box>
          <Typography variant="h2" component="h2">Add Item</Typography>
          {/* add close icon  */}
        </Box>
        <Divider />
        <Box className="add-options" sx={{ display: 'grid', justifyContent: 'space-between', gridTemplateColumns: 'repeat(4,auto)' }}>
          <Typography variant='h3' component="h3">{addFood.charAt(0).toUpperCase() + addFood.slice(1)}</Typography>
          <Typography variant='h3' component="h3">Qnty</Typography>
          <Typography variant='h3' component="h3">Unit</Typography>
          <Box sx={{ width: '3rem', gridColumn: '1/2' }} component="img" src="https://via.placeholder.com/150" />
          <Input defaultValue="1" />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

        </Box>
        <Box className="add-nutrient" sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)' }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', gridColumn: '1/-1' }}>
            <Typography>Total Calories: </Typography>
            <Typography>{`${109} cals`}</Typography>
          </Box>
          <Typography sx={{ gridColumn: '1/2' }}>{`${0} Protein`}</Typography>
          <Typography>{`${0} Carbs`}</Typography>
          <Typography>{`${0} Fat`}</Typography>
          <Typography>{`${0} Sodium`}</Typography>
        </Box>
        <Button variant="contained">Add</Button>
      </Box>
    </Box>
  )
}

export default AddFoodMenu