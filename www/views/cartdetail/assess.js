/**
 * Created by admin on 2016/12/12 0012.
 */
angular.module("myapp")
.controller("assessCtrl", function ($scope, $stateParams, $http, shopcart, $state, $ionicViewSwitcher, $ionicPopup, $timeout, $rootScope, $ionicModal, $rootScope) {

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

			console.log(res)
		});
	
		}
	}

	$scope.alertend = function (ddd) {
		alertend = $ionicPopup.alert({
				title: '发布结果',
				subTitle: ddd
			})
	}
	//评论
	var spu_id2 = $stateParams.sku_id;
	console.log(spu_id2)
	$scope.addassess = function (res) {
		console.log(res)

		
			$http.post($rootScope.localhost + "index.php?m=comment&c=api_member&a=add", {
				spu_id: spu_id2,
				content: res.assess,
				mood: res.mood
			})
			.success(function (data, status) {
				if (data.error == 0) {
					console.log("success!");
					$scope.alertend(data.data)
					$scope.shuaxin();
					console.log(data)
				} else {
					console.log(data)
					$scope.alertend(data.data)
					/*	  $timeout(function() {
					alertend.close(); //由于某种原因3秒后关闭弹出
					}, 1500);  */
				}

			})
		
	}
	$scope.shuaxin = function () {
		var url = $rootScope.localhost + "index.php?m=goods&c=api&a=goods_comment&sku_id=";
		$scope.assess = []

		$http.get(url+spu_id2).success(function (data) {
			console.log(data)
			
							$scope.assess=data.data
							console.log($scope.assess)
						
					})
		
	}
	$scope.shuaxin();
	/* $ionicModal.fromTemplateUrl('views/modal/modal.html', {
	scope: $scope,      // 作用域使用父作用域
	}).then(function(modal) {
	$scope.modal5 = modal;
	});
	$scope.openModal = function() {
	$scope.modal5.show();
	};

	$scope.closeModal = function() {
	$scope.modal5.hide();
	};
	$scope.$on('$destroy', function() {
	$scope.modal5.remove();
	}); */

});
