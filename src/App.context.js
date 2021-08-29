import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({children}) => {
    const [ token, setToken ] = useState('');
    const [ error, setError ] = useState('');

    useEffect(() => {
        const localToken = window.localStorage.getItem('sl_token');
        setToken(localToken);
    }, []);

    return(
        <AppContext.Provider value={{
            token,
            setToken,
            error,
            setError
        }}>
            {children}
        </AppContext.Provider>        
    )
};

export default AppProvider;