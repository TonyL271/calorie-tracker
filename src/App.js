import { Planner, CreateMeal } from "./components";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
        <Planner />
      </Box>
    </ThemeProvider>
  );
}

export default App;
