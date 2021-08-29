import { createContext, useEffect, useState, useCallback } from 'react';
import { doHttp } from './App.service';
import { POSTS_URL } from './App.constant';

export const AppContext = createContext();

const AppProvider = ({children}) => {
    const [ token, setToken ] = useState('');
    const [ error, setError ] = useState('');
    const [posts, setPosts] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const localToken = window.localStorage.getItem('sl_token');
        setToken(localToken);
    }, []);

    const getPosts = useCallback(async () => {
            setLoading(true);
            const {data, error} = await doHttp(`${POSTS_URL}?sl_token=${token}&page=${nextPage}`, {method: 'get'});
            if(error){
                setError(error);
                setLoading(false);
            }else{
                setPosts((oldPost) => [...oldPost, ...data.posts]);
                setNextPage(data.page + 1);
                if(data.page === 10) setLoading(false);
            }
        },[nextPage, token]);
    useEffect(() => {
        console.log(nextPage);
        if(token && nextPage <= 10){
            getPosts();
        }
    }, [getPosts, nextPage, token]);

    return(
        <AppContext.Provider value={{
            token,
            setToken,
            error,
            setError,
            posts,
            loading
        }}>
            {children}
        </AppContext.Provider>        
    )
};

export default AppProvider;