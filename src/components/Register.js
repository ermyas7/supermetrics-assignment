import { useCallback, useContext } from 'react';
import { useForm } from '../hooks';
import { doHttp } from '../App.service';
import { REGISTER_URL, CLIENT_TOKEN } from '../App.constant';
import { AppContext } from '../App.context';

const Register = () => {
    const { inputs, changeHandler, submitHandler } = useForm({name: '', email: ''});
    const {setToken, setError} = useContext(AppContext);

    const addToken = useCallback( async () => {
        const params = {
            method: 'POST',
            body: JSON.stringify({
                name: inputs.name,
                email: inputs.email,
                client_id: CLIENT_TOKEN
            })
        };
        const { data, error } = await doHttp(REGISTER_URL, params);
        if(error){
            setError(error);
        }else{
            setError('');
            setToken(data?.sl_token);
            window.localStorage.setItem('sl_token', data?.sl_token);
        }
    }, [inputs.email, inputs.name, setError, setToken]);


    return(
        <div className="supermetrics-register">
            <h2 className="supermetrics-heading supermetrics-heading-secondary">Register Token</h2>
            <form className="supermetrics-form" onSubmit={ (evt) => submitHandler(evt, addToken)}>
                <div className="supermetrics-input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={changeHandler} value={inputs.email} required/>
                </div>
                <div className="supermetrics-input-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={changeHandler} value={inputs.name} required/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;