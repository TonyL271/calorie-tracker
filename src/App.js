import { Box, AppBar, Toolbar, Typography, Button, IconButton, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MealDetails, Summation } from './components/'

function App() {
  return (
    <Box>
      <AppBar sx={{ height: '100%', backgroundColor: '#FFFFFF', color: '#8C8A8C', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: '0', left: '0' }} >
        <Toolbar sx={{ width: '100%', height: '100%', }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1.5rem' }}>
            Calorie-Tracker
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>


      <Box className="main" sx={{ display: 'flex', width: '80%', margin: 'auto', flexDirection: 'column' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', }}>
          <MealDetails name="Breakfast" foods={['salsa','burrito','tomato']}/>
          <MealDetails name="Lunch" foods={[]}/>
          <MealDetails name="Dinner" foods={[]}/>
          <MealDetails name="Snacks" foods={[]}/>
        </Box>
        <Box sx={{ border: 'solid 3px purple' }}>
          <Summation  />
        </Box>
      </Box>

    </Box>
  );
}

export default App;
