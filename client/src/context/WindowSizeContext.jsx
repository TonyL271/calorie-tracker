import { useState, createContext, useEffect } from 'react'


const WindowSizeContext = createContext();
export const WindowSizeProvider = ({ children }) => {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const resizeListener = window.addEventListener('resize', () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        })
        return () => {
            resizeListener && window.removeEventListener('resize', resizeListener)
        }
    }, [])


    return (
        <WindowSizeContext.Provider value={{ windowSize }}>
            {children}
        </WindowSizeContext.Provider>
    )
}

export const WindowSizeConsumer = WindowSizeContext.Consumer;

export default WindowSizeContext;