import { useState, useRef, useEffect } from "react";
import { Box, Button, Typography, Fade, TextField } from "@mui/material"
import MealCard from "./MealCard";
import MealTabs from "./MealTabs";
import Rolldate from "rolldate-full";
//icons
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import IcecreamIcon from '@mui/icons-material/Icecream';

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
   const emptyMeal = [!breakfast.length, !lunch.length, !dinner.length, !snacks.length];
   const [value, setValue] = useState('0');
   const tabContainer = useRef(null);

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

   const today = new Date();
   const currentYear = today.getFullYear();
   const currentMonth = today.getMonth();
   const currentDate = today.getDate();

   useEffect(() => {
      new Rolldate({
         el: '#example',
         typeMonth: 'text',
         localeMonth: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
         trigger: 'tap',
         beginYear: currentYear,
         endYear: currentYear + 100,
         value: `${currentYear}-${currentMonth + 1}-${currentDate}`,
         lang: {
            title: 'Select Date',
            cancel: 'Cancel',
            confirm: 'Confirm',
            year: '',
            month: '',
            day: '',
         },
         confirm: function (date) {
            const [year, month, day] = date.split('-');
            // To correct for inconsistent date zero idexing for month
            setDate(new Date(year, month - 1, day));
         }
      })
   }, [])

   return (
      <Fade in={true} timeout={1500}>
         <Box ref={tabContainer} className="look" sx={{
            height: `calc(${viewport.height}px - 65px)`,
            display: 'flex',
            flexDirection: 'column',
            overFlowX: 'hidden',
            bgcolor: "background.tab",
         }}>
            <MealTabs value={value} setValue={setValue} mealTypes={mealTypes} warning={{ warn: true, emptyMeal }} >
               {
                  mealProps.map((props, idx) => (
                     <Box minWidth="100vw" key={idx} sx={{
                        padding: { smallest: '0 1rem 1rem 1rem', tablet: '0 3rem 3rem 3rem' },
                        height: '100%',
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
                     </Box>
                  ))
               }
            </MealTabs>
            <Box display="flex" justifyContent="space-between" sx={{ marginTop: '1rem', padding: '0 1rem 1rem 1rem', flexDirection: { smallest: 'column', tablet: 'row', } }}>
               <Box display="grid" gridTemplateColumns="140px 1fr 140px" width="100%">
                  <Box flexDirection="row" sx={{
                     justifyContent: 'space-between',
                     px: '0.5rem',
                     maxWidth: '170px',
                     color: '#f50057',
                     borderRadius: '8px',
                     mb: { smallest: '0.5rem', tablet: '0' },
                     '& p, & h3': {
                        display: 'inline-block',
                     },
                  }}>
                     <Typography fontSize="2.0rem" color="white" textAlign="start" sx={{ fontWeight: '900', mr: '0.5rem' }}>{`${totalCals.toFixed(0)}`}</Typography>
                     <Typography component="h3" variant="h4" align="center" margin="auto 0" justifyContent="space-evenly" fontWeight="700" fontSize="0.8rem" lineHeight={1.1}>
                        Daily <br />  Calories
                     </Typography>
                  </Box>
                  <Box position="relative" display="flex" alignItems="center" gridColumn="-1/-2">
                     <TextField size="small" sx={{
                        position: 'absolute',
                        right: '0',
                        input: { color: 'white' },
                        width: '130px',
                        mb: '0.5rem'
                     }} onChange={(e) => { console.log(e) }} label="Date" color="secondary" focused type="text" id="example" placeholder="" />
                  </Box>
               </Box>
               <Box onPointerDown={(e) => { e.stopPropagation() }} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button
                     onPointerDown={(e) => { handleClear() }}
                     sx={{
                        bgcolor: 'red',
                        height: '50px',
                        color: 'background.foreground',
                        fontWeight: '700',
                        margin: { smallest: '0 1rem 0 0', tablet: '0 1rem 0 1rem' },
                     }}>
                     clear all
                  </Button>
                  <Button
                     onPointerDown={(e) => { saveDailyMeal() }}
                     sx={{
                        bgcolor: 'primary.main',
                        height: '50px',
                        color: 'background.foreground',
                        fontWeight: '700',
                     }}>
                     add to planner
                  </Button>
               </Box>
            </Box>
         </Box >
      </Fade>
   )
}

export default MealFormMobile