var express = require('express');
var router = express.Router();
var app = require("../boot")

/* GET users listing. */
router.get('/', function(req, res, next) {

    let last_block = app.blockchain.last_block();
    let last_proof = last_block['proof'];
    let proof = app.blockchain.proof_of_work(last_proof);

    app.blockchain.new_transaction("0",app.node_identifier,1);

    let previous_hash = app.blockchain.hash(last_block);
    let block = app.blockchain.new_block(proof, previous_hash);

    let response = {
        'message': "New Block Forged",
        'index': block['index'],
        'transactions': block['transactions'],
        'proof': block['proof'],
        'previous_hash': block['previous_hash']
    }

    res.status(200).json(response);
});

module.exports = router;
