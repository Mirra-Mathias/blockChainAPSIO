var boot = require("../boot")

module.exports = (app) => {
    app.get('/transactions/new', (req, res) => {
        let values = req.body;
        let index = boot.blockchain.new_transaction(values.sender, values.recipient, 100)
        boot.blockchain.mine()
        let response = {'message': `Transaction will be added to Block ${index}`}
        res.status(200).json(response);
    });
}
