import {useState} from "react";
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const signupAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });

    const onSumbit = (event) => {
        event.preventDefault();

        doRequest();
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
            {errors}
        </form>
    );
};

export default signupAuth;