
angular.module("myapp").controller("tourCtrl",function($http,$scope,$ionicSlideBoxDelegate,$rootScope,$state){
    $scope.isShow = false;

    $scope.onSlideChanged = function(){
		
        // 判断当前幻灯片的索引，是不是最后一个
        if($ionicSlideBoxDelegate.currentIndex() == $ionicSlideBoxDelegate.slidesCount() - 1){
            $scope.isShow = true;
        }else{
            $scope.isShow = false;
        }
    };
    $http.get($rootScope.localhost+"index.php?m=member&c=api&a=message&")
        .success(function (data) {  
           console.log(data)
        })
	$scope.gohome=function(){
		$state.go("tabs.home")
		localStorage.setItem("one","true")
	}
});
