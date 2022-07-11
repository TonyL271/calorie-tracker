import { Planner, CreateMeal, CustomAppBar, MealDetails } from "./components";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import { useEffect, useState } from "react";

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
  useEffect(() => {
    //set example of what the food list looks like when it is populated
  }, [])

  return (
    <ThemeProvider theme={light} >
      {/* <Box sx={{ width: '100vw', height: '100vh', background: 'linear-gradient(#4E7593,#000000)' }}>
        <CustomAppBar />
        <Planner itemList={[['2022, July 1','2000 calories'],['2022, July 1','3000 calories'],['2022, July 1','1000 calories']]} />
      </Box> */}
      <Box sx={{ bgcolor: '#E1E1E1', height: '100vh' }}>
        <CreateMeal breakfast={breakfast} lunch={lunch} dinner={dinner} snacks={snacks} setBreakfast={setBreakfast} setLunch={setLunch} setDinner={setDinner} setSnacks={setSnacks} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
