/**
 * 控制器入口：个人中心控制器
 */
var appController = angular.module('IonicClub.controllers', [])
    // 已上线未上线 收藏
    // 个人中心
    .controller('userCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$ionicLoading', '$ionicPopup', '$ionicHistory', '$ionicModal', '$timeout', 'localStorageService', 'IonicService', 'TabService', 'Con','MsgBox', function($scope, $rootScope, $stateParams, $state, $ionicLoading, $ionicPopup, $ionicHistory, $ionicModal, $timeout, localStorageService, IonicService, TabService, Con,MsgBox) {
        Con.log('个人中心控制器已加载');
        console.log('-------微信信息-----------')

        var postParams = {};
        var User = JSON.parse(localStorageService.get('User'));
        Con.log(User);
        if (User) {
            // $scope.logined = true;
            $scope.more = true;
            $scope.isLogin = true;
            Con.log('已登录');
            console.log('登录数据2222');
            postParams = {
                userToken: User.token,
                userId: User.id,
            };
            console.log('登录数据2222');
            IonicService.getUserInfo(postParams).then(function(data) {
                if (data.status != '1') {
                    $rootScope.loginOut();
                }

                console.log('登录数据');
                console.log(data);
                $scope.userData = data.user;
                if (!$scope.userData.picture) {
                    $scope.userData.picture = "./img/login.png"
                }

            }).finally(function() {
                Con.log('完成');
            });
        } else {
            $scope.userData = {};
            $scope.userData.name = "未登录";
            $scope.userData.picture = "./img/unlogin.png"
            console.log("未登录");
            $scope.isLogin = false;

            // 检测没有登陆调回到登陆页
            //Con.log('未登录');
            //$state.go('notlogin');
            //$scope.logined = false;
            //$scope.showConfirm();
            //$timeout(function() {
            //    $rootScope.changePage('tab.user');
            //}, 100);
            console.log('----------nickname-----------')
            $scope.weChatInfo = {
                "wcName": null,
                "wcheadImg": null,
                "wcopenid": null,
                "gender": null
            }
            jQuery(function() {
                if (jQuery.getUrlParam('nickname')) {
                    $scope.weChatInfo.wcName = jQuery.getUrlParam('nickname');
                }
                if (jQuery.getUrlParam('headImg')) {
                    $scope.weChatInfo.wcheadImg = jQuery.getUrlParam('headImg');
                }
                if (jQuery.getUrlParam('openid')) {
                    $scope.weChatInfo.wcopenid = jQuery.getUrlParam('openid');
                }
                if (jQuery.getUrlParam('gender')) {
                    $scope.weChatInfo.gender = jQuery.getUrlParam('gender');
                }

                console.log($scope.weChatInfo)
                // alert($scope.weChatInfo.wcName)
                if ($scope.weChatInfo.wcName != null) {
                    console.log($scope.weChatInfo.wcName)
                    var loginParams = {
                        "thirdParty": 'wx',
                        "username": $scope.weChatInfo.wcName,
                        "openID": $scope.weChatInfo.wcopenid,
                        "avatarURL": $scope.weChatInfo.wcheadImg,
                        "gender": $scope.weChatInfo.gender,

                    }
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                    IonicService.thirdPartyLogin(loginParams).then(function(data) {
                        
                        if (data.status != '1') {
                            MsgBox.showTexts('授权出现错误,请重新授权');
                            $scope.loginFn();
                        }
                        console.log('第三方登录接口回调数据');
                        console.log(data);
                        User = data.userInfo;
                        localStorageService.set('User', JSON.stringify(User));
                        // $rootScope.changeState
                        // $rootScope.changePage($rootScope.changeState, true);
                        // 强制刷新
                        $timeout(function(){
                            $ionicLoading.hide();
                            window.location.href=window.location.pathname+"#/tab/user";
                            location.reload(true);
                        },300)
                        // $rootScope.changePage($rootScope.changeState, true);
                        // $scope.userData={
                        //     "name":data.userInfo.name,
                        //     "picture":data.userInfo.portraitUrl,
                        // }
                        // if (!$scope.userData.portraitUrl) {
                        //     $scope.userData.picture = "./img/login.png"
                        // }
                    }).finally(function() {
                        Con.log('完成');
                    });
                }
            })

        }

        $scope.changeUserPage = function(state, param) {
            var User = JSON.parse(localStorageService.get('User'));
            if (!User) {
                Con.log('未登录');
                $scope.isLogin = false;
                localStorageService.remove('User');
                $rootScope.openLoginModal();
                $rootScope.changeState = 'tab.user';
            } else {
                console.log(state);
                // $rootScope.changePage(state,true);
                $state.go(state, param);
            }
        }
        $scope.loginOutFn = function() {
            $scope.isLogin = false;
            localStorageService.remove('User');
            $timeout(function() {
                $rootScope.changePage('tab.user', true);
                // $rootScope.openLoginModal();
                //  $rootScope.changeState = 'tab.user';
            }, 100);
        }
        $scope.loginFn = function() {
            $rootScope.openLoginModal();
            $rootScope.changeState = 'tab.user';
        }
    }]);
