import { useForm } from '../hooks';

const Register = () => {
    const { inputs, changeHandler, submitHandler } = useForm({name: '', email: ''});
    return(
        <div className="supermetrics-register">
            <h2 className="supermetrics-heading supermetrics-heading-secondary">Register Token</h2>
            <form className="supermetrics-form" onSubmit={submitHandler}>
                <div className="supermetrics-input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" onChange={changeHandler} value={inputs.email}/>
                </div>
                <div className="supermetrics-input-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={changeHandler} value={inputs.name}/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;