angular.module("myapp")
.controller("shopdetailCtrl", function ($rootScope, $ionicSlideBoxDelegate, $scope, $stateParams, $http, shopcart, $state, $ionicViewSwitcher, $rootScope, $ionicPopup, $ionicLoading, $timeout) {
	$scope.selectedCategory="全部分类"
	var shopid = $stateParams.id;
	$scope.shop = []
	var productUrl = $rootScope.localhost + "index.php?m=goods&c=api&a=seller";
	var categoryUrl = $rootScope.localhost + "index.php?m=goods&c=api&a=category"
		$http.get($rootScope.localhost + "index.php?m=goods&c=api&a=seller&id=" + $stateParams.id).success(function (data) {
			/*$scope.tempdata = data.data;
			angular.forEach($scope.tempdata, function (item) {
			//用$stateParams取到views里传参的id值和当前数据的id值判断，得到当前id的数据
			if (shopid == item.shopid) {
			$scope.shopname = item.shopname
			$scope.img = item.shopimg

			console.log(item)
			angular.forEach(item.goods, function (item1) {
			angular.forEach(item1.sku_arr, function (item2) {
			item2.skuimg = item1.img_list
			$scope.shop.push(item2)
			console.log(item2)
			})
			})
			}
			});*/
			
			$scope.img = data.data.logo
			$scope.shopname = data.data.seller_name
			$scope.content=data.data.content

				/* console.log($scope.shop);

				console.log($stateParams.shopname); */
				
		});
	$http.get($rootScope.localhost + "index.php?m=goods&c=api&a=category").success(function (data) {
		
		$scope.categorys=[]
		angular.forEach(data.data,function(item){
			$scope.categorys.push(item)
		})
		
	})
	$http.get($rootScope.localhost+"index.php?m=goods&c=api&a=goods_list&seller_id="+$stateParams.id).success(function(data){
	
		$scope.sku=data.data.lists
	})
	//分类
	$scope.fenlei=function(dd){
		$http.get($rootScope.localhost+"index.php?m=goods&c=api&a=goods_list&seller_id="+$stateParams.id+"&catid="+dd).success(function(data){
			$scope.sku=data.data.lists
	})
	}
	//排序
	$scope.paixu=function(dd,cc){
		$http.get($rootScope.localhost+"index.php?m=goods&c=api&a=goods_list&seller_id="+$stateParams.id+"&order="+dd+"&catid="+cc).success(function(data){
			$scope.sku=data.data.lists
			console.log(dd)
	})
	}
	$http.get($rootScope.localhost + "index.php?m=goods&c=api&a=seller_comment&seller_id=" + $stateParams.id).success(function (data) {
		
		$scope.assess = data.data
	})
	
	$scope.selectedCategory = null; //保存选中商品分类
	$scope.selectCategory = function (category) {
		$scope.selectedCategory = category; //单击商品类别返回的值存入

	};
	//过滤商品
	$scope.showByCategory = function (product) {
		return $scope.selectedCategory == null || $scope.selectedCategory == product.category;
	};
	//高亮显示选中分类
	$scope.acitveClass = function (category) {
		return category == $scope.selectedCategory ? "cookbooktext" : "";

	};
	//添加进购物车
	$scope.addCart = function (product) {
		shopcart.add(product)
	};
	$scope.toDetail = function (product) {
		$state.go("tabs.homeproductcartdetail", {
			id: product.sku_id
		});
		// 将go有动画效果
		$ionicViewSwitcher.nextDirection("forward"); // "forward","back"
	};
	//切换
	$scope.slideIndex = 0;
	$scope.slideChanged = function (index) {
		$scope.slideIndex = index;
	};

	$scope.addClass = function (index) {
		return index == $scope.slideIndex ? "current currentsame col col-30  text-center" : "currentsame col col-30 text-center"
	};
	$scope.activeSlide = function (index) {
		$ionicSlideBoxDelegate.$getByHandle("bottom").slide(index)
	};
	$scope.toproDetail = function (i) {
		$state.go("tabs.productcartdetail", {
			sku_id: i.sku_id
		});
		// 将go有动画效果
		$ionicViewSwitcher.nextDirection("forward"); // "forward","back"
	};

	$scope.showPopup = function () {
		$scope.pro = {}
		
		if ($rootScope.isLogin == false) {
			$scope.openModal()
		} else if ($rootScope.isLogin == true) {
			$scope.closeModal()
			// 一个精心制作的自定义弹窗
			var myPopup = $ionicPopup.show({
					template: "<select ng-model='pro.mood' style='width:100%'><option value='positive'>好评</option><option value='neutral'>中评</option><option value='negative'>差评</option></select><br/><br/><textarea  ng-model='pro.assess' rows='5'></textarea>",
					title: '发表评论',
					subTitle: '请输入评价内容',
					scope: $scope,
					buttons: [{
							text: '关闭'
						}, {
							text: '<b>发表</b>',
							type: 'button-positive',
							onTap: function (e) {
								if (!$scope.pro.assess || !$scope.pro.mood) {
									$scope.alertend("评论不全")
									e.preventDefault();
								} else {
									return $scope.pro

								}
							}
						}
					]
				});

			myPopup.then(function (res) {

				if (res != undefined) {
					if (res.assess.length < 5) {
						$scope.alertend("评论太少", 1)
					} else {
						$scope.addassess(res)
					}

				} else {

					$scope.alertend("请输入评论", 1)

				}

				
			});
		}
	}

	$scope.alertend = function (ddd, err) {
		var alertend = $ionicPopup.alert({
				title: '发布结果',
				subTitle: ddd
			});
		alertend.then(function (res) {
			if (err == 0) {
				$ionicLoading.show()
				$scope.shuaxin();
				$timeout(function () {
					$ionicLoading.hide()
				}, 1000)

			}
		});
	}
	//评论

	$scope.addassess = function (res) {
		

		if ($rootScope.isLogin == false) {
			$scope.openModal()
		} else if ($rootScope.isLogin == true) {
			$scope.closeModal()
			$http.post($rootScope.localhost + "index.php?m=comment&c=api_seller&a=add", {
				seller_id: $stateParams.id,
				content: res.assess,
				mood: res.mood
			})
			.success(function (data, status) {
				if (data.error == 0) {
					
					$scope.alertend(data.data, 0)

				} else {
				
					$scope.alertend(data.data, 1)
					/*	  $timeout(function() {
					alertend.close(); //由于某种原因3秒后关闭弹出
					}, 1500);  */
				}
			})
		}
	}

	$scope.shuaxin = function () {
		var url = $rootScope.localhost + "index.php?m=goods&c=api&a=all";
		$http.get(url).success(function (data) {
			angular.forEach(data.data, function (item) {
				if ($stateParams.id == item.shopid) {
					$scope.assess = ""
						$scope.assess = item.seller_comment
						
				}
			});
		});
	}
	$scope.shuaxin();

});
