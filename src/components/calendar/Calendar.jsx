import { Box, Button, ButtonGroup } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import { useState } from 'react';
import { getDay, format } from 'date-fns'
import { useEffect } from 'react';


const CenteredBox = styled('div')({
  textAlign: 'center'
})


const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState([])
  const [firstDay, setFirstDay] = useState(1);

  let lastDate;


  useEffect(() => {
    lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 0);
    console.log('object: ' + getDay(firstDay));
    firstDay = (getDay(firstDay) + 1) % 7 + 1

    lastDate = lastDate.getDate();
    setFirstDay(firstDay)
    console.log(firstDay);

    const dates = [];
    for (let i = 2; i <= lastDate; i += 1) {
      dates.push(i)
    }
    setDates(dates)
  }, [date])

  return (
    <Box id="calender" sx={{ width: '30vw', height: '30vh' }}>
      <Box sx={{ mb: '2rem', position: 'relative' }}>
        <CenteredBox id="month">{`${format(date, 'MMMM')}  ${format(date, 'Y')}`}</CenteredBox>
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
                {date}
              </time>
            </Button>)
        }
      </Box>
    </Box>
  )
}

export default Calendar