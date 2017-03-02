angular.module("myapp").controller("proshopCtrl", function ($scope,$stateParams,$http,shopcart,productUrl,$state,$ionicViewSwitcher){
        var proid = $stateParams.id;
        $http.get("views/cart/cartjson/products.json").success(function(data){
            $scope.tempdata = data;
            	angular.forEach($scope.tempdata,function(data,index,array){
            		$scope.product=data.product
            		angular.forEach($scope.product,function(item,index2,array2){
                //用$stateParams取到views里传参的id值和当前数据的id值判断，得到当前id的数据
                if( proid == item.id){
                    $scope.store=array[index2]
                }
            });
            	})
         	
            	
          console.log($scope.store)
           
//          console.log($scope.store);
//          console.log(proid);
//          console.log($stateParams.shopstorename);
        });

        $scope.selectedCategory=null;//保存选中商品分类
        $scope.selectCategory=function(category){
            $scope.selectedCategory=category;//单击商品类别返回的值存入

        };
        //过滤商品
        $scope.showByCategory=function(product){
            return $scope.selectedCategory==null||$scope.selectedCategory==product.category;
        };
        //高亮显示选中分类
        $scope.acitveClass=function(category){
            return category==$scope.selectedCategory?"cookbooktext":"";

        };
        //添加进购物车
        $scope.addCart=function(product){
            shopcart.add(product)
        };
        $scope.toDetail = function(product){
            $state.go("tabs.homeproductcartdetail",{id:product.id,name:product.name});
            // 将go有动画效果
            $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
        };
    });
