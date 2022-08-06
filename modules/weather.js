


const axios = require('axios');



const cash ={};
class weatherClass {
    constructor(Date, Discription) {
        this.Date = Date;
        this.Discription = Discription;


    }

}

async function getWeatherData(req, res) {
   
    if(cash[req.query.query?.toLowerCase()] === undefined){
            const returnedWeather = [];
            let lat = req.query.lat;
            let lon = req.query.lon;
            let url3 = `${process.env.WEATHER_API_URL}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

    await axios.get(url3).then((value) => {
        value.data.data.forEach(element => {
            let obj = new weatherClass(element.datetime, `Low of ${element.low_temp}, high of ${element.max_temp} with ${element.weather.description}`);
            returnedWeather.push(obj);
        });
        cash[req.query.query.toLowerCase()]  = returnedWeather.splice(0, Math.min(20, returnedWeather.length))
        res.status(200).send(cash[req.query.query.toLowerCase()]);
    }).catch((err) => {
        res.status(404).send('Not Found from weather');
    })
    }else {
        res.status(200).send(cash[req.query.query.toLowerCase()]);
    }
    

   

}

module.exports = getWeatherData
//exports.getWeatherData = getWeatherData