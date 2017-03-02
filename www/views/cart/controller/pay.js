 angular.module("myapp").controller("payCtrl",function($scope, $stateParams,$http,shopcart,$state,$rootScope,$ionicViewSwitcher, $ionicPopup,$window,$rootScope){
		
	 $scope.allpays=function(){
		 if($scope.pay==0){
			$scope.fund="alipay"
		 }
		
		$http.post($rootScope.localhost+"index.php?m=order&c=api_order&a=detail&order_sn="+$stateParams.order_sn,{order_sn:$stateParams.order_sn,balance_checked:"",pay_code:$scope.fund,pay_bank:""
		}).success(function(data){
			$window.location.href = data.data
		})
	 }
	 
	
	 
 })