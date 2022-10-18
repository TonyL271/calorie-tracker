import { useEffect, useState } from "react";
import { CreateMeal, CustomAppBar, NutrientLabel } from "./components";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import Calendar from "./components/calendar/Calendar";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import CreateAccount from "./components/User/CreateAccount";
import { UserProvider } from "./context/UserContext";

const light = createTheme({
  palette: {
    primary: {
      main: '#4EDC8E',
      contrast: '#FFFFFF',
      lightContrast: '#000000'

    },
    secondary: {
      main: '#FF248E',
    }
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


function App() {
  const [dailyMeals, setDailyMeals] = useState([])

  return (
    <BrowserRouter>
      <ThemeProvider theme={light} >
        <UserProvider>
          <Routes>
            <Route path="/"
              element={
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#E1E1E1', margin: 'auto' }}>
                  <CustomAppBar />
                  <Outlet />
                </Box>
              }>
              <Route index element={<CreateMeal dailyMeals={dailyMeals} setDailyMeals={setDailyMeals} />} />
              <Route path="calendar" element={<Calendar dailyMeals={dailyMeals} setDailyMeals={setDailyMeals} />} />
              <Route path="register" element={<CreateAccount />} />
            </Route>
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
