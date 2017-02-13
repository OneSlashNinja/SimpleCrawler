var request = require('request'),
    path = require('path'),
    cheerio = require('cheerio'),
    fs = require('fs');

var targetUrl = "http://mt.91.com/meinv/relaxiezhen/";
var finalUrls = [];

request(targetUrl, function(error, response, body){
    if(!error && response.statusCode == 200){
        var $ = cheerio.load(body);

        var targets = $('img','.yb_d > ul > li > a').parent();

        console.log(targets[0].attribs.href);

        //topLevel list
        var collectionUrlList = [];

        for(var i = 0; i < targets.length; i++){
            //collectionUrlList.push(targets[i].attribs.href);

            request(targets[i].attribs.href, getFinalImgUrls);
        }

        // downloadPics(imageUrls);
    }
});

var getFinalImgUrls = function(error, response, body){
    if(!error && response.statusCode == 200){
        var $ = cheerio.load(body);

        var targets = $('img', '.kq > a');

        finalUrls.push(targets[0].attribs.src);

        //console.log(targets[0].attribs.src);
        downloadPic(targets[0].attribs.src);
    }
}

var downloadPic = function(imageUrl){
    var filename = path.basename(imageUrl);
    request(imageUrl).pipe(fs.createWriteStream('./downloads/' + filename));
}

var downloadPics = function(imageUrls){
    for(var i = 0; i < imageUrls.length; i++){
        downloadPic(imageUrls[i]);
    }
}