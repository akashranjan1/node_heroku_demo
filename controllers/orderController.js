const _ = require('lodash');
const { orderModel } = require('./../model/order-model');
const { predictionModel } = require('./../model/prediction-model');
const { mongoose } = require('./../db-connection/mongoose-connection');
const bodyParser = require('body-parser');

exports.place_order = function (req, res, next) {
    let order = new orderModel({
        productid: req.body.productid,
        productname: req.body.productname,
        quantity: req.body.quantity,
        status: false
    });
    return new Promise((resolve, reject) => {
        order.save().then((data) => {
            if (data) {
                orderModel.find({}, null, { sort: { timestamp: -1 } }).then(allData => {
                    return resolve(res.status(201).send(allData));
                });
            } else {
                return reject(res.status(201).send(data));
            }
        }).catch(err => {
            return reject(res.status(400).send(err));
        })
    })
}

exports.update_order_status = function (req, res, next) {
    let id = req.params.id;
    let body = _.pick(req.body, ['status']);
    body.completedAt = new Date();
    return new Promise((resolve, reject) => {
        orderModel.findByIdAndUpdate(id, { $set: body }, { new: true }).then(data => {
            orderModel.find({}, null, { sort: { timestamp: -1 } }).then(allData => {
                return resolve(res.status(202).send(allData));
            })
        }).catch(err => {
            return reject(res.status(400).send(err));
        })
    })
}

exports.get_all_orders = function (req, res, next) {
    return new Promise((resolve, reject) => {
        orderModel.find({}, null, { sort: { timestamp: -1 } }).then(docs => {
            return resolve(res.status(200).send(docs));
        }).catch(err => {
            return reject(res.status(400).send(err));
        })
    })
}

exports.get_all_data_prediction_order = function (req, res, next) {
    let allData = [];
    return new Promise((resolve, reject) => {
        orderModel.find({}, null, { sort: { timestamp: -1 } }).then(docs => {
            allData.push(docs);
        }).then(() => {
            predictionModel.find().then(predDocs => {
                allData.push(predDocs);
                return resolve(res.status(200).send(allData));
            })
        }).catch(err => {
            return reject(err);
        })
    })
}
