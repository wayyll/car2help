angular.module("myapp").controller("sidemeuCtrl",function($ionicModal,$ionicActionSheet,$http,$scope,$ionicPopup,$rootScope,$state,$ionicViewSwitcher,$cordovaToast){
       var personRegUrl=$rootScope.localhost+"index.php?m=goods&c=api&a=member_reg";
       var personLoginUrl=$rootScope.localhost+"index.php?m=goods&c=api&a=member_login";
       var busRegUrl=$rootScope.localhost+"index.php?m=goods&c=api&a=seller_reg";
       var busLoginUrl=$rootScope.localhost+"index.php?m=goods&c=api&a=seller_login";
      
       
       $scope.showAlert = function() {
            $ionicPopup.alert({
                title: '提示',
                template: '请输入账号密码'
            });
        };
        $scope.showAlert1 = function() {
            $ionicPopup.alert({
                title: '提示',
                template: '信息未填满或两次密码不一致'
            });
        };
        $scope.showErrorAlert = function() {
            $ionicPopup.alert({
                title: '提示',
                template: '您两次输入的密码不一致'
            });
        };
        $scope.showRegSuccessAlert = function() {
            $ionicPopup.alert({
                title: '提示',
                template: '注册成功'
            });
        };
        $scope.showLoginSuccessAlert = function() {
            $ionicPopup.alert({
                title: '提示',
                template: '登录成功'
            }).then(function (res) {
			
		});
        };
        $scope.showLoginErrorAlert = function() {
           $ionicPopup.alert({
                title: '提示',
                template: '密码错误'
            });
        };
        $scope.showRegErrorAlert = function() {
            $ionicPopup.alert({
                title: '提示',
                template: '该手机已被注册或格式不对'
            });
        };
        $scope.showGaiAlert = function(word) {
            $ionicPopup.alert({
                title: '提示',
                template: word
            });
        };
     //--------------------------------------------------------------------//
        //缓存数据
        $scope.personRegData={};
        $scope.personLoginData ={};
        $scope.busRegData ={};
        $scope.busLoginData ={};
        $scope.xiugai = {};
        $rootScope.personInformation = {};
        //console.log($scope.personRegData);
        //console.log($scope.xiugai);
        //console.log($scope.personLoginData);
        //console.log($scope.busRegData);
        //console.log($scope.busLoginData);
        //console.log($rootScope.isLogin);
        //console.log($rootScope.personInformation);

        //修改密码
        $scope.gaiMima = function(){
            var gaiMima=angular.copy($scope.xiugai)
            if(gaiMima.newpassword == gaiMima.newpassword1 &&
                gaiMima.newpassword && gaiMima.newpassword1 && gaiMima.oldpassword){

                    $http.post($rootScope.localhost+"index.php?m=member&c=api_account&a=resetpassword",gaiMima)
                        .success(function (data,status){
                            console.log(data);
                            console.log(status)
                            if(data.error == 3){
                                console.log(status);
                                $scope.showGaiAlert("新密码不能跟原密码一样")
                                $scope.xiugai = {}
                            }
                            if(data.error == 1){
                                console.log(status);
                                $scope.showGaiAlert(data.data)
                                $scope.xiugai = {}
                            }
                            if(data.error == 0){
                                console.log(status)
                                $scope.showGaiAlert(data.data)
                                $scope.closeModal6()
                                $rootScope.isLogin = false;
                                $rootScope.isMessage = false;
                                $rootScope.personInformation = {};
                                $rootScope.message = [];
                                $rootScope.messageNum = {};
                                $scope.xiugai = {}
                            }
                        })

            }else{
                $scope.showAlert1();
                $scope.xiugai = {}
            }
        }




          //用户注册模块
        $scope.personReg = function(){
            var  personReg = angular.copy($scope.personRegData);
            if(personReg.password == personReg.repassword &&
                personReg.mobile && personReg.password && personReg.repassword){
                $http.post(personRegUrl,personReg)
                    .success(function (data,status){
                             console.log(data);
                       if(data.error == 0){
                            $cordovaToast.showShortTop('注册成功！').then(function(success) {
								    // success
								  }, function (error) {
								    // error
 								 });
                       }
                        if(data.error == 1){
                            console.log("error!");
                            console.log(status);
                             $cordovaToast.showShortTop('该手机已被注册或者格式不对！').then(function(success) {
								    // success
								  }, function (error) {
								    // error
 								 });
                        }
                    })

            }else{
                 $cordovaToast.showShortTop('信息填写不正确').then(function(success) {
								    // success
								  }, function (error) {
								    // error
 								 });
            }
            // 不管登录成功与否清楚本地输入的账号密码
            $scope.personRegData={};
        };
//------------------------------------------------------------------------------------///
        //用户登录模块
                $scope.personLogin = function(){
                    var personLogin = angular.copy($scope.personLoginData);
                    if(personLogin.username&&personLogin.password){
                        $http.post(personLoginUrl,personLogin)
                            .success(function(data,status){
                                if(data.error == 0){
                                    $http.get($rootScope.localhost+"index.php?m=member&c=api&a=message&").success(function(news){
                                        $rootScope.message = [];
                                        $rootScope.messageNum = news.data.count;
                                        if(!$rootScope.messageNum == 0){
                                            $rootScope.isMessage = true
                                        }
                                        var message = news.data.lists;
                                        angular.forEach(message,function(item){
                                            $rootScope.message.push(item)
                                        })
                                    })
                                    $cordovaToast.showShortTop('登陆成功！').then(function(success) {
								    // success
								  }, function (error) {
								    // error
 								 });
                                    $rootScope.isLogin = true;
									localStorage.setItem("isLogin","true")
                                    
                                    localStorage.setItem("useravatar",data.member.avatar)
									
									localStorage.setItem("username",data.member.username)
									$rootScope.personavatar=localStorage.getItem("useravatar")
									$rootScope.personusername=localStorage.getItem("username")
                                   
                                    $scope.closeModal();
                                   // $scope.showLoginSuccessAlert();
                                }
                                console.log(status);
                                if(data.error == 1){
                                     $cordovaToast.showShortTop('密码错误！').then(function(success) {
								    // success
								  }, function (error) {
								    // error
 								 });
                                }
                                console.log(status);
                            })
                    }else{
                              $cordovaToast.showShortTop('请输入账号密码').then(function(success) {
								    // success
								  }, function (error) {
								    // error
 								 });

                    }

                    $scope.personRegData={};
                };
$rootScope.personavatar=localStorage.getItem("useravatar")
$rootScope.personusername=localStorage.getItem("username")
  //-------------------------------------------------------------------------//
        //商家注册模块
        $scope.onBusReg = function(){
            $scope.busReg($scope.busRegData.mobile,$scope.busRegData.password,$scope.busRegData.repassword,
                $scope.busRegData.name,$scope.busRegData.id,$scope.busRegData.add)
        }
        $scope.busReg = function(mobile,password,repassword,name,id,add){
            var busReg = angular.copy($scope.busRegData);
           if( busReg.password && busReg.repassword && busReg.mobile && busReg.add
               && busReg.id && busReg.name && busReg.password == busReg.repassword)
           {
               $http({
                   url:$rootScope.localhost+"index.php?m=goods&c=api&a=seller_reg",
                   method:"POST",
                   headers:{
                       'Content-Type':"application/x-www-form-urlencoded"
                   },
                   data:{
                       "mobile":mobile,"password":password,"repassword":repassword,"name":name,
                       "id":id,"add":add
                   }
               })
                   .success(function (data,status) {
                        if(data.error == 0){
                              console.log(data);
                              console.log(status);
                              $scope.showRegSuccessAlert()
                        };
                        if(data.error == 1){
                               console.log(data);
                               console.log(status);
                               $scope.showRegErrorAlert()
                         }
                        $scope.busRegData ={};
                   })

           }else{
               $scope.showAlert1();
               $scope.busRegData ={};
           }
        };
         //商家登录模块
            $scope.onBusLogin = function(){
                $scope.busLogin($scope.busLoginData.seller_name,$scope.busLoginData.password)
            }
           	$scope.busLogin = function(seller_name,password){
                var busLogin = angular.copy($scope.busLoginData);
                if(busLogin.seller_name && busLogin.password){
                    $http({
                        url:$rootScope.localhost+"index.php?m=goods&c=api&a=seller_login",
                        method:"POST",
                        headers:{
                            'Content-Type':"application/x-www-form-urlencoded"
                        },
                        data:{
                            "seller_name":seller_name,"password":password
                        }
                    })
                        .success(function (data,status) {
                            if(data.error == 0){
                                console.log("success!");
                                console.log(data);
                                console.log(status);
                                $scope.showLoginSuccessAlert()
                            }
                            if(data.error == 1){
                                console.log("success!");
                                console.log(data);
                                console.log(status);
                                $scope.showLoginErrorAlert()
                            }
                        })
                 }else{
                    $scope.showAlert();
                    $scope.busLoginData={};
                }
                $scope.busLoginData={}
           	};
    //修改密码
    $ionicModal.fromTemplateUrl('views/modal/modal6.html', {
        scope: $scope,      // 作用域使用父作用域
    }).then(function(modal) {
        $scope.modal6 = modal;
    });
    $scope.openModal6 = function() {
        $scope.modal6.show();
    };

    $scope.closeModal6 = function() {
        $scope.modal6.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal6.remove();
    });
    //个人登录注册的模态
    $ionicModal.fromTemplateUrl('views/modal/modal.html', {
        scope: $scope,      // 作用域使用父作用域
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    //商家登录注册的模态
    $ionicModal.fromTemplateUrl('views/modal/modal3.html', {
        scope: $scope,      // 作用域使用父作用域
    }).then(function(modal) {
        $scope.modal3 = modal;
    });
    $scope.openModal3  = function() {
        $scope.modal3.show();
    };

    $scope.closeModal3 = function() {
        $scope.modal3.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal3.remove();
    });


    $ionicModal.fromTemplateUrl('views/modal/modal1.html', {
         scope: $scope,      // 作用域使用父作用域
    }).then(function(modal) {
          $scope.modal1 = modal;
    });
    $scope.openModal1 = function() {
        $scope.modal1.show();
    };

    $scope.closeModal1 = function() {
        $scope.modal1.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal1.remove();
    });

    $ionicModal.fromTemplateUrl('views/modal/modal2.html', {
        scope: $scope,      // 作用域使用父作用域
    }).then(function(modal) {
        $scope.modal2 = modal;
    });
    $scope.openModal2 = function() {
        $scope.modal2.show();
    };

    $scope.closeModal2 = function() {
        $scope.modal2.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal2.remove();
    });

	//添加地址
	
    $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '提示',
            template: '确认退出当前账号?'

        });
        confirmPopup.then(function(res) {
            if(res) {
				localStorage.removeItem("isLogin")
				localStorage.removeItem("useravatar")
				localStorage.removeItem("username")
                $rootScope.isLogin = false;
                $rootScope.isMessage = false;
                $rootScope.personInformation = {};
                $rootScope.message = [];
                $rootScope.messageNum = {};
            } else {
                console.log('暂不');
            }
        });
    };





});
