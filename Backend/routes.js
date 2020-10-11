const express = require('express');
const router = express.Router();
const scripts = require('./NodeScripts');
// const drivers = require('../models/drivers')
// const numberchec=require('../MiddleWare/middlewares')
// const middlewares = require("../MiddleWare/middlewares");

router.get('/drivers', (req, res, next) => {
    drivers.aggregate().near({
        near: {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "dis" 
    }).then(function (driver) {
        res.send(driver);
    });
});

router.get('/', (req, res, next) => {
    res.send("Hello");
});

router.post('/login',scripts.login.login);

router.post('/TokenVerify',scripts.login.TokenVerify);

router.post('/registration',scripts.registration.registration);

router.post('/AddToCart',scripts.cartmanagement.addtocart);

router.post('/RemoveFromCart',scripts.cartmanagement.removefromcart);

// router.post('/AddToProduct',scripts.cartmanagement.addtoproduct);

router.get('/GetProducts',scripts.cartmanagement.getproducts);

router.post('/UserCartValue',scripts.cartmanagement.UserCartValue);

router.post('/payment',scripts.payment.cartpayment);

router.post('/RemoveFromCartAfterCheckout',scripts.cartmanagement.RemoveFromCartAfterCheckout);
//to add the new drivers
// router.post('/drivers',middlewares.formHandler,numberchec.numberHandler,(req, res, next) => {
//     drivers.create(req.body).then(function (drivers) {
//         res.status(201).send(drivers);
//     }).catch(
//         next//()=>{res.send('asas');}
//     );
// });

//to update the specific driver
router.put('/drivers/:id', (req, res, next) => {
    drivers.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        drivers.findOne({ _id: req.params.id }).then(function (driver) {
            res.send(driver);
        });
    }).catch(next);
});

//to delete the specefic driver
router.delete('/drivers/:id', (req, res, next) => {
    drivers.findByIdAndRemove({ _id: req.params.id }).then(function (driver) {
        res.send(driver);
    });
});

module.exports = router;