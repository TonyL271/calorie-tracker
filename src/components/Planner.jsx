import { Box, Typography, List, Divider, } from "@mui/material"
import { CustomList } from "./";

const Planner = ({ itemList }) => {
    return (
        <Box sx={{minHeight:'80%',width:'50%', margin: 'auto', display: 'flex', bgcolor: 'background.default', borderRadius: '12px',boxShadow:'0 0 20px' }}>
            <Box id="Meals" sx={{
                bgcolor: 'background.paper',
                width: '100%', display: 'flex',
                flexDirection: 'column',
                color: 'text.primary',
                margin: '2rem',
                borderRadius: '10px'
            }}>
                <Typography varient="h2" component="h2" align="center" sx={{ color: 'white', fontWeight: 'bold', fontSize: '2rem' }} color="primary.light" >Saved Meals</Typography>
                <CustomList itemList={[['Apple Juice','200 calories'],['Pizza'],['Toast']]} color='#FFFAF1' />
            </Box>

            <Box id="Upcoming Plans" sx={{
                bgcolor: 'background.paper',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                color: 'text.primary',
                margin: '2rem',
                borderRadius: '10px'
            }}>
                <Typography varient="h2" component="h2" align="center" sx={{ color: 'white', fontWeight: 'bold', fontSize: '2rem' }} color="primary.light" >Upcoming Meals</Typography>
                <CustomList itemList={itemList} color="primary.main" />
            </Box>

        </Box>
    )
}

export default Planner