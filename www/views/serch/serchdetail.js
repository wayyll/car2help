angular.module("myapp").controller("serchdetailCtrl",function($scope,$http,$stateParams){
	$http.get("views/cart/cartjson/products.json").success(function(data){
		var dataid=$stateParams.id
		angular.forEach($scope.data,function(item){
			 if( dataid == item.id){
                    $scope.data= item;
					
                }
		})
	})
	
	
})
