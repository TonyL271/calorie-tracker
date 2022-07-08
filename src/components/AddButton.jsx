import React, { useState, Fragment } from 'react'
import { Box, Typography, IconButton, Menu, MenuItem, Paper, InputBase, Divider, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const AddButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [suggestion, setSuggestion] = useState({ common: [], branded: [] })

  const api_id = '2aaffc7c'
  const api_key = '2ca7df59e0482b12ce395f5c05b9ce2d'
  let url = 'https://trackapi.nutritionix.com/v2/search/instant';
  const headers = {
    'x-app-id': api_id,
    'x-app-key': api_key,
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const getSearchSuggestion = (e) => {
    const val = e.currentTarget.value;
    if (val.length > 0) {
      fetch(url + `?query=${val}`, { headers }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.hasOwnProperty('common')) {
          console.log(data);
          console.log(1);
          const suggestion = {
            common: data.common.slice(0, 5),
            branded: data.branded.slice(0, 3)
          }
          setSuggestion(suggestion)
        } else {
          console.log(data);
          console.log(2);
          setSuggestion({ common: [], branded: [] })
        }
      });
    }
  }

  return (
    <Fragment>
      <IconButton sx={{
        position: 'absolute',
        height: '2.5rem',
        width: '2.5rem',
        left: '1rem',
        color: 'white'
      }}
        onClick={handleClick}
      >
        <AddCircleTwoToneIcon size='large' sx={{ position: 'absolute', height: '2.5rem', width: '2.5rem', left: '1rem', }} />
      </IconButton>
      <Menu className="add-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          "& .MuiPaper-root": {
            height: '32rem',
            backgroundColor: "white",
            width: '20rem',
            px: '1rem',
          }
        }}
      >
        <Box
          component="form"
          sx={{ p: '2px 4px', width: '100%', maxWidth: '20rem', height: '3rem', display: 'flex', alignItems: 'center', boxShadow: '0 1px 3px', borderRadius: '5px' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, height: '100%' }}
            placeholder="Search food"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={getSearchSuggestion}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
        <Typography variant="h6" component="h6" sx={{pt:'0.5rem',fontSize:'0.7rem',fontColor:'grey'}}>COMMON FOODS {`(${Math.min(suggestion.common.length, 5)})`}</Typography>
        <Divider sx={{ my: '0!important' }} />
        {
          suggestion.common.map((food, idx) =>
            <Box key={idx} sx={{}}>
              <MenuItem sx={{ whiteSpace: 'initial', py: 0 }} >
                <Box component="img" sx={{ maxWidth: '2rem', mr: '1rem' }} src={food.photo.thumb} />
                <ListItemText primary={food.food_name} />
              </MenuItem>
              <Divider sx={{ my: '0!important' }} />
            </Box>
          )
        }
        <Typography variant="h6" component="h6" sx={{pt:'0.5rem',fontSize:'0.7rem',fontColor:'grey'}}>BRANDED FOODS {`(${Math.min(suggestion.branded.length, 3)})`}</Typography>
        <Divider sx={{ my: '0!important' }} />
        {
          suggestion.branded.map((food, idx) =>
            <Box key={idx} sx={{}}>
              <MenuItem sx={{ whiteSpace: 'initial', py: 0 }} >
                <Box component="img" sx={{ maxWidth: '2rem', mr: '1rem' }} src={food.photo.thumb} />
                <ListItemText primary={food.food_name} />
              </MenuItem>
              <Divider sx={{ my: '0!important' }} />
            </Box>
          )
        }
      </Menu>
    </Fragment>
  )

}

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
]

export default AddButton;