/**
 * Created by admin on 2017/2/15 0015.
 */
angular.module("myapp").controller("jiuyuanfuwuCtrl",function($ionicModal,$ionicActionSheet,$http,$scope,$ionicPopup,
  $rootScope,$state,$ionicViewSwitcher,$stateParams){
  

    $http.post($rootScope.localhost+"index.php?m=member&c=rescueApi&a=getStaff")
        .success(function(data){
            console.log(data);
            $scope.Staffs = data;

        });
    console.log($scope.selectedStaff);
    $scope.postJiuyan = function (){
        $http.post($rootScope.localhost+"index.php?m=member&c=rescueOrderApi&a=setHelpOrder"
            ,{staff_id:$scope.selectedStaff,range:$rootScope.jiuyuandingdan.range,
                total:$rootScope.jiuyuandingdan.total,
                rc_address:"祖阿曼",expect_time:$rootScope.jiuyuandingdan.time})
            .success(function(data){
                if(data == true){
                    $scope.isTrue();
                    $state.go("tabs.jiuyuanfuwu")
                    $ionicViewSwitcher.nextDirection("forward");

                }else{
                    $scope.isFalse()
                }
            })
    }

    $scope.isTrue = function() {
        var alertPopup = $ionicPopup.alert({
            title: '提示',
            template: '救援已发送'
        });
        alertPopup.then(function(res) {
            if(res){
                $state.go("tabs.jiuyuanfuwu")
                $ionicViewSwitcher.nextDirection("forward");
            }
        });
    };
    $scope.isFalse = function() {
        var alertPopup = $ionicPopup.alert({
            title: '提示',
            template: '网络请求错误，请重试'
        });
        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };
});