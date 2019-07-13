const express = require('express'),
    router = express.Router()

router.get('/', async (req, res, next) => {
    res.send('welcome yurrrrr').status(200)
})

module.exports = router;