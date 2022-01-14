const router = require('express').Router();
const userControl = require('../src/userConroller');
const userData = require('../models/userModels');

router.post('/inscription', async (req,res) => {
    const response = userControl.verifyInformation(req.body);
    console.log(response);
    delete req.body._id;
    const t = new userData({
        ...req.body
    });
    t.save().then( () => console.log("here")).catch(() => console.log('failed'))
    res.end()
});


router.get('/inscription', async (req,res) => {
    userData.find()
    .then(user => console.log(user))
    .catch(() => console.log('error'))
    res.end();
});

module.exports = router;