/*! 

 *By @JorgensNic on twitter
 *fb.com/Jorgens.ni
 *Linkendin.com/j_Rodriguez
 *Version Code: 0.0.1

 */

var http = require('http');
var fs = require('fs');
var contador = 0;

var server = http.createServer(function(req, res){
	fs.readFile('./index.html',function(error, data){
		res.writeHead(200,{ 'Content-Type': 'text/html'});
		res.end(data,'utf-8');
	});
}).listen(3000,"127.0.0.1");
console.log('Servidor Funcionando en http://127.0.0.1:3000/');

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	contador++;
	console.log('*-> Usuario Conectado, ' + contador +' Usuario(s) ahora.');
	socket.emit('users', {number: contador});
	socket.broadcast.emit('users', {number:contador});
	socket.on('disconnect', function(){
		contador--;
		console.log('*-> Usuario Desconectado, ' + contador +' Usuario(s) ahora.');
		socket.broadcast.emit('users', {number: contador});
	});
});
