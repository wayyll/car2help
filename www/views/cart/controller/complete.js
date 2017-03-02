angular.module("myapp").controller("completeCtrl", function ($scope, $stateParams, $http, shopcart, $state, $rootScope, $ionicViewSwitcher, $ionicPopup, $ionicModal, $rootScope, $ionicLoading, $timeout,$location) {
	var diquurl = $rootScope.localhost + "index.php?m=goods&c=api&a=address"
		$http.get(diquurl).success(function (data) {

			$scope.area = data.lv0[2].lv1;
		});
	//保存提示
	$scope.addressAlert = function (data) {
		$ionicPopup.alert({
			title: '提示',
			template: data
		}).then(function(res) {
			$ionicLoading.show()
			$timeout(function(){
				$ionicLoading.hide()
			},1000)
		})
	}

	//添加地址
	$scope.adddizhi = function (ddd) {

		$http.post($rootScope.localhost + "index.php?m=member&c=api_address&a=add", {
			district_id: ddd,
			address: $scope.addresstext,
			name: $scope.name,
			mobile: $scope.mobile,
			zipcode: $scope.zipcode,
			page: 1
		}).success(function (data) {
			
			$scope.addressAlert(data.data)
			$state.go("tabs.changeaddress")
			if (data.error == 0) {
				$scope.getaddress()
				$scope.addaddress = false;
				$scope.name = "";
				$scope.selectedProvince = ""
					$scope.city = "";
				$scope.qu = "";
				$scope.addresstext = "";
				$scope.mobile = "";
				$scope.zipcode = "";
			}

		})
	}
	

	//购物车提交
	$scope.getaddress = function () {
		$http.get($rootScope.localhost + "index.php?m=order&c=api_order&a=settlement&skuids=" + $rootScope.xzarr).success(function (data) {
			$scope.dizhi = []
			$scope.orderdata = data

				angular.forEach($scope.orderdata.address, function (item) {

					if (item.isdefault == 1) {
						$scope.item = item
						item.default = "默认地址"

					} else {
						item.default = "设为默认"

					}
					$scope.dizhi.push(item)
					console.log($scope.dizhi)
				})
		})
	}
	$scope.getaddress()

	$scope.addorder = function (item) {
		console.log($scope.num)
		$http.post($rootScope.localhost + "index.php?m=order&c=api_order&a=create", {
			skuids: $rootScope.xzarr,
			address_id: item.id,
			district_id: item.district_id,
			pay_type: $scope.num
		}).success(function (data) {
			$scope.ordersn = data.order_sn
				$state.go("tabs.pay", {
					order_sn: $scope.ordersn
				})

				$http.get($rootScope.localhost + "index.php?m=order&c=api_order&a=detail&order_sn=" + $scope.ordersn).success(function (data) {})
		})
	}
	//选择地址
	$scope.gochangeaddress = function () {
		$state.go("tabs.changeaddress")
	}
	$scope.defaultaddress = function (i) {
			$scope.item=i
		$http.get($rootScope.localhost + "index.php?m=member&c=api_address&a=set_default&id=" + i.id).success(function (data) {
			console.log(data)
			$ionicLoading.show()
			
			$scope.getaddress()
			$timeout(function () {
				$ionicLoading.hide()
			}, 1000)
		})
	}
	
	//删除地址
	 $scope.showConfirm = function(i) {
     var confirmPopup = $ionicPopup.confirm({
       title: '确认',
       template: '<p style="text-align:center">确定要删除这个收货地址吗</p>',
	   cancelText: '取消',
	   okText: '确定'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('删除');
		$scope.deleteaddress(i)
       } else {
         console.log('不删除');
       }
     });
   };
	$scope.deleteaddress=function(i){
		 $http.get($rootScope.localhost+"index.php?m=member&c=api_address&a=delete&id="+i.id).success(function(data){
			$ionicPopup.alert({
				title: '删除结果',
				template:"<p style='text-align:center'>"+data.data+"</p>"
			})
			$scope.getaddress()
		 })
	}
})
