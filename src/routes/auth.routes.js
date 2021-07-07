const router = require('express').Router()

router.get('/singup', (req, res) => {
    res.send('Sing up route')
})

module.exports = router