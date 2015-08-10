var express = require('express');
var router = express.Router();

var products = require('../controllers/products');

router.get('/api/v1/products', products.getAll);
router.put('/api/v1/product/:id', products.save);

 module.exports = router;