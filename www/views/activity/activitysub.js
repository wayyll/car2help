
angular.module("myapp").controller("activitysubCtrl",function($scope,$http,$stateParams,$ionicPopup,$rootScope) {
        var url="index.php?m=misc&c=api&a=news";
        var id = $stateParams.id;
        $http.get($rootScope.localhost+url).success(function(data){
            $scope.tempdata = data.data.news;
            angular.forEach($scope.tempdata,function(item){
                if( id == item.id){
                    $scope.news = item;
                };
            });
        });
        console.log($scope.news);
        console.log($stateParams.main)
    $scope.like = 2;
    $scope.pinglun = 3;
    $scope.praiseLike=function(){
        $scope.like++
    };
    $scope.praisePinglun=function(){
        $scope.pinglun++
    };
    $scope.showPopup = function() {
        $scope.data = {};
        // 一个精心制作的自定义弹窗
        $ionicPopup.show({
            template: '<input type="text" style="border:1px solid #b2b2b2" >',
            title: '编辑评论',
            scope: $scope,
            buttons: [
                {text: '退出'},
                {
                    text: '<b>提交</b>',
                },
            ]
        })
}

})