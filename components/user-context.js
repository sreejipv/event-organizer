import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null)

export function userContextProvider(props) {
    const [userId, setUserId] = useState('')

    return(
        <UserContext.Provider value={{ userId, setUserId}}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext)
    if(context === null) {
        throw new Error("useUserContext must be used within a UserContextProvider")
    }
}

