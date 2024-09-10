const express = require('express')
const router = express.Router()
const {
     registerUser,
     loginUser,
      logoutUser 
    } = require('../controllers/authControllers')
// console.log(registerUser)

router.get('/', function (req, res) {
    res.send("hey it's working ");
})

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

module.exports = router;
