const express = require('express')
const ownerModel = require('../models/owner-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

// console.log(process.env.NODE_ENV)
router.get('/',(req,res)=>{
    res.render('owner-login')
})
if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res
                .status(503)
                .send('only one owner can be stablished')
        }
    let {email , fullname , password} = req.body
     let createdOwner =   ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201)
        .render('createproducts')
    })
}
router.get('/adminPanel' , function(req,res){
    let sucess = req.flash('sucess');
    let err = req.flash('err');
    res.render('createproducts',{err,sucess})
})
module.exports = router;
