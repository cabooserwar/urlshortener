
var pg = require('pg');
var config     = require('./config/config');
// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var poolConfig = {
  user: config.get('db_user'), //env var: PGUSER
  database: config.get('db'), //env var: PGDATABASE
  password: config.get('db_password'), //env var: PGPASSWORD
  port: config.get('db_port'), //env var: PGPORT
  host: config.get('db_host'), //env var: PGHOST
  max: 25, // max number of clients in the pool
  min: 4, //set min pool size to 4
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};


//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
//var pool = new pg.Pool(poolConfig); //FIXME pooling doesn't work :(
var connectionString = 'postgres://' + config.get('db_user') + ':' + config.get('db_password') 
                        + '@' + config.get('db_host') + ':' + config.get('db_port') + '/' + config.get('db');

module.exports = {
  query: function(text, values, cb) {
    //pool.connect(function(err, client, done) {
    pg.connect(connectionString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query(text, values, function(err, result) {
        if(err) {
          return console.error('error on client query', err);
        }
        done();
        if(typeof cb === 'function') {
          cb(err, result);
        }
      })
    });
  }
}