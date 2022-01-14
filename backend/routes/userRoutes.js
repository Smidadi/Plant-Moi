const router = require('express').Router();
const userControl = require('../src/userConroller');
const userData = require('../models/userModels');

router.post('/Inscription', async (req,res) => {
    await userData.find()
            .then((users) => {
                if((users.filter( (x) => x.userName == req.body.userName)).length === 0 & userControl.verifyInformation(req.body)){
                    delete req.body._id;
                    const user = new userData({
                    ...req.body
                    });
                    user.save()
                        .then( () => {
                            res.send('Added');
                        })
                        .catch(() => {
                            res.send("Failed");
                        });
                }
            })
            .catch(() => res.send({message:"Failed"}))
});


router.get('/Connexion/:userName/:password', async (req,res) => {
    await userData.find()
            .then((users) => {
                if((users.filter( (x) => x.userName == req.params.userName & x.password == req.params.password)).length !== 0){
                    res.send('In');
                }else{
                    res.send('Not in');  
                }
            })
            .catch(() => res.send({message:"Failed"}))
    
});

module.exports = router;