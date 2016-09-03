//require and instantiate express
var express = require ('express');
var app = express();

var path = require('path');
var config = require ('./config/config');
var base_endecoder = require('./base_endecoder');
var url = require('./models/url');

var port = process.env.PORT || config.get('port');     
var bodyParser = require('body-parser');


// tell Express to serve files from our public folder
app.use(express.static(path.join(__dirname, 'public')));

//route to serve up the homepage index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});



// handles JSON bodies
app.use(bodyParser.json());
// handles URL encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//route to create shortened url given long url 
app.post('/api/shorten', function(req, res) {
  var longUrl = req.body.url;
  var shortUrl = ''; // the shortened URL we will return

  //try to find if a shortURL already exists for this URL
  url.findShortURL(longUrl, function(err, result) {
    if (err) {
      console.log(err);
    }
    //if this URL is already in our database
    if (result.rows.length) {
      shortUrl = config.get('nodeServer') + '/' + base_endecoder.encode(result.rows[0].url_id);
      res.send({'shortUrl': shortUrl});
    } else {
      var newUrl = new url();
      newUrl.long_url = longUrl;

      newUrl.save(function(err, result) {
        if (err) {
          console.log(err);
        }

        shortUrl = config.get('nodeServer') + '/' + base_endecoder.encode(result.rows[0].url_id);
        res.send({'shortUrl': shortUrl});
      });
    }
  });

});


//route to redirect user to long url given short url
app.get('/:encoded_id', function(req, res) {

});

var server = app.listen(port, function() {
  console.log("server is listening on port " + port);
});



