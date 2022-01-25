import {useState} from "react";
import axios from "axios";

const signupAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const onSumbit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/users/signup', {
                email, password
            });
        } catch (err) {
            setErrors(err.response.data.errors);
        }
    }

    return (
        <form onSubmit={onSumbit}>
            <h1>Signup</h1>
            <div className="form-group">
                <label>Email address</label>
                <input className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password}
                       onChange={e => setPassword(e.target.value)}/>
            </div>
            <button className="btn btn-primary">Sign Up</button>
            {errors.length > 0 && <div className="alert alert-danger">
                <h4>Ooops...</h4>
                <ul className="my-0">
                    {errors.map(err => <li key={err.message}>{err.message}</li>)}
                </ul>
            </div>}
        </form>
    );
};

export default signupAuth;