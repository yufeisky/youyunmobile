//登录
appController.controller('loginCtrl', ['$scope', '$rootScope', '$ionicPopup', '$ionicHistory', '$state', '$cordovaBarcodeScanner', '$ionicSlideBoxDelegate', '$interval', '$timeout', '$ionicModal','$ionicLoading', 'localStorageService', 'AppVersionService', 'IonicService', 'MsgBox', 'Con', function($scope, $rootScope, $ionicPopup, $ionicHistory, $state, $cordovaBarcodeScanner, $ionicSlideBoxDelegate, $interval, $timeout, $ionicModal,$ionicLoading, localStorageService, AppVersionService, IonicService, MsgBox, Con) {
    /*        AppVersionService.getVersionNumber().then(function (data) {
     $scope.appVersion = data;
     });*/
    Con.log('启用登录控制器');
    // Con.log($ionicHistory.viewHistory())
    // 重置左上角的按钮


    // if ($ionicHistory.viewHistory().backView) {
    //     $rootScope.menuShow = false;
    //     $rootScope.backShow = true;
    // } else {
    //     $rootScope.menuShow = true;
    //     $rootScope.backShow = false;
    // }
    // $scope.modal.hide();
    // var loginInfo = localStorageService.get('User');
    // if (loginInfo) {
    //     // $location.path('/tab/user');
    //     $ionicHistory.goBack();
    // }
    // $scope.quickUser['phoneNumber']='18026142152'
    // $scope.quickUser={
    //     phoneNumber:18102512553,
    //     validateCode:111111
    // }
    // $timeout(function() {
    //         Con.log($scope.quickUser)
    //     }, 6000)
    //测试账号1快速登陆
    $scope.quickUser = {
        phoneNumber: '',
        validateCode: ''
    };
    $scope.testLogin = function() {
        IonicService.postLogin({ account: '15917436116', password: '123456' }).then(function(data) {
            Con.log(data.status);
            switch (data.status) {
                case '0':
                    MsgBox.showTexts('账号或密码错误');
                    break;
                case '1':
                    User = data.userInfo;
                    localStorageService.set('User', JSON.stringify(User));
                    $rootScope.closeLoginModal();
                    // var currentId = $ionicHistory.viewHistory().currentView.stateId;
                    $rootScope.changePage($rootScope.changeState, true);

                    // $state.go(currentId,{reload:true});
            }
            // Con.log(data)
            var test = localStorageService.get('User');
            Con.log(test);
        });
    };
    //测试账号2快速登陆
    $scope.test2Login = function() {
         // Setup the loader
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        IonicService.postLogin({ account: '377210718@qq.com', password: 'yf123456' }).then(function(data) {
            Con.log(data.status);
            $ionicLoading.hide();
            switch (data.status) {
                case '0':
                    MsgBox.showTexts('账号或密码错误');
                    break;
                case '1':
                    User = data.userInfo;
                    localStorageService.set('User', JSON.stringify(User));
                    $rootScope.closeLoginModal();
                    // var currentId = $ionicHistory.viewHistory().currentView.stateId;
                    console.log($rootScope.changeState);
                    $rootScope.changePage($rootScope.changeState, true);

                    // $state.go(currentId,{reload:true});
            }
            // Con.log(data)
            var test = localStorageService.get('User');
            Con.log(test);
        });
    };
    //快速体验
    $scope.test3Login = function() {
         // Setup the loader
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        IonicService.newTestUser().then(function(data) {
            Con.log(data.status);
            $ionicLoading.hide();
            switch (data.status) {
                case '0':
                    MsgBox.showTexts('账号或密码错误');
                    break;
                case '1':
                    User = data.userInfo;
                    localStorageService.set('User', JSON.stringify(User));
                    $rootScope.closeLoginModal();
                    // var currentId = $ionicHistory.viewHistory().currentView.stateId;
                    console.log($rootScope.changeState);
                    $rootScope.changePage($rootScope.changeState, true);

                    // $state.go(currentId,{reload:true});
            }
            // Con.log(data)
            var test = localStorageService.get('User');
            Con.log(test);
        });
    };

    $scope.loginTitile = '手机号登录';
    $scope.login = function(user) {
        if (typeof(user) == 'undefined' || !user.account) {
            // $scope.showAlert('请输入账号');
            MsgBox.showTexts('请输入账号');
            return false;
        }
        var phoneReg = /1[3|5|7|8|][0-9]{9}/;
        var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ((!phoneReg.test(user.account)) && (!emailReg.test(user.account))) {
            MsgBox.showTexts('请输入正确的账号');
            return false;
        }
        if (typeof(user) == 'undefined' || !user.password) {
            MsgBox.showTexts('请输入密码');
            return false;
        }
        // Setup the loader
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        IonicService.postLogin(user).then(function(data) {
            Con.log(data.status);
            $ionicLoading.hide();
            switch (data.status) {
                case '0':
                    MsgBox.showTexts('账号或密码错误');
                    break;
                case '1':
                    User = data.userInfo;
                    localStorageService.set('User', JSON.stringify(User));
                    $rootScope.closeLoginModal();
                    // var currentId = $ionicHistory.viewHistory().currentView.stateId;
                    $rootScope.changePage($rootScope.changeState, true);

                    // $state.go(currentId,{reload:true});
            }
            // Con.log(data)
            var test = localStorageService.get('User');
            Con.log(test);

        });


    };
    $scope.isDisabled = false;
    $scope.verTxt = '获取验证码';
    var alltime = 60;
    //获取手机验证码
    $scope.ajaxSendValidate = function(phoneNumber) {
        if (!phoneNumber) {
            MsgBox.showTexts('请输入手机号码');
            return false;
        }
        var reg1 = /1[3|5|7|8|][0-9]{9}/;
        if (!reg1.test(phoneNumber)) {
            MsgBox.showTexts('请输入有效的手机号码');
            return false;
        }
        $scope.isDisabled = true;
        $scope.verTxt = '60s';
        var timer = $interval(function() {
            if (alltime > 0) {
                alltime--;
                $scope.verTxt = alltime + 's';
            } else {
                $scope.isDisabled = false;
                $scope.verTxt = '获取验证码';
                $interval.cancel(timer);
            }
        }, 1000);
        IonicService.postPhoneCode({ 'phoneNumber': phoneNumber }).then(function(data) {
            Con.log(data.status);
            switch (data.status) {
                case '0':
                    MsgBox.showTexts('获取手机验证码失败');
                    break;
                case '1':
                    MsgBox.showTexts('成功获取手机验证码');
            }
        });
    };
    //快速登录

    $scope.quickLogin = function(quickuser) {
        if (typeof(quickuser) == 'undefined' || !quickuser.phoneNumber) {
            MsgBox.showTexts('请输入手机号码');
            return false;
        }
        if (typeof(quickuser) == 'undefined' || !quickuser.validateCode) {
            MsgBox.showTexts('请输入验证码');
            return false;
        }
        IonicService.postQuickLogin(quickuser).then(function(data) {
            Con.log(data.status);
            switch (data.status) {
                case '0':
                    MsgBox.showTexts('账号或密码错误');
                    // Con.log($scope.quickUser)
                    $timeout(function() {
                        $scope.quickUser = {
                            phoneNumber: quickuser.phoneNumber,
                            validateCode: ''
                        };
                        jQuery('.phoneCode').focus();
                        jQuery('.phoneCode').val('');
                        Con.log($scope.quickUser);
                    }, 1500);
                    break;
                case '1':
                    User = data.userInfo;
                    localStorageService.set('User', JSON.stringify(User));
                    $rootScope.closeLoginModal();
                    $rootScope.changePage($rootScope.changeState, true);
                    // $state.go('tab.user');
            }
            // Con.log(data)
            // var test = localStorageService.get('User');
        });


    };

    // An alert dialog
    $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
            title: '输入错误',
            template: msg
        });

    };

    // 切换
    $scope.slideChangefn = function(index) {
        // $scope.myActiveSlide = index;
        $ionicSlideBoxDelegate.slide(index, 300);
    };
    $scope.loginslideChange = function(index) {
        switch (index) {
            case 0:
                $scope.loginTitile = '手机号登录';
                break;
            case 1:
                $scope.loginTitile = '密码登录';
                break;
        }
    };
    $ionicSlideBoxDelegate.$getByHandle('homeListBox').enableSlide(false);
    // $ionicSlideBoxDelegate.enableSlide(false);
}]);
