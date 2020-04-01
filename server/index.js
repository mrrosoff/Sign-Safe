const fs = require('fs');

const http = require('http');
const https = require('https');
const logger = require('morgan');
const express = require('express');

const app = express();
let credentials, httpsServer;
let secure = false;

try {
	const privateKey = fs.readFileSync('privkey.pem', 'utf8');
	const certificate = fs.readFileSync('cert.pem', 'utf8');
	const ca = fs.readFileSync('chain.pem', 'utf8');
	credentials = { key: privateKey, cert: certificate, ca: ca };
	secure = true;
}
catch(e) {}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = http.createServer(app);
if (secure) { httpsServer = https.createServer(credentials, app); }

app.use((req, res, next) => {
	if (!req.secure && secure) {
		console.log('Redirecting Insecure Request');
		res.redirect('https://' + req.headers.host + req.url);
	} else {
		next();
	}
});

app.use(express.static('dist'));

// Create API URLs Here

app.post('/api/', (req, res) => console.log(req.body.body));

httpServer.listen(8080, () => console.log('HTTP Server Running on Port 8080'));
if (secure) { httpsServer.listen(8443, () => console.log('HTTPS Server Running on Port 8443')); }
