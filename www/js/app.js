var myapp=angular.module("myapp",["ionic","mycart","baiduMap","ngSanitize","ngCordova"]);
    myapp.controller("myCtrl",function($rootScope,$http,$scope,$state){
	if(typeof cordova.plugins.settings.openSetting != undefined){
    	cordova.plugins.settings.open(function(){
            alert("ok")
        },
        function(){
            console.log("failed to open settings")
        });
}

   
	$rootScope.personavatar=localStorage.getItem("useravatar")
$rootScope.personusername=localStorage.getItem("username")	
		
       	if(localStorage.getItem("isLogin")===null){
		$rootScope.isLogin = false;
	}else{
		$rootScope.isLogin = true; 
	}
        $rootScope.localhost="http://www.b1ss.com/app/admin/";
            $http.get($rootScope.localhost+"index.php?m=goods&c=api&a=all").success(function(data){
                $rootScope.productdata = []
                $scope.tempdata = data.data;
                angular.forEach($scope.tempdata,function(item){
                    angular.forEach(item.goods,function(good){
                        angular.forEach(good.sku_arr,function(item2){
                            if(item2.spu_id==good.spu_id){
                                item2.img=good.img_list
                                $rootScope.productdata.push(item2)

                            }
                        })
                    });
                });
            });
            //类别
            $http.get($rootScope.localhost+"index.php?m=goods&c=api&a=category")
                .success(function(data){
                    $rootScope.categorys = data.data
                    console.log($rootScope.categorys)
            })
            //三级联动
            var diquurl = $rootScope.localhost+"index.php?m=goods&c=api&a=address"
            $http.get(diquurl).success(function (data) {
                $rootScope.area = data.lv0[2].lv1;

            });

    });
