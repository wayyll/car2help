angular.module("myapp").controller("productCtrl", function ($scope, $stateParams, $http, shopcart, $state, $ionicViewSwitcher, $rootScope) {
	$scope.selectedCategory="全部分类"
	$scope.orders="默认排序"
	$http.get($rootScope.localhost + "index.php?m=goods&c=api&a=goods_list").success(function (data) {

		$scope.tempdata = data.data.lists;

		$rootScope.productdata = $scope.tempdata
			//console.log(good)

	});
	//分类
	$scope.fenlei=function(aaa){
		$http.get($rootScope.localhost + "index.php?m=goods&c=api&a=goods_list&catid="+aaa).success(function(data){
			$scope.tempdata= data.data.lists
		})
	}
	//排序
	$scope.paixu=function(bbb,aaa){
		$http.get($rootScope.localhost + "index.php?m=goods&c=api&a=goods_list&order="+bbb+"&catid="+aaa).success(function(data){
			$scope.tempdata= data.data.lists
			
		})
	}
	$http.get($rootScope.localhost + "index.php?m=goods&c=api&a=category").success(function (data) {
		
		$scope.categorys=[]
		angular.forEach(data.data,function(item){
			$scope.categorys.push(item)
		})
		
	})
	$scope.addCart = function (product) {
		shopcart.add(product)
	};
	$scope.toproDetail = function (product) {
		$state.go("tabs.cartdetail", {
			sku_id: product.sku_id
		});

		// 将go有动画效果
		$ionicViewSwitcher.nextDirection("forward");
		// "forward","back"
	};

	$scope.toproductserch = function (data) {
		$state.go("tabs.productserch")
		$ionicViewSwitcher.nextDirection("forward");
		$rootScope.aa = "";
		$rootScope.aa = data
	}

	//添加进购物车
	$scope.addCart = function (product) {
		shopcart.add(product)
	}
})
