import React, { useState, useEffect, useRef } from 'react'
import '../Styles/Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from './StateProvider';
import {
    Link
} from "react-router-dom";
import axios from 'axios';
function Header() {
    const [{ basket, username , UserCartValue}, dispatch] = useStateValue();
    const [user, setUser] = useState('');
    const [usercart, setUsercart] = useState([]);
    const [basketval, setBAsketval] = useState([]);
    useEffect(() => {
        const loggedInUserToken = localStorage.getItem("token");
        if (loggedInUserToken) {
            const foundUserToken = JSON.parse(loggedInUserToken);

            axios.post('http://localhost:4242/TokenVerify', { foundUserToken },
                { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    setUser(response.data.token);
                    console.log("$$$", response.data.token.id);
                    // if (response.data.result === "success") {
                    //     console.log("222", response.data.result);
                    // }
                })
                .catch(error => {
                    console.log(error)
                })

            //setUser(foundUserToken);
        }

        // const loggedInBasket = localStorage.getItem("basket");
        // if (loggedInBasket) {
        //   const foundBssket = JSON.parse(loggedInBasket);
        //   setBAsketval(foundBssket);
        // }

    }, []);

    useEffect(() => {
        if (user) {
            axios.post('http://localhost:4242/UserCartValue', { user },
                { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    console.log("Here is all cart details:",response)
                    dispatch({
                        type: 'STORE_USER_CARTVALUE',
                        item: {
                            UserCartValue : response.data.UserCartValue
                        },
                    });
                   // setUsercart(response.data.UserCartValue);
                    // if (response.data.result === "success") {
                    //     console.log("222", response.data.result);
                    // }
                })
                .catch(error => {
                    console.log(error)
                })

            //setUser(foundUserToken);
        }

        // const loggedInBasket = localStorage.getItem("basket");
        // if (loggedInBasket) {
        //   const foundBssket = JSON.parse(loggedInBasket);
        //   setBAsketval(foundBssket);
        // }

    }, [user]);

    
    return (
        <nav className="header">
            <Link to='/' className="header__link">
                <img className="header__logo" src="https://businesblog.com/wp-content/uploads/2020/04/7T4MA2NDTGDHAOIV4OKQT5HYRA.jpg" alt="amazon-logo" />
            </Link>
            <div className="header__search">
                <input type="text" className="header__searchbar"></input>
                <SearchIcon className="Header__searchicon" />
            </div>
            <div className="header__nav">
                {
                    user === '' ?
                        (
                            <Link to='/login' className="header__link">
                                <div className="header__options">
                                    <span className="header__optionone">Hello </span>
                                    <span className="header__optiontwo">signin</span>
                                </div>
                            </Link>
                        ) :
                        (
                            <Link to='/logout' className="header__link">
                                <div className="header__options">
                                    <span className="header__optionone">Hello {user.name} </span>
                                    <span className="header__optiontwo">Signout</span>
                                </div>
                            </Link>
                        )
                }
                <Link to='/' className="header__link">
                    <div className="header__options">
                        <span className="header__optionone">Returns &</span>
                        <span className="header__optiontwo">Orders</span>
                    </div>
                </Link>
                <Link to='/' className="header__link">
                    <div className="header__options">
                        <span className="header__optionone">Your</span>
                        <span className="header__optiontwo">prime</span>
                    </div>
                </Link>
                <Link to='/checkout' className="header__link">
                    <div className="header__optionbascket">
                        <ShoppingBasketIcon />
                        <span className="header__optiontwo header__basketcount">{UserCartValue.length}</span>
                    </div>
                </Link>
            </div>
        </nav >
    )
}

export default Header
