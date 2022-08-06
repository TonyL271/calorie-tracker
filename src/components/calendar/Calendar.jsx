import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import MealPlan from './MealPlan';


const CenteredBox = styled('div')({
  textAlign: 'center'
})
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const sameDay = (date1, date2) => date1.getDate() === date2.getDate()

const Calendar = ({ dailyMeals, setDailyMeals }) => {
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState([])
  const [firstDay, setFirstDay] = useState(1);
  const [showDietPlan, setShowDietPlan] = useState({});

  let lastDate;

  useEffect(() => {
    lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let firstDay = new Date(date.getFullYear(), date.getMonth());
    const month = firstDay.getMonth();
    const year = firstDay.getFullYear();
    firstDay = firstDay.getDay();
    lastDate = lastDate.getDate();
    setFirstDay(firstDay)

    const dates = [];
    for (let i = 1; i <= lastDate; i += 1) {
      dates.push(new Date(year, month, i))
    }
    setDates(dates)
  }, [date])

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box id="calender" sx={{ 'width': '450px', height: '30vh', margin: 'auto' }}>
        <Box sx={{ mb: '2rem', position: 'relative' }}>
          <CenteredBox id="month">{`${months[date.getMonth()]}  ${date.getFullYear()}`}</CenteredBox>
          <ButtonGroup sx={{ position: 'absolute', top: '0', right: '2rem' }}>
            <Button onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1)) }}>{'<'}</Button>
            <Button onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1)) }}>{'>'}</Button>
          </ButtonGroup>
        </Box>
        <Box id="week-days" sx={{ width: '450px', display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', mb: '1rem' }}>
          <CenteredBox >Su</CenteredBox>
          <CenteredBox >Mo</CenteredBox>
          <CenteredBox >Tu</CenteredBox>
          <CenteredBox >We</CenteredBox>
          <CenteredBox >Th</CenteredBox>
          <CenteredBox >Fr</CenteredBox>
          <CenteredBox >Sa</CenteredBox>
        </Box>

        <Box id="days" sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
          <Button sx={{ display: firstDay ? 'inline-flex' : 'none', gridColumn: `1 / ${firstDay + 1}`, bgcolor: 'white' }}><time></time></Button>
          {
            dates.map((date, idx) => {
              const match = dailyMeals.filter((meal) => sameDay(meal.getDate(), date));
              const color = match.length ? 'red' : 'white';
              const onClick = match.length ?
                () => {
                  setShowDietPlan(match[0])
                } :
                () => { };
              return (
                <Button
                  sx={{ bgcolor: color, borderRadius: 0 }}
                  key={idx + 1}
                  onClick={onClick}
                >
                  <time>
                    {date.getDate()}
                  </time>
                </Button>
              )
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