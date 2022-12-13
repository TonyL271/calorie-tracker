import React from 'react'
import { Box, Typography } from '@mui/material'
import { AddToggle, AddFoodMenu } from './addfood';
import MealGrid from './MealGrid';

const MealCard = ({ mealType, foodList, Icon, addFood, setFoodList, setAddFood, viewport }) => {

  const handleAddFood = (food) => {
    setFoodList([...foodList, food]);
    setTimeout(() => {
      const row = document.getElementsByClassName(`id-${food.uuid}`)[0]
      row.childNodes.forEach((child) => {
        child.classList.add('show');
      })
    }, 200);
  }

  const handleRemoveItem = (index) => {
    const uuid = foodList[index].uuid;
    const row = document.getElementsByClassName(`id-${uuid}`)[0]
    row.childNodes.forEach((child) => {
      child.classList.remove('show');
    })

    setTimeout(() => {
      const newFoodList = [...foodList]
      newFoodList.splice(index, 1);
      setFoodList(newFoodList)
    }, 800);
  }

  const clearAllItems = () => {
    foodList.forEach((food, index) => {
      handleRemoveItem(index);
    })
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      border: 'solid 6px',
      borderColor: 'primary.main',
      borderTop: '0',
      p: '1rem',
      pt: '0rem',
      fontSize: { smallest: '0.7rem', mobile: '0.8rem', tablet: '1rem' },
      borderRadius: '10px',
      bgcolor: 'background.foreground'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        color: 'primary.contrast',
        gridColumn: '1/-1',
        mb: '1rem',
        mx: '-19px',
        height: '3.5rem',
        position: 'relative',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}>
        {/* Title Header */}
        <Box sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: { smallest: '3.5rem auto', tablet: '4.5rem auto' },
        }}>
          <AddToggle foodList={foodList} setFoodList={setFoodList} setAddFood={setAddFood} />
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
          }}>
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center',color:'background.foreground' }}>
              {Icon}
              <Typography variant='h4' component="h2" align='center' sx={{ fontWeight: '800', }}>{mealType}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <MealGrid foodList={foodList} handleRemoveItem={handleRemoveItem} viewport={viewport} mutable={true} />
      <AddFoodMenu addFood={addFood} setAddFood={setAddFood} handleAddFood={handleAddFood} />
    </Box >
  )
}

export default MealCard