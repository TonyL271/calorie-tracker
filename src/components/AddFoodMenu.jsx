import { Box, Typography, Divider, Select, MenuItem, FormControl, InputLabel, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Nutrients } from '../apiCalls';
import CloseIcon from '@mui/icons-material/Close';

const AddFoodMenu = ({ addFood, setAddFood, handleAddFood }) => {
  const [foodInfo, setFoodInfo] = useState({});
  const [foodQty, setFoodQty] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState('');


  const scaleFood = (food) => {
    let scaleAmount;
    food.qty = foodQty;
    food.selectedUnit = selectedUnit;
    if (selectedUnit === food.serving_unit) {
      scaleAmount = foodQty;
    } else {
      const servingWeight = food.alt_measures.filter(
        (altMeasure) => altMeasure.measure === selectedUnit
      )[0];
      scaleAmount = foodQty * servingWeight.serving_weight / food.serving_weight_grams / servingWeight.qty;
    }
    let newFoods = { ...food };
    let nutrientKeys = Object.entries(food).filter((entry) => entry[0].substring(0, 2) === "nf");
    nutrientKeys = nutrientKeys.map((entry) => entry[0].split('_scaled')[0]);
    nutrientKeys = new Set(nutrientKeys)
    nutrientKeys.forEach((key) => {
      newFoods[key + '_scaled'] = food[key] * scaleAmount;
    })
    setFoodInfo(newFoods);
  }

  useEffect(() => {
    if (Object.entries(foodInfo).length && !selectedUnit.length) {
      setSelectedUnit(foodInfo.serving_unit)
    }
  }, [foodInfo])

  useEffect(() => {
    if (Object.entries(foodInfo) && selectedUnit.length) {
      scaleFood(foodInfo);
    }
  }, [selectedUnit, foodQty])

  useEffect(
    () => {
      if (addFood.length > 0) {
        Nutrients(addFood).then((nutrition) => {
          const foodInfo = nutrition.foods[0];
          let nutrientKeys = Object.entries(foodInfo).filter((entry) => entry[0].substring(0, 2) === "nf");
          nutrientKeys = nutrientKeys.map((entry) => entry[0]);
          nutrientKeys.forEach((key) => {
            foodInfo[key + '_scaled'] = foodInfo[key]
          })
          foodInfo.scale = 1
          setFoodInfo(foodInfo);
        })
      }
    }
    , [addFood]);

  return (

    !Object.entries(foodInfo).length ? <div></div> :
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
            width: '350px',
            height: '400px',
            backgroundColor: '#FFFFFF',
            flexDirection: 'column',
            px: '1rem',
            position: 'relative'
          }}>
          <Box >
            <CloseIcon onClick={(e) => setAddFood('')} sx={{ position: 'absolute', top: 0, right: 0, m: '0.2rem' }} />
            <Typography variant="h4" component="h2" textAlign="center" sx={{ mt: '1rem' }}>Add Item</Typography>
          </Box>
          <Divider sx={{mb:'1rem'}}/>
          <Typography variant='h5' component="h5">{addFood.charAt(0).toUpperCase() + addFood.slice(1)}</Typography>
          <Box className="add-options" sx={{ display: 'flex', justifyContent: 'space-between', mb:'2rem' }}>
            <Box sx={{ width: '3rem', }} component="img" src={Object.keys(foodInfo).length > 0 ? foodInfo.photo.thumb : ''} />
            <TextField variant="outlined" label="qty" sx={{ width: '3rem', mr: '-2rem' }} defaultValue={1} onChange={(e) => setFoodQty(parseInt(e.currentTarget.value))} />
            <FormControl >
              <InputLabel id="demo-simple-select-label">Unit</InputLabel>
              {foodInfo.alt_measures &&
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Unit"
                  value={selectedUnit.length ? selectedUnit : Object.entries(foodInfo).length ? foodInfo.serving_unit : ''}
                  onChange={(e) => {
                    setSelectedUnit(e.target.value)
                  }}
                >
                  {foodInfo.alt_measures.map((elem, idx) => (
                    <MenuItem key={idx} value={elem.measure}>{elem.measure}</MenuItem>
                  ))}
                </Select>
              }
            </FormControl>
          </Box>
          <Box sx={{ width: '100%', display: 'flex',mb:'1rem' }}>
            <Typography>Total Calories: </Typography>
            <Typography>{`${foodInfo.nf_calories_scaled.toPrecision(3)} cals`}</Typography>
          </Box>
          <Box className="add-nutrient" sx={{ display: 'flex', mb:'1rem' }}>
            <Typography textAlign='center' sx={{}}>{`${foodInfo.nf_protein_scaled.toPrecision(3)} Protein`}</Typography>
            <Typography textAlign='center'>{`${foodInfo.nf_total_carbohydrate_scaled.toPrecision(3)} Carbs`}</Typography>
            <Typography textAlign='center'>{`${foodInfo.nf_total_fat_scaled.toPrecision(3)} Fat`}</Typography>
            <Typography textAlign='center'>{`${foodInfo.nf_sodium_scaled.toPrecision(3)} Sodium`}</Typography>
          </Box>
          <Typography sx={{color:'blue', pb:'1rem'}} textAlign='center'>Details</Typography>
          <Button variant="contained" onClick={() => {
            handleAddFood(foodInfo);
            setFoodInfo({});
          }}>Add</Button>
        </Box>
      </Box>
  )
}

export default AddFoodMenu