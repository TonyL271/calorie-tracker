import { useState, useContext } from 'react';
import { Box, Typography, Button, ButtonGroup, TextField, FormGroup } from '@mui/material';
import { MealDetails } from '.'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import IcecreamIcon from '@mui/icons-material/Icecream';
import { DailyMeal } from './DailyMeal';
import UserContext from '../context/UserContext';

const CreateMeal = ({ breakfast, lunch, dinner, snacks, setBreakfast, setLunch, setDinner, setSnacks, dailyMeals, setDailyMeals }) => {
  const { user, saveUser } = useContext(UserContext);
  const [addBreakFast, setAddBreakFast] = useState('');
  const [addLunch, setAddLunch] = useState('');
  const [addDinner, setAddDinner] = useState('');
  const [addSnacks, setAddSnacks] = useState('');
  const [date, setDate] = useState(new Date());

  const breakfastCals = breakfast.reduce((total, food) => (total + food.nf_calories_scaled), 0);
  const lunchCals = lunch.reduce((total, food) => (total + food.nf_calories_scaled), 0);
  const dinnerCals = dinner.reduce((total, food) => (total + food.nf_calories_scaled), 0);
  const snacksCals = snacks.reduce((total, food) => (total + food.nf_calories_scaled), 0);
  const totalCals = breakfastCals + lunchCals + dinnerCals + snacksCals;

  const handleClear = () => {
    setBreakfast([]);
    setLunch([]);
    setDinner([]);
    setSnacks([]);
  }
  const saveDailyMeal = () => {
    //TODO: Save meal to database
    console.log(user)
    if (user) {
      fetch('/addMeal', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user.username,
          dailyMeal: new DailyMeal(date, breakfast, lunch, dinner, snacks)
        })
      })
        .then(res => res.json())
        .then(data => {
          saveUser(data.user)
        })
        .catch(err => console.log(err.message))
    } else {
      setDailyMeals([...dailyMeals, new DailyMeal([...date], [...breakfast], [...lunch], [...dinner], [...snacks])]);
    }
  }


  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box className="main" sx={{
        display: 'grid',
        width:
        {
          mobile: '100%',
          tablet: '80%'
        },
        margin: 'auto',
        bgcolor: 'ghostwhite',
        boxShadow: '0 0 8px',
        borderRadius: '4px',
        columnGap: '2rem',
        rowGap: '2rem',
        padding: '2rem',
        height: {
          mobile: '94vh',
          tablet: 'auto'
        },
        gridTemplateColumns: {
          mobile: 'repeat(auto-fit,auto)',
          desktop: 'repeat(2,auto)'
        },
      }}>
        <MealDetails
          mealType="Breakfast"
          Icon={<FreeBreakfastIcon sx={{ mr: '1rem' }} />}
          foodList={breakfast}
          addFood={addBreakFast}
          setFoodList={setBreakfast}
          setAddFood={setAddBreakFast}
        />
        <MealDetails
          mealType="Lunch"
          Icon={<LunchDiningIcon sx={{ mr: '1rem' }} />}
          foodList={lunch}
          addFood={addLunch}
          setFoodList={setLunch}
          setAddFood={setAddLunch}
        />
        <MealDetails
          mealType="Dinner"
          Icon={<RestaurantIcon sx={{ mr: '1rem' }} />}
          foodList={dinner}
          addFood={addDinner}
          setFoodList={setDinner}
          setAddFood={setAddDinner}
        />
        <MealDetails
          mealType="Snacks"
          Icon={<IcecreamIcon sx={{ mr: '1rem' }} />}
          foodList={snacks}
          addFood={addSnacks}
          setFoodList={setSnacks}
          setAddFood={setAddSnacks}
        />
        <Box sx={{ height: '100px', gridColumn: '1/-1' }}>
          <Typography sx={{ width: '100%', mt: '1rem', fontWeight: '700', color: '#f50057' }}>{`Daily total: ${totalCals.toPrecision(3)} calories`}</Typography>
          <Box sx={{ position: 'relative' }}>
            <FormGroup variant="contained" sx={{
              display: 'flex',
              flexDirection: 'row',
              position: 'absolute',
              right: '0',
              bgcolor: 'ghostwhite',
              boxShadow: '0'
            }}>

              <LocalizationProvider dateAdapter={AdapterDateFns} >
                <MobileDatePicker
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={
                    (newValue) => {
                      setDate(newValue);
                    }
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button variant="contained" sx={{ ml: '1rem', mr: '1rem' }} onClick={handleClear}>Clear</Button>
              <Button variant="contained"
                onClick={() => {
                  saveDailyMeal();
                  handleClear();
                }}
              >
                Add To <br /> Calender</Button>
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

export default CreateMeal