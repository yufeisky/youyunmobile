/**
 * 控制器
 */
angular.module('IonicClub.controllers', [])
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
                                console.log(data.storys)
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
    }])
    // 首页详情
    .controller('homeDetailCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
        // $rootScope.menuShow = true;
        // $rootScope.backShow = true;
        // Con.log($stateParams);
        Con.log('首页详情');
        // Con.log($stateParams);
        // 用ifarme展示
        $scope.urlParams = JSON.parse($stateParams.storyObject);
        Con.log($scope.urlParams);
        if (!$scope.urlParams.browse_count) {
            $scope.urlParams.browse_count = 0;
        }
        if (!$scope.urlParams.share_count) {
            $scope.urlParams.share_count = 0;
        }
        if (!$scope.urlParams.collection_count) {
            $scope.urlParams.collection_count = 0;
        }
        // iframe需要sce转化之后才可以打开
        $scope.pubUrl = $sce.trustAsResourceUrl($scope.urlParams.pub_url);

        // Con.log(User);
        // Con.log($scope.pubUrl);
        // 收藏
        $scope.collectFn = function() {
            var User = JSON.parse(localStorageService.get('User'));
            if (User) {
                var data = {
                    userToken: User.token,
                    userId: User.id,
                    objectId: $scope.urlParams.story_id
                };
                IonicService.postCollectStory(data).then(function(data) {
                    Con.log(data);
                    // Con.log(data.storys[0].collection_count);

                    switch (data.messageType) {
                        case '1':
                            $scope.closePopover();
                            MsgBox.showTexts('收藏成功');
                            $scope.urlParams.collection_count = data.storys[0].collection_count;
                            break;
                        case '2':
                            localStorageService.remove('User');
                            $rootScope.openLoginModal();
                            break;
                        case '4':
                            $scope.closePopover();
                            MsgBox.showTexts('该故事你已收藏过');
                            break;
                    }

                }).finally(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            } else {
                $rootScope.openLoginModal();
            }
        };
        //分享弹窗提示
        $scope.showPopup = function() {
            //关闭分享模块面板
            $scope.closePopover();
            $scope.data = {};
            // 自定义弹窗
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/Area/appSharePopup.html',
                // title: '请点击浏览器右上角...按钮分享轻故事',
                scope: $scope,
                buttons: [{
                    text: '<b>我知道了</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        myPopup.close();
                        //关闭的时候把特有的class清除
                        jQuery(function() {
                            setTimeout(function() {
                                jQuery('.popup-container').removeClass('sharePopupContainer');
                            }, 200);
                        });

                    }
                }, ]
            });
            //设一个特有的class来设置样式
            jQuery(function() {
                jQuery('.popup-container').addClass('sharePopupContainer');
            });

        };
        $rootScope.shareStory = function() {
            IonicService.postShareStory({
                objectId: $scope.urlParams.story_id
            }).then(function(data) {
                Con.log(data);
                // Con.log(data.storys[0].collection_count);
                switch (data.messageType) {
                    case '1':
                        // MsgBox.showTexts('收藏成功');
                        $scope.urlParams.share_count = data.storys[0].share_count;
                        break;
                }

            });
        };


        // 分享收藏模块
        $ionicPopover.fromTemplateUrl('templates/Area/appShare.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });


        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        // 微信授权
        $rootScope.upal_share = {
            title: $scope.urlParams.story_title, // 分享标题
            desc: $scope.urlParams.second_title, // 分享描述
            share_link: $scope.urlParams.pub_url, // 分享链接
            imgUrl: $scope.urlParams.img_src, // 分享图标
            currentUrl: location.href //当前页面的网址，签名的时候要用
        };
        WechatApi.f_wxReady();
        // Con.log(User);

    }])
    // 首页
    .controller('homeCtrl', ['$scope', '$rootScope', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicSlideBoxDelegate', 'localStorageService', 'ShareService', 'IonicService', 'Con', function($scope, $rootScope, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicSlideBoxDelegate, localStorageService, ShareService, IonicService, Con) {
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
            storyStatus: '3', //4暂时没数据 所以写3
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
            // Con.log('isactive')
            // Con.log($scope.currentTab == order)
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
        // Con.log('width');
        // Con.log(angular.element(window)[0].innerWidth);
        var win_w = angular.element(window)[0].innerWidth;
        $scope.img_w = win_w * 0.45 * 0.9 + 'px';
        // Con.log($scope.img_w);

        $scope.doRefresh = function(myActiveSlide) {
            $scope.more = true;
            $scope.currentTab = myActiveSlide;
            // Con.log($scope.currentTab);
            $scope.myActiveSlide = myActiveSlide;
            postParams.storyType = $scope.navs[myActiveSlide].storyStatus;
            $scope.navs[myActiveSlide].pageNum = 1;
            postParams.pageNum = $scope.navs[myActiveSlide].pageNum;
            IonicService.getHomeStorys(postParams).then(function(data) {
                // Con.log(data.storys)
                if (angular.equals(data.storys, [])) {
                    $scope.more = false;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
                if (data.storys) {
                    if (postParams.pageNum == 1) {
                        $scope.storys[$scope.currentTab] = data.storys;
                    }
                }
                // Con.log($scope.storys);
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.loadMore = function(myActiveSlide, del) {
            $scope.more = true;
            // Con.log('-----myActiveSlide------');
            // Con.log(myActiveSlide)
            try {
                $scope.currentTab = myActiveSlide;
                // Con.log($scope.currentTab);
                $scope.myActiveSlide = myActiveSlide;
                postParams.storyType = $scope.navs[myActiveSlide].storyStatus;
                $scope.navs[myActiveSlide].pageNum = $scope.navs[myActiveSlide].pageNum + 1;
                postParams.pageNum = $scope.navs[myActiveSlide].pageNum;
                Con.log(postParams.storyType);
                IonicService.getHomeStorys(postParams).then(function(data) {
                    // Con.log(data.storys)
                    if (angular.equals(data.storys, [])) {
                        $scope.more = false;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
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
                    // Con.log($scope.storys);
                });
                // switch (postParams.storyType) {
                //     case '1':
                //         IonicService.getHomeStorys(postParams).then(function(data) {
                //             Con.log(data)
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
                //         Con.log('我的收藏');
                //         break;
                //     case '4':
                //         Con.log('我的动态');
                //         break;
                // }
            } catch (ex) {
                $scope.more = false;
            }

        };
        // 当前选中：
        $scope.myActiveSlide = '0';
        // $ionicSlideBoxDelegate.enableSlide(false);
    }])
    // 关注
    .controller('starCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $timeout, localStorageService, ShareService, IonicService, Con) {
        // 重置左上角的按钮
        // $rootScope.menuShow = true;
        // $rootScope.backShow = false;
        // 模态框登陆
        var User = JSON.parse(localStorageService.get('User'));
        Con.log(User);
        if (User) {

        } else {
            $timeout(function() {
                $rootScope.changePage('tab.star');
            }, 100);
        }

        // IonicService.postStoryData({"storyId":21505,"webPrefix":"-webkit-"}).then(function(data) {
        //     Con.log(data);

        // });


    }])
    // 设计器
    .controller('editCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent) {
        Con.log($stateParams.storyId)
        var storyId = $stateParams.storyId;
        $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(false);
        IonicService.postStoryData({ "storyId": storyId }).then(function(data) {
            console.log(data);
            if (data.message == "Success") {
                $scope.pages = data.pages;

                $timeout(function() {
                    $ionicSlideBoxDelegate.$getByHandle('sectionBox').update();
                    var win_w = angular.element(window)[0].innerWidth;
                    console.log(win_w)
                    var ionSlideH = jQuery('.storySlideBox .slider-slide')[0].clientHeight;
                    Con.log(ionSlideH)
                    var storyBoxW = win_w * 0.9;
                    var storyBoxH = ionSlideH * 0.9;
                    var storyBoxLeft = (win_w - 320) / 2;
                    var storyBoxTop = (ionSlideH - 504) / 2;
                    var storyBoxSectionScaleX = storyBoxW / 320;
                    var storyBoxSectionScaleY = storyBoxH / 504;
                    var scale = storyBoxSectionScaleX > storyBoxSectionScaleY ? storyBoxSectionScaleY : storyBoxSectionScaleX;
                    Con.log('scale' + scale)
                    Con.log(storyBoxSectionScaleX)
                    Con.log(storyBoxSectionScaleY)
                    jQuery('.storyPage').css({
                        transform: 'scale(' + scale + ')',
                        left: storyBoxLeft,
                        top: storyBoxTop
                    });
                    SectionEvent.cli();
                }, 50);

            }
        });

        // 切换按钮
        $scope.visible = false;
        $scope.toggle = function() {
                $scope.visible = !$scope.visible;
            }
            // 删除元素
        $scope.delElement = function() {
                jQuery('.mobileEvent').remove();
                jQuery('.editBox').hide();
            }
            //上一层
        $scope.upElement = function() {
                var oldZIndex1 = parseInt(jQuery('.mobileEvent').css('zIndex')) || 0;
                var newZIndex1 = oldZIndex1 + 1;
                // console.log(oldZIndex.css('zIndex'));
                jQuery('.mobileEvent').css({
                    zIndex: newZIndex1
                });
            }
            // 下一层
        $scope.downElement = function() {
                var oldZIndex2 = jQuery('.mobileEvent').css('zIndex');
                var newZIndex2 = (oldZIndex2 - 1) > 0 ? (oldZIndex2 - 1) : 0;
                // console.log(oldZIndex.css('zIndex'));
                jQuery('.mobileEvent').css({
                    zIndex: newZIndex2
                });
            }
            // 复制元素
        $scope.copyElement = function() {
            var cloneElem = jQuery('.mobileEvent').clone();
            cloneElem.css({
                border: ''
            }).removeClass('mobileEvent');
            cloneElem.find('.leftright,.topbottom,.rightbottom,.righttop').remove();
            cloneElem.prependTo(jQuery('.mobileEvent').parents('output'))
        }

        // 模态框登陆
        $ionicModal.fromTemplateUrl('templates/textedit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.textEditmodal = modal;
        });
        $scope.model = { text: 123 };
        $rootScope.openTextEditModal = function() {
            $scope.textEditmodal.show();
            var oldText = jQuery('.mobileEvent').find('.txt-con').text();
            $scope.model = { text: oldText };
            jQuery('.editTextArea').focus();
        };
        $rootScope.closeTextEditModal = function(type) {
            $scope.textEditmodal.hide();
        };
        $scope.changeText = function(text) {
            jQuery('.mobileEvent').find('.txt-con').text(text);
            $scope.textEditmodal.hide();
        }
    }])
    // 模板展示页面
    .controller('designCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent) {
        // 重置左上角的按钮
        // $rootScope.menuShow = true;
        // $rootScope.backShow = false;
        // 模态框登陆
        // $timeout(function() {
        //     var win_w = angular.element(window)[0].innerWidth;
        //     console.log(win_w)
        //     var ionSlideH =  jQuery('.storySlideBox .slider-slide')[0].clientHeight;
        //     Con.log(ionSlideH)
        //     var storyBoxW = win_w * 0.9;
        //     var storyBoxH = ionSlideH*0.9;
        //     var storyBoxLeft = (win_w - 320) / 2;
        //     var storyBoxTop = (ionSlideH-504)/2;
        //     var storyBoxSectionScaleX = storyBoxW / 320;
        //     var storyBoxSectionScaleY = storyBoxH / 504;
        //     var scale=storyBoxSectionScaleX>storyBoxSectionScaleY ? storyBoxSectionScaleY:storyBoxSectionScaleX;
        //     Con.log('scale'+scale)
        //     Con.log(storyBoxSectionScaleX)
        //     Con.log(storyBoxSectionScaleY)
        //     jQuery('.storyPage').css({
        //         transform: 'scale(' + scale + ')',
        //         left: storyBoxLeft,
        //         top: storyBoxTop
        //     });
        //     SectionEvent.cli();
        // })

        var User = JSON.parse(localStorageService.get('User'));
        Con.log(User);
        if (User) {

        } else {
            $timeout(function() {
                $rootScope.changePage('tab.design');
                // $ionicSlideBoxDelegate.enableSlide(true);
            }, 100);
        }
        $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(false);
        IonicService.postStoryData({ "storyId": 21510 }).then(function(data) {
            console.log(data);
            if (data.message == "Success") {
                $scope.pages = data.pages;

                $timeout(function() {
                    $ionicSlideBoxDelegate.$getByHandle('sectionBox').update();
                    var win_w = angular.element(window)[0].innerWidth;
                    console.log(win_w)
                    var ionSlideH = jQuery('.storySlideBox .slider-slide')[0].clientHeight;
                    Con.log(ionSlideH)
                    var storyBoxW = win_w * 0.9;
                    var storyBoxH = ionSlideH * 0.9;
                    var storyBoxLeft = (win_w - 320) / 2;
                    var storyBoxTop = (ionSlideH - 504) / 2;
                    var storyBoxSectionScaleX = storyBoxW / 320;
                    var storyBoxSectionScaleY = storyBoxH / 504;
                    var scale = storyBoxSectionScaleX > storyBoxSectionScaleY ? storyBoxSectionScaleY : storyBoxSectionScaleX;
                    Con.log('scale' + scale)
                    Con.log(storyBoxSectionScaleX)
                    Con.log(storyBoxSectionScaleY)
                    jQuery('.storyPage').css({
                        transform: 'scale(' + scale + ')',
                        left: storyBoxLeft,
                        top: storyBoxTop
                    });
                    SectionEvent.cli();
                }, 50)
            }
        });


    }])
    //登录
    .controller('loginCtrl', ['$scope', '$rootScope', '$ionicPopup', '$ionicHistory', '$state', '$cordovaBarcodeScanner', '$ionicSlideBoxDelegate', '$interval', '$timeout', '$ionicModal', 'localStorageService', 'AppVersionService', 'IonicService', 'MsgBox', 'Con', function($scope, $rootScope, $ionicPopup, $ionicHistory, $state, $cordovaBarcodeScanner, $ionicSlideBoxDelegate, $interval, $timeout, $ionicModal, localStorageService, AppVersionService, IonicService, MsgBox, Con) {
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
            IonicService.postLogin({ account: '377210718@qq.com', password: 'yf123456' }).then(function(data) {
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
    }])

.controller('IndexCtrl', ['$scope', '$rootScope', 'localStorageService', '$state', '$ionicModal', '$ionicSlideBoxDelegate', '$timeout', 'IonicService', 'TabService', 'Con', function($scope, $rootScope, localStorageService, $state, $ionicModal, $ionicSlideBoxDelegate, $timeout, IonicService, TabService, Con) {
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
    $rootScope.loginOut = function() {
        Con.log('退出');
        localStorageService.remove('User');
        // $ionicHistory.nextViewOptions({
        //     disableAnimate: true,
        //     disableBack: true
        // });
        // $state.go("login");
        location.reload(true);
    };

}])

.controller('TabsCtrl', ['$scope', '$rootScope', 'localStorageService', '$state', '$ionicModal', '$ionicSlideBoxDelegate', '$timeout', 'IonicService', 'TabService', 'WechatApi', 'Con', function($scope, $rootScope, localStorageService, $state, $ionicModal, $ionicSlideBoxDelegate, $timeout, IonicService, TabService, WechatApi, Con) {
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
        if (type && (($rootScope.changeState == 'tab.star') || ($rootScope.changeState == 'tab.user'))) {
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
        if ($rootScope.UserInfo) {
            if (($rootScope.changeState == 'tab.user' || $rootScope.changeState == 'tab.star') && reload) {
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
