const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

//post request
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", (req, res) => {

res.sendFile(__dirname + "/index.html")

});

app.post("/", (req, res)=>{

const city = req.body.cityName;
const APIKey = "************************"
const unit = "metric"

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${unit}`;

https.get(url, response => {
    response.on("data", data => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const {
            description,
            icon
        } = weatherData.weather[0];
        const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        res.set("Content-Type", "text/html");
        //OR
        //res.setHeader("Content-Type", "text/html");

        res.send(`
  <h3>The weather is currently ${description}</h3>
  <img src="${imageURL}">
  <h1>The temperature in ${city} is <span>${temp}</span> ° Celsius.</h1>
  `);
    });
});
//res.send('server is up!!!');

})

app.listen(3000, () => {
    console.log("Server started!!!");
});
