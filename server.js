var http = require('http');
var app = require('./app')
app.set('port',8011);

const server = http.createServer(app)
console.log('listening on port 8011')
server.listen(8011)