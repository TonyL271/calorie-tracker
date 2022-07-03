import { Box, Typography, List, ListItem, IconButton, ListItemAvatar, ListItemText, Avatar, Divider } from "@mui/material"

const MealPlan = ({ item, icon,color }) => {
    return (

        <ListItem sx={{ backgroundColor: color, border: 'solid 3px', borderColor: 'primary.light', my: '1.0rem', borderRadius: '15px', mx: 'auto', width: '85%', height: '4rem' }}
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    {icon}
                </IconButton>
            }
        >
            <ListItemText
                primary={item[0]}
                disableTypography
                sx={{ color: 'background.paper', fontFamily: 'Roboto', fontWeight: '600' }}
            />
            {item.length > 1 &&
                <ListItemText
                    primary={item[1]}
                    disableTypography
                    sx={{ color: 'white', fontFamily: 'Roboto', fontWeight: '900',fontSize:'0.8rem' }}
                />
            }
        </ListItem>
    )
}

export default MealPlan