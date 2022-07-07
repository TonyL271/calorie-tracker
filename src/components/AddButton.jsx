import { Box, Typography, IconButton, Menu, MenuItem, Autocomplete, TextField } from '@mui/material';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { useState, Fragment } from 'react'

const AddButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
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
            height:'20rem',
            backgroundColor: "white"
          }
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </Menu>
    </Fragment>
  )

}

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
]

export default AddButton;