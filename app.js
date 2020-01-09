const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const jwt = require('./_helpers/jwt');

const initializeEndpoints = require('./routes/Routes');
const errorHandler = require('./errorHandler/error');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
// use JWT auth to secure the api



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(jwt());


//configure  Routes and End-Points
initializeEndpoints(app);

// catch 404 and forward to error handler
errorHandler(app);

//CONNECT TO DB
mongoose.connect(`mongodb://jkx:jkx1993%23%24@cluster0-shard-00-00-zrqed.mongodb.net:27017,
cluster0-shard-00-01-zrqed.mongodb.net:27017,cluster0-shard-00-02-zrqed.mongodb.net:27017/rn-chat?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`,{
useNewUrlParser: true},(err,client)=> {
    console.log('connected to db');
});


app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))
