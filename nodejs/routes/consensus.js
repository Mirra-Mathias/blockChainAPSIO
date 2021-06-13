var express = require('express');
var router = express.Router();
var app = require("../boot")

/* GET users listing. */
router.get('/', function(req, res, next) {
    let replaced = app.blockchain.resolve_conflicts();
    let response;
    if(replaced) {
        response = {
            'message': 'Our chain was replaced',
            'new_chain': app.blockchain.chain
        }
    }
    else {
        response = {
            'message': 'Our chain is authoritative',
            'chain': app.blockchain.chain
        }
    }
    res.status(200).json(response);
});

module.exports = router;
