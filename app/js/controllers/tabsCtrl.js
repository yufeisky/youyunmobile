appController.controller('TabsCtrl', ['$scope', '$rootScope', 'localStorageService', '$state', '$ionicModal', '$ionicSlideBoxDelegate', '$timeout', 'IonicService', 'TabService', 'WechatApi', 'Con', function($scope, $rootScope, localStorageService, $state, $ionicModal, $ionicSlideBoxDelegate, $timeout, IonicService, TabService, WechatApi, Con) {
    $rootScope.$on('$ionicView.beforeEnter', function() {
        var statename = $state.current.name;
        // Con.log('-------statename----');
        // Con.log(statename);
        //tabs中存在的主页面不需要隐藏，hidetabs=false
        if (statename === 'tab.homeDetail' || statename === 'tab.edit') {
            $rootScope.hideTabs = true;
        } else {
            $rootScope.hideTabs = false;
        }
    });

    // 模态框登陆
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.loginmodal = modal;
    });
    $rootScope.openLoginModal = function() {
        $rootScope.UserInfo = JSON.parse(localStorageService.get('User'));
        if ($rootScope.UserInfo) {
            alert('你已经登陆');
        } else {
            $scope.loginmodal.show();
        }
    };
    $rootScope.closeLoginModal = function(type) {
        if (type && (($rootScope.changeState == 'tab.lbs') || ($rootScope.changeState == 'tab.user'))) {
            $state.go('tab.home');
        }
        $scope.loginmodal.hide();
    };
    $rootScope.changePage = function(state, reload) {
        $rootScope.changeState = state;
        $rootScope.UserInfo = JSON.parse(localStorageService.get('User'));
        // Con.log('------changestate------')
        // Con.log(state)
        // Con.log($rootScope.UserInfo)
        if ($rootScope.changeState == 'tab.home') {
            $state.go(state);
            return false;
        }
        if ($rootScope.UserInfo) {
            if (($rootScope.changeState == 'tab.user') && reload) {
                Con.log('重载');
                $state.go(state);
                $timeout(function() {
                    location.reload(true);
                }, 200);
            } else {
                Con.log('不重载');
                $state.go(state);
            }

        } else {
            $rootScope.openLoginModal();
        }
    };
    WechatApi.f_wxShare();

}]);