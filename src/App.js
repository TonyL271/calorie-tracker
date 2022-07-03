import { Planner, CreateMeal, CustomAppBar } from "./components";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

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
      fontWeight: 'bold'
    },
  },
})

const light = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#cbe4f9',
      light: '#feffff',
      dark: '#9ab2c6',
    },
    secondary: {
      main: '#ccf3f4',
    },
    background: {
      paper: '#28282A',
      default: '#1C1C1E',
      dark: '#16181D',
    },
    typography: {
      fontFamily: ['Roboto'],
      fontWeight: 'bold'
    },
  },
})


function App() {
  return (
    <ThemeProvider theme={light}>
      <Box sx={{ width: '100vw', height: '100vh', background: 'linear-gradient(#4E7593,#000000)' }}>

        <CustomAppBar />
        <Planner itemList={[['2022, July 1','2000 calories'],['2022, July 1','3000 calories'],['2022, July 1','1000 calories']]} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
