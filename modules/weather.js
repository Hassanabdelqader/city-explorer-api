


const axios = require('axios');

const returnedWeather = [];

class weatherClass {
    constructor(Date, Discription) {
        this.Date = Date;
        this.Discription = Discription;


    }

}

async function getWeatherData(req, res) {

    let lat = req.query.lat;
    let lon = req.query.lon;
    let url3 = `${process.env.WEATHER_API_URL}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

    let c = 0;
    await axios.get(url3).then((value) => {
        value.data.data.forEach(element => {
            let obj = new weatherClass(element.datetime, `Low of ${element.low_temp}, high of ${element.max_temp} with ${element.weather.description}`);
            returnedWeather.push(obj);
        });
        res.status(200).send(returnedWeather.splice(0, Math.min(20, returnedWeather.length)));
    }).catch((err) => {
        res.status(404).send('Not Found');
    })

}

module.exports = getWeatherData
//exports.getWeatherData = getWeatherData