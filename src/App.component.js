import './App.css';
import {useMemo} from 'react';
import { useContext } from 'react';
import { AppContext } from './App.context';
import Register from './components/Register';
import Error from './components/Error';


function App() {
  const {token, error} = useContext(AppContext);
  const registerTokenRequired = useMemo(() => {
    return !(token && !error);
  }, [error, token]);

  return (
    <div className="supermetrics">
        <h1>Supermetrics API</h1>
        {error && <Error /> }
        {registerTokenRequired &&<Register/>}
    </div>
  );
}

export default App;
