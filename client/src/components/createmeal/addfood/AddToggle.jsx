import { useState, Fragment } from 'react'
import { Box, Typography, IconButton, Menu, InputBase, Divider, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { Search } from '../../../apiCalls'
import { FoodMenuItem } from './';

const AddToggle = ({ setAddFood }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(Boolean(anchorEl));
  const [suggestion, setSuggestion] = useState({ common: [], branded: [] })

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  }

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  }

  const getSearchSuggestion = (e) => {
    const val = e.currentTarget.value;
    if (val.length > 0) {
      Search(val).then(function (data) {
        if (data.hasOwnProperty('common')) {
          const suggestion = {
            common: data.common.slice(0, 5),
            branded: data.branded.slice(0, 3)
          }
          setSuggestion(suggestion)
        } else {
          setSuggestion({ common: [], branded: [] })
        }
      });
    }
  }

  return (
    <Fragment>
      <IconButton sx={{
        height: '2.5rem',
        width: '2.5rem',
        mx: { mobile: '1rem', tablet: '2rem' },
        color: 'primary.contrast',
        margin: 'auto',
      }}
        onClick={handleClick}
      >
        <AddCircleTwoToneIcon size='large' sx={{ position: 'absolute', height: '100%', width: '100%', }} />
      </IconButton>
      <Menu 
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
          sx={(theme) => ({
            p: '2px 4px',
            width: '100%',
            maxWidth: '20rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            boxShadow: `0 1px 3px ${theme.palette.primary.main}`,
            borderRadius: '5px',
          })}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, height: '100%', color: 'secondary.main' }}
            placeholder="Search food"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={getSearchSuggestion}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon sx={{color:'primary.lightContrast'}} />
          </IconButton>
        </Box>
        <Typography variant="h6" component="h6" sx={{
          pt: '0.5rem', fontSize: '0.7rem', color: 'primary.main',
          borderColor: 'secondary.main'
        }}>COMMON FOODS {`(${Math.min(suggestion.common.length, 5)})`}</Typography>
        <Divider sx={{ borderWidth: '2px', borderColor: 'primary.main', my: '0!important' }} />
        {
          suggestion.common.map((food, idx) =>
            <FoodMenuItem key={idx} food={food} setAddFood={setAddFood} handleClose={handleClose} />
          )
        }
        <Typography variant="h6" component="h6" sx={{
          pt: '0.5rem', fontSize: '0.7rem', color: 'secondary.main'
        }}>
          BRANDED FOODS {`(${Math.min(suggestion.branded.length, 3)})`}</Typography>
        <Divider sx={{ my: '0!important', borderWidth: '2px', borderColor: 'secondary.main' }} />
        {
          suggestion.branded.map((food, idx) =>
            <FoodMenuItem key={idx} food={food} setAddFood={setAddFood} handleClose={handleClose} />
          )
        }
      </Menu>
    </Fragment >
  )
}

export default AddToggle;