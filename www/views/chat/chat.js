angular.module("myapp").controller("chatCtrl", function($scope, $http, $rootScope, $timeout,$ionicLoading,$window) {

	$scope.get_height = { height: '' + $window.innerHeight - 44 - 49 + 'px' };
	
		 var longitude = 116.403963;
        var latitude = 39.915119;
      
		
        $scope.options = {
            center: {
                longitude: longitude,
                latitude: latitude
            },
            zoom: 17,
            city: 'Chengdu',
			
            markers: [{
                longitude: longitude,
                latitude: latitude,
                icon: 'images/mappiont.png',
                width: 39,
                height: 50,
                title: '您的位置',
                content: 'Put description here'
            }]
        };
	baidu_location.getCurrentPosition(function(message) {
	   
 		$ionicLoading.show()
       $scope.options.center.longitude =  message.lontitude;
            $scope.options.center.latitude = message.latitude ;
            $scope.options.markers[0].longitude = message.lontitude;
            $scope.options.markers[0].latitude = message.latitude;
      	$timeout(function(){
      		
      		$ionicLoading.hide()
      	},1000)
	}, function(message) {
		alert("请到设置里打开软件定位权限");
	});
	$scope.dingwei=function(){
		baidu_location.getCurrentPosition(function(message) {
			$scope.options.center.longitude =  message.lontitude;
            $scope.options.center.latitude = message.latitude ;
            $scope.options.markers[0].longitude = message.lontitude;
            $scope.options.markers[0].latitude = message.latitude;
			}, function(message) {
		alert("请到设置里打开软件定位权限");
	});
	}
})