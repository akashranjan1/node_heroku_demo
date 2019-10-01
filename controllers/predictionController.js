const moment = require('moment');
const { predictionModel } = require('./../model/prediction-model');

exports.send_prediction = function (req, res, next) {
    let predictions = new predictionModel({
        productid: req.body.productid,
        productname: req.body.productname,
        predictedquantity: req.body.predictedquantity
    });
    let d = new Date();
    let todaysDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);

    return new Promise((resolve, reject) => {
        predictions.save().then(data => {
            if (data) {
                predictionModel.find({ timestamp: { $gt: todaysDate } }).then(docs => {
                    return resolve(res.status(200).send(docs));
                });
            }
        }).catch(err => {
            return reject(res.status(400).send(err));
        })
    })
}

exports.get_all_predictions = function (req, res, next) {
    predictionModel.find().then(docs => {
        res.status(200).send(docs);
    }).catch(err => {
        res.status(400).send(err);
    })
}