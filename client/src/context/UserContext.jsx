import { useState, createContext, useEffect } from 'react'
import useLocalStorage from "use-local-storage";
import { guestLogin } from '../apiCalls';


const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, saveUser] = useLocalStorage("user", "new-user");

    useEffect(() => {
        if (user === 'new-user') {
            guestLogin()
                .then(data => {
                    if (data.success) {
                        saveUser({ ...data.user })
                    } else {
                        alert(data.message)
                    }
                })
                .catch(err => console.log(err.message))
        }
    }, [user])


    return (
        <UserContext.Provider value={{ user, saveUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserConsumer = UserContext.Consumer;

export default UserContext;