const crypto = require("crypto");
const urllib = require('urllib');
const requests = require("http");
const request = require('request');
class BlockChain {
    _chain;
    _current_transactions;
    _nodes;
    _selectnode;

    constructor() {
        this._chain = [];
        this._current_transactions = [];
        this._nodes = new Set();
        this._selectnode = 0;
        this.new_block(100, 1);
    }


    get chain() {
        return this._chain;
    }

    set chain(value) {
        this._chain = value;
    }

    get current_transactions() {
        return this._current_transactions;
    }

    set current_transactions(value) {
        this._current_transactions = value;
    }

    get nodes() {
        return this._nodes;
    }

    set nodes(value) {
        this._nodes = value;
    }

    mine() {
        if(this._nodes.length > 0){
            if(this._selectnode > this._nodes.length){
                this._selectnode = 0;
            }else{
                request(this._nodes[this._selectnode]+'mine', function (error, response, body) {
                    let replaced = this.resolve_conflicts()

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

                    console.log(response);
                });
                this._selectnode +=1;
            }
        }
        else{
            request('http://localhost:8089/mine', function (error, response, body) {
                console.error('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            });
        }
    }

    sync_chain(chain) {
        this._chain = chain;
    }

    new_block(proof, previous_hash = null) {

        // Créer un nouveau bloc dans la blockchain
        // :param proof : <int> La preuve donnée par l'algorithme Proof of Work
        // :param previous_hash : (Facultatif) <str>Hash du bloc précédent
        // :return : <dict> Nouveau bloc

        let block = {
            'index': this._chain.length + 1,
            'timestamp': Date.now(),
            'transactions': this._current_transactions,
            'proof': proof,
            'previous_hash': previous_hash || this._chain[this._chain.length - 1].hash,
        };


        this._current_transactions = [];
        this._chain.push(block);
        return block;
    }

    new_transaction(sender, recipient, amount) {

        // Crée une nouvelle transaction pour le prochain bloc.
        // :param sender : <str>Adresse de l'expéditeur
        // :param recipient : <str> Adresse du destinataire
        // :param amount : <int> Montant
        // :return : <int> L'indice du bloc qui contiendra cette transaction.

        this._current_transactions.push({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        });
        return this.last_block()['index'] + 1;
    }

    last_block() {
        return this._chain[this._chain.length - 1];
    }

    hash(block) {
        // Crée un hachage SHA-256 d'un bloc
        // :param block : <dict> Bloc
        // :return : <str>
        let block_string = Buffer.from(JSON.stringify({block, sort_keys: true}), 'hex');
        return crypto.createHash("sha256").update(block_string).digest("hex");
    }

    proof_of_work(last_proof) {
        // Algorithme Proof of Work:
        //  - Trouver un nombre p' tel que hash(pp') contient 4 zéros de tête, où p est le p' précédent.
        // - p est la preuve précédente, et p' est la nouvelle preuve.
        // :param last_proof : <int>
        // :return : <int>

        let proof = 0;
        while (this.valid_proof(last_proof, proof) === false) {
            proof += 1
        }
        ;

        return proof;
    }

    valid_proof(last_proof, proof) {
        // Valide la preuve : Est-ce que hash(last_proof, proof) contient 4 zéros de tête ?
        // :param last_proof : <int> Preuve précédente
        // :param proof : <int> Preuve actuelle
        // :return : <bool>Vrai si correct, Faux si non.

        let guess = Buffer.from(`${last_proof}${proof}`, 'hex');
        let guess_hash = crypto.createHash("sha256").update(guess).digest("hex")
        return guess_hash.slice(0, 4) === "0000"
    };

    register_node(address) {
        // Ajoute un nouveau nœud à la liste des nœuds
        // :param address : <str> Adresse du noeud. Par exemple, 'http://192.168.0.5:5000'
        // :return : Aucun

        this._nodes.add(address.toString())
    }

    valid_chain(chain) {
        let last_block = chain[0];
        let current_index = 1;

        while (current_index < chain.length) {
            let block = chain[current_index]
            console.log(`${last_block}`);
            console.log(`${block}`);
            console.log("\n-----------\n");
            // Vérifier que le hachage du bloc est correct
            if (block['previous_hash'] != this.hash(last_block)) {
                return false;
            }
            if (!this.valid_proof(last_block['proof'], block['proof'])) {
                return false;
            }

            last_block = block;
            current_index += 1;
        }

        return true;
    }

    resolve_conflicts() {
        let neighbours = this._nodes;
        let new_chain = null;

        let max_length = this._chain.length;

        for (let node in neighbours) {
            requests.get(`http://${node}/chain`, (resp) => {
                if (resp.statusCode === 200) {
                    let length = resp['length'];
                    let chain = resp['_chain'];

                    if(length > max_length && this.valid_chain(chain)){
                        max_length = length;
                        new_chain = chain;
                    }
                }
            });
        }
        // Remplacer notre chaîne si nous avons découvert une nouvelle chaîne valide plus longue que la nôtre.
        if (new_chain) {
            this._chain = new_chain;
            return true;
        }

        return false;


    }
}

    module.exports = BlockChain;
