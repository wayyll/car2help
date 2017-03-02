/**
 * Created by admin on 2017/2/10 0010.
 */
angular.module("myapp").controller("chatroomCtrl", function ($scope,$rootScope,$stateParams,$http,$state,$ionicViewSwitcher,$interval){
    var sellerid = $stateParams.seller_id
    $http.get("http://www.b1ss.com/app/admin/index.php?m=goods&c=api&a=all").success(function (data) {
        angular.forEach(data.data,function(item){
			console.log(data)
            if(item.shopid== sellerid){
                $scope.shoptouxiang = item.shopimg
				
                console.log($scope.shoptouxiang)
            }
        })
    })
    $scope.PostMessage = function(){
        $http.post($rootScope.localhost+"index.php?m=member&c=api_chat&a=ajax_add"
            ,{seller_id:sellerid,content:$scope.chatWord})
            .success(function(data){
                console.log(data);
                $scope.chatWord="";
                $scope.getMessage()

            });
        console.log(sellerid)
        console.log($scope.chatWord);
    }
    $scope.getMessage = function(){
        $http.get($rootScope.localhost+"index.php?m=member&c=api_chat&a=lists&seller_id="+sellerid)
            .success(function(data1){
                //console.log(data1)
                 $scope.chatroomword = data1
                 $scope.words = [];
                 $scope.buyerword = [];
                 $scope.sellerword = []
                 angular.forEach(data1.lists,function(item){
					
                    if(item.sender_type == 2){
                        item.shopimg = $rootScope.personavatar
						item.color={
							"background":"#3cb936",
							"color":"#fff"
						}
                    }
                    if(item.sender_type == 1){
                        item.shopimg = $scope.shoptouxiang
						item.member_name=item.seller_name
						item.color={
							"background":"#fff",
							"color":"#000"
						}
						
						
                    }
                    $scope.words.push(item);
					 console.log(item)
                })

            })
    }
    $interval(function(){
        $scope.getMessage()
    },2000)

});