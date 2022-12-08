import React, { useState, useContext, useEffect } from 'react';
import { MealForm, MealFormMobile } from './';
import { DailyMeal } from './DailyMeal';
import UserContext from '../../context/UserContext';
import { addMeal } from '../../apiCalls';
import { CustomAlert } from './'
import { overwriteMeal } from '../../apiCalls';
// see if day is the same regardles of time of day
const sameDay = (date1, date2) => (
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate()
)


const CreateMeal = ({ dailyMeals, setDailyMeals }) => {
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
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

  const totalCals = breakfast.reduce((total, food) => (total + food.nf_calories_scaled), 0) +
    lunch.reduce((total, food) => (total + food.nf_calories_scaled), 0) +
    dinner.reduce((total, food) => (total + food.nf_calories_scaled), 0) +
    snacks.reduce((total, food) => (total + food.nf_calories_scaled), 0);

  const addFoodProps = {
    addBreakFast, setAddBreakFast, addLunch, setAddLunch, addDinner, setAddDinner, addSnacks, setAddSnacks
  }

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const handleResizeWindow = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

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

    if (user) {
      // Check if that date already has plans.
      const dateIsTaken = user.dailyMeals.reduce((acc, curr) => sameDay(new Date(curr.date), date) || acc, false);
      if (dateIsTaken) {
        setAlert({
          success: false,
          msg: 'You already have plans for that day. Would you like to overwrite them?',
          timeout: null,
        });
        return;
      }
      addMeal(user.username, breakfast, lunch, dinner, snacks, date)
        .then(result => {
          result.success && saveUser(result.user)
          setAlert({
            success: true,
            msg: 'Sucessfully saved!',
            timeout: 1500,
          });
          handleClear();
        })
        .catch(err => console.log(err.message))
    } else {
      setDailyMeals([...dailyMeals, new DailyMeal([...date], [...breakfast], [...lunch], [...dinner], [...snacks])]);
    }
  }

  const replaceMeal = () => {
    overwriteMeal(user.username, breakfast, lunch, dinner, snacks, date)
      .then(result => {
        if (result?.success) {
          saveUser(result.user)
          setAlert({
            success: true,
            msg: 'Sucessfully saved your meal plan!',
            timeout: 1500,
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
      <CustomAlert alert={alert} setAlert={setAlert} overwriteMeal={replaceMeal} />
    </React.Fragment>
  )
}

export default CreateMeal