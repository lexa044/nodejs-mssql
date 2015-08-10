# nodejs-mssql

This project demonstrates how to use tedious to talk to a Microsoft SQL Server.

Scripts are provided in order to create table as well as stored procedures. See repository/scripts-Schema.sql

In order to change connection strings as well as connection pool, please see config/db.js
```javascript
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
				useColumnNames: true // Lookup by column name instead of index
			}  
		}
  };
}
```
The addition of repository/tediousconnector.js which wraps functionality to interact with tedious and make calls 
to the SQL Server, allows for re-using.
```javascript
var dbConnector = require('../repository/tediousconnector');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var Product = require('../models/product');

function getAllProduct(req, res) {
	var products = [];
	var request = new Request("dbo.API_GetAllProducts", function(err, rowCount) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    } else {
      res.json(products);
      dbConnector.closeConnection(request.__connection);
    }
  });

  request.on('row', function(columns) {
    products.push(new Product(columns));
  });

  dbConnector.callProcedure(request);
};
```

Notice how by setting Tedious to useColumnNames reading a row makes it easy to map it to an Object (Product in this Case)
```javascript
products.push(new Product(columns));
```

See the object mapping: models/products.js
```javascript
var Product = function(data){
  this.id = data["Id"].value;
  this.name = data["Name"].value;
  this.description = data["Description"].value;
};

module.exports = Product;
```

## Usage / Instructions
1. Download / fork the project
2. Go to the root of project
3. Run following command: npm install ( This will pull down /install all needed modules )
4. Run following command: node server.js
5. Start your SQL Instance if needed.
6. Run repository/scripts-Schema.sql against your SQL Instance
7. Run repository/scripts.sql against your SQL Instance
8. Edit config/db.js file. Make sure you set the instance name and credentials accordingly.
9. Go to http://localhost:5555/

## Notes - This has been tested:
1. Running Node on Windows 10 and connecting to SQL Server 2014 running on Windows
2. Running Node on Yosemite and connecting to SQL Server 2014 running on Windows
3. Running Node on Ubuntu Server 14.04 and connecting to SQL Server 2014 running on Windows
