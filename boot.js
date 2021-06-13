const { v4: uuidv4 } = require('uuid');

const Blockchain = require('./blockChain');
const blockchain = new Blockchain();
const node_identifier = uuidv4().toString().replace('-', '');

module.exports = {
    blockchain,
    node_identifier
};

