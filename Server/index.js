const express = require('express');
const serverless = require('serverless-http');

const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


function updateDatabase(data) {
	return newValue;
}

app.post('/api/', (req, res) => console.log(req.body.body));

module.exports.handler = serverless(app);
