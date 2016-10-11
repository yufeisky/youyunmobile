/**
 * 控制器入口：个人中心控制器
 */
var appController = angular.module('IonicClub.controllers', [])
    // 已上线未上线 收藏
    // 个人中心
    .controller('userCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$ionicLoading', '$ionicPopup', '$ionicHistory', '$ionicModal', '$timeout', 'localStorageService', 'IonicService', 'TabService', 'Con', function($scope, $rootScope, $stateParams, $state, $ionicLoading, $ionicPopup, $ionicHistory, $ionicModal, $timeout, localStorageService, IonicService, TabService, Con) {
            Con.log('个人中心控制器已加载');
            var postParams = {
            };
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
                IonicService.getUserInfo(postParams).then(function (data) {
                    if (data.status != '1') {
                        $rootScope.loginOut();
                    }

                    console.log('登录数据');
                    console.log(data);
                    $scope.userData = data.user;

                }).finally(function () {
                    Con.log('完成');
                });
            }else {
                $scope.userData={};
                $scope.userData.name="未登录";
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
            }

            $scope.changeUserPage=function(state,param){
                var User = JSON.parse(localStorageService.get('User'));
                if(!User){
                    Con.log('未登录');
                    $scope.isLogin = false;
                    localStorageService.remove('User');
                    $rootScope.openLoginModal();
                    $rootScope.changeState = 'tab.user';
                }else{
                    console.log(state);
                   // $rootScope.changePage(state,true);
                    $state.go(state,param);
                }
            }
            $scope.loginOutFn = function(){
                $scope.isLogin = false;
                localStorageService.remove('User');
                $timeout(function() {
                    $rootScope.changePage('tab.user',true);
                   // $rootScope.openLoginModal();
                  //  $rootScope.changeState = 'tab.user';
                }, 100);
            }
            $scope.loginFn = function(){
                $rootScope.openLoginModal();
                $rootScope.changeState = 'tab.user';
            }
        }
    ]);
