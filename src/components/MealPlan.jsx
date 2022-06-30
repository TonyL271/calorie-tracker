import { Box, Typography, List, ListItem, IconButton, ListItemAvatar, ListItemText, Avatar } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

const MealPlan = () => {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    avatar
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary="Single-line item"
            />
        </ListItem>
    )
}

export default MealPlan