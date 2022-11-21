import { useState, useRef } from "react";
import { Tab, Button, Typography } from "@mui/material"
import { Box } from "@mui/system";
import MealDetails from "./MealDetails";
import { useSwipeable } from "react-swipeable";
import { TabList, TabContext } from "@mui/lab";
//icons
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import IcecreamIcon from '@mui/icons-material/Icecream';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from "react";

const mod = (n, m) => ((n % m) + m) % m;

const MealFormMobile = ({
  date, setDate,
  handleClear, saveDailyMeal,
  totalCals, viewport,
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
  const scrollerRef = useRef(null);
  const emptyMeal = [!breakfast.length, !lunch.length, !dinner.length, !snacks.length];
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
      setValue((prev) => (
        mod(+prev + inc, 4).toString()
      ));
    },
    ...config,
  });
  const [value, setValue] = useState('0');

  //scroll selected tab into view after swipe
  useEffect(() => {
    scrollerRef.current.scrollTo({ left: `${viewport.width * value}`, behavior: 'smooth' })

  }, [value])


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
    <Box {...handlers} height="calc(100vh - 65px)" sx={{
      display:'flex',
      flexDirection: 'column',
      bgcolor: 'background.foreground',
      overFlowX: 'hidden',
    }}>
      <TabContext value={value} sx={{
      }}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="Daily meal tabs"
            sx={{
              '& button': {
                minWidth: '0',
                padding: '5px',
              },
              '& span.MuiTabs-indicator': {
                bgcolor: 'black',
              },
              '& button.Mui-selected': {
                minWidth: '0',
                color: 'black',
                padding: '5px',
              },
              '& .MuiTabs-flexContainer': {
                justifyContent: 'space-evenly',
              }
            }}
          >
            {mealProps.map((props, idx) => (
              <Tab
                key={idx}
                label={props.mealType}
                value={idx.toString()}
                icon={idx.toString() === value ? '' : emptyMeal[idx] ? <PriorityHighIcon /> : <CheckIcon />}
                sx={{ color: emptyMeal[idx] ? 'red' : 'rgba(0,219,1,255) ' }}
              />
            ))}
          </TabList>
        </Box>
      </TabContext>
      <Box
        ref={scrollerRef}
        sx={{
          position: 'relative',
          height: `calc(100% - 48px)`,
          overflowX: 'hidden',
          display: 'flex',
        }}>
        {
          mealProps.map((props, idx) => (
            <Box minWidth="100vw" key={idx} sx={{
              padding:{smallest: '1rem',tablet:'3rem'},
              height: '95%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              display: 'flex',
            }}>
              <MealDetails
                mealType={props.mealType}
                Icon={props.Icon}
                foodList={props.foodList}
                addFood={props.addFood}
                setFoodList={props.setFoodList}
                setAddFood={props.setAddFood}
                viewport={viewport}
              />
              <Box marginBottom="1rem"></Box>
              <Box display="flex" justifyContent="space-between" sx={{ flexDirection: { smallest: 'column', tablet: 'row', } }}>
                <Typography sx={{ mt: '1rem', display: 'block', fontWeight: '700', color: '#f50057', mb: { smallest: '1rem', tablet: '0' } }}>{`Daily total: ${totalCals.toPrecision(3)} calories`}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button sx={{
                    bgcolor: 'red',
                    height: '50px',
                    color: 'primary.contrast',
                    fontWeight: '700',
                    mr: '1rem'
                  }}>
                    clear all
                  </Button>
                  <Button sx={{
                    bgcolor: 'primary.main',
                    height: '50px',
                    color: 'primary.contrast',
                    fontWeight: '700',
                  }}>
                    add to planner
                  </Button>
                </Box>
              </Box>
            </Box>
          ))
        }
      </Box>
    </Box >
  )
}

export default MealFormMobile