const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product' // Replace 'Product' with your actual product model name
        },
        quantity: {
            type: Number,
            default: 0  // Default quantity is 1 if not specified
        }
    }],
    orders: {
        typeof: Array,
        default: []
    },
    contact: Number,
    picture: String,
    fullname: {
        type: String,
        minLength : 3,
        trim: true,
    },
    email: String,
    password: String,
    
})

module.exports = mongoose.model('user',userSchema)