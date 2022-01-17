const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const user = require('./routes/userRoutes');
const plant = require('./routes/plantRoutes');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

connectDb();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contact REST API',
            description: "A REST API built with Express and MongoDB.",
            version: '0.1',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Development server',
            },
        ],
    },
    apis: ["./routes/*.js"],
}

const openapiSpecification = swaggerJsDoc(options);




app.use(express.json());



app.get('/', (req,res) => {
    res.send("Home");
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/user',user);
app.use('/plant',plant);



app.listen(5000,() => console.log('Working and listening on port 5000'));