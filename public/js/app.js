angular.module('nmtApp', ['ngSanitize'])
	.factory('productsService', ['$http', '$q', function ($http, $q, tfsSettings) {
		var serviceBase = '/api/v1/';
		var _getProducts = function () {
			return $http.get(serviceBase + 'products').then(function (results) {
				return results;
			});
		};
		
		var _save = function (product) {
			return $http.put(serviceBase + 'product/'+product.id, product).then(function (results) {
				return results;
			});
		};

		var service = {
			getAll: _getProducts,
			save: _save
		};
		
		return service;
	}])
.controller('AlertController', ['$scope', '$attrs', function ($scope, $attrs) {
  $scope.closeable = !!$attrs.close;
  this.close = $scope.close;
}])

.directive('alert', function () {
  return {
    restrict: 'A',
    controller: 'AlertController',
    controllerAs: 'alert',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'alert.html';
    },
    transclude: true,
    replace: true,
    scope: {
      type: '@',
      close: '&'
    }
  };
})

.directive('dismissOnTimeout', ['$timeout', function($timeout) {
  return {
    require: 'alert',
    link: function(scope, element, attrs, alertCtrl) {
		var timeOut = parseInt(attrs.dismissOnTimeout, 10);
		if(timeOut > 0){
	      $timeout(function(){ alertCtrl.close();}, timeOut);
		}
    }
  };
}])	
  .controller('NavController', function($scope, productsService) {
    $scope.products = [];
	$scope.currentProduct;
	
	$scope.isCurrentProduct = function(product){
		return $scope.currentProduct && $scope.currentProduct.id == product.id;
	};
	$scope.loadProducts = function(){
		$("html").addClass("loading");
		productsService.getAll().then(function (results) {
            $scope.products = results.data;
            if($scope.products){
            	$scope.edit($scope.products[0]);
            }
            $("html").removeClass("loading");
        }, function (error) {
        	$("html").removeClass("loading");
            alert('An error has occurred while contacting server.');
        });
	};
	
	$scope.edit = function(model){
		$scope.currentProduct = model;
	};

	$scope.save = function(model){
		$("html").addClass("loading");
		productsService.save(model).then(function (results) {
			$scope.alerts.push({msg: "Product saved successfully.", type: "success", timeout: 5000});
            $("html").removeClass("loading");
        }, function (error) {
        	$("html").removeClass("loading");
			$scope.alerts.push({msg: "<strong>Oh snap!</strong> An error has occurred while contacting server.", type: "danger", timeout: 0});
        });
	};

	/*Alerts*/
	$scope.alerts = [];	
	$scope.closeAlert = function(index){		
		$scope.alerts.splice(index, 1);
	}	
	//Load products
	$scope.loadProducts();
  });