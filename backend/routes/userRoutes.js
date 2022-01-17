const router = require('express').Router();
const userControl = require('../src/userConroller');
const userData = require('../models/userModels');
const bcrypt  = require('bcrypt');


/**
 * @openapi
 * /Inscription:
 *      post:
 *          description: Add a user in the database
 *          parameters:
 *                  - in: body
 *                    name: userName
 *                    schema: 
 *                      type: string 
 *                    required: true
 *                    description: the username      
 *                  - in: body
 *                    name: password
 *                    schema:
 *                      type: string
 *                    required: true
 *                    description: the password
 *                  - in: body
 *                    name: email
 *                    schema: 
 *                      type: string 
 *                    required: true
 *                    description: the email        
 *          responses: 
 *                  'Added':
 *                      description: the user is ccorrectly added to the database
 *                  'Failed':
 *                      description: a problem has occured       
 */
router.post('/Inscription', async (req,res) => {
    await userData.find()
            .then((users) => {
                if((users.filter( (x) => x.userName == req.body.userName)).length === 0 & userControl.verifyInformation(req.body)){
                    bcrypt.hash(req.body.password,10, (err,hash) => {
                        if (err)
                            return;
                        delete req.body._id;
                        const user = new userData({
                            userName: req.body.userName,
                            password: hash,
                            email: req.body.email
                        });
                        user.save()
                            .then( () => {
                                res.send('Added');
                            })
                            .catch(() => {
                                res.send("Failed");
                            });
                    })
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
 *                  - in: path
 *                    name: user
 *                    schema: 
 *                      type: string 
 *                    required: true
 *                    description: the username      
 *                  - in: path
 *                    name: password
 *                    schema:
 *                      type: string
 *                    required: true
 *                    description: the password
 *          responses: 
 *                  'In':
 *                      description: the user is in the database
 *                  'Not in':
 *                      description: a The user is not in the database       
 */
router.get('/Connexion/:userName/:password', async (req,res) => {
    await userData.find()
            .then((users) => {
                if((users.filter( async (x) => x.userName == req.params.userName & await bcrypt.compare(req.params.password, x.password))).length !== 0){
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
 *                  - in: path
 *                    name: user
 *                    schema: 
 *                      type: string 
 *                    required: true
 *                    description: the username      
 *                  - in: path
 *                    name: plantName
 *                    schema:
 *                      type: string
 *                    required: true
 *                    description: the plant name      
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


/**
 * @openapi
 * /user/favPlant/{user}:/{plantName}:
 *      put:
 *          description: Change the favorite
 *          parameters:
 *                  - in: path
 *                    name: user
 *                    schema: 
 *                      type: string 
 *                    required: true
 *                    description: the username      
 *                  - in: path
 *                    name: plantName
 *                    schema:
 *                      type: string
 *                    required: true
 *                    description: the plant name   
 *          responses: 
 *                  'Done':
 *                      description: The plant is the favorite favorite
 *                  'Undone':
 *                      description: The plant is not the favorite ! a problem has occured      
 */
router.put('/favPlant/:user/:plantName', async (req,res) => {
    let favPlant;
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

/**
 * @openapi
 * /user/favPlant/{user}:
 *      get:
 *          description: get the favorite plant of a user
 *          parameters:
 *                  - in: path
 *                    name: user
 *                    schema: 
 *                      type: string 
 *                    required: true
 *                    description: the username         
 *          responses: 
 *                  'user.favoritePlant':
 *                      description: The favorite plant of user
 *                  'error':
 *                      description: a problem has occured   
 */
router.get('/favPlant/:user', async (req,res) => {

    await userData.findOne({userName: req.params.user})
                .then(user => res.send(user.favoritePlant))
                .catch(() => res.send("error"));
});


/**
 * @openapi
 * /user/likedPlant/{user}:
 *      get:
 *          description: get all the liked plant of user
 *          parameters:
 *                  - in: path
 *                    name: user
 *                    schema: 
 *                      type: string 
 *                    required: true
 *                    description: the username 
 *          responses: 
 *                  'user.likedPlant':
 *                      description: An array of all the liked plant
 *                  'error':
 *                      description: a problem has occured   
 */
router.get('/likedPlant/:user', async (req, res) => {
    await userData.findOne({userName: req.params.user})
                .then(user => res.send(user.likedPlant))
                .catch(() => res.send("error"));
});

/**
 * @openapi
 * /user/likedPlant/{user}:/{plantName}:
 *      get:
 *          description: get if a plant is liked by user
 *          parameters:
 *                  - in: path
 *                    name: user
 *                    schema: 
 *                      type: string 
 *                    required: true
 *                    description: the username      
 *                  - in: path
 *                    name: plantName
 *                    schema:
 *                      type: string
 *                    required: true
 *                    description: the plant name   
 *          responses: 
 *                  'Liked':
 *                      description: The plant is liked
 *                  'NLike':
 *                      description: the plant isn't liked
 */
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

/**
 * @openapi
 * /user/likedPlant/{user}:/{plantName}:
 *      delete:
 *          description: remove a liked plant
 *          parameters:
 *                  - in: path
 *                    name: user
 *                    schema: 
 *                      type: string 
 *                    required: true
 *                    description: the username      
 *                  - in: path
 *                    name: plantName
 *                    schema:
 *                      type: string
 *                    required: true
 *                    description: the plant name   
 *          responses: 
 *                  'Done':
 *                      description: operation is a success
 *                  'Undone':
 *                      description: a problem has occured   
 */
router.delete('/LikedPlant/:user/:plantName', async (req, res) => {
    await userData.updateOne(
        {userName: req.params.user},
        {$pull: {likedPlant: {namePlant: req.params.plantName}}
    })
    .then(() => res.send('Done'))
    .catch(() => res.send('Undone'));
});

/**
 * @openapi
 * /user/favPlant/{user}:
 *      delete:
 *          description: remove the favorite plant
 *          parameters:
 *                  - in: path
 *                    name: user
 *                    schema: 
 *                      type: string 
 *                    required: true
 *                    description: the username       
 *          responses: 
 *                  'Done':
 *                      description: operation is a success
 *                  'Undone':
 *                      description: a problem has occured   
 */
router.delete('/favPlant/:user', async (req,res) => {
    await userData.updateOne({
        userName: req.params.user},
        {$unset: {favoritePlant: ""}
    })
    .then(() => res.send('Done'))
    .catch(() => res.send('Undone'));
})

module.exports = router;