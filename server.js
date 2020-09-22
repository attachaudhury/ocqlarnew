var http = require('http');
var app = require('./app')
app.set('port',8013);

const server = http.createServer(app)
console.log('listening on port 8013')
server.listen(8013)