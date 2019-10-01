var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

const DETAILS_CONTROLLER = require('./../controllers/details-controller');

router.post('/userDetails', DETAILS_CONTROLLER.ENTER_USER_DETAILS);

module.exports = router;
