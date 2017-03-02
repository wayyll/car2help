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
		//批发商产品推荐
		$scope.changepifa=function(){
			$http.get($rootScope.localhost+"index.php?m=saler&c=api&a=saler_list&limit=2").success(function(data){
			$scope.pifashang={}
			$scope.pifashang=data.data
			console.log(data)
			
		})
		}
		$scope.topifashang=function(i){
			if ($rootScope.isLogin == false) {
                $scope.openModal()
            } else {
   	$http.post($rootScope.localhost+"index.php?m=saler&c=api&a=saler_goods",{saler_id:i.id}).success(function(data){
		if(data.error==3){
			 $scope.showConfirm()
		}
		if(data.error==0){
			$state.go("tabs.pifashang",{id:i.id})
		}
	})
            }
		
			
			$scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
      cancelText: '取消',
	  okText: '申请',
	   okType: 'button-balanced',
       title: '您还没有权限是否立即申请?'
     });
     confirmPopup.then(function(res) {
       if(res) {
		  
        $http.get($rootScope.localhost+"index.php?m=saler&c=api&a=member_apply&saler_id="+i.id).success(function(data){
        	$scope.da=data.data
				 $cordovaToast.showShortTop("申请权限中").then(function(success) {
								    // success
								  }, function (error) {
								    // error
 								 });
			})
       } else {
         console.log('You are not sure');
       }
     });
   };
			
			
			//
		}
		$scope.changepifa()
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
})
.controller("pifashangCtrl",function($rootScope,$scope,$http,$ionicSlideBoxDelegate,$ionicModal,$state, $ionicViewSwitcher,$ionicPopup,$scope, $ionicSlideBoxDelegate,$stateParams){
	$stateParams.id
		$http.post($rootScope.localhost+"index.php?m=saler&c=api&a=saler_goods",{saler_id:$stateParams.id}).success(function(data){
			$scope.data=data
			console.log($scope.data)
		})
	
})