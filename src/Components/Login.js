import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../Styles/Login.css'
import { toast } from 'react-toastify';
import {
    Link, useHistory
} from "react-router-dom";
import { useStateValue } from './StateProvider'

toast.configure({
    autoClose: 1000
});

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState([]);
    const [{ username }, dispatch] = useStateValue();
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4242/login', { email, password },
            { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                console.log("here is response", response)
                if (response.data.result === "success") {
                    toast.success("Login Successfull");
                    setTimeout(() => {
                        dispatch({
                            type: 'ADD_NAME',
                            item: {
                                name: response.data.userdata.name
                            },
                        });
                        localStorage.setItem('token', JSON.stringify(response.data.token));
                        history.push("/");
                    }, 1000);
                }
                else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="login">
            <Link to='/'>
                <img className="login__logo" src="https://businesblog.com/wp-content/uploads/2020/04/7T4MA2NDTGDHAOIV4OKQT5HYRA.jpg" alt="amazon-logo" />
            </Link>
            <div className="login__information">
                <h1>Signin</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h5>E-mail</h5>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                    <h5>Password</h5>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    <button className="login__signinbutton" type="submit">Signin</button>
                </form>
                <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                <Link to='/registration'>
                    <button className="login__registerbutton">Create Your Amazon Account</button>
                </Link>
            </div>
        </div>
    )
}

export default Login
