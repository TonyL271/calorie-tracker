import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider, Pagination, useMediaQuery, } from '@mui/material'
import { useTheme } from '@emotion/react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import NutrientLabel from '../nutrientLabel/NutrientLabel';
import './animations.css'

const MealGrid = ({ foodList, handleRemoveItem, viewport, mutable, }) => {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('laptop'));

    const [showPagination, setShowPagination] = useState(false);
    const maxItems = Math.floor((viewport.height - 450) / 48);
    const maxPage = Math.ceil(foodList.length / (maxItems || 1));
    const [page, setPage] = useState(0);
    const start = page * maxItems;
    const end = Math.min(start + maxItems, foodList.length);

    useEffect(() => {
        setShowPagination(smallScreen && foodList.length > maxItems);
    }, [foodList, viewport])

    return (
        <Box sx={{
            width: '100%',
            display: 'grid',
            gridGap: '4px',
            gridTemplateColumns: mutable ? 'repeat(6,auto)' : 'repeat(5,auto)',
            gridRowGap: '0.20rem',
            minHeight: '130px',
        }}>
            {/* Food description header */}
            <Typography variant="p" component="p" align='center' sx={{ color: 'secondary.main', fontSize: { smallest: '0.8rem', tablet: '1.1rem' }, fontWeight: 700, gridColumn: '2/3' }}>Food</Typography>
            <Typography variant="p" component="p" align='center' sx={{ color: 'secondary.main', fontSize: { smallest: '0.8rem', tablet: '1.1rem' }, fontWeight: 700, }}>Amount</Typography>
            <Typography variant="p" component="p" align='center' sx={{ color: 'secondary.main', fontSize: { smallest: '0.8rem', tablet: '1.1rem' }, fontWeight: 700, }} >Calories</Typography>
            <Typography variant="p" component="p" align='center' sx={{ color: 'secondary.main', fontSize: { smallest: '0.8rem', tablet: '1.1rem' }, fontWeight: 700, gridColumn: '-2/-1' }} ></Typography>
            {/* Food list */}
            {
                foodList.map((food, index) => (
                    <Box
                        key={food.uuid}
                        className={`${mutable ? "grid-row id-" + food.uuid : ""}`}
                        sx={{ display: index >= start && index < end ? 'contents' : 'none' }}  >
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '2rem' }}>
                            <Box component="img" alt="The house from the offer." src={food.photo.thumb} sx={{ width: '2.0rem', }} />
                        </Box>
                        <Typography variant="p" component="p" align='center' textTransform="capitalize" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', overFlowWrap: 'anywhere' }}>{food.food_name}</Typography>
                        <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{`${food.qty} ${food.selectedUnit || food.serving_unit}`}</Typography>
                        <Typography variant="p" component="p" align='center' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{`${food.nf_calories_scaled.toFixed(0)} cal`}</Typography>
                        <NutrientLabel food={food} />
                        <Box
                            list-id={index}
                            sx={{
                                display: mutable ? 'flex' : 'none',
                                zIndex: '0',
                                justifyContent: 'center',
                                alignContent: 'center',
                                flexWrap: 'wrap',
                                p: 0,
                                '&:hover': {
                                    color: 'black',
                                    transform: 'scale(1.5)'
                                }
                            }}
                            onPointerDown={(e) => {
                                const idx = +e.currentTarget.getAttribute('list-id');
                                handleRemoveItem(idx + start)
                            }}>
                            <ClearRoundedIcon sx={{
                                color: 'red',
                                stroke: 'red',
                                strokeWidth: 1,
                            }}
                            />
                        </Box>
                    </Box>
                ))
            }
            {
                foodList.length > 0 &&
                <>
                    <Box align='center' sx={{ width: '100%', gridColumn: mutable ? '-4/-3' : '-3/-2' }} >
                        <Divider sx={{ mt: '0.5rem', borderBottomWidth: 2, bgcolor: 'black' }}></Divider>
                    </Box>
                    <Typography sx={{ gridColumn: mutable ? '-5/-4' : '-4/-3', textAlign: 'center', fontWeight: '700' }}>Sum: </Typography>
                    <Typography sx={{ gridColumn: mutable ? '-4/-3' : '-3,-2', textAlign: 'center', fontWeight: '700' }}>
                        {
                            foodList.reduce((prev, curr) => prev + curr.nf_calories_scaled, 0).toFixed(0) + ' cal'
                        }</Typography>
                </>
            }
            {/* pagination */}
            <Pagination count={maxPage} color="primary" onChange={(e, value) => { setPage(value - 1) }}
                sx={{
                    display: showPagination ? 'auto' : 'none',
                    gridColumn: '1/-1',
                    '& *': {
                        justifyContent: 'center',
                    }
                }} />
        </Box >

    )
}

export default MealGrid