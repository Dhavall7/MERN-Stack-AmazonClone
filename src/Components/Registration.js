import React, { useState } from 'react'
import {
    Link, useHistory
} from "react-router-dom";
import axios from 'axios'
import '../Styles/Registration.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateValue } from './StateProvider'

toast.configure({
    autoClose: 1000
});

function Registration() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [, dispatch] = useStateValue();
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4242/registration', { name, email, password },
            { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                if (response.data.result === "success") {
                    toast.success("Registration Successfull");

                    setTimeout(() => {
                        dispatch({
                            type: 'ADD_NAME',
                            item: {
                                name: name
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
        <div className="registration">
            <Link to='/'>
                <img className="registration__logo" src="https://businesblog.com/wp-content/uploads/2020/04/7T4MA2NDTGDHAOIV4OKQT5HYRA.jpg" alt="amazon-logo" />
            </Link>
            <div className="registration__information">
                <h1>Registration</h1>
                <form onSubmit={handleSubmit} >
                    <h5>Name</h5>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" required />
                    <h5>E-mail</h5>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
                    <h5>Password</h5>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" minLength="8" required />
                    <button className="registration_createaccountbutton" type="submit" >Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default Registration
