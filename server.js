"use strict";

require('dotenv').config();

const myJson = require('./data/weather.json');

const cors = require("cors");

const PORT = process.env.PORT ||3001;

const counter = 0;

const  getWeatherData = require('./modules/weather');


const  handlemovies = require('./modules/movies');

const getDogs = require('./modules/dog');

const KEY = process.env.MOVIE_API_KEY || `55325b5628dbe9dd987f442fdc49f072` ;

const MovieURL = process.env.MOVIES_API_URL || `https://api.themoviedb.org/3/search/movie?` ;

const axios = require('axios');

const express = require('express');


const app = express();

const returnedMovies = [];
app.use(cors());

app.get('/', (req, res) => {

  res.send('Hi');

});

app.get('/weather', getWeatherData)

app.get('/movies', handlemovies);

app.get('/dog', getDogs);

app.get('*', (req, res) => {

    res.status(406).send('Not Found');
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is listening  now ...', PORT);
})


    


