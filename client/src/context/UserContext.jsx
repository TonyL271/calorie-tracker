import { useState, createContext, useEffect } from 'react'
import useLocalStorage from "use-local-storage";


const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, saveUser] = useLocalStorage("user", "new-user");

    const guestLogin = (e) => {
        console.log(`${window.location.href}login`);
        fetch(`${window.location.href}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'guest',
                password: 'guest'
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    saveUser({ ...data.user })
                } else {
                    alert(data.message)
                }
            })
            .catch(err => console.log(err.message))
    }

    useEffect(() => {
        if (user === 'new-user') {
            guestLogin()
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