const express = require('express');
const connectDb = require('./src/db');

const app = express();
connectDb();


app.use(express.json());

app.get('/', (req,res) => {
    res.send("Home");
})

app.listen(5000,() => console.log('Working and listening on port 5000'));