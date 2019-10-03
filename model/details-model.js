const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserDetailsSchema = new Schema({
    username : {
        type: String,
        trim: true
    },
    firstname : {
        type: String,
        trim : true
    },
    lastname : {
        type: String,
        trim : true
    },
    phone : {
        type: String,
        trim : true
    },
    dob : {
        type: Date
    }
});


const UserDetailsModel = mongoose.model('USER_DETAILS', UserDetailsSchema, 'USER_DETAILS');

module.exports = { UserDetailsModel };