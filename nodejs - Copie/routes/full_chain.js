var boot = require("../boot")

module.exports = (app) => {
    app.get('/chaine', (req, res) => {
        let response = {'chain': boot.blockchain.chain,'length' : boot.blockchain.chain.length}
        res.status(200).json(response);
    });
}
