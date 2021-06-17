var boot = require("../boot")

module.exports = (app) => {
    app.get('/register', (req, res) => {
        let values = req.body;
        if (!values.node){
            res.status(400).json('Error: Please supply a valid list of nodes');
            return;
        }

        boot.blockchain.register_node(values.node);

        let response = {'message': 'New nodes have been added',
            'total_nodes': boot.blockchain.nodes.toString()
        }
        res.status(200).json(response);
    });
}
