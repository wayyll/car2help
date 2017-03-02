angular.module("myapp").controller("cookbookCtrl",function($scope,$http,$stateParams){
    var url="json/cookmenu1.json";
    $scope.data={
        title:$stateParams.cooktitle
    };
   $http.get(url).success(function(data){
       $scope.tempdata=data.result.data;
       angular.forEach($scope.tempdata,function(data){
           //用$stateParams取到views里传参的id值和当前数据的id值判断，得到当前id的数据
           if($stateParams.cookbookid==data.id){
               $scope.data=data;
           };
       });
   });

})