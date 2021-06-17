var boot = require("../boot")

module.exports = (app) => {
    app.post('/connexion', (req, res) => {

        let uuid = req.body.uuid;
        for (let block of boot.blockchain.chain) {
            for (let transaction of block.transactions) {
                if (transaction.recipient === uuid) {
                    res.status(200).json({'message' : 'connexion reussi','uuid': uuid});
                    return
                }

            }
        }

        res.status(400).json({'message' : 'erreur clé'});
    });
}
