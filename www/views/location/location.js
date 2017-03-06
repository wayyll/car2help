angular.module("myapp").controller("locationCtrl",function($ionicModal,$scope,$http,$ionicLoading,$rootScope,$ionicPopup,
                                                           $state,$ionicViewSwitcher){
	
	
    $scope.dadada = function(){
       if ($rootScope.isLogin == false) {
			$scope.openModal()
		} else {
			$scope.closeModal();
		}
$rootScope.personavatar=localStorage.getItem("useravatar")
$rootScope.personusername=localStorage.getItem("username")
    }

    $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '提示',
            template: '您未登录，现在登录吗?'

        });
        confirmPopup.then(function(res) {
            if(res) {
                $scope.openModal();
            } else {
                console.log('暂不');
            }
        });
    };
    $scope.myDingDan=function(){
        if($rootScope.isLogin == false){
            $scope.showConfirm()
        } else{
               $state.go("tabs.orders")
               $ionicViewSwitcher.nextDirection("forward");
                $rootScope.noPay = [];
                $rootScope.yesPay = [];
                $http.get($rootScope.localhost+"index.php?m=member&c=api_order&a=index")
                    .success(function (data) {
                        console.log(data)
                        angular.forEach(data.orders, function (order) {
                            if (order.pay_type == 1) {
                                $rootScope.noPay.push(order)
                                console.log($rootScope.noPay);
                            }
                            if (order.pay_type == 2) {
                                $rootScope.yesPay.push(order)
                                console.log($rootScope.noPay);
                            }

                        })
                    })

        }
  
	}
	$scope.upload=function(){
		document.getElementById("fileid").click()
		
	}
	
	 
	$scope.updata=function(files){
	var file = document.getElementById("fileid").files[0];  
    if(!/image\/\w+/.test(file.type)){  
        alert("看清楚，这个需要图片！");  
        return false;  
    }  
    $scope.reader = new FileReader();  
    //将文件以Data URL形式读入页面  
    $scope.reader.readAsDataURL(file);  
   
		
	
		$scope.reader.onload = function(e){ // reader onload start  
		$rootScope.personavatar=this.result
		localStorage.setItem("useravatar",this.result)
            // ajax 上传图片 
           $http.post($rootScope.localhost+'index.php?m=member&c=api_account&a=avatar',{avatar:this.result}).success(function(data) {
           console.log(data)
        })
    };
	}
	$scope.jiuyuandingdan=function(){
		 if($rootScope.isLogin == false){
            $scope.showConfirm()
        } else{
		$state.go("tabs.rescuerecord")
		$http.get($rootScope.localhost+"index.php?m=help&c=api&a=help").success(function(data){
			$rootScope.jiuyuandata=data.data
			
		})
		}
	}
 
})
