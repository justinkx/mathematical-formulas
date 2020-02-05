const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");
const mathjaxService = require('./services/mathjaxService');
const jwt = require("./_helpers/jwt");
const wakeUpHeroku = require('./wakeupHeroku');
const initializeEndpoints = require("./routes/Routes");
const errorHandler = require("./errorHandler/error");
const mjAPI = require("mathjax-node");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
// use JWT auth to secure the api

// if(process.env.NODE_ENV === "production"){
//     app.use('/docs', (req, res, next) => {
//       res.status(404).send("Not Found");
//     });
// }
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(jwt());
mjAPI.config(mathjaxService.config);
mjAPI.start();


//configure  Routes and End-Points
initializeEndpoints(app);

// catch 404 and forward to error handler
errorHandler(app);

//CONNECT TO DB
mongoose.connect(
  process.env.DATABASE_URI,
  {
    useNewUrlParser: true
  },
  (err, client) => {
    console.log("connected to db");
  }
);

app.listen(process.env.PORT || port, () =>{
  console.log(`Example app listening on port ${port},${process.env.NODE_ENV}!`);
  // wakeUpHeroku(25);
});
