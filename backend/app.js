const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const user = require('./routes/userRoutes');

const app = express();
app.use(cors());
connectDb();


app.use(express.json());

app.get('/', (req,res) => {
    res.send("Home");
})

app.use('/user',user);



app.listen(5000,() => console.log('Working and listening on port 5000'));