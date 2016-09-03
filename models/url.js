var db = require('../db');


function url(){

  this.u_id = 0;
  this.long_url = "";
  this.date = "";


}

url.prototype.save = function(callback) {
  
  db.query("INSERT INTO urls(long_url, created_at) values ($1, LOCALTIMESTAMP) RETURNING url_id", [this.long_url], function(err, result){

    callback(err, result);

  });

  
};


url.findShortURL = function(long_url, callback) {
  db.query("SELECT * FROM urls WHERE (long_url = $1)", [long_url], function(err, result) {
    callback(err, result);
  });
}

url.findLongURL = function(id, callback) {
  db.query("SELECT long_url FROM urls WHERE (url_id = $1)", [id], function(err, result){
    callback(err, result);
  })
}



module.exports = url;