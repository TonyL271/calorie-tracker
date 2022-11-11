import { useState } from 'react';
import { Box, Typography, Button, TextField, FormGroup } from '@mui/material';
import { MealDetails, CustomAlert } from './'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//importing icons from mui icons
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import IcecreamIcon from '@mui/icons-material/Icecream';

const MealForm = ({
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
    const [showAlert, setShowAlert] = useState(false);
    const breakfastCals = breakfast.reduce((total, food) => (total + food.nf_calories_scaled), 0);
    const lunchCals = lunch.reduce((total, food) => (total + food.nf_calories_scaled), 0);
    const dinnerCals = dinner.reduce((total, food) => (total + food.nf_calories_scaled), 0);
    const snacksCals = snacks.reduce((total, food) => (total + food.nf_calories_scaled), 0);
    const totalCals = breakfastCals + lunchCals + dinnerCals + snacksCals;
    return (
        <Box sx={{ minHeight: 'calc(100vh - 65px)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', py: { mobile: 0, tablet: '1rem', laptop: '4rem' } }}>
            <Box sx={{
                position: 'relative',
                top: { mobile: '0', tablet: 'auto' },
                display: 'grid',
                width:
                {
                    mobile: '100%',
                    tablet: '80%'
                },
                mx: 'auto',
                bgcolor: 'ghostwhite',
                boxShadow: '0 0 8px',
                borderRadius: { mobile: '0', tablet: '8px' },
                columnGap: '2rem',
                rowGap: '2rem',
                padding: { mobile: '2rem 0.5rem 2rem 0.5rem', tablet: '2rem' },
                minHeight: {
                    mobile: '100%',
                    tablet: 'auto'
                },
                gridTemplateColumns: {
                    mobile: 'repeat(auto-fit,auto)',
                    desktop: 'repeat(2,auto)'
                },
            }}>
                <MealDetails
                    mealType="Breakfast"
                    Icon={<FreeBreakfastIcon sx={{ position: 'absolute', left: '-2.5rem' }} />}
                    foodList={breakfast}
                    addFood={addBreakFast}
                    setFoodList={setBreakfast}
                    setAddFood={setAddBreakFast}
                />
                <MealDetails
                    mealType="Lunch"
                    Icon={<LunchDiningIcon sx={{ position: 'absolute', left: '-2.5rem' }} />}
                    foodList={lunch}
                    addFood={addLunch}
                    setFoodList={setLunch}
                    setAddFood={setAddLunch}
                />
                <MealDetails
                    mealType="Dinner"
                    Icon={<RestaurantIcon sx={{ position: 'absolute', left: '-2.5rem' }} />}
                    foodList={dinner}
                    addFood={addDinner}
                    setFoodList={setDinner}
                    setAddFood={setAddDinner}
                />
                <MealDetails
                    mealType="Snacks"
                    Icon={<IcecreamIcon sx={{ position: 'absolute', left: '-2.5rem' }} />}
                    foodList={snacks}
                    addFood={addSnacks}
                    setFoodList={setSnacks}
                    setAddFood={setAddSnacks}
                />
                <Box sx={{ minHeight: '100px', gridColumn: '1/-1', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ width: '100%', mt: '1rem', fontWeight: '700', color: '#f50057', mb: { mobile: '1rem', tablet: '0' } }}>{`Daily total: ${totalCals.toPrecision(3)} calories`}</Typography>
                    <Box sx={{ position: 'relative' }}>
                        <FormGroup variant="contained" sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
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
                                    renderInput={(params) => <TextField sx={{
                                        width: '120px',
                                        '& .MuiInputLabel-root': {
                                            color: 'secondary.main',
                                            fontWeight: '500'
                                        },
                                        '& fieldset': {
                                            borderColor: 'primary.lightContrast',
                                            borderWidth: '2.5px'
                                        },
                                        '& input': {
                                            color: 'secondary.main'

                                        }
                                    }} {...params} />}
                                />
                            </LocalizationProvider>
                            <Box display="flex">
                                <Button variant="contained" sx={{ bgcolor: 'red', height: '61px', ml: '1rem', mr: '1rem', color: 'primary.contrast', fontWeight: 900 }} onClick={handleClear}>Clear</Button>
                                <Button sx={{ color: 'primary.contrast', fontWeight: 900 }} variant="contained"
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
                            </Box>
                        </FormGroup>
                    </Box>
                </Box>
            </Box>
            <CustomAlert showAlert={showAlert} message="Meal added to planner" />
        </Box >
    )
}

export default MealForm