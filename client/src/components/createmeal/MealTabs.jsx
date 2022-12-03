import { TabList, TabContext } from "@mui/lab";
import { Box, Tab, MobileStepper } from "@mui/material"
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';
import { useSwipeable } from "react-swipeable";
import { useEffect, useRef } from "react";

//component that provides tabs with swipe functionality and tabpanels wrapper for each item
const MealTabs = ({ mealTypes, value, setValue, warning: { warn, emptyMeal }, rounded, children }) => {

    const mod = (n, m) => ((n % m) + m) % m; // modulo that handles negative numbers

    const config = {
        delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
        preventScrollOnSwipe: true,           // prevents scroll during swipe (*See Details*)
        trackTouch: true,                      // track touch input
        trackMouse: true,                     // track mouse input
        rotationAngle: 0,                      // set a rotation angle
        swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
        touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
    }

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            const inc = eventData.dir === "Left" ? 1 : -1;
            setValue((prev) => (
                mod(+prev + inc, 4).toString()
            ));
        },
        ...config,
    });

    const scroller = useRef(null);
    const container = useRef(null);

    //scroll selected tab into view after swipe
    useEffect(() => {
        if (container && container.current) {
            scroller.current.scrollTo({ left: `${container.current.clientWidth * value}`, behavior: 'smooth' })
        }
    }, [value])

    const refPassThrough = (el) => {
        handlers.ref(el)
        container.current = el
    }

    return (
        <Box
            {...handlers}
            ref={refPassThrough}
            sx={{
                bgcolor: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <TabContext value={value} >
                <TabList
                    onChange={(e, newValue) => { setValue(newValue) }}
                    aria-label="Daily meal tabs"
                    sx={{
                        bgcolor: 'primary.main',
                        mt: '1.5rem',
                        height: {smallest: '40px',mobile:'50px'},
                        minHeight: '40px',
                        '& button.MuiButtonBase-root:first-of-type': {
                            borderLeft: 'solid 10px white',
                        },
                        '& button.MuiButtonBase-root:last-of-type': {
                            borderRight: 'solid 10px white',
                        },
                        '& span.MuiTabs-indicator': {
                            display: 'none',
                            bgcolor: 'primary.main',
                        },
                        '& button.Mui-selected': {
                            position: 'relative',
                            minWidth: '0',
                            color: 'white',
                            padding: '5px',
                            bgcolor: "#222222",
                        },
                        '& button:after': {
                            content: '""',
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            width: '0',
                            height: '0',
                            border: 'solid 10px transparent',
                            borderTop: '10px solid white',
                            borderRight: '10px solid white',
                            borderWidth: '10px 10px'
                        },
                        '& button': {
                            bgcolor: 'primary.main',
                            height: '100%',
                            minHeight: '0px',
                            minWidth: '0',
                            py: 0,
                            borderLeft: 'solid 5px white',
                            borderRight: 'solid 5px white',
                        },
                        '& button .MuiBox-root': {
                            transform: warn ? 'translateY(5px)' : 'translateY(6px)',
                        },
                        '& .MuiTabs-flexContainer': {
                            display: 'grid',
                            height: '100%',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            bgcolor: 'white',
                        },
                    }}
                >
                    {mealTypes.map((mealType, idx) => (
                        <Tab
                            key={idx}
                            label={<Box component="span" sx={{ fontSize: { smallest: '0.5rem', mobile: '0.7rem' } }} >{mealType}</Box>}
                            value={idx.toString()}
                            icon={(idx.toString() === value) || !warn ? '' : emptyMeal[idx] ? <PriorityHighIcon sx={{

                            }} fontSize="4px" /> : <CheckIcon />}
                            sx={{ color: emptyMeal[idx] ? 'red' : ' #000000' }}
                        />
                    ))}
                </TabList>
                <MobileStepper
                    variant="dots"
                    steps={4}
                    position="static"
                    activeStep={+value}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: '#222222',
                        borderRadius: rounded ? '5px 5px 0 0 ' : '0',
                        height: '2.5rem',
                        '& div.MuiMobileStepper-dot': {
                            bgcolor: 'white',
                        },
                        '& div.MuiMobileStepper-dotActive': {
                            bgcolor: 'primary.main',
                        }
                    }}
                />
            </TabContext>
            <Box sx={{ flexGrow: 1, bgcolor: '#222222', borderRadius: rounded ? '0 0 5px 5px' : '0' }}>
                <Box
                    ref={scroller}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${mealTypes.length}, 100%)`,
                        position: 'relative',
                        height: `100%`,
                        overflowX: 'hidden',
                    }}>
                    {children}
                </Box>
            </Box>
        </Box >
    )
}

export default MealTabs