myapp.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
    $ionicConfigProvider.backButton.text("返回");
    $ionicConfigProvider.backButton.previousTitleText("返回");

    //android tabs在底部
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('bottom');//默认为left

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');


    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    //$stateProvider

    $stateProvider.state("tour", {
        url: "/tour",
        templateUrl: "views/tour/tour.html",
        controller:"tourCtrl"
    });

    $stateProvider.state("tabs",{
        url:"/tabs",
        abstract:true,
        templateUrl:"views/tabs/tabs.html"
    });
    $stateProvider.state("tabs.home",{
        url:"/home",
        views:{"tabs-home":{
            templateUrl:"views/home/home.html",
            controller:"homeCtrl"
        }}
    });
	 
   $stateProvider.state("tabs.activity",{
        url:"/activity",
        views:{"tabs-home":{
            templateUrl:"views/activity/activity.html",
             controller:"activityCtrl"
        }}
    });
    $stateProvider.state("tabs.activitysub",{
        url:"/activitysub?:id:main",
        views:{"tabs-home":{
            templateUrl:"views/activity/activitysub.html",
            controller:"activitysubCtrl"
        }}
    });
    $stateProvider.state("tabs.service",{
        url:"/service",
        views:{"tabs-home":{
            templateUrl:"views/home/service.html"
        }}
    });
	  $stateProvider.state("tabs.servicedetail",{
        url:"/servicedetail?:img?:name?:content?:address?:phone",
        views:{"tabs-home":{
            templateUrl:"views/home/servicedetail.html"
        }}
    });

    //连锁店
    $stateProvider.state("tabs.cookmain1",{
        url:"/cookmain1",
        views:{"tabs-home":{
            templateUrl:"views/cookbook/cookmain1.html",
            controller:"cookmainCtrl"
        }}
    });
    $stateProvider.state("tabs.position",{
        url:"/position",
        views:{"tabs-home":{
            templateUrl:"views/cookbook/position.html",
            controller:"positionCtrl"
        }}
    });
    //搜索
     $stateProvider.state("tabs.serch",{
        url:"/serch",
        views:{"tabs-home":{
            templateUrl:"views/serch/serch.html",
            controller:"serchCtrl"
        }}
    });
    //附件连锁店的详情
    $stateProvider.state("tabs.cookbook",{
        url:"/cookbook/:cookbookid/:cooktitle",
        views:{"tabs-home":{
            templateUrl:"views/cookbook/cookbook.html",
            controller:"cookbookCtrl"
        }}
    });
    //单独静态页面菜谱链接


    $stateProvider.state("tabs.chat",{
        url:"/chat",
        views:{"tabs-chat":{
            templateUrl:"views/chat/chat.html",
            controller:"chatCtrl"
        }}
    });
    $stateProvider.state("tabs.location",{
        url:"/location",
        views:{"tabs-location":{
            templateUrl:"views/location/location.html",
            controller:"locationCtrl"

        }}
    });
    $stateProvider.state("tabs.cart",{
        url:"/cart",
        views:{"tabs-cart":{
            templateUrl:"views/cart/cart.html",
            controller:"cartCtrl"
        }}
    });
    //购物车的详情页
    $stateProvider.state("tabs.cartdetail",{
        url: "/cartdetail?:sku_id",
        views:{"tabs-home":{
            templateUrl:"views/cartdetail/cartdetail.html",
            controller:"cartdetailCtrl"
        }}
    });

    $stateProvider.state("tabs.checkout",{
        url:"/checkout",
        views:{"tabs-cart":{
			cache: false,
            templateUrl:"views/cart/checkoutSummary.html",
            controller:"cartdetailCtrl"
        }}
    });
    $stateProvider.state("tabs.order",{
        url:"/placeorder",
		cache:false,
        views:{"tabs-cart":{
            templateUrl:"views/cart/placeOrder.html",
			controller:"completeCtrl"
        }}
    });
	 $stateProvider.state("tabs.changeaddress",{
        url:"/changeaddress",
        views:{"tabs-cart":{
            templateUrl:"views/cart/changeaddress.html",
			controller:"completeCtrl"
        }}
    });
    $stateProvider.state("tabs.complete",{
        url:"/complete",
        views:{"tabs-cart":{
            templateUrl:"views/cart/complete.html",
            controller:"cartCtrl"
        }}
    });
    $stateProvider.state("tabs.orders",{
        url:"/orders",
        views:{"tabs-location":{
        	cache:false,
            templateUrl:"views/orders/orders.html",
            controller:"ordersCtrl"
        }}
    });
      $stateProvider.state("tabs.orderdetails",{
        url:"/orderdetails?:id",
        views:{"tabs-location":{
        	cache:false,
            templateUrl:"views/orders/orderdetails.html",
            controller:"ordersdetailCtrl"

        }}
    });
      $stateProvider.state("tabs.rescuerecord",{
        url:"/rescuerecord",
        views:{"tabs-location":{
        	
            templateUrl:"views/orders/rescuerecord.html",
			controller:"ordersCtrl"

        }}
    });
	$stateProvider.state("tabs.rescuerecord2",{
        url:"/rescuerecord",
        views:{"tabs-home":{
        	
            templateUrl:"views/orders/rescuerecord.html",
			controller:"ordersCtrl"

        }}
    });
    $stateProvider.state("tabs.searchdetail",{
        url: "/searchdetail?:sku_id",
        views:{"tabs-home":{
            templateUrl:"views/cartdetail/cartdetail.html",
            controller:"cartdetailCtrl"
        }}
    });
    $stateProvider.state("tabs.homeproductcartdetail",{
        url: "/homeproductcartdetail?:sku_id",
        views:{"tabs-home":{
            templateUrl:"views/cartdetail/cartdetail.html",
            controller:"cartdetailCtrl"
        }}
    });
       $stateProvider.state("tabs.productcartdetail",{
        url: "/productcartdetail?:sku_id",
        views:{"tabs-home":{
            templateUrl:"views/cartdetail/cartdetail.html",
            controller:"cartdetailCtrl"
        }}
    });
     $stateProvider.state("tabs.shopdetail",{
        url:"/shopdetail?:id",
        views:{"tabs-home":{
        	templateUrl:"views/shop/shopdetail.html",
            controller:"shopdetailCtrl"
        }}
    });
	$stateProvider.state("tabs.pay",{
        url:"/pay?:order_sn",
        views:{"tabs-cart":{
        	templateUrl:"views/pay.html",
            controller:"payCtrl"
        }}
    });
	//图文详情
    $stateProvider.state("tabs.detail",{
        url: "/detail?:sku_id",
        views:{"tabs-home":{
            templateUrl:"views/cartdetail/detail.html",
            controller:"detailCtrl"
        }}
    });

     $stateProvider.state("tabs.shop",{
        url:"/shop",
        views:{"tabs-home":{
        	templateUrl:"views/shop/shop.html",
            controller:"shopstoreCtrl"
        }}
    });
    
    $stateProvider.state("tabs.shopmanage",{
        url:"/shopmanage",
        views:{"tabs-location":{
            templateUrl:"views/shop/shopmanage.html"



        }}
    });
      $stateProvider.state("tabs.homeshopdetail",{
        url:"/shopdetail?id",
        views:{"tabs-home":{
            templateUrl:"views/shop/shopdetail.html",
            controller:"shopdetailCtrl"
        }}
    });
    $stateProvider.state("tabs.Hmessage",{
        url:"/message",
        views:{"tabs-home":{
            templateUrl:"views/message/message.html"
        }}
    });
    $stateProvider.state("tabs.Lmessage",{
        url:"/message",
        views:{"tabs-location":{
            templateUrl:"views/message/message.html"
        }}
    });
    $stateProvider.state("tabs.Cmessage",{
        url:"/message",
        views:{"tabs-chat":{
            templateUrl:"views/message/message.html"
        }}
    });
     $stateProvider.state("tabs.assess",{
        url:"/assess?:sku_id",
        views:{"tabs-home":{
            templateUrl:"views/cartdetail/assess.html",
			controller:"assessCtrl"
        }}
    });
     $stateProvider.state("tabs.product",{
        url:"/product",
        views:{"tabs-home":{
            templateUrl:"views/product/product.html",
            controller:"productCtrl"
        }}
    });
	
     $stateProvider.state("tabs.goproduct",{
        url:"/tabs.goproduct",
        views:{"tabs-cart":{
            templateUrl:"views/product/product.html",
            controller:"productCtrl"
        }}
    });
    $stateProvider.state("tabs.productserch",{
        url:"/productserch",
        views:{"tabs-home":{
            templateUrl:"views/serch/serch.html",
            controller:"serchCtrl"
        }}
    });
    $stateProvider.state("tabs.chatroom",{
        url:"/tabs.chatroom?:seller_id",
        views:{"tabs-home":{
            templateUrl:"views/cartdetail/chatroom.html",
            controller:"chatroomCtrl"
        }}
    });
    $stateProvider.state("tabs.jiuyuanfuwu",{
        url:"/tabs.jiuyuanfuwu?:id",
        views:{"tabs-home":{
            templateUrl:"views/cookbook/jiuyuanfuwu.html",
            controller:"jiuyuanfuwuCtrl"
        }}
    });
    
    if(localStorage.getItem("one")===null){
		
		$urlRouterProvider.otherwise("/tour")
	}else{
		$urlRouterProvider.otherwise("/tabs/home")
	}
});
