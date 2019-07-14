const express = require('express'),
    router = express.Router(),
    CandidatesModel = require('../models/candidates');

router.get('/', async (req, res, next) => {
    res.send('welcome yurrrrr').status(200)
})

router.get('/all', async (req, res, next) => {
    const allCandidates = await CandidatesModel.getAllCandidates();
    console.log('candidates', allCandidates)
    res.json(allCandidates).status(200);
});

module.exports = router;