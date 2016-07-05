/**
 * 控制器
 */
angular.module('IonicClub.controllers', [])
    // 个人中心
    .controller('userCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$ionicModal', 'localStorageService', 'IonicService', 'TabService', function($scope, $stateParams, $state, $ionicLoading, $ionicModal, localStorageService, IonicService, TabService) {
        console.log('个人中心控制器已加载');
        // // 取消收藏参数
        // $scope.deCollectData = {
        //     accesstoken: '',
        //     topic_id: ''
        // }
        var postParams = {

        };
        $scope.storys = [];
        $scope.offLineStorys = [];
        $scope.more = true;
        var User = JSON.parse(localStorageService.get('User'));
        console.log(User);
        if (User) {
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
        } else {
            // 检测没有登陆调回到登陆页
            $state.go('login');
        }

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
            //选中时执行的事件
            // $scope.storyTab = function(type, order) {

        //     $scope.currentTab = order;
        //     $scope.myActiveSlide = order;
        //     postParams.storyStatus = type;
        //     switch (type) {
        //         case '1':
        //             if (!$scope.storys) {
        //                 IonicService.getStorys(postParams).then(function(data) {
        //                     if (data.storys) {
        //                         $scope.storys = data.storys;
        //                     }
        //                 });
        //             }
        //             break;
        //         case '0':
        //             if (!$scope.offLineStorys) {
        //                 IonicService.getStorys(postParams).then(function(data) {
        //                     console.log(data)
        //                     if (data.storys) {
        //                         $scope.offLineStorys = data.storys;
        //                     }
        //                 });
        //             }
        //             break;
        //         case '3':
        //             console.log('我的收藏')
        //             break;
        //         case '4':
        //             console.log('我的动态');
        //             break;
        //     }

        // };
        $scope.loadMore = function(myActiveSlide, del) {
                // if (del) {
                //     console.log('删除')
                //     $scope.storys = [];
                //     $scope.offLineStorys =[];
                //     $scope.navs = [{
                //         title: '已上线',
                //         order: 0,
                //         storyStatus: '1',
                //         pageNum: 0
                //     }, {
                //         title: '未上线',
                //         order: 1,
                //         storyStatus: '0',
                //         pageNum: 0
                //     }, {
                //         title: '我的收藏',
                //         order: 2,
                //         storyStatus: '3',
                //         pageNum: 0
                //     }, {
                //         title: '我的动态',
                //         order: 3,
                //         storyStatus: '4',
                //         pageNum: 0
                //     }]
                // }
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
                                if (!data.storys[0]) {
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
                                if (!data.storys[0]) {
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
            // $scope.storyTab('1', '0');
            // 当前选中：
        $scope.myActiveSlide = '0';
    }])
    // 已上线未上线 收藏
    .controller('userstoryCtrl', ['$scope', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', 'localStorageService', 'ShareService', 'IonicService', function($scope, $stateParams, $ionicLoading, $ionicScrollDelegate, localStorageService, ShareService, IonicService) {
        console.log('未上线控制器');

    }])
    // 首页
    .controller('homeCtrl', ['$scope', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', 'localStorageService', 'ShareService', 'IonicService', function($scope, $stateParams, $ionicLoading, $ionicScrollDelegate, localStorageService, ShareService, IonicService) {


    }])
    // 关注
    .controller('starCtrl', ['$scope', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', 'localStorageService', 'ShareService', 'IonicService', function($scope, $stateParams, $ionicLoading, $ionicScrollDelegate, localStorageService, ShareService, IonicService) {


    }])
    //登录
    .controller('loginCtrl', ['$scope', '$ionicPopup', '$ionicHistory', '$state', '$cordovaBarcodeScanner', 'localStorageService', 'AppVersionService', 'IonicService', function($scope, $ionicPopup, $ionicHistory, $state, $cordovaBarcodeScanner, localStorageService, AppVersionService, IonicService) {
        /*        AppVersionService.getVersionNumber().then(function (data) {
         $scope.appVersion = data;
         });*/
        console.log('启用登录控制器');
        $scope.login = function(user) {
            console.log(user);
            if (typeof(user) == 'undefined' || !user.account) {
                $scope.showAlert('请输入账号');
                return false;
            }
            if (typeof(user) == 'undefined' || !user.password) {
                $scope.showAlert('请输入密码');
                return false;
            }
            IonicService.postLogin(user).then(function(data) {
                console.log(data.status);
                switch (data.status) {
                    case '0':
                        $scope.showAlert('账号或密码错误');
                        break;
                    case '1':
                        User = data.userInfo;
                        localStorageService.set('User', JSON.stringify(User));
                        $state.go('tab.user');
                }
                // console.log(data)
                var test = localStorageService.get('User');
                console.log(test);

            });


        };
        // An alert dialog
        $scope.showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Warning Message',
                template: msg
            });
        };
    }])

