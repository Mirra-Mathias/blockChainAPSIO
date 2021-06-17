var boot = require("../boot")

module.exports = (app) => {
    app.post('/syncChain', (req, res) => {
        console.log(req.body);
       boot.blockchain._chain = req.body.chain;
        boot.blockchain._current_transactions = req.body.current_transactions;
        res.status(200).json('ok')
    });
}
