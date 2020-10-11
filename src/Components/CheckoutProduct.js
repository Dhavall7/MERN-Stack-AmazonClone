import React , { useState, useEffect } from 'react'
import '../Styles/CheckoutProduct.css'
import { useStateValue } from '../Components/StateProvider'
import axios from 'axios'

function CheckoutProduct({ id, title, price, rating, image }) {
    const [, dispatch] = useStateValue();
    const [userid, setUserID] = useState('');

    useEffect(() => {
        // const loggedInUser = localStorage.getItem("username");
        // if (loggedInUser) {
        //     const foundUser = JSON.parse(loggedInUser);
        //     debugger
        //     axios.post('http://localhost:4242/login', { email: foundUser.email },
        //         { headers: { 'Content-Type': 'application/json' } })
        //         .then(response => {
        //             if (response.data.result === "success") {
        //                 setUserID(response.data.userdata._id);
        //             }
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })

        // }
    }, []);

    const removeFromCart = () => {
        axios.post('http://localhost:4242/RemoveFromCart', { id },
            { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                if (response.data.result === "success") {
                   console.log("Succesfully remove from cart",response.data.RemovedItem)
                   dispatch({
                    type: 'REMOVE_FROM_BASKET_API',
                    id: response.data.RemovedItem._id
                })
                }
            })
            .catch(error => {
                console.log(error)
            })
        
    }
    return (
        <div className="checkoutproduct">
            <img className="checkoutproduct__image" src={image} alt="" />
            <div className="checkoutproduct__info">
                <p className="checkoutproduct__title">
                    {title}
                </p>
                <p className="checkoutproduct__price">${price}</p>
                <div className="checkoutproduct__rating">
                    {
                        Array(rating)
                            .fill()
                            .map((_) => (
                                <p>&#11088;</p>
                            ))
                    }
                </div>
                <button onClick={removeFromCart}>Remove from Cart</button>

            </div>

        </div>
    )
}

export default CheckoutProduct
