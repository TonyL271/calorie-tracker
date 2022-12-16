import { Box, Typography, Divider, Select, MenuItem, FormControl, InputLabel, Button, TextField, Collapse } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Nutrients } from '../../../utils/apiCalls';
import CloseIcon from '@mui/icons-material/Close';
import NutrientLabel from '../../nutrientLabel/NutrientLabel';
import { styled } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';


const AddFoodMenu = ({ addFood, setAddFood, handleAddFood }) => {
   const [foodInfo, setFoodInfo] = useState({});
   const [foodQty, setFoodQty] = useState(1);
   const [selectedUnit, setSelectedUnit] = useState('');
   const open = Boolean(Object.entries(foodInfo).length);
   const StyledSelect = styled(Select)(({ theme }) => ({
      "& fieldset": {
         borderColor: theme.palette.primary.lightContrast,
      },
      "&:hover fieldset": {
         borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
         borderColor: theme.palette.primary.main,
      },
      "& fieldset legend": {
         color: 'black',
      }
   }
   ))

   const clearFood = () => {
      setFoodInfo({});
      setSelectedUnit('')
   }

   const scaleFood = (food) => {
      let scaleAmount;
      food.qty = foodQty;
      food.selectedUnit = selectedUnit;
      const servingWeight = food.all_measures.find(({ measure }) => measure === selectedUnit)
      const weightGrams = servingWeight.serving_weight * foodQty;
      scaleAmount = weightGrams / food.serving_weight_grams / servingWeight.qty;

      let newFood = { ...food };
      newFood.uuid = uuidv4();
      // Add scaled nutrients to food
      let nutrientKeys = Object.entries(food).filter((entry) => entry[0].substring(0, 2) === "nf");
      nutrientKeys = nutrientKeys.map((entry) => entry[0].split('_scaled')[0]);
      nutrientKeys = new Set(nutrientKeys)
      nutrientKeys.forEach((key) => {
         newFood[key + '_scaled'] = food[key] * scaleAmount;
      })
      newFood.weightGrams = weightGrams;
      setFoodInfo(newFood);
   }

   useEffect(() => {
      if (Object.entries(foodInfo).length && !selectedUnit.length) {
         //check if default serving unit is in alt_measures
         const contained = foodInfo.alt_measures.some((altMeasure) => altMeasure.measure === foodInfo.serving_unit);
         foodInfo.all_measures = [...foodInfo.alt_measures];
         if (!contained) {
            const measure = { serving_weight: foodInfo.serving_weight_grams, measure: foodInfo.serving_unit, qty: 1 }
            foodInfo.all_measures.push(measure);
         }
         // Set default serving unit
         setSelectedUnit(foodInfo.serving_unit)
      }
   }, [foodInfo, selectedUnit])

   // Scale food nutrients according to selected unit and quantity
   useEffect(() => {
      if (Object.entries(foodInfo) && selectedUnit.length) {
         scaleFood(foodInfo);
      }
   }, [selectedUnit, foodQty])

   useEffect(
      () => {
         if (addFood.length > 0) {
            Nutrients(addFood).then((foodInfo) => {
               setFoodInfo(foodInfo);
               setAddFood('');
            })
         }
      }
      , [addFood]);

   return (
      //check if selected food exists
      <Box onPointerDown={(e) => clearFood()}
         sx={{
            position: 'fixed',
            transformOrigin: '0 0',
            top: '0',
            left: '0',
            backgroundColor: `rgba(0,0,0,${open ? 0.4 : 0})`,
            display: 'flex',
            pointerEvents: open ? 'auto' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            zIndex: 11,
         }}>
         <Collapse direction="up" in={open} mountOnEnter unmountOnExit>
            <Box onPointerDown={(e) => e.stopPropagation()}
               sx={{
                  display: 'flex',
                  minWidth: '320px',
                  height: '430px',
                  backgroundColor: '#FFFFFF',
                  flexDirection: 'column',
                  px: '1rem',
                  position: 'relative',
                  border: 'solid 4px',
                  borderColor: 'primary.lightContrast',
                  borderRadius: '10px',
                  padding: '1.5rem',
               }}>
               <Box>
                  <CloseIcon onPointerDown={(e) => clearFood()} sx={{ position: 'absolute', top: 0, right: 0, m: '0.2rem', color: 'secondary.main' }} />
                  <Typography variant="h4" component="h2" textAlign="center" sx={{ mt: '1rem', color: 'secondary.main', textTransform: 'uppercase', fontWeight: '900' }}>Add Item</Typography>
               </Box>
               <Divider sx={{ mb: '1rem', bgcolor: 'secondary.main' }} />
               <Typography variant='h5' component="h5" sx={{ color: 'primary.lightContrast', textTransform: 'capitalize', fontWeight: '500' }}>{addFood}</Typography>
               <Box sx={{ display: 'flex', mb: '2rem' }}>
                  <Box sx={{ height: '3rem', mr: '1rem' }} component="img" src={Object.keys(foodInfo).length > 0 ? foodInfo.photo.thumb : ''} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                     <TextField variant="outlined" label="qty"
                        sx={{
                           width: '3rem',
                           '& fieldset': {
                              borderColor: 'primary.lightContrast',
                           },

                           '& label': {
                              color: 'primary.lightContrast',
                           },
                        }}
                        defaultValue={1} onChange={(e) => setFoodQty(parseInt(e.currentTarget.value))} />
                     <FormControl sx={{ ml: '0.5rem' }} >
                        <InputLabel sx={{ color: 'primary.lightContrast' }} id="demo-simple-select-label">Unit</InputLabel>
                        {foodInfo.all_measures &&
                           <StyledSelect
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Unit"
                              value={selectedUnit.length ? selectedUnit : Object.entries(foodInfo).length ? foodInfo.serving_unit : ''}
                              onChange={(e) => {
                                 setSelectedUnit(e.target.value)
                              }}
                           >
                              {foodInfo.all_measures.map((elem, idx) => (
                                 <MenuItem key={idx} value={elem.measure}>{elem.measure}</MenuItem>
                              ))}
                           </StyledSelect>
                        }
                     </FormControl>
                  </Box>
               </Box>
               {(foodInfo.nf_calories_scaled != null) && <React.Fragment>
                  <Box sx={{ display: 'grid', mb: '1rem', gridTemplateColumns: '1fr 1fr 1fr 1fr', columnGap: '1rem' }}>

                     <Typography sx={{ mr: '0.5rem', mb: '1rem', fontWeight: '700' }}>Total Calories: </Typography>
                     <Typography >{`${foodInfo.nf_calories_scaled.toFixed(0)} `}</Typography>
                     <Typography sx={{ mr: '0.5rem', mb: '1rem', fontWeight: '700' }}>Weight:</Typography>
                     <Typography >{`${foodInfo.weightGrams}g `}</Typography>

                     <Typography fontWeight="700" textAlign='left' >{`Protein: `}</Typography>
                     <Typography textAlign='right' >{`${foodInfo.nf_protein_scaled?.toFixed(1) || 0}g`}</Typography>
                     <Typography fontWeight="700" textAlign='left' >{`Carbs: `}</Typography>
                     <Typography textAlign='right'>{`${foodInfo.nf_total_carbohydrate_scaled?.toFixed(1) || 0}g`}</Typography>
                     <Typography fontWeight="700" textAlign='left' >{`Fat: g`}</Typography>
                     <Typography textAlign='right'>{`${foodInfo.nf_total_fat_scaled?.toFixed(1) || 0}`}</Typography>
                     <Typography fontWeight="700" textAlign='left' >{`Sodium: `}</Typography>
                     <Typography textAlign='right'>{`${foodInfo.nf_sodium_scaled?.toFixed(1) || 0}mg`}</Typography>
                  </Box>
                  <Box mb="0.5rem">
                     <NutrientLabel food={foodInfo} />
                  </Box>
                  <Button sx={{ marginBottom: '1rem', bgcolor: 'primary.main', color: 'background.foreground' }} variant="contained" onPointerDown={() => {
                     handleAddFood(foodInfo);
                     clearFood();
                  }}>Add</Button>
               </React.Fragment>
               }
            </Box>
         </Collapse>
      </Box >
   )
}

export default AddFoodMenu