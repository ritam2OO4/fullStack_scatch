const express = require('express').Router();
const router = express;
const { isloggedIn } = require('../middlewares/isloggedIn')
const productModel = require('../models/productsmodel');
const userModel = require('../models/userModel');
router.get('/', (req, res) => {
    let error = req.flash('error')
    res.render('index', { error, loggedin: false });
})
router.get('/shop/:productId', isloggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });

        // Check if the cart is empty
        if (user.cart.length === 0) {
            // If cart is empty, add the product with quantity 1
            user.cart.push({ product: req.params.productId, quantity: 1 });
        } else {
            // Check if the product already exists in the cart
            let productExists = false;
            for (let i = 0; i < user.cart.length; i++) {
                if (user.cart[i].product.equals(req.params.productId)) {
                    // Product exists in cart, increment quantity
                    user.cart[i].quantity += 1;
                    productExists = true;
                    break;
                }
            }
            if (!productExists) {
                // Product does not exist in cart, add new entry
                user.cart.push({ product: req.params.productId, quantity: 1 });
                console.log('1')
            }
        }
        console.log('2')

        // Save the updated user object
        await user.save();

        // console.log('Updated cart:', user.cart);
        req.flash('success', 'Added to cart successfully!!!');
        res.redirect('/shop');
    } catch (err) {
        console.error('Error adding product to cart:', err);
        req.flash('error', 'Failed to add to cart. Please try again.');
        res.redirect('/shop');
    }
});

router.get('/shop', isloggedIn, async (req, res) => {
    let products = await productModel.find();
    let sucess = req.flash('sucess');
    res.render('shop', { products, sucess });
})
module.exports = router;