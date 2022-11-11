import {useState} from 'react';
import { Tabs, Tab } from "@mui/material"

const MealTab = () => {
    const mealTabs = ["Breakfast", "Lunch", "Dinner", "Snacks"];
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="red"
            textColor="primary.main"
            variant="fullWidth"
            aria-label="Daily meal tabs"
        >
            {mealTabs.map((tab, idx) => (
                <Tab key={idx} label={tab} >
                    {tab}
                </Tab>
            ))}

        </Tabs>
    )
}

export default MealTab