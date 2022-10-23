import { Box, Typography, Menu, MenuItem, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Paper, styled } from "@mui/material"
import { useState } from "react";
import getNutrients from "./nutrients";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer } from '@fortawesome/free-regular-svg-icons'
import CloseIcon from '@mui/icons-material/Close';


const NutrientLabel = ({ food }) => {
   const nutrients = getNutrients(food);
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleHover = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const StyledTableCell = styled(TableCell)({
      padding: '12px',
      lineHeight: '1.4px',
      borderColor: 'black',
   })

   const BlankCell = styled(TableCell)({
      width: '1rem',
      padding: 0,
      borderColor: 'black',
   })

   return (
      <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
         <Box
            sx={{
               color: 'primary.contrast',
               padding: '0.25rem',
               paddingRight: { mobile: '0.25rem', tablet: '0.6rem' },
               bgcolor: 'secondary.main',
               display: 'flex', justifyContent: 'center', alignItems: 'center',
               "& svg": {
                  display: { mobile: 'none', tablet: 'inline-block' },
                  px: '0.25rem',
               },
            }}
            onMouseOver={handleHover}
            onClick={handleHover}
         >
            <FontAwesomeIcon icon={faHandPointer} />
            Details
         </Box>
         <Menu
            sx={{
               '& .MuiMenu-list': {
                  padding: 0
               }
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'left',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'left',
            }}
         >
            <MenuItem sx={{ padding: { mobile: 0, tablet: '8px' }, whiteSpace: 'normal', }} >
               <CloseIcon sx={{
                  display: { mobile: 'inline-block', tablet: 'none' },
                  position: 'absolute', stroke: "red", strokeWidth: '2',
                  top: '0.25rem', right: '0.25rem',
                  color: 'red', cursor: 'pointer'
               }} onClick={handleClose} />
               <TableContainer component={Paper} sx={{ width: '300px', height: '100%', border: { mobile: 'none', tablet: 'solid 1px black' }, padding: '8px', }}>
                  <Box component="header" borderBottom="solid 10px black" width='100%' >
                     <Typography variant="h1" sx={{ fontSize: '2rem', my: '0', fontWeight: 'bold', letterSpacing: '-1' }} >Nutrition Facts</Typography>
                     <Typography variant="body" display="block" sx={{}} >{`Serving Size ${food.serving_unit} (${food.serving_weight_grams}g)`}</Typography>
                  </Box>
                  <Table >
                     <TableHead>
                        <TableRow>
                           <StyledTableCell component="th" scope="row" width='100%' colSpan={3} sx={{ pt: '10px', lineHeight: '0px' }}>
                              <b> Amount per serving </b>
                           </StyledTableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        <TableRow>
                           <StyledTableCell component="th" scope="row" colSpan={3} sx={{ borderBottom: 'solid 5px black' }}>
                              <b> Calories </b>{nutrients.calories}
                           </StyledTableCell>
                        </TableRow>
                        <TableRow>
                           <StyledTableCell colSpan={3} sx={{ textAlign: 'right', fontSize: '0.7rem', py: '8px' }}>
                              <b>% Daily Value*</b>
                           </StyledTableCell>
                        </TableRow>
                        <TableRow>
                           <StyledTableCell component="th" scope="row" colSpan={2}><b>Total Fat</b> {nutrients.total_fat.amount}{nutrients.total_fat.unit}</StyledTableCell>
                           <StyledTableCell colSpan={1} sx={{ FontWeight: 'bold', textAlign: 'right' }}>
                              <b>{nutrients.total_fat.dv_percent}%</b>
                           </StyledTableCell>
                        </TableRow>
                        <TableRow>
                           <BlankCell />
                           <StyledTableCell component="th" scope="row" colSpan={1}>
                              Saturated Fat {nutrients.saturated_fat.amount}{nutrients.saturated_fat.unit}
                           </StyledTableCell>
                           <StyledTableCell sx={{ textAlign: 'right' }} colSpan={1}>
                              <b>{nutrients.saturated_fat.dv_percent}%</b>
                           </StyledTableCell>
                        </TableRow>
                        <TableRow>
                           <BlankCell />
                           <StyledTableCell component="th" scope="row" colSpan={2}>
                              Trans Fat {nutrients.trans_fat.amount}{nutrients.trans_fat.unit}
                           </StyledTableCell>
                        </TableRow>
                        <TableRow>
                           <StyledTableCell component="th" scope="row" colSpan={2} >
                              <b> Cholesterol </b>{nutrients.cholesterol.amount}{nutrients.cholesterol.unit}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row" colSpan={1} sx={{ textAlign: 'right' }} >
                              <b> {nutrients.cholesterol.dv_percent}%</b>
                           </StyledTableCell>
                        </TableRow>
                        <TableRow>
                           <StyledTableCell component="th" scope="row" colSpan={2} >
                              <b> Sodium </b>{nutrients.sodium.amount}{nutrients.sodium.unit}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row" colSpan={1} sx={{ textAlign: 'right' }} >
                              <b> {nutrients.sodium.dv_percent}%</b>
                           </StyledTableCell>
                        </TableRow>
                        <TableRow>
                           <StyledTableCell component="th" scope="row" colSpan={2} >
                              <b> Total Carbohydrate </b>{nutrients.total_carbohydrate.amount}{nutrients.total_carbohydrate.unit}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row" colSpan={1} sx={{ textAlign: 'right' }} >
                              <b> {nutrients.sodium.dv_percent}%</b>
                           </StyledTableCell>
                        </TableRow>
                        <TableRow>
                           <BlankCell />
                           <StyledTableCell component="th" scope="row" colSpan={1}>
                              Dietary Fiber {nutrients.dietary_fiber.amount}{nutrients.dietary_fiber.unit}
                           </StyledTableCell>
                           <StyledTableCell sx={{ textAlign: 'right' }}>
                              <b>{nutrients.dietary_fiber.dv_percent}%</b>
                           </StyledTableCell>
                        </TableRow>
                        <TableRow>
                           <BlankCell />
                           <StyledTableCell component="th" scope="row" colSpan={3}>
                              Total Sugars {nutrients.total_sugars.amount}{nutrients.total_sugars.unit}
                           </StyledTableCell>
                        </TableRow>
                        <TableRow>
                           <StyledTableCell component="th" scope="row" colSpan={3} sx={{ borderBottom: 'solid 10px black' }} >
                              <b> Protein </b>{nutrients.protein.amount}{nutrients.protein.unit}
                           </StyledTableCell>
                        </TableRow>
                        {Object.entries(nutrients.microNutrients).length === 0 ?
                           (
                              <TableRow>
                                 <StyledTableCell component="th" scope="row" colSpan={3} sx={{ borderBottom: 'solid 10px black' }} >
                                    Not a significant source of other nutrients
                                 </StyledTableCell>
                              </TableRow>
                           )
                           :
                           (
                              Object.entries(nutrients.microNutrients).map(([key, value], idx) => (
                                 <TableRow key={key} sx={{
                                    borderBottom: idx === Object.entries(nutrients.microNutrients).length - 1 ? 'solid 5px black' : 'solid 1px black'
                                 }}>
                                    <StyledTableCell component="th" scope="row" colSpan={2} sx={{ textTransform: 'capitalize' }} >
                                       <b>{key.replace('_', ' ')}  </b>{value.amount}{value.unit}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" colSpan={1} sx={{ textAlign: 'right' }} >
                                       <b> {(value.amount * 100 / value.dv).toFixed(0)}%</b>
                                    </StyledTableCell>
                                 </TableRow>
                              ))
                           )
                        }
                     </TableBody>
                  </Table>
               </TableContainer>
            </MenuItem>
         </Menu>
      </Box >
   )
}

export default NutrientLabel