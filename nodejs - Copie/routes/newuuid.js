const { v4: uuidv4 } = require('uuid');
var boot = require("../boot")

module.exports = (app) => {
    app.get('/generateuuid', (req, res) => {
        const identifier = uuidv4().toString().replace('-', '');
        boot.blockchain.new_transaction(0, identifier, 100)
        boot.blockchain.mine()
        res.status(200).json(identifier);
    });
}
