import React, { useState, useEffect } from 'react'
import '../Styles/Product.css'
import { useStateValue } from './StateProvider'
import axios from 'axios'
import {
    useHistory
} from "react-router-dom";

function Product({ id, title, price, rating, image }) {
    const [, dispatch] = useStateValue();
    const [user, setUser] = useState('');
    let history = useHistory();

    useEffect(() => {
        const loggedInUserToken = localStorage.getItem("token");
        if (loggedInUserToken) {
            const foundUserToken = JSON.parse(loggedInUserToken);
            debugger
            axios.post('http://localhost:4242/TokenVerify', { foundUserToken },
                { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    setUser(response.data.token);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, []);

    const addToCart = () => {
        if (!user || user == '') {
            { history.push("/login") }
        }
        axios.post('http://localhost:4242/AddToCart', { userid: user.id, productid: id, title, price, rating, image },
            { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                if (response.data.result === "success") {
                    console.log("222", response.data.result);
                }
            })
            .catch(error => {
                console.log(error)
            })
        // const basketval = localStorage.getItem("basket");
        // if (basketval) {
        //     const foundBasketVal =  JSON.parse(basketval)
        //     foundBasketVal.push({
        //         id: id,
        //         title: title,
        //         price: price,
        //         rating: rating,
        //         image: image
        //     });
        //     localStorage.setItem('basket', JSON.stringify(foundBasketVal));
        // }
        // else {
        //     localStorage.setItem('basket', JSON.stringify([{
        //         id: id,
        //         title: title,
        //         price: price,
        //         rating: rating,
        //         image: image
        //     }]));
        // }

        axios.post('http://localhost:4242/UserCartValue', { user },
            { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                dispatch({
                    type: 'STORE_USER_CARTVALUE',
                    item: {
                        UserCartValue: response.data.UserCartValue
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
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                price: price,
                rating: rating,
                image: image
            },
        });
    };
    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">

                    {
                        Array(rating)
                            .fill()
                            .map((_) => (
                                <p>&#11088;</p>
                            ))
                    }
                </div>
            </div>
            <img src={image} alt="" />
            <button onClick={addToCart}>Add to cart</button>
        </div>
    )
}

export default Product
