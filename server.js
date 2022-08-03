"use strict";

require('dotenv').config();

const myJson = require('./data/weather.json');

const PORT = 3001;

const KEY = process.env.MOVIE_API_KEY || `55325b5628dbe9dd987f442fdc49f072` ;

const MovieURL = process.env.MOVIES_API_URL || `https://api.themoviedb.org/3/search/movie?` ;

const axios = require('axios');

const express = require('express');

const app = express();

const returnedWeather = [];

const returnedMovies = [];


class weatherClass{
	constructor(Date,Discription){
    	this.Date=Date;
      	this.Discription=Discription;

        
    }
  
}
class moviesClass{
	constructor(obj){
        this.title=obj.original_title;
        this.overview =obj.overview;
        this.average_votes=obj.vote_average;
        this.total_votes=obj.vote_count;
        this.image_url =`http://image.tmdb.org/t/p/w500${obj.poster_path}`;
        this.popularity=obj.popularity;
        this.released_on=obj.release_date;
    }
  
}

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

  console.log('hi');
  res.send('Hi');

});

app.get('/weather', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    let lat = req.query.lat;
    let lon = req.query.lon;
  

let url =`${process.env.WEATHER_API_URL}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
// Make a request for a user with a given ID
getWeatherData(url,req,res);

});


app.get('/movies', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    let querya = req.query.query;

let url2 =`${MovieURL}api_key=${KEY}&query=${querya}`;
// Make a request for a user with a given ID
getMoviesData(url2,req,res);

});


app.get('*', (req, res) => {

    res.status(406).send('Not Found');
});

app.listen(PORT, () => {
    console.log('Server listening ...');
})

let getWeatherData = async  (url,req,res)=>{
    let c= 0;
    await axios.get(url).then((value)=>{

       

        value.data.data.forEach(element => {
        let obj = new weatherClass(element.datetime , `Low of ${element.low_temp}, high of ${element.max_temp} with ${element.weather.description}`);
        returnedWeather.push(obj);
        });
        res.status(200).send(returnedWeather.slice(0, 20));
        }).catch((err)=>{
            res.status(404).send('NO city Found with this lat and Lon');
        })
        
}

    
let getMoviesData = async  (url2,req,res)=>{
    const returnedMovies = [];
    await axios.get(url2).then((value)=>{
        for (let index = 0; index < Math.min(value.data.total_results||0,20); index++) {           
            let obj = new moviesClass(value.data.results[index]);
            returnedMovies.push(obj); 
        }
         res.status(200).send(returnedMovies); // if search not valid return Empty 
       
    }).catch((err)=>{
        res.status(404).send('Wrong in getting data');
    })
   
}



