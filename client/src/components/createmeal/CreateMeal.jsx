import React, { useState, useContext, } from 'react';
import { MealForm, MealFormMobile } from './';
import UserContext from '../../context/UserContext';
import { addMeal } from '../../apiCalls';
import { CustomAlert } from './'
import { overwriteMeal } from '../../apiCalls';
import { Typography,Box } from '@mui/material';
import { styled } from '@mui/system';
// see if day is the same regardles of time of day
const sameDay = (date1, date2) => (
   date1.getFullYear() === date2.getFullYear() &&
   date1.getMonth() === date2.getMonth() &&
   date1.getDate() === date2.getDate()
)


const CreateMeal = ({ dailyMeals, setDailyMeals, viewport }) => {
   const breakpoint = 1024;

   const { user, saveUser } = useContext(UserContext);

   const [breakfast, setBreakfast] = useState([])
   const [lunch, setLunch] = useState([])
   const [dinner, setDinner] = useState([])
   const [snacks, setSnacks] = useState([])
   const [alert, setAlert] = useState(null);

   const mealProps = {
      breakfast, setBreakfast, lunch, setLunch, dinner, setDinner, snacks, setSnacks
   }

   const [addBreakFast, setAddBreakFast] = useState('');
   const [addLunch, setAddLunch] = useState('');
   const [addDinner, setAddDinner] = useState('');
   const [addSnacks, setAddSnacks] = useState('');

   const addFoodProps = {
      addBreakFast, setAddBreakFast, addLunch, setAddLunch, addDinner, setAddDinner, addSnacks, setAddSnacks
   }

   const totalCals = breakfast.reduce((total, food) => (total + food.nf_calories_scaled), 0) +
      lunch.reduce((total, food) => (total + food.nf_calories_scaled), 0) +
      dinner.reduce((total, food) => (total + food.nf_calories_scaled), 0) +
      snacks.reduce((total, food) => (total + food.nf_calories_scaled), 0);


   const [date, setDate] = useState(new Date());

   const HighlightedText = styled(Typography)(({ theme }) => ({
      color: theme.palette.error.main,
      fontWeight: 'bold',
      fontSize: '1.2rem',
      display: 'inline',
   }))


   const handleClear = () => {
      setBreakfast([]);
      setLunch([]);
      setDinner([]);
      setSnacks([]);
   }
   const saveDailyMeal = () => {
      // if submission is empty, do nothing
      if ((lunch.length === 0 && dinner.length === 0 && breakfast.length === 0 && snacks.length === 0)) {
         return
      }

      // Checks if submission is valid before saining meal, the user is either asked to login or asked to confirm their action.
      signInWarning()
         .then(() => missingItemWarning())
         .then(() => overwriteDateWarning())
         .then(({ overwrite }) => overwrite ? replaceMeal() : saveMeal())
         .catch(() => { })
   }

   const signInWarning = () => (
      new Promise((resolve, reject) => {
         if (user) {
            resolve()
         } else {
            setAlert({
               icon: 'failure',
               msg: 'You must be signed in to save your meal plan.',
               type: 'confirm',
               handleYes: () => { setAlert(null); reject() },
            });
         }
      })
   )

   const missingItemWarning = () => (
      new Promise((resolve, reject) => {
         const [missingBreakfast, missingLunch, missingDinner, missingSnacks] = [lunch.length === 0, dinner.length === 0, breakfast.length === 0, snacks.length === 0]
         if (missingBreakfast || missingLunch || missingDinner || missingSnacks) {
            setAlert({
               icon: 'warning',
               msg: (
                  <Box my="0.5rem" textAlign="center">
                     Missing
                     {missingBreakfast && <HighlightedText > Breakfast </HighlightedText>}
                     {missingLunch && <HighlightedText > Lunch </HighlightedText>}
                     {missingDinner && <HighlightedText > Dinner </HighlightedText>}
                     {missingSnacks && <HighlightedText > Snacks </HighlightedText>}
                     would you like to save anyway?
                  </Box>
               ),
               type: 'askUser',
               handleYes: () => { resolve() },
               handleNo: () => { setAlert(null); reject() },
            });
         } else {
            resolve()
         }
      })
   )

   const overwriteDateWarning = () => (
      new Promise((resolve, reject) => {
         const dateIsTaken = user.dailyMeals.reduce((acc, curr) => sameDay(new Date(curr.date), date) || acc, false);
         if (dateIsTaken) {
            setAlert({
               icon: 'warning',
               msg: 'You already have plans for that day. Would you like to overwrite them?',
               type: 'askUser',
               handleYes: () => { resolve({ overwrite: true }) },
               handleNo: () => { setAlert(null); reject() },
            });
         }
         else {
            resolve({ overwrite: false })
         }
      })
   )

   const saveMeal = () => {
      addMeal(user.username, breakfast, lunch, dinner, snacks, date)
         .then(result => {
            result.success && saveUser(result.user)
            setAlert({
               icon: 'success',
               msg: 'Sucessfully saved!',
               type: 'timeout',
               timeoutDuration: 1500,
            });
            handleClear();
         })
         .catch(err => console.log(err.message))
   }

   const replaceMeal = () => {
      overwriteMeal(user.username, breakfast, lunch, dinner, snacks, date)
         .then(result => {
            if (result?.success) {
               saveUser(result.user)
               setAlert({
                  icon: 'success',
                  msg: 'Sucessfully saved your meal plan!',
                  type: 'timeout',
                  timeoutDuration: 1500,
               });
               handleClear();
            }
         })
         .catch(err => console.log(err.message))
   }

   return (
      <React.Fragment>
         {viewport.width > breakpoint ?
            (
               <MealForm
                  date={date} setDate={setDate}
                  handleClear={handleClear} saveDailyMeal={saveDailyMeal}
                  totalCals={totalCals} viewport={viewport}
                  {...{ mealProps, addFoodProps }} />
            ) :
            (
               <MealFormMobile
                  date={date} setDate={setDate}
                  handleClear={handleClear} saveDailyMeal={saveDailyMeal}
                  totalCals={totalCals} viewport={viewport}
                  {...{ mealProps, addFoodProps }} />
            )
         }
         <CustomAlert alert={alert} setAlert={setAlert} />
      </React.Fragment>
   )
}

export default CreateMeal