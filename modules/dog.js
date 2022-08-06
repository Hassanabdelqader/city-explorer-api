'use strict';

const axios = require('axios');


class Dogs{
    constructor(url){
        this.url = url;
    }
}

async function getDogs(req,res) {
    const dogArray = [];
    let url = `https://dog.ceo/api/breeds/image/random`;
    
    for (let index = 0; index < 4; index++) {
         await axios.get(url).then((value) => {
            let obj = new Dogs(value.data.message);
            dogArray.push(obj);
    });
}
        
   res.status(200).send(dogArray);
   


}

module.exports = getDogs
