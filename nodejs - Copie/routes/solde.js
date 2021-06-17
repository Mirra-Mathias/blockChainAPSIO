var boot = require("../boot")

module.exports = (app) => {
    app.get('/solde', (req, res) => {

        let uuid = req.body.uuid;
        let coins = 0;
        for (let block of boot.blockchain.chain) {
            for (let transaction of block.transactions) {
                if (transaction.recipient === uuid) {
                    console.log(transaction.recipient);
                    coins += transaction.amount;
                }
                if (transaction.sender === uuid) {
                    coins -= transaction.amount;
                }
            }
        }

        res.status(200).json({coins});
    });
}
