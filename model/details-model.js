const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserDetailsSchema = new Schema({
    username : {
        type: String,
        trim: true
    },
    firstName : {
        type: String,
        trim : true
    }
});


const UserDetailsModel = mongoose.model('USER_DETAILS', UserDetailsSchema, 'USER_DETAILS');

module.exports = { UserDetailsModel };