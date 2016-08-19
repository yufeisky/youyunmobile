/**
 * 控制器
 */
var appController = angular.module('IonicClub.controllers', [])
    // 已上线未上线 收藏
    // 个人中心
    .controller('userCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$ionicLoading', '$ionicPopup', '$ionicHistory', '$ionicModal', '$timeout', 'localStorageService', 'IonicService', 'TabService', 'Con', function($scope, $rootScope, $stateParams, $state, $ionicLoading, $ionicPopup, $ionicHistory, $ionicModal, $timeout, localStorageService, IonicService, TabService, Con) {
        Con.log('个人中心控制器已加载');
        // 重置左上角的按钮
        // $rootScope.menuShow = true;
        // $rootScope.backShow = false;
        // // 取消收藏参数
        // $scope.deCollectData = {
        //     accesstoken: '',
        //     topic_id: ''
        // }
        var postParams = {

        };
        $scope.storys = [];
        $scope.offLineStorys = [];
        $scope.collectStorys = [];
        // // 模态框登陆
        // $ionicModal.fromTemplateUrl('templates/login.html', {
        //     scope: $scope,
        //     animation: 'slide-in-up'
        // }).then(function(modal) {
        //     $scope.loginmodal = modal;
        // });
        // $rootScope.openLoginModal = function() {
        //     $scope.loginmodal.show();
        // };
        // $rootScope.closeLoginModal = function(type) {
        //     if (type) {
        //         // Con.log($ionicHistory.viewHistory().backView.stateName);
        //         Con.log($ionicHistory.viewHistory());
        //         if ($ionicHistory.viewHistory().backView) {
        //             // Con.log($ionicHistory.viewHistory().backView);
        //             var gobackname = $ionicHistory.viewHistory().backView.stateName;
        //             $state.go(gobackname);
        //         } else {
        //             $state.go('tab.home');
        //             // 直接刷新登陆页面后退的时候需要重载首页，要不然路由会乱
        //             location.reload(true);
        //         }
        //     }
        //     $scope.loginmodal.hide();
        // };

        var User = JSON.parse(localStorageService.get('User'));
        Con.log(User);
        if (User) {
            // $scope.logined = true;
            $scope.more = true;
            Con.log('已登录');
            postParams = {
                userToken: User.token,
                userId: User.id,
            };
            // $scope.deCollectData.accesstoken = User.accesstoken;
            // IonicService.getUserByName(User.token).then(function(data) {
            //     $scope.Account = data.data;
            // })
            // IonicService.getMessages(User.accesstoken).then(function(data) {
            //     $scope.messages = data.data;
            // })


            //nav数据
            $scope.navs = [{
                title: '已上线',
                order: 0,
                storyStatus: '1',
                pageNum: 0
            }, {
                title: '未上线',
                order: 1,
                storyStatus: '0',
                pageNum: 0
            }, {
                title: '我的收藏',
                order: 2,
                storyStatus: '3',
                pageNum: 0
            }, {
                title: '我的动态',
                order: 3,
                storyStatus: '3', //本应该填4,不过暂时没有这项数据，所以暂时写3，用收藏那块的数据
                pageNum: 0
            }];

            //判断哪个选中方法:
            $scope.isActiveTab = function(order) {
                // Con.log('isactive')
                // Con.log($scope.currentTab == order)
                return $scope.currentTab == order;
            };
            $scope.doRefresh = function(myActiveSlide, del) {
                $scope.more = true;
                try {
                    $scope.currentTab = myActiveSlide;
                    $scope.myActiveSlide = myActiveSlide;
                    postParams.storyStatus = $scope.navs[myActiveSlide].storyStatus;
                    $scope.navs[myActiveSlide].pageNum = 1;
                    postParams.pageNum = $scope.navs[myActiveSlide].pageNum;
                    Con.log(postParams.storyStatus);
                    switch (postParams.storyStatus) {
                        case '1':
                            IonicService.getStorys(postParams).then(function(data) {
                                // console.log(data.storys);
                                if (data.messageType == '2') {
                                    $rootScope.loginOut();
                                }
                                if (angular.equals(data.storys, [])) {
                                    $scope.more = false;
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                                if (data.storys) {
                                    if (postParams.pageNum == 1) {
                                        $scope.storys = data.storys;
                                    }
                                    $scope.$broadcast('scroll.infiniteScrollComplete');

                                }
                            }).finally(function() {
                                Con.log('完成');
                                $scope.$broadcast('scroll.refreshComplete');
                            });
                            break;
                        case '0':
                            IonicService.getStorys(postParams).then(function(data) {
                                if (data.messageType == '2') {
                                    $rootScope.loginOut();
                                }
                                if (angular.equals(data.storys, [])) {
                                    $scope.more = false;
                                    $scope.$broadcast('scroll.refreshComplete');
                                }
                                if (data.storys) {
                                    if (postParams.pageNum == 1) {
                                        $scope.offLineStorys = data.storys;
                                    }
                                    $scope.$broadcast('scroll.refreshComplete');
                                }
                            }).finally(function() {
                                Con.log('完成');
                                $scope.$broadcast('scroll.refreshComplete');
                            });
                            break;
                        case '3':
                            IonicService.getCollectStorys(postParams).then(function(data) {
                                Con.log(data);
                                if (data.messageType == '2') {
                                    $rootScope.loginOut();
                                }
                                if (angular.equals(data.storys, [])) {
                                    $scope.more = false;
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                                if (data.storys) {
                                    if (postParams.pageNum == 1) {
                                        $scope.collectStorys = data.storys;
                                    }
                                    $scope.$broadcast('scroll.refreshComplete');
                                }
                            }).finally(function() {
                                Con.log('完成');
                                $scope.$broadcast('scroll.refreshComplete');
                            });
                            break;
                            // break;
                        case '4':
                            IonicService.getCollectStorys(postParams).then(function(data) {
                                Con.log(data);
                                if (data.messageType == '2') {
                                    $rootScope.loginOut();
                                }
                                if (angular.equals(data.storys, [])) {
                                    $scope.more = false;
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                                if (data.storys) {
                                    if (postParams.pageNum == 1) {
                                        $scope.collectStorys = data.storys;
                                    }
                                    $scope.$broadcast('scroll.refreshComplete');
                                }
                            }).finally(function() {
                                Con.log('完成');
                                $scope.$broadcast('scroll.refreshComplete');
                            });
                            break;
                    }
                } catch (ex) {

                }
            };
            $scope.loadMore = function(myActiveSlide, del) {
                $scope.more = true;
                try {
                    $scope.currentTab = myActiveSlide;
                    $scope.myActiveSlide = myActiveSlide;
                    postParams.storyStatus = $scope.navs[myActiveSlide].storyStatus;
                    $scope.navs[myActiveSlide].pageNum = $scope.navs[myActiveSlide].pageNum + 1;
                    postParams.pageNum = $scope.navs[myActiveSlide].pageNum;
                    Con.log(postParams.storyStatus);
                    switch (postParams.storyStatus) {
                        case '1':
                            IonicService.getStorys(postParams).then(function(data) {
                                if (data.messageType == '2') {
                                    $rootScope.loginOut();
                                }
                                if (angular.equals(data.storys, [])) {
                                    $scope.more = false;
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                                if (data.storys) {
                                    if (postParams.pageNum == 1) {
                                        $scope.storys = data.storys;
                                    } else {
                                        angular.forEach(data.storys, function(item) {
                                            $scope.storys.push(item);
                                        });
                                    }
                                    $scope.$broadcast('scroll.infiniteScrollComplete');

                                }
                            });
                            break;
                        case '0':
                            IonicService.getStorys(postParams).then(function(data) {
                                Con.log(data);
                                if (data.messageType == '2') {
                                    $rootScope.loginOut();
                                }
                                if (angular.equals(data.storys, [])) {
                                    $scope.more = false;
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                                if (data.storys) {
                                    if (postParams.pageNum == 1) {
                                        $scope.offLineStorys = data.storys;
                                    } else {
                                        angular.forEach(data.storys, function(item) {
                                            $scope.offLineStorys.push(item);
                                        });
                                    }
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                            });
                            break;
                        case '3':
                            IonicService.getCollectStorys(postParams).then(function(data) {
                                Con.log(data);
                                if (data.messageType == '2') {
                                    $rootScope.loginOut();
                                }
                                if (angular.equals(data.storys, [])) {
                                    $scope.more = false;
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                                if (data.storys) {
                                    if (postParams.pageNum == 1) {
                                        $scope.collectStorys = data.storys;
                                    } else {
                                        angular.forEach(data.storys, function(item) {
                                            $scope.collectStorys.push(item);
                                        });
                                    }
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                            });
                            break;
                        case '4':
                            Con.log('我的动态');
                            break;
                    }
                } catch (ex) {
                    $scope.more = false;
                }

            };
            // 当前选中：
            $scope.myActiveSlide = '0';
        } else {
            // 检测没有登陆调回到登陆页
            Con.log('未登录');
            // $state.go('notlogin');
            // $scope.logined = false;
            // $scope.showConfirm();
            $timeout(function() {
                $rootScope.changePage('tab.user');
            }, 100);

        }
    }]);
    
