/**
 * Created by admin on 2016/12/29 0029.
 */

angular.module("myapp").controller("activityCtrl",function($ionicViewSwitcher,$state,$scope,$ionicPopup,$http,$stateParams,$rootScope,$sce){
    var url = $rootScope.localhost+"index.php?m=misc&c=api&a=news";
    $scope.getNews = function(){
        $http.get(url).success(function(data){
			console.log(data)
            $scope.news = data.data.news
            $scope.movies = data.data.movie
			console.log(data)
        })
    };
    $scope.getNews();
    $scope.toDetailNews = function(item){
        $state.go("tabs.activitysub",{id:item.id,main:item.main});
        // 将go有动画效果
        $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
    };
    //$scope.video_url1 = $sce.
    //trustAsResourceUrl("http://static.boosj.com/v/swf/w_player1.0.swf?vid=5454068&amp;p=1&amp;f=1&amp;s=1&amp;r=1&amp;m=1&amp;a=0");
    //$scope.video_url2 = $sce.
    //trustAsResourceUrl("http://www.b1ss.com/app/admin//app/admin/statics/js/kindeditor/attached/file/20170117/20170117092930_72223.mp4");
	$scope.deatil_videoUrl=$rootScope.localhost+"6666.wmv"
	$scope.newUrl = $sce.trustAsResourceUrl($scope.deatil_videoUrl)
});










