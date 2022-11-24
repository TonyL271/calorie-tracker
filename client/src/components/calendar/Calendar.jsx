import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useState, useEffect, useContext, useRef } from 'react';
import MealPlan from './MealPlan';
import UserContext from '../../context/UserContext';
import { useLayoutEffect } from 'react';

const CenteredBox = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontWeight: '700',
  width: '100%'
})

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const sameDay = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();


const Calendar = ({ dailyMeals, setDailyMeals }) => {
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState([])
  const [firstDay, setFirstDay] = useState(1);
  const [lastDay, setLastDay] = useState(0);
  const [showDietPlan, setShowDietPlan] = useState({});
  const { user, setUser } = useContext(UserContext);
  const ref = useRef(null);

  function useMinDim() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        console.log(ref.current.offsetWidth, ref.current.offsetWidth)
        setSize(Math.min(ref.current.offsetWidth, ref.current.offsetWidth,500));
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  const minDim = useMinDim();



  // Generate corresponding dates for corresponding calender month
  useEffect(() => {
    let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let firstDate = new Date(date.getFullYear(), date.getMonth());
    let firstDay = firstDate.getDay();
    const month = firstDate.getMonth();
    const year = firstDate.getFullYear();
    let lastDay = lastDate.getDay();
    setLastDay(lastDay)
    setFirstDay(firstDay)

    const dates = [];
    for (let i = 1; i <= lastDate.getDate(); i += 1) {
      dates.push(new Date(year, month, i))
    }
    setDates(dates)
  }, [date])

  return (
    <Box ref={ref} sx={{ minHeight: 'calc(100vh - 65px)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box id="calendar" sx={{
        width: `${minDim}px`,
        height: `${minDim}px`,
        bgcolor: 'rgba(0,0,0,0.80)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box id="calendar-header" sx={{ height: '4rem', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CenteredBox id="month">{`${months[date.getMonth()]}  ${date.getFullYear()}`}</CenteredBox>
          <ButtonGroup sx={{ position: 'absolute', right: '5rem', bgcolor: 'white', }}>
            <Button sx={{ color: 'black', borderColor: 'red' }} onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1)) }}>{'<'}</Button>
            <Button sx={{ color: 'black', borderColor: 'red' }} onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1)) }}>{'>'}</Button>
          </ButtonGroup>
        </Box>
        <Box id="week-days"
          sx={{
            bgcolor: 'primary.main',
            display: 'grid',
            gridTemplateColumns: 'repeat(7,1fr)',
            width: '100%',
            height: '2rem',
          }}>
          <CenteredBox>Su</CenteredBox>
          <CenteredBox>Mo</CenteredBox>
          <CenteredBox>Tu</CenteredBox>
          <CenteredBox>We</CenteredBox>
          <CenteredBox>Th</CenteredBox>
          <CenteredBox>Fr</CenteredBox>
          <CenteredBox sx={{ border: 0 }}>Sa</CenteredBox>
        </Box>
        <Box id="days" sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', bgcolor: 'primary.main', gridGap: '0.20rem', border: 'solid 3px #4EDC8E', height: '80%' }}>
          {/* empty padding for when days don't start on sunday */}
          {[...Array(firstDay)].map(
            (elem, idx) => (<Button key={idx} sx={{ display: firstDay ? 'inline-flex' : 'none', height: '100%', minHeight: '100%', minWidth: '100%', width: '100%', bgcolor: idx === 0 ? 'gray' : 'white', borderRadius: 0 }}><time></time></Button>)
          )
          }
          {/* day 1 begins here */}
          {
            dates.map((date, idx) => {
              const match = user ?
                user.dailyMeals.filter((meal) => sameDay(new Date(meal.date), date)) :
                dailyMeals.filter((meal) => sameDay(meal.getDate(), date));
              const color = match.length ? '#e6008a' : (idx + firstDay) % 7 === 0 || (idx + firstDay) % 7 === 6 ? 'gray' : 'white';
              const onClick = match.length ?
                () => {
                  setShowDietPlan(match[0])
                } :
                () => { };
              return (
                <Button
                  sx={{ bgcolor: color, borderRadius: 0, color: 'black', minHeight: '100%', height: '100%', minWidth: '100%', width: '100%', display: 'flex', justifyContent: 'end', alignContent: 'start', }}
                  key={idx + 1}
                  onClick={onClick}
                >
                  <Typography sx={{ width: '100%', height: '100%', textAlign: 'end', mr: '0.5rem', mt: '0.5rem' }}>
                    {date.getDate()}
                  </Typography>
                </Button>
              )
            })
          }
          {/* padding for when days don't end on saturday */}
          {
            [...Array(6 - lastDay)].map(
              (elem, idx) => {
                return <Button key={idx} sx={{ minWidth: '100%', width: '100%', height: '100%', bgcolor: idx === 5 - lastDay ? 'gray' : 'white', borderRadius: 0 }}></Button>
              }
            )
          }
        </Box>
        <MealPlan showDietPlan={showDietPlan} setShowDietPlan={setShowDietPlan} />
      </Box>
    </Box>
  )
}

export default Calendar