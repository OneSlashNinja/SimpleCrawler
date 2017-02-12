var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');

request('https://www.pexels.com/search/HD%20wallpaper/', function(error, response, body){
    if(!error && response.statusCode == 200){
        var $ = cheerio.load(body);

        var targets = $('img','.photo-item');

        var imageUrls = [];

        for(var i = 0; i < targets.length; i++){
            imageUrls.push(targets[i].attribs.src);
            //console.log(targets[0].attribs.src);
        }

        //console.log(imageUrls);
        for(var i = 0; i < imageUrls.length; i++){
            request(imageUrls[i]).pipe(fs.createWriteStream('./downloads/Wallpaper'+ i + '.jpg'));
        }
    }
});

// var downloadPics = function(imageUrlList){
    
// }

//request('https://unsplash.com/collections/191435/glorious-food').pipe(fs.createWriteStream('./downloads/test.html'));