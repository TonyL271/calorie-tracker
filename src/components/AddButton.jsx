import { Box, Typography, IconButton, Menu, MenuItem, Autocomplete, TextField } from '@mui/material';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { useState, Fragment } from 'react'

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

  const getSearchSuggestion = (e, val) => {
    if (val.length > 0) {
      fetch(url + `?query=${val}`, { headers }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.hasOwnProperty('common')) {
          console.log(data);
          console.log(1);
          const suggestion = {
            common: data.common.slice(0, 5),
            branded: data.branded.slice(0, 5)
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
            height: '20rem',
            backgroundColor: "white"
          }
        }}
      >
        <Autocomplete
          disablePortal
          onInputChange={getSearchSuggestion}
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        {
          suggestion.common.map((food, idx) => <MenuItem key={idx}>{food.food_name}</MenuItem>)
        }
        {
          suggestion.branded.map((food, idx) => <MenuItem key={idx + 5}>{food.food_name}</MenuItem>)
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