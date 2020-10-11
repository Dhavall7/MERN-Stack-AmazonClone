const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const ProductSchema = new schema({
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

module.exports = mongoose.model("products", ProductSchema);