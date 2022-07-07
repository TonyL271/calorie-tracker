
import {Menu,MenuItem} from "@mui/material/";

const AddMenu = () => {
  return (
    <Menu
    id="basic-menu"
    // anchorEl={anchorEl}
    // open={open}
    // onClose={handleClose}
    MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}
  >
    {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
    <MenuItem onClick={handleClose}>My account</MenuItem>
    <MenuItem onClick={handleClose}>Logout</MenuItem> */}
  </Menu>
  )
}

export default AddMenu;