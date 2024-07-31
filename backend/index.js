const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { config } = require('dotenv');
const AuthRouter = require("./Routes/AuthRouters");
const ProductRouter = require("./Routes/ProductRouters");


require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
});