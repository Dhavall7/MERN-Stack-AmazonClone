import React, { useState } from 'react'
import {
    Link, useHistory
} from "react-router-dom";
import '../Styles/Address.css'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import StripeCheckout from "react-stripe-checkout";
import { getBasketTotal } from '../Reducer/Reducer';
import { useStateValue } from '../Components/StateProvider'
import { toast } from 'react-toastify';
import axios from 'axios'

toast.configure({
    autoClose: 1000
});

function Address() {
    const [{ UserCartValue }] = useStateValue();
    const [name, setName] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [pincode, setPincode] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const publishableKey = "pk_test_51HYm9DK0XeztXqTaTMf32dVlWbIBc3PEsg8HCCAJaLkJ3rB576FPftcAJY18GZmgk3vsNtptbQVGldt5UdtqoKAG00SJVTLbsd";
    let history = useHistory();

    const onToken = token => {
        const body = {
            amount: (getBasketTotal(UserCartValue) * 100),
            token: token,
            name: name,
            address: address,
            pincode: pincode,
            city: city,
            state: region,
            country: country
        };
        axios
            .post("http://localhost:4242/payment", body)
            .then(response => {
                console.log(response);
                if (response) {
                    axios.post('http://localhost:4242/RemoveFromCartAfterCheckout', { UserCartValue },
                        { headers: { 'Content-Type': 'application/json' } })
                        .then(response => {
                            if (response.data.result === "success") {
                                toast.success("Order succesfully placed");
                                history.push("/");
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })

                }
            })
            .catch(error => {
                alert("Payment Error");
            });
    };

    return (
        <div className="address">
            <Link to='/'>
                <img className="address__logo" src="https://businesblog.com/wp-content/uploads/2020/04/7T4MA2NDTGDHAOIV4OKQT5HYRA.jpg" alt="amazon-logo" />
            </Link>
            <h2>Please Provide details below.</h2>
            <div className="address__information">
                <form >
                    <h5>Full Name</h5>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" required />
                    <h5>Address</h5>
                    <input value={address} onChange={e => setAddress(e.target.value)} type="text" required />
                    <h5>Mobile number</h5>
                    <input value={mobilenumber} class="no-arrow" onChange={e => setMobilenumber(e.target.value)} type="number" required />
                    <h5>Pincode</h5>
                    <input value={pincode} class="no-arrow" onChange={e => setPincode(e.target.value)} type="number" required />
                    <h5>City</h5>
                    <input value={city} onChange={e => setCity(e.target.value)} type="text" required />
                    <h5>Country</h5>
                    <div className="addresslocation">
                        <CountryDropdown
                            value={country}
                            classes="addresslocation"
                            onChange={(val) => setCountry(val)} />
                    </div>
                    <h5>State</h5>
                    <RegionDropdown
                        country={country}
                        classes="addresslocation"
                        value={region}
                        onChange={(val) => setRegion(val)} />

                    {/* <button className="login__signinbutton" type="submit">Signin</button> */}
                </form>
                <StripeCheckout
                    label="Make Payment" //Component button text
                    name="Amazon" //Modal Header
                    description="Thankyou For Buying."
                    panelLabel="Pay" //Submit button in modal
                    amount={getBasketTotal(UserCartValue) * 100} //Amount in cents $9.99
                    token={onToken}
                    stripeKey={publishableKey}
                    billingAddress={false}
                />
            </div>
        </div>
    )
}

export default Address
