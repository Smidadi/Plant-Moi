const router = require('express').Router();
const userData = require('../models/userModels');
const plantData = require('../models/plantModels');

router.post('/plantFav/:plantName/:user', async (req,res) => {
    await plantData.find()
                .then((plants) => {
                    if((plants.filter( (x) => x.plantName == req.params.plantName)).length == 1 ){
                        const plant = plants[0];
                        // const response = await plant.updateOne({plantName: req.params.plantName});

                    }
                })
});

// router.post('/plantLike/:plantName/:user', async (req,res) => {

// });


module.exports = router;