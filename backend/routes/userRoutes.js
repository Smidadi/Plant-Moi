const router = require('express').Router();
const userControl = require('../src/userConroller');
const userData = require('../models/userModels');


/**
 * @openapi
 * /Inscription:
 *      post:
 *          description: Add a user in the database
 *          responses: 
 *                  'Added':
 *                      description: the user is ccorrectly added to the database
 *                  'Failed':
 *                      description: a problem occurs       
 */
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

/**
 * @openapi
 * /user/Connexion/{username}:/{password}:
 *      get:
 *          description: Verify if a user in in the database
 *          parameters:
 *              username: the username
 *              password: the password
 *          responses: 
 *                  'In':
 *                      description: the user is in the database
 *                  'Not in':
 *                      description: a The user is not in the database       
 */
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

/**
 * @openapi
 * /user/likedPlant/{user}:/{plantName}:
 *      put:
 *          description: Add liked plant for a specific user
 *          parameters:
 *                  user: the username
 *                  plantName: the name of the plant
 *          responses: 
 *                  'Done':
 *                      description: The plant is added on the liked plant list of the user 
 *                  'Undone':
 *                      description: The plant hasn't been had in the database       
 */
router.put('/likedPlant/:user/:plantName', async (req,res) => {
    await userData.updateOne(
        {userName: req.params.user},
        {$addToSet: {likedPlant: {
            namePlant: req.params.plantName
        }}
    }).then((x) => res.send('Done'))
    .catch((x) => res.send("Undone"))
});

router.put('/favPlant/:user/:plantName', async (req,res) => {
    let favPlant;
    console.log(req.params);
    await userData.findOne({userName: req.params.user})
                .then(user => {
                    favPlant = ((user.likedPlant).filter(x => x.namePlant == req.params.plantName))[0];
                })

    let note;
    
    if(typeof(favPlant)=='undefined'){
        await userData.updateOne({
            userName: req.params.user},
            {favoritePlant: {
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
            userName: req.params.user},
            {favoritePlant: {
                namePlant: req.params.plantName,
                note: note
            }
        }).then(() => res.send("Done"))
        .catch(() => res.send("Undone"));
    }
});

router.get('/favPlant/:user', async (req,res) => {

    await userData.findOne({userName: req.params.user})
                .then(user => res.send(user.favoritePlant))
                .catch(() => res.send("error"));
});

router.get('/likedPlant/:user', async (req, res) => {
    await userData.findOne({userName: req.params.user})
                .then(user => res.send(user.likedPlant))
                .catch(() => res.send("error"));
});

router.get('/likedPlant/:user/:plantName', async (req,res) => {
    await userData.findOne({userName: req.params.user})
                    .then(user => {
                        let ret = (user.likedPlant).filter(x => x.namePlant == req.params.plantName);
                        if(ret.length == 0)
                            res.send('NLiked');
                        else
                            res.send('Liked');
                    })
});

router.delete('/LikedPlant/:user/:plantName', async (req, res) => {
    await userData.updateOne(
        {userName: req.params.user},
        {$pull: {likedPlant: {namePlant: req.params.plantName}}
    })
    .then(() => res.send('Done'))
    .catch(() => res.send('Undone'));
});

router.delete('/favPlant/:user', async (req,res) => {
    await userData.updateOne({
        userName: req.params.user},
        {$unset: {favoritePlant: ""}
    })
    .then(() => res.send('Done'))
    .catch(() => res.send('Undone'));
})

module.exports = router;