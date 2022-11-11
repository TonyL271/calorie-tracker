import { useState, useContext, useEffect } from 'react';
import { MealForm, MealFormMobile } from './';
import { DailyMeal } from './DailyMeal';
import UserContext from '../../context/UserContext';
import { addMeal, Nutrients } from '../../apiCalls';

const CreateMeal = ({ dailyMeals, setDailyMeals }) => {
  const { user, saveUser } = useContext(UserContext);

  const [breakfast, setBreakfast] = useState([])
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([])
  const [snacks, setSnacks] = useState([])

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

  const [date, setDate] = useState(new Date());

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
      addMeal(user.username, breakfast, lunch, dinner, snacks, date)
        .catch(err => console.log(err.message))
    } else {
      setDailyMeals([...dailyMeals, new DailyMeal([...date], [...breakfast], [...lunch], [...dinner], [...snacks])]);
    }
  }

  return (
    <MealForm
      date={date} setDate={setDate}
      handleClear={handleClear} saveDailyMeal={saveDailyMeal}
      {...{ mealProps, addFoodProps }} />
  )
}

export default CreateMeal