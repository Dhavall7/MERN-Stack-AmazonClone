import React from 'react'
import { useStateValue } from './StateProvider'
import '../Styles/Checkout.css'
import CheckoutProduct from '../Components/CheckoutProduct.js'
import Subtotal from './Subtotal';

function Checkout() {
    const [{ basket, UserCartValue }] = useStateValue();
    console.log("&&&",UserCartValue);
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://s0.2mdn.net/9863160/09022020-092732813-SN_NaW_Asia_28Aug2020_v7.0_bordered_Awareness_Stage_970x250.jpg" alt="" />
                {
                    UserCartValue.length === 0 ? (
                        <div>
                            <h2>Your Basket is Empty</h2>
                            <p>To add the Product in basket click "Add to Cart" button below product</p>
                        </div>
                    ) :
                        (
                            <div>
                                <h2 className="checkout__title">This is Your Basket</h2>

                                {
                                    UserCartValue.map((item) => (
                                        <CheckoutProduct id={item._id}
                                            title={item.title}
                                            price={item.price}
                                            rating={item.rating}
                                            image={item.image}
                                        />
                                    ))
                                }
                            </div>
                        )
                }
            </div>
            {UserCartValue.length > 0 && (
                <div className="checkout__right">
                    <Subtotal />
                </div>
            )}
        </div>
    )
}

export default Checkout
