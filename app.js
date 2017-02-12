var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');

request('https://unsplash.com/search/food', function(error, response, body){
    if(!error && response.statusCode == 200){
        var $ = cheerio.load(body);
        console.log(body);
        console.log($);
    }
});