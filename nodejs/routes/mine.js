var boot = require("../boot")

/* GET users listing. */

module.exports = (app) => {
    app.get('/mine', (req, res) => {
        let last_block = boot.blockchain.last_block();
        let last_proof = last_block['proof'];
        let proof = boot.blockchain.proof_of_work(last_proof);

        boot.blockchain.new_transaction("0",boot.node_identifier,1);

        let previous_hash = boot.blockchain.hash(last_block);
        let block = boot.blockchain.new_block(proof, previous_hash);

        let response = {
            'message': "New Block Forged",
            'index': block['index'],
            'transactions': block['transactions'],
            'proof': block['proof'],
            'previous_hash': block['previous_hash']
        }

        res.status(200).json(response);
    });
}
