"use strict";

require('dotenv').config();

const returnedMovies = [];

const KEY = process.env.MOVIE_API_KEY || `55325b5628dbe9dd987f442fdc49f072` ;

const MovieURL = process.env.MOVIES_API_URL || `https://api.themoviedb.org/3/search/movie?` ;

const axios = require('axios');


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


async function handlemovies(req, res){

let querya = req.query.query;

let url2 =`${MovieURL}api_key=${KEY}&query=${querya}`;
let url= `https://api.themoviedb.org/3/search/movie?api_key=55325b5628dbe9dd987f442fdc49f072&query=amman`;
// Make a request for a user with a given ID

await axios.get(url2).then((value)=>{
    for (let index = 0; index < Math.min(value.data.total_results||0,20); index++) {           
        let obj = new moviesClass(value.data.results[index]);
        returnedMovies.push(obj); 
    }
     res.status(200).send(returnedMovies); // if search not valid return Empty 
   
}).catch((err)=>{
    res.status(404).send('Wrong in getting data');
})
};


module.exports = handlemovies;

