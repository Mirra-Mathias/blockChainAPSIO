var express = require('express');
var router = express.Router();
var app = require("../boot")

/* GET users listing. */
router.get('/', function(req, res, next) {


    let response = {'chain': app.blockchain.chain,'length' : app.blockchain.chain.length}
    res.status(200).json(response);
});

module.exports = router;
