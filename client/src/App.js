import { useState, useEffect, useContext } from "react";
import { CreateMeal } from "./components/createmeal";
import { Navbar } from "./components/navbar"
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import Calendar from "./components/calendar/Calendar";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import LoginPage from "./components/login/LoginPage";
import { WindowSizeProvider } from './context/WindowSizeContext';

const original = createTheme({
   palette: {
      primary: {
         main: '#4EDC8E',
         opaque: 'rgba(0, 0, 0, 0.025)',
         lightContrast: '#000000',
         contrast: '#000000',
         tabContrast: '#000000'
      },
      secondary: {
         main: '#FF248E',
      },
      error: {
         main: '#ff0000',
      },
      background: {
         main: '#E1E1E1',
         tab: '#222222',
         foreground: '#FFFFFF'
      }
   },

   breakpoints: {
      values: {
         smallest: 0,
         mobile: 400,
         tablet: 650,
         laptop: 1024,
         desktop: 1300,
      },
   },
})

const simple = createTheme({
   palette: {
      primary: {
         main: '#000000',
         opaque: 'rgba(0, 0, 0, 0.025)',
         lightContrast: '#000000',
         contrast: 'cyan',
         tabContrast: '#FF248E'
      },
      secondary: {
         main: '#FF248E',
      },
      error: {
         main: '#ff0000',
      },
      background: {
         main: '#E1E1E1',
         tab: '#333333',
         foreground: '#FFFFFF'
      }
   },

   breakpoints: {
      values: {
         smallest: 0,
         mobile: 400,
         tablet: 650,
         laptop: 1024,
         desktop: 1300,
      },
   },
})


function App() {
   const [mode, setMode] = useState('original')

   // disable mobile zoom
   document.addEventListener(
      'touchmove',
      event => event.scale !== 1 && event.preventDefault(), { passive: false }
   );

   return (
      <BrowserRouter>
         <ThemeProvider theme={mode === "original" ? original : simple} >
            <UserProvider>
               <WindowSizeProvider>
                  <Routes>
                     <Route path="/"
                        element={
                           <Box sx={{ display: 'flex', height: `calc(${window.height}px)`, flexDirection: 'column', bgcolor: 'background.main', margin: 'auto' }}>
                              <Navbar setMode={setMode} />
                              <Outlet />
                           </Box>
                        }>
                        <Route index element={<CreateMeal />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="login-page" element={<LoginPage />} />
                     </Route>
                  </Routes>
               </WindowSizeProvider>
            </UserProvider>
         </ThemeProvider>
      </BrowserRouter>
   );
}

export default App;
