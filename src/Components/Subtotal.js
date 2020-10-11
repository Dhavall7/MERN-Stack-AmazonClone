import React from 'react'
import '../Styles/Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../Components/StateProvider'
import { getBasketTotal } from '../Reducer/Reducer'
import StripeCheckout from "react-stripe-checkout";
import {
    Link
} from "react-router-dom";
import axios from 'axios'

function Subtotal() {
    const [{ UserCartValue }] = useStateValue();
    debugger
    const publishableKey = "pk_test_51HYm9DK0XeztXqTaTMf32dVlWbIBc3PEsg8HCCAJaLkJ3rB576FPftcAJY18GZmgk3vsNtptbQVGldt5UdtqoKAG00SJVTLbsd";
    const onToken = token => {
        const body = {
            amount: getBasketTotal(UserCartValue),
            token: token
        };
        axios
            .post("http://localhost:4242/payment", body)
            .then(response => {
                console.log(response);
                alert(" Payment Success");
            })
            .catch(error => {
                console.log("Payment Error: ", error);
                alert("Payment Error");
            });
    };
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <div>
                        <p>
                            SubTotal ({UserCartValue.length} items) : <strong>{`${value}`}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </div>
                )}
                decimalScale={2}
                value={getBasketTotal(UserCartValue)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            {/* <StripeCheckout
                label="Proceed To Checkout" //Component button text
                name="Amazon" //Modal Header
                description="Thankyou For Buying."
                panelLabel="Pay" //Submit button in modal
                amount={getBasketTotal(UserCartValue) * 100} //Amount in cents $9.99
                token={onToken}
                stripeKey={publishableKey}
                billingAddress={false}
            /> */}
            <Link to='/Address'>
                <button>Proceed To Checkout</button>
            </Link>
        </div>
    )
}

export default Subtotal
