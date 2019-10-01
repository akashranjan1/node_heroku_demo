const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://faasos123:faasos123@ds121753.mlab.com:21753/heroku_jt6ng3gz');

module.exports = { mongoose };

//'mongodb://faasos123:faasos123@ds121753.mlab.com:21753/heroku_jt6ng3gz'
//process.env.MONGODB_URI || 'mongodb://localhost:27017/FaasosDB')