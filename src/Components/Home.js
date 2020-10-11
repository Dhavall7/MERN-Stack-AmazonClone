import React, { useState, useEffect } from 'react'
import '../Styles/Home.css'
import Product from '../Components/Product'
import axios from 'axios'

function Home() {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4242/GetProducts`)
            .then(res => {
                console.log("hello",res)
                setProduct(res.data)
            })

    }, []);
    return (
        <div className="home">
            <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="" />            
            <div className="home__raw">
            {
               product.slice(0, 2).map((item) => (
                    <Product id={item._id} title={item.title} price={item.price} rating={item.rating} image={item.image} />
               ))
            }
            </div>
            <div className="home__raw">
            {
               product.slice(2, 5).map((item) => (
                    <Product id={item._id} title={item.title} price={item.price} rating={item.rating} image={item.image} />
                ))
            }
            </div>
            <div className="home__raw">
            {
               product.slice(5, 6).map((item) => (
                    <Product id={item._id} title={item.title} price={item.price} rating={item.rating} image={item.image} />
                ))
            }
            </div>
        </div>

    )
}

export default Home
