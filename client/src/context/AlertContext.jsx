import { createContext, useState } from 'react';

const ALERT_TIME = 3000;

const initialState = {
    message: '',
    type: '',
}

const AlertContext = createContext({
    ...initialState,
    setAlert: () => { }
});

export const AletProvider = ({ children }) => {
    const [text,setText] = useState('');
    const [type,setType] = useState('');

    const setAlert = (message, type) => {
        setText(message);
        setType(type);
        setTimeout(() => {
            setText('');
            setType('');
        }, ALERT_TIME);
    }
    return (
        <AlertContext.Provider value={{ text, type, setAlert }}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertContext;

