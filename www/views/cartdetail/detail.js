angular.module("myapp").controller("detailCtrl", function ($scope, $stateParams,$http,shopcart,$state,$rootScope,$ionicViewSwitcher, $ionicPopup) {
	$stateParams.sku_id
	angular.forEach( $rootScope.productdata,function(data){
		if(data.sku_id==$stateParams.sku_id){
			$scope.item=data
			console.log($scope.item)
		}
	})
})