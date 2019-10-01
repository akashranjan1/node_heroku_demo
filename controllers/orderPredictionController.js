const { orderPredictionModel } = require('./../model/order-prediction-model');
const _ = require('lodash');

exports.get_all_orders_predictions = function (req, res, next) {
    orderPredictionModel.find({}, null, { sort: { 'orders.timestamp': -1 } }).then(docs => {
        res.status(200).send(docs);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.update_orders_status = function (req, res, next) {
    //let id = req.params.id;
    let orderId = req.params.orderid;
    let body = _.pick(req.body, ['status']);
    return new Promise((resolve, reject) => {
        orderPredictionModel.findOneAndUpdate(
            { 'orders._id': orderId },
            { $set: { 'orders.$.status': true, 'orders.$.completedat': new Date() } }
        ).then(docs => {
            orderPredictionModel.find().then(alldetails => {
                res.status(200).send(alldetails);
            })
        }).catch(err => {
            res.status(400).send(err)
        })
    })
}


exports.make_predictions = function (req, res, next) {
    //let id = req.params.id;
    let predictionId = req.params.predictionid;
    let body = _.pick(req.body, ['prediction']);
    return new Promise((resolve, reject) => {
        orderPredictionModel.findOneAndUpdate(
            { 'prediction._id': predictionId },
            { $set: { "prediction.$.predictedquantity": body.prediction.predictedquantity } }
        ).then(docs => {
            orderPredictionModel.find().then(alldetails => {
                res.status(200).send(alldetails);
            })
            //res.status(200).send(docs)
        }).catch(err => {
            res.status(400).send(err);
        })
    })
}

exports.place_orders = function (req, res, next) {
    let id = req.params.id;
    let body = _.pick(req.body, ['order']);
    return new Promise((resolve, reject) => {
        orderPredictionModel.findByIdAndUpdate(
            id,
            { $push: { "orders": body.order } },
            { safe: true, upsert: true }
        ).then(docs => {
            orderPredictionModel.find().then(alldetails => {
                res.status(200).send(alldetails);
            })
        }).catch(err => {
            res.status(400).send(err);
        })
    })
}

// exports.get_all_orders = function(req, res, next) {
//     let id = req.params.id;
// }

exports.add_new_product = function (req, res, next) {

    let newProduct = new orderPredictionModel({
        productid: req.body.productid,
        productname: req.body.productname,
        prediction: req.body.prediction,
        orders : req.body.orders
    });
    let d = new Date();
    let todaysDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);

    return new Promise((resolve, reject) => {
        newProduct.save().then(doc => {
            res.status(201).send(doc)
        }).catch(err => {
            res.status(400).send(err);
        })
    })
}

// {'$set': {
//     'comments.$.post': "this is Update comment",
// }},

// Article.findByIdAndUpdate(
//     article_id,
//     { $push: {"comments": req.body}},
//     {  safe: true, upsert: true},
//       function(err, model) {
//         if(err){
//            console.log(err);
//            return res.send(err);
//         }
//          return res.json(model);
//      });

// let id = req.params.id;
//     let body = _.pick(req.body, ['status']);
//     body.completedAt = new Date();
//     return new Promise((resolve, reject) => {
//         orderModel.findByIdAndUpdate(id, { $set: body }, { new: true }).then(data => {
//             orderModel.find({}, null, { sort: { timestamp: -1 } }).then(allData => {
//                 return resolve(res.status(202).send(allData));
//             })
//         }).catch(err => {
//             return reject(res.status(400).send(err));
//         })
//     })

// exports.place_order = function (req, res, next) {

// }