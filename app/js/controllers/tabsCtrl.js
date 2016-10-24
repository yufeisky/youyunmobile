/**
 * tab控制器：
 *create by yufei
 */
appController.controller('TabsCtrl', ['$scope', '$rootScope', 'localStorageService', '$state', '$ionicModal', '$ionicSlideBoxDelegate', '$timeout', 'IonicService', 'TabService', 'WechatApi', 'Con', function($scope, $rootScope, localStorageService, $state, $ionicModal, $ionicSlideBoxDelegate, $timeout, IonicService, TabService, WechatApi, Con) {
    $rootScope.$on('$ionicView.beforeEnter', function() {
        var statename = $state.current.name;
        // Con.log('-------statename----');
        // Con.log(statename);
        //tabs中存在的主页面不需要隐藏，hidetabs=false
        if (statename === 'tab.homeDetail' || statename === 'tab.edit' || statename === 'tab.moreDesign' || statename === 'tab.designDetail' || statename === 'tab.previewStory' || statename === 'tab.setStoryInfo' || statename === 'tab.setStoryCategories' || statename === 'tab.sortPage' || statename === 'tab.addPage' || statename === 'tab.changeStoryMusic'|| statename === 'tab.displayData') {
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
        if (type && ($rootScope.changeState == 'tab.lbs')) {
            $state.go('tab.home');
        }
        $scope.loginmodal.hide();
    };
    $rootScope.changePage = function(state, reload) {
        console.log('changePage');
        console.log(state);
        console.log(reload);
        $rootScope.changeState = state;
        $rootScope.UserInfo = JSON.parse(localStorageService.get('User'));
        // Con.log('------changestate------')
        // Con.log(state)
        // Con.log($rootScope.UserInfo)
        if ($rootScope.changeState == 'tab.home' || ($rootScope.changeState == 'tab.design')) {
            $state.go(state);
            return false;
        }
        if ($rootScope.UserInfo) {
            if ((($rootScope.changeState == 'tab.user') || ($rootScope.changeState == 'tab.design')) && reload) {
                Con.log('重载');
                $state.go(state);
                $timeout(function() {
                    location.reload(true);
                }, 200);
            } else {
                Con.log('不重载');
                $state.go(state);
            }

        } else if (($rootScope.changeState == 'tab.user') && (!$rootScope.UserInfo) && reload) {
            $state.go(state);
            $timeout(function() {
                location.reload(true);
            }, 200);
        } else if (($rootScope.changeState == 'tab.user') && (!$rootScope.UserInfo)) {
            $state.go(state);
        } else {
            $rootScope.openLoginModal();
        }
    };
    WechatApi.f_wxShare();

}]);
