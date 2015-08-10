var ConnectionPool = require('tedious-connection-pool');
var Connection = require('tedious').Connection;
var config = require('../config/db')();

var pool = new ConnectionPool(config.poolConfig, config.connectionConfig);
var connector = {
	executeRequest: function(request){
		pool.acquire(function(err, connection){
			if(!err){
				request.__connection = connection;
				connection.execSql(request);
			}else{
			  	console.log('An error has ocurred while connecting to SQL Server. %s',err);
				request.callback(err);				
			}
		});
	},
	callProcedure: function(request){
		pool.acquire(function(err, connection){
			if(!err){
				request.__connection = connection;
				connection.callProcedure(request);
			}else{
			  	console.log('An error has ocurred while connecting to SQL Server. %s',err);
				request.callback(err);				
			}
		});
	},
	closeConnection: function(connection){
		connection.release();
	}
};

process.once('SIGINT',function() { 
	console.log('Closing SQL connections.');
	pool.drain();
});
module.exports = connector;