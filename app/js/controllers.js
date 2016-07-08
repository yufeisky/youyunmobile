/**
 * 控制器
 */
angular.module('IonicClub.controllers', [])
    // 已上线未上线 收藏
    // 个人中心
    .controller('userCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$ionicLoading', '$ionicPopup', '$ionicHistory', '$ionicModal', '$timeout', 'localStorageService', 'IonicService', 'TabService', function($scope, $rootScope, $stateParams, $state, $ionicLoading, $ionicPopup, $ionicHistory, $ionicModal, $timeout, localStorageService, IonicService, TabService) {
        console.log('个人中心控制器已加载');
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
        //         // console.log($ionicHistory.viewHistory().backView.stateName);
        //         console.log($ionicHistory.viewHistory());
        //         if ($ionicHistory.viewHistory().backView) {
        //             // console.log($ionicHistory.viewHistory().backView);
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
        console.log(User);
        if (User) {
            // $scope.logined = true;
            $scope.more = true;
            console.log('已登录');
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
                storyStatus: '4',
                pageNum: 0
            }];

            //判断哪个选中方法:
            $scope.isActiveTab = function(order) {
                // console.log('isactive')
                // console.log($scope.currentTab == order)
                return $scope.currentTab == order;
            };
            $scope.loadMore = function(myActiveSlide, del) {
                $scope.more = true;
                try {
                    $scope.currentTab = myActiveSlide;
                    $scope.myActiveSlide = myActiveSlide;
                    postParams.storyStatus = $scope.navs[myActiveSlide].storyStatus;
                    $scope.navs[myActiveSlide].pageNum = $scope.navs[myActiveSlide].pageNum + 1;
                    postParams.pageNum = $scope.navs[myActiveSlide].pageNum;
                    console.log(postParams.storyStatus);
                    switch (postParams.storyStatus) {
                        case '1':
                            IonicService.getStorys(postParams).then(function(data) {
                                if (!data.storys) {
                                    $scope.more = false;
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
                                if (!data.storys) {
                                    $scope.more = false;
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
                            console.log('我的收藏');
                            break;
                        case '4':
                            console.log('我的动态');
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
            console.log('未登录');
            // $state.go('notlogin');
            // $scope.logined = false;
            // $scope.showConfirm();
            $timeout(function() {
                $rootScope.changePage('tab.user');
            }, 100);

        }
    }])
    // 首页详情
    .controller('homeDetailCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', 'localStorageService', 'ShareService', 'IonicService', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, localStorageService, ShareService, IonicService) {
        // $rootScope.menuShow = true;
        // $rootScope.backShow = true;
        // console.log($stateParams);
        console.log('首页详情');
        var pubUrl = $stateParams.pubUrl;
        $scope.pubUrl = $sce.trustAsResourceUrl(pubUrl);
        // console.log($scope.pubUrl);
        $scope.storyShare = function() {
            console.log('点击触发');
            // alert('ok');
        };

    }])
    // 首页
    .controller('homeCtrl', ['$scope', '$rootScope', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', 'localStorageService', 'ShareService', 'IonicService', function($scope, $rootScope, $stateParams, $ionicLoading, $ionicScrollDelegate, localStorageService, ShareService, IonicService) {
        // 重置左上角的按钮
        // $rootScope.menuShow = true;
        // $rootScope.backShow = false;
        $scope.storys = [
            [],
            [],
            [],
            []
        ];
        $scope.more = true;
        $scope.navs = [{
            title: '推荐',
            order: 0,
            storyStatus: '4',
            pageNum: 0
        }, {
            title: '品牌故事',
            order: 1,
            storyStatus: '1',
            pageNum: 0
        }, {
            title: '热点资讯',
            order: 2,
            storyStatus: '2',
            pageNum: 0
        }, {
            title: '生活故事',
            order: 3,
            storyStatus: '3',
            pageNum: 0
        }];

        $scope.isActiveTab = function(order) {
            // console.log('isactive')
            // console.log($scope.currentTab == order)
            return $scope.currentTab == order;
        };
        var User = JSON.parse(localStorageService.get('User'));
        if (User) {
            postParams = {
                userToken: User.token,
                userId: User.id,
            };
        } else {
            postParams = {
                userToken: '',
                userId: '',
            };
        }
        // console.log('width');
        // console.log(angular.element(window)[0].innerWidth);
        var win_w = angular.element(window)[0].innerWidth;
        $scope.img_w = win_w * 0.45 * 0.9 + 'px';
        // console.log($scope.img_w);
        $scope.loadMore = function(myActiveSlide, del) {
            $scope.more = true;
            // console.log('-----myActiveSlide------');
            // console.log(myActiveSlide)
            try {
                $scope.currentTab = myActiveSlide;
                // console.log($scope.currentTab);
                $scope.myActiveSlide = myActiveSlide;
                postParams.storyType = $scope.navs[myActiveSlide].storyStatus;
                $scope.navs[myActiveSlide].pageNum = $scope.navs[myActiveSlide].pageNum + 1;
                postParams.pageNum = $scope.navs[myActiveSlide].pageNum;
                console.log(postParams.storyType);
                IonicService.getHomeStorys(postParams).then(function(data) {
                    // console.log(data)
                    if (!data.storys[0]) {
                        $scope.more = false;
                    }
                    if (data.storys) {
                        if (postParams.pageNum == 1) {
                            $scope.storys[$scope.currentTab] = data.storys;
                        } else {
                            angular.forEach(data.storys, function(item) {
                                $scope.storys[$scope.currentTab].push(item);
                            });
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    }
                    // console.log($scope.storys);
                });
                // switch (postParams.storyType) {
                //     case '1':
                //         IonicService.getHomeStorys(postParams).then(function(data) {
                //             console.log(data)
                //             if (!data.storys[0]) {
                //                 $scope.more = false;
                //             }
                //             if (data.storys) {
                //                 if (postParams.pageNum == 1) {
                //                     $scope.storys = data.storys;
                //                 } else {
                //                     angular.forEach(data.storys, function(item) {
                //                         $scope.storys.push(item);
                //                     });
                //                 }
                //                 $scope.$broadcast('scroll.infiniteScrollComplete');

                //             }
                //         });
                //         break;
                //     case '2':
                //         IonicService.getHomeStorys(postParams).then(function(data) {
                //             if (!data.storys[0]) {
                //                 $scope.more = false;
                //             }
                //             if (data.storys) {
                //                 if (postParams.pageNum == 1) {
                //                     $scope.brandStorys = data.storys;
                //                 } else {
                //                     angular.forEach(data.storys, function(item) {
                //                         $scope.offLineStorys.push(item);
                //                     });
                //                 }
                //                 $scope.$broadcast('scroll.infiniteScrollComplete');
                //             }
                //         });
                //         break;
                //     case '3':
                //         console.log('我的收藏');
                //         break;
                //     case '4':
                //         console.log('我的动态');
                //         break;
                // }
            } catch (ex) {
                $scope.more = false;
            }

        };
        // 当前选中：
        $scope.myActiveSlide = '0';

    }])
    // 关注
    .controller('starCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$timeout', 'localStorageService', 'ShareService', 'IonicService', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $timeout, localStorageService, ShareService, IonicService) {
        // 重置左上角的按钮
        // $rootScope.menuShow = true;
        // $rootScope.backShow = false;
        // 模态框登陆
        var User = JSON.parse(localStorageService.get('User'));
        console.log(User);
        if (User) {

        } else {
            $timeout(function() {
                $rootScope.changePage('tab.star');
            }, 100);
        }

    }])
    //登录
    .controller('loginCtrl', ['$scope', '$rootScope', '$ionicPopup', '$ionicHistory', '$state', '$cordovaBarcodeScanner', '$ionicSlideBoxDelegate', '$interval', '$ionicModal', 'localStorageService', 'AppVersionService', 'IonicService', 'MsgBox', function($scope, $rootScope, $ionicPopup, $ionicHistory, $state, $cordovaBarcodeScanner, $ionicSlideBoxDelegate, $interval, $ionicModal, localStorageService, AppVersionService, IonicService, MsgBox) {
        /*        AppVersionService.getVersionNumber().then(function (data) {
         $scope.appVersion = data;
         });*/
        console.log('启用登录控制器');
        // console.log($ionicHistory.viewHistory())
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
            IonicService.postLogin(user).then(function(data) {
                console.log(data.status);
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
                // console.log(data)
                var test = localStorageService.get('User');
                console.log(test);

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
                    $scope.verTxt = alltime + 'S';
                } else {
                    $scope.isDisabled = false;
                    $scope.verTxt = '获取验证码';
                    $interval.cancel(timer);
                }
            }, 1000);
            IonicService.postPhoneCode({ 'phoneNumber': phoneNumber }).then(function(data) {
                console.log(data.status);
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
                console.log(data.status);
                switch (data.status) {
                    case '0':
                        MsgBox.showTexts('账号或密码错误');
                        break;
                    case '1':
                        User = data.userInfo;
                        localStorageService.set('User', JSON.stringify(User));
                        $rootScope.closeLoginModal();
                        $rootScope.changePage($rootScope.changeState, true);
                        // $state.go('tab.user');
                }
                // console.log(data)
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
    }])

.controller('IndexCtrl', ['$scope', '$rootScope', 'localStorageService', '$state', '$ionicModal', '$ionicSlideBoxDelegate', '$timeout', 'IonicService', 'TabService', function($scope, $rootScope, localStorageService, $state, $ionicModal, $ionicSlideBoxDelegate, $timeout, IonicService, TabService) {
    $scope.badges = {
        message: 0
    };
    $scope.tabs = TabService.getTabs();
    $rootScope.UserInfo = JSON.parse(localStorageService.get('User'));
    // var User = JSON.parse(localStorageService.get('User'));
    // if (User) {
    //     // IonicService.getMessageCount(User.token).then(function(data) {
    //     //     $scope.badges.message = data.data;
    //     // });
    // }
    //退出
    $scope.loginOut = function() {
        console.log('退出');
        localStorageService.remove('User');
        // $ionicHistory.nextViewOptions({
        //     disableAnimate: true,
        //     disableBack: true
        // });
        // $state.go("login");
        location.reload(true);
    };

}])

.controller('TabsCtrl', ['$scope', '$rootScope', 'localStorageService', '$state', '$ionicModal', '$ionicSlideBoxDelegate', '$timeout', 'IonicService', 'TabService', function($scope, $rootScope, localStorageService, $state, $ionicModal, $ionicSlideBoxDelegate, $timeout, IonicService, TabService) {
    $rootScope.$on('$ionicView.beforeEnter', function() {
        var statename = $state.current.name;
        // console.log('-------statename----');
        // console.log(statename);
        //tabs中存在的主页面不需要隐藏，hidetabs=false
        if (statename === 'tab.homeDetail') {
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
        if (type && (($rootScope.changeState == 'tab.star') || ($rootScope.changeState == 'tab.user'))) {
            $state.go('tab.home');
        }
        $scope.loginmodal.hide();
    };
    $rootScope.changePage = function(state, reload) {
        $rootScope.changeState = state;
        $rootScope.UserInfo = JSON.parse(localStorageService.get('User'));
        // console.log('------changestate------')
        // console.log(state)
        // console.log($rootScope.UserInfo)
        if ($rootScope.UserInfo) {
            if (($rootScope.changeState == 'tab.user' || $rootScope.changeState == 'tab.star') && reload) {
                console.log('重载');
                $state.go(state);
                $timeout(function() {
                    location.reload(true);
                }, 200);
            } else {
                console.log('不重载');
                $state.go(state);
            }

        } else {
            $rootScope.openLoginModal();
        }
    };

}]);
