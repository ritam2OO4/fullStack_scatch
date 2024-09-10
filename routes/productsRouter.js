const express = require('express')
const router = express.Router()
const upload = require('../config/multer-config')
const productModel = require('../models/productsmodel')


router.post('/create', upload.single('image'), async function (req, res) {
    try {
        let {
            name, price, discount, bgcolor, panelcolor, textcolor
        } = req.body;
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        })
        req.flash('sucess','product created sucessfully')
        res.redirect('/owners/adminPanel');
    }
    catch (err) {
        req.flash('err','something went wrong!!')
           res.redirect('/owners/adminPanel')
    }
})

module.exports = router;
