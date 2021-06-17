const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

// view engine setup
const port = 8090
const varsys = "http://localhost:4200"
exports.varsys = varsys;

app.listen(port)

app
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(cors())


require('./routes/mine')(app);
require('./routes/new_transaction')(app);
require('./routes/full_chain')(app);
require('./routes/register')(app);
require('./routes/consensus')(app);
require('./routes/newuuid')(app);
require('./routes/solde')(app);
require('./routes/connexion')(app);
require('./routes/sync_chain')(app);


app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandée ! vous pouvez essayer une autre url'

  res.status(404).json
});


console.log(`Démarrage de l'application nodejs `)
