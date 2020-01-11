const https = require("https");

const wakeUpHeroku = (timeOut) => {
    const interval = timeOut * 60000;
    setInterval(() => {
      https
        .get("https://mathematical-formulas.herokuapp.com/", res => {
          console.log("statusCode:", res.statusCode);
        })
    }, interval);
  
};

module.exports = wakeUpHeroku;
