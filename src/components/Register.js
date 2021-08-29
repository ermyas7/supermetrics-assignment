import { useForm } from '../hooks';

const Register = () => {
    const { inputs, changeHandler } = useForm();
    console.log(inputs);
    return(
        <div className="supermetrics-register">
            <h2 className="supermetrics-heading supermetrics-heading-secondary">Register Token</h2>
            <form className="supermetrics-form">
                <div className="supermetrics-input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" onChange={changeHandler}/>
                </div>
                <div className="supermetrics-input-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={changeHandler}/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;