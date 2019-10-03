const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://akashranjan:akashranjan123@ds229118.mlab.com:29118/nodejsherokudemo');
//mongodb://<dbuser>:<dbpassword>@ds229118.mlab.com:29118/nodejsherokudemo
//mongoose.connect('mongodb://localhost:27017/NODE_DEMO_DB');

module.exports = { mongoose };
