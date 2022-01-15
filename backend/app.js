const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const user = require('./routes/userRoutes');
const plant = require('./routes/plantRoutes');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

connectDb();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['localhost:5000'],
    methods: ['GET','POST'],
    credentials: true
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);



app.use(express.json());



app.get('/', (req,res) => {
    res.send("Home");
})

app.use('/user',user);
app.use('/plant',plant);



app.listen(5000,() => console.log('Working and listening on port 5000'));