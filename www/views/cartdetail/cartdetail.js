/**
 * Created by admin on 2016/12/12 0012.
 */

angular.module("myapp")
.controller("cartdetailCtrl", function ($scope, $stateParams, $http, shopcart, $state, $rootScope, $ionicViewSwitcher, $ionicPopup, $interval, $ionicModal) {
	
	var skuid = $stateParams.sku_id;
	var sellerid = $stateParams.seller_id
	var ddd = $rootScope.productdata
		//console.log(ddd)
		$http.get($rootScope.localhost+"index.php?m=goods&c=api&a=goods_comment&sku_id="+skuid).success(function(data){
			console.log(data)
			$scope.count=data.data.count
		})

		$scope.shuaxin = function () {
		$http.get($rootScope.localhost+"index.php?m=goods&c=api&a=goods_detail&sku_id="+skuid).success(function (data) {
			console.log(data)
			$scope.product=data
			angular.forEach($scope.product.sku_arr,function(item){
				$scope.product.sku_id=item.sku_id
			})
					
					if(data.prom_type=="time"){
							$interval(function () {
									
									data.prom_time = data.prom_time - 1
									var d = new Date(good.prom_time * 1000);

									$scope.date = d.getDate()
										$scope.hour = d.getHours()
										$scope.min = d.getMinutes()
										$scope.sec = d.getSeconds()

										$scope.time = "限时促销："+$scope.date + "天" + $scope.hour + "时" + d.getMinutes() + "分" + d.getSeconds() + "秒"

								}, 1000)	
					}
								
							
								
								

						

					
				
			
		});
	}
	$scope.shuaxin()

	$scope.addCart = function (product) {
		if ($rootScope.isLogin == false) {
			$scope.openModal()
		} else {
			$scope.closeModal()
			var addcart = $rootScope.localhost+"index.php?m=order&c=api_cart&a=cart_add"
				$http.post(addcart, {
					sku_id: product.sku_id,
					nums: "1"
				}).success(function (data) {
					$scope.addcartAlert()
				})
		}

	};
	$scope.toShop = function (product) {
		$http.get($rootScope.localhost+"index.php?m=goods&c=api&a=all").success(function (data) {

			angular.forEach(data.data, function (item) {

				angular.forEach(item.goods, function (item1) {
					angular.forEach(item1.sku_arr, function (sku) {
						if (product.sku_id == sku.sku_id) {
							$scope.shopid = item1.seller_id
								$state.go("tabs.shopdetail", {
									shopid: item1.seller_id
								})
						}
					})
				})
			})
		})

		// 将go有动画效果
		$ionicViewSwitcher.nextDirection("forward");

		// "forward","back"
	};
	$scope.toassess = function (product) {

		$state.go("tabs.assess", {
			sku_id: product.sku_id
		});

	}
	//加载购物车
	$scope.getCart = function () {
		$scope.items = []

		$scope.cartdata = {}
		$http.get($rootScope.localhost+"index.php?m=order&c=api_cart&a=get_carts").success(function (data, stats) {
			$scope.aaa = data.data
				//判断是否登录或者是否有数据
				if (data.data.sku_counts != 0 && data.data != "请先登录") {
					console.log(data.data)
					$scope.cartdata.show = true
						$scope.cartdata.hide = true
						angular.forEach(data.data.skus, function (item, index, array) {
							$http.get($rootScope.localhost+"index.php?m=goods&c=api&a=all").success(function (data) {
								$scope.tempdata = data.data;
								angular.forEach($scope.tempdata, function (item1) {
									angular.forEach(item1.goods, function (good) {
										if (item._sku_.spu_id == good.spu_id) {
											item.img = good.img_list
										}
									})
								})

							})
							

							$scope.items.push(item)

						})
				} else {
					$scope.cartdata.show = false
						$scope.cartdata.hide = false
				}
		})
		$state.go("tabs.checkout")
	}
	$scope.addcartAlert = function () {
		$ionicPopup.alert({
			title: '提示',
			template: '加入购物车成功'
		});
	}
	//购物车增加
	$scope.addnum = function (item) {
		if (item.number == 0) {
			item.number = 1
		}
		$http.get($rootScope.localhost+"index.php?m=order&c=api_cart&a=set_nums&sku_id=" + item.sku_id + "&nums=" + item.number).success(function (data) {
			console.log(data)
		})
	}
	//购物车删除
	$scope.delete  = function (item) {
		$http.get($rootScope.localhost+"index.php?m=order&c=api_cart&a=delpro&sku_id=" + item.sku_id).success(function (data) {
			$scope.items.splice($scope.items.indexOf(item), 1);
			if ($scope.items.length == 0) {
				$scope.cartdata.show = false
					$scope.cartdata.hide = false
			}
			var idx1 = $rootScope.xzarr1.indexOf(item.sku_id);
			$rootScope.xzarr1.splice(idx1, 1);
		})
		//$scope.getCart();
	}
	$scope.int = parseInt;
	$rootScope.xzarr = "";
	$rootScope.xzarr1 = [];
	$scope.isChecked = function (id) {
		return $rootScope.xzarr1.indexOf(id) >= 0;
	};
	$scope.xuanzhong = function ($event, id) {
		var checkbox = $event.target;
		var checked = checkbox.checked;
		if (checked) {
			$rootScope.xzarr1.push(id);
		} else {
			var idx = $rootScope.xzarr1.indexOf(id);
			$rootScope.xzarr1.splice(idx, 1);
		}
		$rootScope.xzarr = "";
		for (var i = 0; i < $rootScope.xzarr1.length; i++) {
			$rootScope.xzarr += $rootScope.xzarr1[i] + ";"
		}

		console.log($rootScope.xzarr)

	}

	//购物车提交
	$scope.submit = function () {

		if ($rootScope.xzarr == "") {
			$ionicPopup.alert({
				template: '请选择要提交的商品'
			})
		} else {
			$state.go("tabs.order")
		}

	}
	$scope.goproduct = function () {
		$state.go("tabs.home")
		// 将go有动画效果
		$ionicViewSwitcher.nextDirection("forward");
	}

	//图文详情
	$scope.todetail = function (product) {
		$state.go("tabs.detail", {
			sku_id: product.sku_id
		})
	}
/*
	$ionicModal.fromTemplateUrl('views/modal/modal.html', {
		scope: $scope, // 作用域使用父作用域
	}).then(function (modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function () {
		$scope.modal.show();
	};

	$scope.closeModal = function () {
		$scope.modal.hide();
	};
	$scope.$on('$destroy', function () {
		$scope.modal.remove();
	});
*/
	$scope.goChatRoom = function (product) {
		if ($rootScope.isLogin) {
			$state.go("tabs.chatroom",{seller_id:product.seller_id})
			$ionicViewSwitcher.nextDirection("forward");
		} else {
			$scope.showConfirm();
			if ($rootScope.isLogin) {
				$scope.closeModal()
			}
		}

	}
	$scope.showConfirm = function () {
		var confirmPopup = $ionicPopup.confirm({
				title: '提示',
				template: '您未登录，现在登录吗?'

			});
		confirmPopup.then(function (res) {
			if (res) {
				$scope.openModal();
			} else {
				console.log('暂不');
			}
		});
	};
});
