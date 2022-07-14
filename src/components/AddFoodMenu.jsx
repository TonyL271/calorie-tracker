import { Box, Typography, Divider, Input, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Nutrients } from '../apiCalls';

const AddFoodMenu = ({ addFood, setAddFood, handleAddFood }) => {
  const [foodInfo, setFoodInfo] = useState({});
  const [foodQty, setFoodQty] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState('');


  const scaleFood = (food) => {
    let scaleAmount;
    if (selectedUnit === food.serving_unit) {
      scaleAmount = foodQty;
    } else {
      const servingWeight = food.alt_measures.filter(
        (altMeasure) => altMeasure.measure === selectedUnit
      )[0];
      let a = 2;
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

  //Add nf_{nutrient}_scaled to foodInfo
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
            <Input defaultValue={1} onChange={(e) => setFoodQty(parseInt(e.currentTarget.value))} />
            <FormControl fullWidth>
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
          <Box className="add-nutrient" sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', gridColumn: '1/-1' }}>
              <Typography>Total Calories: </Typography>
              <Typography>{`${foodInfo.nf_calories_scaled.toPrecision(3)} cals`}</Typography>
            </Box>
            <Typography sx={{ gridColumn: '1/2' }}>{`${foodInfo.nf_protein_scaled.toPrecision(3)} Protein`}</Typography>
            <Typography>{`${foodInfo.nf_total_carbohydrate_scaled.toPrecision(3)} Carbs`}</Typography>
            <Typography>{`${foodInfo.nf_total_fat_scaled.toPrecision(3)} Fat`}</Typography>
            <Typography>{`${foodInfo.nf_sodium_scaled.toPrecision(3)} Sodium`}</Typography>
          </Box>
          <Button variant="contained" onClick={() => {
            handleAddFood(foodInfo);
            setFoodInfo({});
          }}>Add</Button>
        </Box>
      </Box>
  )
}

export default AddFoodMenu