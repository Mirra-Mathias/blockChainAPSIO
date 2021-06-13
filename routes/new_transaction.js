var express = require('express');
var router = express.Router();
var app = require("../boot")

/* GET users listing. */
router.post('/', function(req, res, next) {
    let values = req.body;

    let index = app.blockchain.new_transaction(values.sender, values.recipient, values.amount)

    let response = {'message': `Transaction will be added to Block ${index}`}
    res.status(200).json(response);
});

module.exports = router;
