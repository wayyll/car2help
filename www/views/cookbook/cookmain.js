angular.module("myapp").controller("cookmainCtrl", function ($scope, $http, $ionicLoading, $ionicModal, $ionicPopup, $state, $rootScope, $ionicViewSwitcher, $timeout, $window) {

	var url = $rootScope.localhost + "index.php?m=member&c=rescueApi&a=getStoreDis";
	$scope.getStore = function () {
		$scope.data = [];

		baidu_location.getCurrentPosition(function (message) {
			$ionicLoading.show();

			$http.post(url, {
				lat: message.latitude,
				lon: message.lontitude
			}).success(function (data, status) {

				console.log(data);
				console.log(status)
				angular.forEach(data, function (item) {
					if (item.stastu == 0) {
						item.yingye = "ion-ios-checkmark";
						item.chongdian = "ion-ios-checkmark";
					}
					if (item.stastu == 1) {
						item.yingye = "ion-ios-checkmark";
						item.chongdian = "ion-ios-close";
					}
					if (item.stastus == 2) {
						item.yingye = "ion-ios-close";
						item.chongdian = "ion-ios-close";
					}
					if (item.electrombile == 1) {
						item.electrombile = "ion-ios-checkmark";
					}
					if (item.electrombile == 2) {
						item.electrombile = "ion-ios-close";
					}
					if (item.motor == 2) {
						item.motor = "ion-ios-checkmark";
					}
					if (item.motor == 1) {
						item.motor = "ion-ios-close";
					}
					$scope.data.push(item)
				})
				$timeout(function () {
					$ionicLoading.hide();
				}, 1000)
			})
		}, function (message) {
			alert("请到设置里打开软件定位权限");
		});

	};
	$scope.getStore();
	//下拉刷新
	//$scope.refresh=function(){
	//    $http.get(url).success(function(data){
	//        $scope.data=[];
	//        angular.forEach(data.data,function(result) {
	//            $scope.data.push(result)
	//        })
	//    }).finally(function(){
	//        $scope.$broadcast("scroll.refreshComplete")
	//    })
	//};
	//$scope.loadMore=function(){
	//        var newdata=[];
	//        $http.get(url).success(function(data){
	//            angular.forEach(data.data,function(result) {
	//                newdata.push(result)
	//            })
	//        });
	//        setTimeout(function(){
	//            Array.prototype.push.apply($scope.data,newdata)
	//            $scope.$broadcast("scroll.infiniteScrollComplete");
	//        },2000)
	//    };
	$scope.showConfirm = function () {
		var confirmPopup = $ionicPopup.confirm({
				title: '发送救援',
				template: '您确定需要店家救援服务?'
			});
		confirmPopup.then(function (res) {
			if (res) {
				console.log('确定');
			} else {
				console.log('暂不');
			}
		});
	};

	$scope.searchcookmain = function (dddd) {
		$http.get($rootScope.localhost + "index.php?m=goods&c=api&a=search&keyword=" + dddd).success(function (data) {
			console.log(data.data.seller)
			$scope.data = []
			if (data.error == 1) {
				$scope.cookserch = true
			} else {
				angular.forEach(data.data.seller, function (aaa) {

					$http.get(url).success(function (data) {
						angular.forEach(data.data, function (result) {
							if (result.shopid == aaa.shopid)
								$scope.data.push(result)
						});
						//  $ionicLoading.hide();
					})

				});
			}
		})
	}
	$scope.goshop = function (item) {
		$state.go("tabs.shopdetail", {
			id: item.id
		})
		$ionicViewSwitcher.nextDirection("forward");
	}

	$scope.jiuYuanFirst = function (item) {
		$http.post($rootScope.localhost + "index.php?m=member&c=rescueApi&a=computeMoney", {
			id: item.id
		})
		.success(function (data, status) {
			console.log(data);
			$rootScope.jiuyuandingdan = data
				console.log(status)
				if (data) {
					$state.go("tabs.jiuyuanfuwu")
					$ionicViewSwitcher.nextDirection("forward");
				} else {
					$scope.isJiuyuan()
				}
		})

	}

	$scope.isJiuyuan = function () {
		var confirmPopup = $ionicPopup.confirm({
				title: '提示',
				template: '您的救援正在进行中，查看订单？'
			});
		confirmPopup.then(function (res) {
			if (res) {
				$http.get($rootScope.localhost + "index.php?m=help&c=api&a=help").success(function (data) {
					$rootScope.jiuyuandata = data.data

				})
				$state.go("tabs.rescuerecord2")
			} else {
				console.log('暂不');
			}
		});
	};
	$scope.openmap = function (res) {
		$scope.jingwei=res.lat + "," + res.lng
		appAvailability.check(
			　　'com.baidu.BaiduMap', // URI Scheme 这里是app的包名，可以搜一些包名查看器，一般都是com.xxx.xxxx格式的
			　　function() { // Success callback
			　　　　var inApp = window.open("bdapp://map/marker?location="+$scope.jingwei+"&title="+res.shopName+"&traffic=on", '_system', 'location=no', 'zoom=yes');
			　　
		},
			　　function() { // Error callback
			　　　baidu_location.getCurrentPosition(function (message) {
				var uri = 'http://api.map.baidu.com/direction?origin=latlng:' + message.latitude + ',' + message.lontitude + '|name:我的位置&destination=latlng:' + res.lat + ',' + res.lng + '|name:' + res.shopName + '&region=成都&mode=driving&output=html&src=yourCompanyName|yourAppName'
					var inApp = window.open(uri, '_blank', 'location=no', 'zoom=yes');
			}, function (message) {
				alert("请到设置里打开软件定位权限");
			});
			　　
		});

	}
	//拨打电话
	$scope.callphone=function(i){
		var inApp = window.open("tel:" + i.mobile, '_system', 'location=no', 'zoom=yes');
	}
});