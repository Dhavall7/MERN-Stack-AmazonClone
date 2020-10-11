const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const checkoutProductSchema = new schema({
    userid: {
        type: String,
        required: true
    },
    productid:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("checkoutProducts", checkoutProductSchema);