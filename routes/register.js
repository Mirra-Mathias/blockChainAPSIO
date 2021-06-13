var express = require('express');
var router = express.Router();
var app = require("../boot")

/* GET users listing. */
router.post('/', function(req, res, next) {
    let values = req.body;

    if (!values.nodes){
        res.status(400).json('Error: Please supply a valid list of nodes');
        return;
    }

    for(let node in values.nodes){
        app.blockchain.register_node(node);
    }

    let response = {'message': 'New nodes have been added',
        'total_nodes': app.blockchain.nodes.toString()
    }
    res.status(200).json(response);
});

module.exports = router;
