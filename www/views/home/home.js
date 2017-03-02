angular.module("myapp")
    .controller("homeCtrl",function($rootScope,$scope,$http,$ionicSlideBoxDelegate,$ionicModal,$state, $ionicViewSwitcher,$ionicPopup,$scope, $ionicSlideBoxDelegate){
        var url = $rootScope.localhost+"index.php?m=goods&c=api&a=all";
        //首页产品推荐

            $rootScope.homeProduct=[];
            $http.get($rootScope.localhost+"index.php?m=goods&c=api&a=goods_list&num=8").success(function(data){
                
               $scope.homeshangpin=data.data.lists
            });
		$http.get($rootScope.localhost+"index.php?m=goods&c=api&a=seller&limit=3").success(function(data){
			$scope.homeStore=data.data
			console.log($scope.homeStore)
		})

        $scope.toDetailProduct = function(item){
            $state.go("tabs.homeproductcartdetail",{sku_id:item.sku_id});
            // 将go有动画效果
            $ionicViewSwitcher.nextDirection("forward");    // "forward","back"

        };
        //首页店铺推荐

        $scope.homeStore=[];
        $http.get($rootScope.localhost+"index.php?m=goods&c=api&a=seller&limit=3").success(function(data){
			console.log(data)
            $scope.homeStore = data.data;
        });


        $scope.toDetailStore = function(item){
            $state.go("tabs.homeshopdetail",{id:item.id});
            // 将go有动画效果
            $ionicViewSwitcher.nextDirection("forward");  
			console.log(item.id)			// "forward","back"
        };



        $scope.tohomeserch=function(data){
            $state.go("tabs.serch")
            $ionicViewSwitcher.nextDirection("forward");
            $rootScope.aa=data
        };


        $scope.homeLogin = function(){
            if ($rootScope.isLogin == false) {
                $scope.openModal()
            } else {
                $state.go("tabs.cookmain1")
                $ionicViewSwitcher.nextDirection("forward");
                $scope.closeModal();
            }
        }
		$http.get($rootScope.localhost+"index.php?m=goods&c=api&a=banner").success(function(data){
			console.log(data.data)
			$scope.data=data.data
			$ionicSlideBoxDelegate.update()
		})
});
	