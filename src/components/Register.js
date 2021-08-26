const Register = () => (
    <div className="supermetrics-register">
        <h2 className="supermetrics-heading supermetrics-heading-secondary">Register Token</h2>
        <form className="supermetrics-form">
            <div className="supermetrics-input-group">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email"/>
            </div>
            <div className="supermetrics-input-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name"/>
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
);

export default Register;