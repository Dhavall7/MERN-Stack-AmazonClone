const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const UserSchema = new schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
  });
  
  module.exports = mongoose.model("users", UserSchema);