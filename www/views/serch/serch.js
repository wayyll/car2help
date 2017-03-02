angular.module("myapp").controller("serchCtrl",function($scope,$stateParams,$http,shopcart,$state,$ionicViewSwitcher,$rootScope){

    //添加进购物车
   
   $scope.toDetailserch = function(product){
	   
	   console.log(product.sku_id)
            $state.go("tabs.searchdetail",{sku_id:product.sku_id});
            // 将go有动画效果
            $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
        };
  		
  		
				$scope.proitem=[];
				var url = $rootScope.localhost+"index.php?m=goods&c=api&a=search&keyword=";
				$http.get(url + $rootScope.aa).success(function(data) {
					console.log(data)
						if(data.error==1){
							$scope.productserch=true
						}
						//console.log(data)
						
					$scope.data = data.data.goods
//					angular.forEach($scope.data,function(item1){
//						$scope.item=item1
					
					})
		

	
})