const CartSchema = require('../DatabaseModels/cartModel');
const ProductMOdel = require('../DatabaseModels/productModel');
const checkoutProductModel = require('../DatabaseModels/checkoutProduct');

module.exports = {
    async addtocart(req, res) {
        console.log("inside add to cart");
        console.log("cart request", req.body);
        try {
            await CartSchema.create(req.body).then(function (result) {
                return res.json({ message: "Addtocart Successfull", result: "success" });
            });
        }
        catch (ex) {
            return console.log(ex);
        }
    },
    async removefromcart(req, res) {
        console.log("inside add to cart");
        console.log("cart request", req.body);
        try {
            await CartSchema.findOneAndDelete({ _id: req.body.id }).then(function (result) {
                return res.json({ message: "RemoveFromcart Successfull", result: "success", RemovedItem: result });
            });
        }
        catch (ex) {
            return utility.sendServerError(ex, res, req);
        }
    },
    async UserCartValue(req, res) {
        console.log("inside get from  cart");
        console.log("get cart request", req.body);
        try {
            await CartSchema.find({ userid: req.body.user.id }).then(function (result) {
                console.log("%%%%%%%%%%%%", result);
                return res.json({ message: "RemoveFromcart Successfull", result: "success", UserCartValue: result });
            });
        }
        catch (ex) {
            return utility.sendServerError(ex, res, req);
        }
    },
    async getproducts(req, res) {
        // console.log("inside add to cart");
        // console.log("cart request", req.body);
        try {
            await ProductMOdel.find({}).then(function (result) {
                return res.json(result);
            });
        }
        catch (ex) {
            return utility.sendServerError(ex, res, req);
        }
    },
    async RemoveFromCartAfterCheckout(req, res) {
        console.log("inside RemoveFromCartAfterCheckout");
        console.log("RemoveFromCartAfterCheckout request", req.body);
        try {
            let UserCartValue = req.body.UserCartValue;
            let usercartid = [];
            UserCartValue.map((item) => (
                usercartid.push(item._id)
            ))

            UserCartValue.forEach(function (v) { delete v._id });

            //Also added product to succesfully purchased user product table
            await checkoutProductModel.insertMany(UserCartValue).then(async function (result) {
                await CartSchema.deleteMany({ _id: usercartid }).then(function (result) {
                    return res.json({ message: "Opeariton Successfull", result: "success" });
                });
            });
        }
        catch (ex) {
            return console.log(ex);
        }
    },
}