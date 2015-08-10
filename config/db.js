module.exports = function() {
  return {
		poolConfig: {
			min: 0,
			max: 20,
			log: false,
			idleTimeout: 30000
		},
		connectionConfig:{
			userName: 'nodejs',
			password: '4_}k-%L>89uEw]@%Dbb-',
			server: 'localhost', 
			options: {
				database: 'demoDB', 
				//instanceName: 'SQLEXPRESS',
				useColumnNames: true
			}  
		}
  };
}