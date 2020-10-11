const stripe = require("stripe")("sk_test_51HYm9DK0XeztXqTarwLHmhw8ycTjKQsOOuWWMdxHWRm3Lh2ML78LY07MnpyVN7hRj0xf7fYMSvfiwok9Zj7waiNN0010fPBMad");
module.exports = {
    async cartpayment(req, res) {
        console.log("inside add to cart");
        console.log("hello", req.body);
        try {
            const stripeChargeCallback = res => (stripeErr, stripeRes) => {
                console.log("res", stripeRes);
                if (stripeErr) {
                    console.log("error", stripeErr);
                    res.status(500).send({ error: stripeErr });
                } else {
                    res.status(200).send({ success: stripeRes });
                }
            };
            const body = {
                source: req.body.token.id,
                amount: req.body.amount,
                currency: "usd",
                description: "My First Test Charge",
                shipping: {
                    name: req.body.name,
                    address: {
                        line1: req.body.address,
                        postal_code: req.body.pincode,
                        city: req.body.city,
                        state: req.body.state,
                        country: req.body.country,
                    },
                },
            };
            stripe.charges.create(body, stripeChargeCallback(res));
        }
        catch (ex) {
            return console.log(ex);
        }
    }
}