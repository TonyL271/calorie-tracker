import { TabList, TabContext } from "@mui/lab";
import { Box, Tab, } from "@mui/material"
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';

const MealTabs = ({ mealTypes, value, setValue, warning: { warn, emptyMeal } }) => {

    return (
        <TabContext value={value} sx={{
        }}>
            <Box bgcolor="white">
                <TabList
                    onChange={(e, newValue) => { setValue(newValue) }}
                    aria-label="Daily meal tabs"
                    sx={{
                        bgcolor: 'primary.main',
                        mt: '1.5rem',
                        height: '50px',

                        '& button.MuiButtonBase-root:first-of-type': {
                            borderLeft: 'solid 10px white',
                        },
                        '& button.MuiButtonBase-root:last-of-type': {
                            borderRight: 'solid 10px white',
                        },
                        '& span.MuiTabs-indicator': {
                            display: 'none',
                            bgcolor: 'primary.main',
                        },
                        '& button.Mui-selected': {
                            position: 'relative',
                            minWidth: '0',
                            color: 'white',
                            padding: '5px',
                            bgcolor: "#222222",
                        },
                        '& button:after': {
                            content: '""',
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            width: '0',
                            height: '0',
                            border: 'solid 10px transparent',
                            borderTop: '10px solid white',
                            borderRight: '10px solid white',
                            borderWidth: '10px 10px'
                        },

                        '& button': {
                            height: '50px',
                            minHeight: '50px',
                            minWidth: '0',
                            py: 0,
                            borderLeft: 'solid 5px white',
                            borderRight: 'solid 5px white',
                        },
                        '& .MuiTabs-flexContainer': {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            height: '50px'
                        },
                    }}
                >
                    {mealTypes.map((mealType, idx) => (
                        <Tab
                            key={idx}
                            label={<Box component="span" sx={{ fontSize: { smallest: '0.6rem', mobile: '0.7rem' } }} >{mealType}</Box>}
                            value={idx.toString()}
                            icon={(idx.toString() === value) || !warn ? '' : emptyMeal[idx] ? <PriorityHighIcon sx={{

                            }} fontSize="4px" /> : <CheckIcon />}
                            sx={{ color: emptyMeal[idx] ? 'red' : ' #000000' }}
                        />
                    ))}
                </TabList>
            </Box>
        </TabContext>
    )
}

export default MealTabs
