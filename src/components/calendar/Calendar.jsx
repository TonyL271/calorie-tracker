import { Box, Button, ButtonGroup } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import { useState } from 'react';
import { getDay, format } from 'date-fns'
import { useEffect } from 'react';


const CenteredBox = styled('div')({
  textAlign: 'center'
})
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const Calendar = ({ dailyMeals, setDailyMeals }) => {
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState([])
  const [firstDay, setFirstDay] = useState(1);

  let lastDate;


  useEffect(() => {
    lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let firstDay = new Date(date.getFullYear(), date.getMonth());
    const month = firstDay.getMonth();
    console.log(month);
    console.log(firstDay);
    const year = firstDay.getFullYear();
    firstDay = (getDay(firstDay) + 1) % 7 + 1


    lastDate = lastDate.getDate();
    console.log('lastDay: ' + lastDate);
    setFirstDay(firstDay)

    const dates = [];
    for (let i = 2; i <= lastDate; i += 1) {
      dates.push(new Date(year, month, i))
    }
    console.log(dates)
    setDates(dates)
  }, [date])

  return (
    <Box id="calender" sx={{ width: '30vw', height: '30vh' }}>
      <Box sx={{ mb: '2rem', position: 'relative' }}>
        <CenteredBox id="month">{`${months[date.getMonth()]}  ${format(date, 'Y')}`}</CenteredBox>
        <ButtonGroup sx={{ position: 'absolute', top: '0', right: '2rem' }}>
          <Button onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1)) }}>{'<'}</Button>
          <Button onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1)) }}>{'>'}</Button>
        </ButtonGroup>
      </Box>
      <Box id="week-days" sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', mb: '1rem' }}>
        <CenteredBox >Su</CenteredBox>
        <CenteredBox >Mo</CenteredBox>
        <CenteredBox >Tu</CenteredBox>
        <CenteredBox >We</CenteredBox>
        <CenteredBox >Th</CenteredBox>
        <CenteredBox >Fr</CenteredBox>
        <CenteredBox >Sa</CenteredBox>
      </Box>

      <Box id="days" sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
        <Button sx={{ gridColumn: firstDay }}><time>1</time></Button>
        {
          dates.map((date, idx) =>
            <Button key={idx + 1}>
              <time>
                {date.getDate()}
              </time>
            </Button>)
        }
      </Box>
    </Box>
  )
}

export default Calendar