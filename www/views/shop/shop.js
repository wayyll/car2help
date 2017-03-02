
angular.module("myapp").controller("shopstoreCtrl",function($scope,$http,$stateParams,$ionicViewSwitcher,shopcart,$state,$rootScope){

    $scope.toDetail = function(item){
        $state.go("tabs.shopdetail",{id:item.id});
        // 将go有动画效果
        $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
    };
    $http.get($rootScope.localhost+"index.php?m=goods&c=api&a=seller").success(function (data) {
		
	  	$scope.data = data.data
    });

   $scope.shopserch=function(ddd){
	   $http.get($rootScope.localhost+"index.php?m=goods&c=api&a=search&keyword="+ddd).success(function(data){
		   $scope.data=[]
		   $scope.data=data.data.seller
		  
		   
	   })
	   
   }

    // 获得标题栏的高度
//  var barHeight = 0;
//  if(document.getElementsByTagName("ion-header-bar")[0]){
//      barHeight = document.getElementsByTagName("ion-header-bar")[0].clientHeight;
//  }
//
//  // ionScroll的高度，是窗口的总高度-标题栏的高度
//  $scope.getHeight = function(){
//      return parseInt(parseInt(window.innerHeight) - barHeight) + "px";
//  };
//
//  // ionScroll的宽度
//  $scope.getWidth = function(){
//      return parseInt(window.innerWidth) + "px";
//  };
//
//  // 获得所有页面的高度之和
//  $scope.getTotalHeight = function(){
//      return parseInt($scope.getHeight() * 4) + "px";
//  };
//
//  // 获得arror的left值
//  $scope.getArrorLeft = function () {
//      return parseInt(window.innerWidth / 2) - 20 + "px";
//  };
//
//  // 计算arror的top值
//  $scope.getArrorTop = function () {
//      return parseInt(window.innerHeight - 100) + "px";
//  };
		

});