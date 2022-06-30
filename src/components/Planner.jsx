import { Box, Typography, List, Divider, } from "@mui/material"
import { MealPlan } from "./";


const Planner = () => {
    const item = [1, 2, 3, 4, 5]
    return (
        <Box sx={{ width: '50%', height: '100%', margin: 'auto', display: 'flex' }}>
            <Box id="Meals" sx={{ width: '100%' }}>
                <Typography varient="h2" component="h2" align="center" >Meals</Typography>

            </Box>
            <Box id="Upcoming Plans" sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography varient="h2" component="h2" align="center" >Upcoming Plans</Typography>
                <List >
                    {item.map((item) => <MealPlan />)}
                    <Divider />
                </List>
            </Box>

        </Box>
    )
}

export default Planner