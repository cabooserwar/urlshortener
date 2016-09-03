var config = require('nconf');
//priority order
//1. specific overrides 
config.overrides({
  'always': 'be this value'
});

//2. process.argv
//3. process.env
//config.argv().env();

//4 values in config json

var CUSTOM_ENV = config.get('CUSTOM_ENV');
//get the config file for whatever custom env you feel like setting up.
//we could have an overriding alex.json and randy.json to override development.json if needed.


var NODE_ENV = config.get('NODE_ENV');

if(NODE_ENV === 'production') {
  config.file('production', 
    {file: 'config/production.json'});
}
else if(NODE_ENV === 'development') {
  config.file('development', 
    {file: 'config/development.json'});
}
else {
  config.file('development', 
    {file: 'config/development.json'});
}


//5. default values
config.defaults({
  'if nothing else': 'use this value',
});


module.exports = config;