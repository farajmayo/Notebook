const express = require('express');
const { handleUserLogin, handleUserSignup } = require('../controller/userController');


const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/createuser', handleUserSignup )
router.post('/loginuser', handleUserLogin )



module.exports = router