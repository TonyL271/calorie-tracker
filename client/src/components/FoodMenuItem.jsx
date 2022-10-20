import { Box, MenuItem, Divider, ListItemText } from '@mui/material';
const FoodMenuItem = ({food,setAddFood,handleClose}) => {
    return (
        <Box >
            <MenuItem onClick={(e) => {
                setAddFood(food.food_name);
                handleClose();
            }} sx={{
                whiteSpace: 'initial',
                py: 0
            }} >
                <Box component="img" sx={{
                    maxWidth: '2rem',
                    mr: '1rem'
                }} src={food.photo.thumb} />
                <ListItemText primary={food.food_name} />
            </MenuItem>
            <Divider sx={{ my: '0!important' }} />
        </Box>
    )
}

export default FoodMenuItem