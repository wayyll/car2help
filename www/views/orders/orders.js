/**
 * Created by admin on 2017/2/6 0006.
 */
    angular.module("myapp").controller("ordersCtrl",function($scope,$ionicViewSwitcher,$state,$ionicSlideBoxDelegate,$http,$rootScope){
        $scope.slideIndex=0;
        $scope.slideChanged=function(index){
            $scope.slideIndex=index;
        };

        $scope.addClass=function(index){
            return index==$scope.slideIndex?"current currentsame col col-30  text-center":"currentsame col col-30 text-center"
        };
        $scope.activeSlide=function(index){
            $ionicSlideBoxDelegate.$getByHandle("bottom").slide(index)
        };
        $scope.toOrdersDetail = function(item){
            $state.go("tabs.orderdetails",{id:item.id});
            // 将go有动画效果
            $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
        };
       
    })