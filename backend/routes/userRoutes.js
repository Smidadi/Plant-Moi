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
// person.friends.push(friend);
// person.save(done);

// PersonModel.update(
//     { _id: person._id }, 
//     { $push: { friends: friend } },
//     done
// );

router.put('/plantLiked/:user/:plantName', async (req,res) => {
    await userData.updateOne({
        userName: req.params.user,
        $push: {likedPlant: {
            namePlant: req.params.plantName,
            note: ''
        }}
    }).then(() => res.send("Done"))
    .catch(() => res.send("Undone"))    
});

router.put('/addFav/:user/:plantName', async (req,res) => {
    let favPlant;
    await userData.findOne({userName: req.params.user})
                .then(user => {
                    favPlant = ((user.likedPlant).filter(x => x.namePlant == req.params.plantName))[0];
                })

    let note;
    if(typeof(favPlant)=='undefined'){
        await userData.updateOne({
            userName: req.params.user,
            favoritePlant: {
                namePlant: req.params.plantName,
                note: ''
            },
            $push: {likedPlant: {
                namePlant: req.params.plantName,
                note: ''
            }}
        }).then(() => res.send("Done"))
        .catch(() => res.send("Undone"));
    }else{
        await userData.updateOne({
            userName: req.params.user,
            favoritePlant: {
                namePlant: req.params.plantName,
                note: ''
            }
        }).then(() => res.send("Done"))
        .catch(() => res.send("Undone"));
    }
});

router.get('/favPlant/:user', async (req,res) => {
    await userData.findOne({username: req.params.user})
                .then(user => res.send(user.favoritePlant))
                .catch(() => res.send("error"));
});

router.get('/likedPlant/:user', async (req, res) => {
    await userData.findOne({username: req.params.user})
                .then(user => res.send(user.likedPlant))
                .catch(() => res.send("error"));
});

module.exports = router;