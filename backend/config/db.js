const mongoose = require('mongoose');

async function connectDb() {
    //await mongoose.connect('mongodb+srv://AdminPlantEtMoi:AdminPlant&MoiPassword@cluster0.njrgv.mongodb.net/test?retryWrites=true&w=majority',
    await mongoose.connect('mongodb://127.0.0.1:27017/test',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => {
        console.log('Connexion à MongoDB échouée !');
        process.exit(1);
    });
}

module.exports = connectDb;