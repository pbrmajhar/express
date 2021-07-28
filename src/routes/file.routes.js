const router = require('express').Router()
const multer = require('multer')

const upload = multer({dest: 'images'})

router.post('/upload', upload.single('upload'), async (req, res) => {
    console.log(req.body)
    res.send('here will be uploaded')
})

module.exports = router