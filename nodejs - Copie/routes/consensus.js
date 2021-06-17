var boot = require("../boot")

module.exports = (app) => {
    app.get('/consensus', (req, res) => {
        let replaced = boot.blockchain.resolve_conflicts();
        let response;
        if(replaced) {
            response = {
                'message': 'Our chain was replaced',
                'new_chain': boot.blockchain.chain
            }
        }
        else {
            response = {
                'message': 'Our chain is authoritative',
                'chain': boot.blockchain.chain
            }
        }
        res.status(200).json(response);
    });
}
