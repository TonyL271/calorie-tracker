import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useState, useEffect, useContext, useRef } from 'react';
import MealPlan from './MealPlan';
import UserContext from '../../context/UserContext';

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
  const [minDim,setMinDim] = useState(0);
  const ref = useRef(null);


  useEffect(() => {
    setMinDim(Math.min(ref.current.offsetWidth,ref.current.offsetHeight)*0.9);
  },[ref.current])

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
    <Box ref={ref} sx={{ height: '100%', width: '100%', display:'flex',alignItems:'center',justifyContent:'center' }}>
      {/* //TODO change from width to min-width, width use to be 50vw */}
      <Box id="calendar" sx={{
        width: `${minDim}px`,
        height: `${minDim}px`,
        bgcolor: 'rgba(0,0,0,0.80)',
        display:'flex',
        flexDirection:'column',
      }}>
        <Box id="calendar-header" sx={{ mb: '2rem', position: 'relative', }}>
          <CenteredBox id="month">{`${months[date.getMonth()]}  ${date.getFullYear()}`}</CenteredBox>
          <ButtonGroup sx={{ position: 'absolute', top: '0', right: '5rem', bgcolor: 'white' }}>
            <Button sx={{ color: 'black', borderColor: 'red' }} onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1)) }}>{'<'}</Button>
            <Button sx={{ color: 'black', borderColor: 'red' }} onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1)) }}>{'>'}</Button>
          </ButtonGroup>
        </Box>
        <Box id="week-days"
          sx={{
            bgcolor: '#4EDC8E',
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
        <Box id="days" sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', bgcolor: '#50dc8c', gridGap: '2px', border: 'solid 3px #4EDC8E', height: '80%' }}>
          {/* empty padding for when days don't start on sunday */}
          {[...Array(firstDay)].map(
            (elem, idx) => (<Button key={idx} sx={{ display: firstDay ? 'inline-flex' : 'none',height:'100%',minHeight:'100%', minWidth: '100%', width: '100%', bgcolor: idx === 0 ? 'gray' : 'white', borderRadius: 0 }}><time></time></Button>)
          )
          }
          {/* day 1 begins here */}
          {
            dates.map((date, idx) => {
              const match = user ?
                user.dailyMeals.filter((meal) => sameDay(new Date(meal.date), date)) :
                dailyMeals.filter((meal) => sameDay(meal.getDate(), date));
              const color = match.length ? 'red' : (idx + firstDay) % 7 === 0 || (idx + firstDay) % 7 === 6 ? 'gray' : 'white';
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