// 个人中心
.controller('AccountCtrl', ['$scope', '$ionicHistory', '$state', '$ionicModal', '$ionicLoading', 'localStorageService', 'AppVersionService', 'IonicService', function($scope, $ionicHistory, $state, $ionicModal, $ionicLoading, localStorageService, AppVersionService, IonicService) {

    /*AppVersionService.getVersionNumber().then(function (data) {
     $scope.appVersion = data;
     });*/

    // 取消收藏参数
    $scope.deCollectData = {
        accesstoken: '',
        topic_id: ''
    };

    var User = JSON.parse(localStorageService.get('User'));
    if (User) {
        $scope.deCollectData.accesstoken = User.accesstoken;
        IonicService.getUserByName(User.loginname).then(function(data) {
            $scope.Account = data.data;
        });
        IonicService.getMessages(User.accesstoken).then(function(data) {
            $scope.messages = data.data;
        });
    } else {
        $state.go('tab.login');
    }


    /*        // 设为已读
            $scope.setHasRead = function () {
                IonicService.postMessageMark_all(User.accesstoken).then(function (data) {
                    if (data.success) {
                        $ionicLoading.show({template: '设置成功', duration: 500});
                    }
                });
            }*/


    // 取消收藏
    $scope.deCollect = function(topicId) {
        $scope.deCollectData.topic_id = topicId;
        IonicService.postTopicDeCollect($scope.deCollectData).then(function(data) {
            if (data.success) {
                $ionicLoading.show({ template: '取消收藏成功', duration: 500 });
            }
        });
    };


    // 收藏
    $ionicModal.fromTemplateUrl('templates/Area/favorites.html', {
        id: '1',
        scope: $scope
    }).then(function(modal) {
        $scope.oModal1 = modal;
    });

    // 消息
    $ionicModal.fromTemplateUrl('templates/Area/messages.html', {
        id: '2',
        scope: $scope
    }).then(function(modal) {
        $scope.oModal2 = modal;
    });

    // 创建的话题
    $ionicModal.fromTemplateUrl('templates/Area/createTopics.html', {
        id: '3',
        scope: $scope
    }).then(function(modal) {
        $scope.oModal3 = modal;
    });

    // 参与的话题
    $ionicModal.fromTemplateUrl('templates/Area/joinTopics.html', {
        id: '4',
        scope: $scope
    }).then(function(modal) {
        $scope.oModal4 = modal;
    });

    $scope.openModal = function(index) {
        switch (index) {
            case 1:
                $scope.oModal1.show();
                break;
            case 2:
                $scope.oModal2.show().then(function() {
                    IonicService.postMessageMark_all(User.accesstoken).then(function(data) {
                        if (data.success) {
                            $scope.badges.message = 0;
                        }
                    });
                });
                break;
            case 3:
                $scope.oModal3.show();
                break;
            case 4:
                $scope.oModal4.show();
                break;
        }
    };

    $scope.closeModal = function(index) {
        switch (index) {
            case 1:
                $scope.oModal1.hide();
                break;
            case 2:
                $scope.oModal2.hide();
                break;
            case 3:
                $scope.oModal3.hide();
                break;
            case 4:
                $scope.oModal4.hide();
                break;
        }
    };
}])

// 个人详细
.controller('AccountDetailCtrl', ['$scope', '$ionicHistory', '$state', 'localStorageService', 'IonicService', function($scope, $ionicHistory, $state, localStorageService, IonicService) {
    var User = JSON.parse(localStorageService.get('User'));
    if (User) {
        IonicService.getUserByName(User.loginname).then(function(data) {
            $scope.Account = data.data;
        });
    }
    $scope.loginOut = function() {
        localStorageService.remove('User');
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $state.go("tab.login");
    };
}])

// // 用户详情
// .controller('UserCtrl', ['$scope', '$stateParams', 'IonicService', function ($scope, $stateParams, IonicService) {
//     IonicService.getUserByName($stateParams.loginname).then(function (data) {
//         $scope.Account = data.data;
//     })
// }])

.controller('IndexCtrl', ['$scope', 'localStorageService','$state', 'IonicService', 'TabService', function($scope, localStorageService,$state, IonicService, TabService) {
    $scope.badges = {
        message: 0
    };
    $scope.tabs = TabService.getTabs();

    var User = JSON.parse(localStorageService.get('User'));
    if (User) {
        IonicService.getMessageCount(User.token).then(function(data) {
            $scope.badges.message = data.data;
        });
    }
    //退出
    $scope.loginOut = function() {
        console.log('退出');
        localStorageService.remove('User');
        // $ionicHistory.nextViewOptions({
        //     disableAnimate: true,
        //     disableBack: true
        // });
        $state.go("login");
    };
}]);
