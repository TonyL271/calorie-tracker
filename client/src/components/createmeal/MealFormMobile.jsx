import { useState } from "react";
import { Tabs, Tab } from "@mui/material"
import { Box } from "@mui/system";
import MealDetails from "./MealDetails";
import { useSwipeable } from "react-swipeable";
import { TabList, TabPanel, TabContext } from "@mui/lab";
//icons
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import IcecreamIcon from '@mui/icons-material/Icecream';

const mod = (n, m) => ((n % m) + m) % m;

const MealFormMobile = ({
  date, setDate,
  handleClear, saveDailyMeal,
  mealProps: {
    breakfast, setBreakfast,
    lunch, setLunch,
    dinner, setDinner,
    snacks, setSnacks
  },
  addFoodProps: {
    addBreakFast, setAddBreakFast,
    addLunch, setAddLunch,
    addDinner, setAddDinner,
    addSnacks, setAddSnacks
  },
}) => {
  const config = {
    delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: true,           // prevents scroll during swipe (*See Details*)
    trackTouch: true,                      // track touch input
    trackMouse: true,                     // track mouse input
    rotationAngle: 0,                      // set a rotation angle
    swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
  }

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      const inc = eventData.dir === "Left" ? 1 : -1;
      setValue((prev) => mod(prev + inc, 4));
    },
    ...config,
  });
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mealProps = [
    {
      mealType: "Breakfast",
      Icon: <FreeBreakfastIcon sx={{ position: 'absolute', left: '-2.5rem' }} />,
      foodList: breakfast,
      addFood: addBreakFast,
      setFoodList: setBreakfast,
      setAddFood: setAddBreakFast,
    },
    {
      mealType: "Lunch",
      Icon: <LunchDiningIcon sx={{ position: 'absolute', left: '-2.5rem' }} />,
      foodList: lunch,
      addFood: addLunch,
      setFoodList: setLunch,
      setAddFood: setAddLunch,
    },
    {
      mealType: "Dinner",
      Icon: <RestaurantIcon sx={{ position: 'absolute', left: '-2.5rem' }} />,
      foodList: dinner,
      addFood: addDinner,
      setFoodList: setDinner,
      setAddFood: setAddDinner,
    },
    {
      mealType: "Snacks",
      Icon: <IcecreamIcon sx={{ position: 'absolute', left: '-2.5rem' }} />,
      foodList: snacks,
      addFood: addSnacks,
      setFoodList: setSnacks,
      setAddFood: setAddSnacks,
    },
  ];

  return (
    <Box {...handlers} height="calc(100vh - 65px)" sx={{ bgcolor: 'background.foreground', overFlowX: 'hidden' }}>
      <TabContext value={value.toString()}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="Daily meal tabs"
            sx={{
              '& button': {
                color: 'primary.lightContrast',
                padding: '2px',
              },
              '& .MuiTabs-flexContainer': {
                justifyContent: 'space-evenly',
              }
            }}
          >
            {mealProps.map((props, idx) => (
              <Tab key={idx} label={props.mealType} value={idx.toString()} />
            ))}
          </TabList>
        </Box>
      </TabContext>
      <Box
        sx={{
          position: 'relative',
          height: `calc(100% - 48px)`,
          overflowX: 'hidden',
          display: 'flex',
        }}>
        {
          mealProps.map((props, idx) => (
            <Box minWidth="100vw" key={idx} sx={{
              transition: 'transform 0.5s',
              transform: `translateX(calc(${value} * -100vw))`,
              px: '1rem',
              py: '3rem',
              height:'100%',
              display: 'flex',
            }}>
              <MealDetails
                mealType={props.mealType}
                Icon={props.Icon}
                foodList={props.foodList}
                addFood={props.addFood}
                setFoodList={props.setFoodList}
                setAddFood={props.setAddFood}
              />
            </Box>
          ))
        }
      </Box>
    </Box >
  )
}

export default MealFormMobile