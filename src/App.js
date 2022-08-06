import { Planner, CreateMeal, CustomAppBar, MealDetails } from "./components";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import { useEffect, useState } from "react";
import Calendar from "./components/calendar/Calendar";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { DailyMeal } from "./components/DailyMeal";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const blueTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00C7FC',
      light: '#61DAFB',
      dark: '#4EA2BC',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: '#28282A',
      default: '#1C1C1E',
      dark: '#16181D',
    },
    typography: {
      fontFamily: ['Roboto'],
      fontWeight: 'bold',
      color: 'white',

    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 650,
      laptop: 1024,
      desktop: 1300,
    },
  },
})

const light = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 650,
      laptop: 1024,
      desktop: 1300,
    },

  },
})


function App() {
  const [breakfast, setBreakfast] = useState([])
  const [lunch, setLunch] = useState([])
  const [dinner, setDinner] = useState([])
  const [snacks, setSnacks] = useState([])

  const [dailyMeals, setDailyMeals] = useState([
  ])
  useEffect(() => {
    //set example of what the food list looks like when it is populated
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={light} >
        <Routes>
          <Route path="/"
            element={
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#E1E1E1', margin: 'auto' }}>
                <CustomAppBar />
                <Outlet />
              </Box>
            }
          >
            <Route index
              element={
                <CreateMeal
                  breakfast={breakfast} lunch={lunch} dinner={dinner} snacks={snacks} dailyMeals={dailyMeals}
                  setBreakfast={setBreakfast} setLunch={setLunch} setDinner={setDinner} setSnacks={setSnacks} setDailyMeals={setDailyMeals}
                />
              }
            />
            <Route path="calendar" element={<Calendar dailyMeals={dailyMeals} setDailyMeals={setDailyMeals} />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
