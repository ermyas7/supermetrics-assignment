import './App.css';
import {useMemo} from 'react';
import { useContext } from 'react';
import { AppContext } from './App.context';
import Register from './components/Register';
import Error from './components/Error';
import Stats from './components/Stats';


function App() {
  const {token, error, loading} = useContext(AppContext);
  const registerTokenRequired = useMemo(() => {
    return !(token && !error);
  }, [error, token]);

  return (
    <div className="supermetrics">
        <h1>Supermetrics API</h1>
        {loading && <p>Loading...</p>}
        {error && <Error /> }
        {registerTokenRequired && <Register/>}
        {!registerTokenRequired && !loading && <Stats />}
    </div>
  );
}

export default App;
