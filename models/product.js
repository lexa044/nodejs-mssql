var Product = function(data){
  this.id = data["Id"].value;
  this.name = data["Name"].value;
  this.description = data["Description"].value;
};

module.exports = Product;