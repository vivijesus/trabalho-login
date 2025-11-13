const http = require('http');
const app = require('./app');
// Definindo a porta em que o servidor irá escutar
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);