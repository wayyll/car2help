angular.module("myapp")
    .constant("productUrl","http://www.b1ss.com/app/admin/index.php?m=goods&c=api&a=all")
    .constant("categoryUrl","views/cart/cartjson/categories.json")
    .controller("cartCtrl",function($scope,$http,$location,shopcart,productUrl,categoryUrl){
        $scope.data = {};
        $http.get(categoryUrl).success(function (data) {
            $scope.data.categories = data;
        });
        $http.get(productUrl).success(function (data) {
            $scope.data.products = data[0].product;
        });
});