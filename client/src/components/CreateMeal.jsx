import { useState, useContext, useEffect } from 'react';
import { Box, Typography, Button, ButtonGroup, TextField, FormGroup } from '@mui/material';
import { MealDetails, CustomAlert } from '.'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import IcecreamIcon from '@mui/icons-material/Icecream';
import { DailyMeal } from './DailyMeal';
import UserContext from '../context/UserContext';
import { Nutrients } from '../apiCalls';

const CreateMeal = ({ dailyMeals, setDailyMeals }) => {
  console.log(__dirname);
  const { user, saveUser } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);

  const [breakfast, setBreakfast] = useState([])
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([])
  const [snacks, setSnacks] = useState([])

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


  useEffect(() => {
    // if use is new show an example of a daily meal plan
    if (user === 'new-user') {
      const exampleBreakfast = [];
      const foods = [];

      foods.push(Nutrients('apple').then(data => {
        exampleBreakfast.push(data)
      }))
      foods.push(Nutrients('milk').then(data => {
        exampleBreakfast.push(data)
      }))

      foods.push(Nutrients('cereal').then(data => {
        exampleBreakfast.push(data)
      }))
      Promise.all(foods).then(() => {
        setBreakfast(exampleBreakfast)
      })
    }
  }, [user])

  const handleClear = () => {
    setBreakfast([]);
    setLunch([]);
    setDinner([]);
    setSnacks([]);
  }
  const saveDailyMeal = () => {
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
    <Box sx={{ minHeight: 'calc(100vh - 6vh)', width: '100%', }}>
      <Box className="main" sx={{
        position: 'relative',
        top: '10%',
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
        minHeight: {
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
              bgcolor: 'background.forground',
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
                  renderInput={(params) => <TextField className='lookatme' sx={{
                    '& .MuiInputLabel-root': {
                      color: 'primary.lightContrast'
                    },
                    '& fieldset': {
                      borderColor: 'primary.lightContrast'
                    }
                  }} {...params} />}
                />
              </LocalizationProvider>
              <Button variant="contained" sx={{ ml: '1rem', mr: '1rem', color: 'primary.contrast' }} onClick={handleClear}>Clear</Button>
              <Button sx={{ color: 'primary.contrast' }} variant="contained"
                onClick={() => {
                  saveDailyMeal();
                  handleClear();
                  setShowAlert(true);
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 1000);
                }}
              >
                Add To <br /> planner</Button>
            </FormGroup>
          </Box>
        </Box>
      </Box>
      <CustomAlert showAlert={showAlert} message="Meal added to planner" />
    </Box >
  )
}

export default CreateMeal