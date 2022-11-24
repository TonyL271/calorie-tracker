import { Box, Typography, Button, IconButton, Paper, Stack, Grow, Zoom, Fade } from "@mui/material";
import { useEffect, useState, useContext, useReducer, } from "react";
import MealPlan from './MealPlan';
import UserContext from '../../context/UserContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const getShowDate = (date) => {
    date = new Date(date.getFullYear(), date.getMonth(), 1);
    const isLeapYear = date.getFullYear() % 4 === 0;
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const daysOfMonth = Array(daysInMonth[month]).fill(0).map((_, i) => new Date(date.getFullYear(), date.getMonth(), i + 1));
    return ({
        date,
        year,
        month: monthNames[month],
        daysOfMonth,
    })
};

const sameDay = (date1, date2) => (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
)

function Calendar({ dailyMeals, setDailyMeals }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showDate, setShowDate] = useState(getShowDate(currentDate));
    const [showMonth, setShowMonth] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [showDietPlan, setShowDietPlan] = useState({});

    return (
        <Box display="flex" alignItems="center" justifyContent="center" width="100vw" height="100vh" bgcolor="#f3f9fd" >
            <Paper sx={{
                bgcolor: '#fdfdfd',
                borderRadius: '25px',
                width: 'max-content',
                height: 'max-content',
            }}>
                <Box height="100%" padding="20px" position="relative">
                    {/* Header of Calendar */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px"
                        sx={{
                        }}>
                        <Fade timeout={1000} in={!showMonth} key={showDate.month}>
                            <Button
                                variant="text"
                                endIcon={<ExpandMoreIcon sx={{ width: '30px', height: '30px' }} />}
                                onClick={() => setShowMonth(!showMonth)}
                                sx={{
                                    color: 'primary.main',
                                    padding: '5px 0 5px 10px',
                                    fontSize: "1.4rem",
                                    textTransform: "Capitalize",
                                    borderRadius: "10px",
                                    '& span': { marginLeft: '0px', marginRight: '0px' }
                                }}>
                                {showDate.month}
                            </Button>
                        </Fade>

                        <Fade timeout={1000} in={!showMonth} key={showDate.year} color="secondary.main" >
                            <Box display="flex" justifyContent="space-between" alignItems="center" >
                                <IconButton sx={{ mx: "0px", color: 'secondary.main' }}
                                    onClick={() => {
                                        const newDate = new Date(showDate.date);
                                        newDate.setFullYear(newDate.getFullYear() - 1);
                                        setShowDate(getShowDate(newDate));
                                    }
                                    }>
                                    <ArrowBackIosNewIcon />
                                </IconButton>
                                <Typography variant="h5" component="h5" fontSize="1.4rem" >{showDate.year}</Typography>
                                <IconButton sx={{ mx: "0px", color: 'secondary.main' }}
                                    onClick={() => {
                                        const newDate = new Date(showDate.date);
                                        newDate.setFullYear(newDate.getFullYear() + 1);
                                        setShowDate(getShowDate(newDate));
                                    }}
                                >
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Box>
                        </Fade>
                    </Box>

                    {/* Body of calendar */}
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        padding: '10px',
                        rowGap: '2px',
                    }}>
                        {/* Days of th week */}
                        {weekDays.map((day) => (
                            <Box key={day} sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'secondary.main',
                                fontSize: {
                                    smallest: '0.8rem',
                                    mobile: '0.9rem',
                                    tablet: '1rem',
                                },
                                aspectRatio: '1/1',
                                fontWeight: 'bold',
                            }}>{day}</Box>
                        ))}
                        {/* Dates of the month */}
                        {showDate.daysOfMonth.map((date, idx) => {
                            const isToday = sameDay(currentDate, new Date(date.getFullYear(), date.getMonth(), date.getDate()));
                            // If user has a meal schedule on this date
                            const schedule = user ?
                                user?.dailyMeals?.filter((meal) => sameDay(new Date(meal.date), date)) :
                                dailyMeals.filter((meal) => sameDay(meal.getDate(), date));
                            const startingWeek = showDate.date.getDay() + 1;

                            return (
                                <Grow in={!showMonth} key={showDate.year + showDate.daysOfMonth + idx} timeout={1000} style={{
                                    transformOrigin: '0 0 0'
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '40px',
                                        minWidth: '40px',
                                        minHeight: '40px',
                                        color: 'black',
                                        fontSize: {
                                            smallest: '0.8rem',
                                            mobile: '0.9rem',
                                            tablet: '1rem',
                                        },
                                        aspectRatio: '1/1',
                                        borderRadius: '50%',
                                        bgcolor: schedule.length ? 'secondary.main' : 'rgba(0,0,0,0)',
                                        fontWeight: isToday ? '900' : 'normal',
                                        gridColumn: idx === 0 ? `${startingWeek}` : 'auto',
                                    }}
                                        onClick={() => { schedule.length && setShowDietPlan(schedule[0]); }}
                                    >
                                        {date.getDate()}
                                    </Box>
                                </Grow>
                            )
                        })}
                    </Box>
                    {/* Select Month menu */}
                    <Paper sx={{
                        visibility: showMonth ? 'visible' : 'hidden',
                        position: 'absolute',
                        padding: '10px',
                        bgcolor: '#fdfdfd',
                        borderRadius: '25px',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, auto)',
                    }}>
                        {monthNames.map((month, idx) => (
                            <Zoom key={month} in={showMonth} timeout={500}>
                                <Stack justifyContent="center">
                                    <Button
                                        onClick={() => {
                                            setShowDate(getShowDate(new Date(showDate.year, idx, 1)));
                                            setShowMonth(false);
                                        }}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: '1.0rem',
                                            borderRadius: '10px',
                                            px: '5px',
                                            py: '3px',
                                            textTransform: 'Capitalize',
                                        }}>
                                        {month}
                                    </Button>
                                </Stack>
                            </Zoom>
                        ))}
                    </Paper>
                </Box>
                <MealPlan showDietPlan={showDietPlan} setShowDietPlan={setShowDietPlan} />
            </Paper >
        </Box >
    );
}

export default Calendar;
