// app.js
const express = require('express');
const app = express();
const config = require('./config');
var cors = require('cors')


app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/api/jokes', require('./routes/jokes'));
app.use('/api/othersites', require('./routes/sites'));
app.use('/api/otherjokes', require('./routes/otherjokes'));
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log('Listening on port ' + port + ' ...');

//deleteTests();

module.exports = app; // test
