const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://AdminPlantEtMoi:AdminPlant&MoiPassword@cluster0.njrgv.mongodb.net/test?retryWrites=true&w=majority',
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.send("Home");
})

app.listen(5000,() => console.log('Working and listening on port 5000'));