import { Box, Typography, Divider, Input, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Nutrients } from '../apiCalls';

const AddFoodMenu = ({ addFood, setAddFood }) => {
  const [foodInfo, setFoodInfo] = useState({});
  const handleChange = (e) => {
  };
  useEffect(
    () => {
      if (addFood.length > 0) {
        Nutrients(addFood).then((nutrition) => {
          setFoodInfo(nutrition.foods[0])
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
        width: '100%',
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
          <Box sx={{ width: '3rem', gridColumn: '1/2' }} component="img" src={Object.keys(foodInfo).length > 0 ? foodInfo.photo.thumb : ''} />
          <Input defaultValue="1" />
          <FormControl fullWidth>

            <InputLabel id="demo-simple-select-label">Unit</InputLabel>
            {foodInfo.hasOwnProperty('alt_measures') &&
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={handleChange}
                defaultValue=""
              >
                {foodInfo.alt_measures.map((elem, idx) => (
                  <MenuItem key={idx} value={idx}>{elem.measure}</MenuItem>
                ))}
              </Select>}
          </FormControl>

        </Box>
        <Box className="add-nutrient" sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)' }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', gridColumn: '1/-1' }}>
            <Typography>Total Calories: </Typography>
            <Typography>{`${foodInfo.nf_calories} cals`}</Typography>
          </Box>
          <Typography sx={{ gridColumn: '1/2' }}>{`${foodInfo.nf_protein} Protein`}</Typography>
          <Typography>{`${foodInfo.nf_total_carbohydrate} Carbs`}</Typography>
          <Typography>{`${foodInfo.nf_total_fat} Fat`}</Typography>
          <Typography>{`${foodInfo.nf_sodium} Sodium`}</Typography>
        </Box>
        <Button variant="contained">Add</Button>
      </Box>
    </Box>
  )
}

export default AddFoodMenu