/**
 * Created by admin on 2017/1/16 0016.
 */
    angular.module("myapp").controller("service",function($scope,$http,$stateParams,$state,$ionicViewSwitcher,$rootScope){

	var url = $rootScope.localhost+"index.php?m=misc&c=api&a=news";
   	 $scope.getOther = function(){
        $http.get(url).success(function(data){
            $scope.other = data.data.other
          
			
        })
    };	
	 $scope.getOther()
	 $scope.gootherdetail=function(i){
		
		
		 $state.go("tabs.servicedetail",{img:i.img,name:i.name,content:i.content,address:i.address,phone:i.phone})
		   // 
		   
            $ionicViewSwitcher.nextDirection("forward"); 
	 }
	 $scope.servicedata={}
	 $scope.servicedata.img=$stateParams.img
	  $scope.servicedata.name=$stateParams.name
	   $scope.servicedata.content=$stateParams.content
	    $scope.servicedata.address=$stateParams.address
		 $scope.servicedata.phone=$stateParams.phone
	  console.log($scope.servicedata)
		/*	  $http.get(url).success(function(data){
            $scope.other = data.data.other
			angular.forEach($scope.other,function(item){
				if(item.id==$stateParams.id){
					$scope.item=item
				}
			})
          
			console.log(data)
        })*/
	 
    })