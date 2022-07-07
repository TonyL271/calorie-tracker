import { Box, Typography, Divider, IconButton, Menu, MenuItem } from '@mui/material';
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
        color:'white'
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
      >
        <MenuItem sx={{color:'white'}} onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
      </Menu>
    </Fragment>
  )
}

export default AddButton;