import { useState, useRef, useEffect } from "react";
import { Box, Button, Typography, Fade, MobileStepper } from "@mui/material"
import MealCard from "./MealCard";
import MealTabs from "./MealTabs";
import { useSwipeable } from "react-swipeable";
//icons
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import IcecreamIcon from '@mui/icons-material/Icecream';

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
  const mealTypes = mealProps.map((meal) => meal.mealType);

  return (
    <Fade in={true} timeout={1500}>
      <Box {...handlers} sx={{
        height: `calc(${window.innerHeight}px - 65px)`,
        display: 'flex',
        flexDirection: 'column',
        overFlowX: 'hidden',
        bgcolor: "#222222",
      }}>
        <MealTabs value={value} setValue={setValue} mealTypes={mealTypes} warning={{ warn: true, emptyMeal }} />
        <MobileStepper
          variant="dots"
          steps={4}
          position="static"
          activeStep={+value}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#222222',
            height:'2.5rem',
            '& div.MuiMobileStepper-dot': {
              bgcolor: 'white',
            },
            '& div.MuiMobileStepper-dotActive': {
              bgcolor: 'primary.main',
            }
          }}
        />
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
              <Box className="look" minWidth="100vw" key={idx} sx={{
                padding: { smallest: '0 1rem 1rem 1rem', tablet: '0 3rem 3rem 3rem' },
                height: '95%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                display: 'flex',
              }}>
                <MealCard
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
    </Fade>
  )
}

export default MealFormMobile