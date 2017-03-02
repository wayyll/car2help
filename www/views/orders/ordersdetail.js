/**
 * Created by admin on 2017/2/6 0006.
 */
    angular.module("myapp").controller("ordersdetailCtrl",function($scope,$stateParams,$http,$rootScope){
        var id = $stateParams.id;
        $http.get($rootScope.localhost+"index.php?m=member&c=api_order&a=index").success(function(data){
            $scope.tempdata = data.orders;
            angular.forEach($scope.tempdata,function(item){
                //用$stateParams取到views里传参的id值和当前数据的id值判断，得到当前id的数据
                if( id == item.id){
                    $scope.order = item;
                }
            });
           console.log($stateParams.id);
        });

        $scope.total = function(){
            var total=0;
            for(var i=0; i<$scope.order._subs._skus.length; i++){
                total+= $scope.order._subs._skus[i].sku_price * $scope.order._subs._skus[i].buy_nums;
            }
            return total;
        }

    })
