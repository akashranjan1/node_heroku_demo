const { UserDetailsModel } = require('./../model/details-model');

exports.ENTER_USER_DETAILS = async (req, res) => {
    try {
        let userDetails = new UserDetailsModel({
            email : req.body.email,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            phone : req.body.phone,
            dob:req.body.dob
        })
        let userDetailsDoc = await userDetails.save();
        if(!userDetailsDoc) {throw new Error('Could not be saved')}
        res.status(201).send(userDetailsDoc)
    }
    catch(e) {
        return res.status(401).send(e)
    }

}