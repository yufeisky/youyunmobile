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
    }])
    // 首页详情
    .controller('homeDetailCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
        // $rootScope.menuShow = true;
        // $rootScope.backShow = true;
        // Con.log($stateParams);
        Con.log('首页详情');
        // Con.log($stateParams);
        // 用ifarme展示
        console.log($stateParams.storyObject);
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
    // lbs
    .controller('lbsCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$timeout', '$ionicNavBarDelegate', '$filter', '$compile', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'Tool', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $timeout, $ionicNavBarDelegate, $filter, $compile, localStorageService, ShareService, IonicService, Con, Tool) {
        // 重置左上角的按钮
        // $rootScope.menuShow = true;
        // $rootScope.backShow = false;
        var map = new AMap.Map('container', {
            zoom: 10,
            center: [116.39, 23.9],
        });
        //获取坐标
        $scope.getLocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        $scope.showPosition = function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            AMap.convertFrom([longitude, latitude],
                // AMap.convertFrom([116.368904, 39.923423],
                'gps',
                function(status, result) {
                    if (status == "complete") {
                        latitude = result.locations[0].lat;
                        longitude = result.locations[0].lng;
                        // alert(latitude);
                        // alert(longitude);
                        $scope.ininMap(longitude, latitude);

                    }

                    // if(status=='compile'){}
                })

        }
        $scope.ininMap = function(longitude, latitude) {
            // alert(latitude);
            // alert(longitude);
            AMap.service('AMap.CloudDataSearch', function() { //回调函数
                var center = [longitude, latitude];
                var search;
                var searchOptions = {
                    keywords: '',
                    // pageSize: 5,
                    orderBy: '_id:ASC'
                };
                //加载CloudDataSearch服务插件
                search = new AMap.CloudDataSearch('57ad4f42afdf520b895a76ed', searchOptions); //构造云数据检索类
                //周边检索
                search.searchNearBy(center, 10000, function(status, result) {
                    // alert(status)
                    if (status == "complete" && result.info == "OK") {
                        console.log(result);
                        console.log(result.datas);
                        // 成功筛选

                        // $scope.datas = $filter('filter')(result.datas,{category:'线下活动'});
                        $scope.datas = result.datas;
                        console.log($scope.datas);
                        console.log($scope.datas.length)
                        console.log($filter('filter')($scope.datas, { category: '线下' }));
                        $scope.createMap($scope.datas);
                    }
                });
                // console.log(search.searchNearBy(center, 10000))
            })
            var infoWindow = new AMap.InfoWindow();
            marker = new AMap.Marker({
                position: [longitude, latitude],
                map: map
            });
            marker.content = '你的位置';
            marker.on('click', markerClick);

            function markerClick(e) {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            }
            map.setCenter([longitude, latitude]);
            map.setZoom(18);
        }

        var isPC = Tool.isPC();
        // var isPC=true;
        // 为了方便电脑伤调试
        if (isPC) {
            $scope.ininMap(113.366693, 23.096714);
        }



        // var lnglats = [ //也可以使用LngLat对象
        //     [116.368904, 39.923423],
        //     [116.382122, 39.921176],
        //     [116.387271, 39.922501],
        //     [116.398258, 39.914600]
        // ];
        // var infoWindow = new AMap.InfoWindow();
        // for (var i = 0, marker; i < lnglats.length; i++) {
        //     marker = new AMap.Marker({
        //         position: lnglats[i],
        //         map: map
        //     });
        //     marker.content = '我是第' + i + '个信息窗体的内容';
        //     //给Marker绑定单击事件
        //     marker.on('click', markerClick);
        // }
        // map.setFitView();

        // function markerClick(e) {
        //     infoWindow.setContent(e.target.content);
        //     infoWindow.open(map, e.target.getPosition());
        // }

        // AMap.service('AMap.CloudDataSearch', function() { //回调函数
        //     var center = [113.366681, 23.096619];
        //     var search;
        //     var searchOptions = {
        //         keywords: '',
        //         // pageSize: 5,
        //         orderBy: '_id:ASC'
        //     };
        //     //加载CloudDataSearch服务插件
        //     search = new AMap.CloudDataSearch('57a94cc4305a2a693efc0d6e', searchOptions); //构造云数据检索类
        //     //周边检索
        //     search.searchNearBy(center, 10000, function(status, result) {
        //         if (status == "complete" && result.info == "OK") {
        //             console.log(result);
        //             console.log(result.datas);
        //             // 成功筛选

        //             // $scope.datas = $filter('filter')(result.datas,{category:'线下活动'});
        //             $scope.datas = result.datas;
        //             console.log($scope.datas);
        //             console.log($scope.datas.length)

        //             $scope.createMap($scope.datas);
        //         }
        //     });
        //     // console.log(search.searchNearBy(center, 10000))
        // })
        $scope.markers = [];
        $scope.test = 1;
        var iconJson = {

            }
            //描点的方法 
        $scope.createMap = function(obj) {
            var infoWindow = new AMap.InfoWindow();
            for (var i = 0, marker; i < obj.length; i++) {
                if (obj[i].type == 'group') {
                    marker = new AMap.Marker({
                        position: [obj[i]._location.lng, obj[i]._location.lat],
                        icon: 'http://vdata.amap.com/icons/b18/1/2.png',
                        map: map
                    });
                    marker.content = '<div class="markerDiv groupDiv" groupid="' + obj[i].groupID + '" grouptit="' + obj[i].h5title + '"><a href="javascript:;" class="markerDiva"><div class="imgarea"><img class="h5Img" src="' + obj[i].h5logo + '" /></div><div class="wordArea"><h2>' + obj[i].h5title + '</h2><p>' + obj[i].description + '</p></div><div class="linkIcon"><img  src="img/iconRight.png" /></div></a></div>';
                } else if (obj[i].type == 'story' && obj[i].groupID == '0') {

                    var iconArr = $filter('filter')($scope.dropDownArr, { name: obj[i].category })[0];
                    var IconUrl = iconArr.lbsIconUrl;
                    marker = new AMap.Marker({
                        position: [obj[i]._location.lng, obj[i]._location.lat],
                        icon: IconUrl,
                        map: map
                    });
                    marker.content = '<div class="markerDiv storyDiv" storyId="' + obj[i].storyId + '"><a href="javascript:;" ><div class="imgarea"><img class="h5Img" src="' + obj[i].h5logo + '" /></div><div class="wordArea"><h2>' + obj[i].h5title + '</h2><p>' + obj[i].description + '</p></div></a></div>';
                }
                //给Marker绑定单击事件
                marker.on('click', markerClick);
                marker.emit('click', { target: marker });
                $scope.markers.push(marker);

            }
            map.setFitView(); //加这句所有点会聚焦

            function markerClick(e) {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
                map.setCenter([e.target.getPosition().lng, e.target.getPosition().lat]);
                $timeout(function() {
                    jQuery('.groupDiv').on('click', function() {
                        var groupid = jQuery(this).attr('groupid');
                        console.log(groupid)
                        $rootScope.grouptit = jQuery(this).attr('grouptit');
                        $timeout(function() {
                            $scope.fliterStoryByGroupId(groupid);
                        });
                    });
                    jQuery('.storyDiv').on('click', function() {
                        var storyId = jQuery(this).attr('storyId');
                        console.log(storyId)
                        $timeout(function() {
                            $scope.fliterStoryByStoryId(storyId);
                        });
                    })
                }, 200);

            }
        };

        //根据groupId筛选组别中的故事
        $scope.fliterStoryByGroupId = function(groupId) {
            groupId = groupId.toString();
            $scope.StoryList = $filter('filter')($scope.datas, { groupID: groupId, type: "story" });
            $rootScope.lbsStoryList = [];
            $rootScope.lbsGroupTitle =
                console.log($scope.StoryList);
            jQuery.each($scope.StoryList, function(k, v) {
                var jsonInterface = {
                    "story_title": v.h5title,
                    "img_src": v.h5logo,
                    // "id": "21",
                    "story_id": v.storyId,
                    "share_count": v.sharecount,
                    "second_title": v.description,
                    "browse_count": v.referencecount,
                    "collection_count": v.collectioncount,
                    "pub_url": v.h5url,
                    // "story_type": "3"
                };
                $rootScope.lbsStoryList.push(jsonInterface);
            });
            console.log($scope.lbsStoryList);
            // $rootScope.openGroupModal();
            $state.go('tab.lbsGroupDetail');
        };
        // 根据storyId筛选数据
        $scope.fliterStoryByStoryId = function(storyId) {
            storyId = storyId.toString();
            var storyInfo = $filter('filter')($scope.datas, { storyId: storyId })[0];
            console.log(storyInfo);
            var storyInterface = {
                "story_title": storyInfo.h5title,
                "img_src": storyInfo.h5logo,
                // "id": "21",
                "story_id": storyInfo.storyId,
                "share_count": storyInfo.sharecount,
                "second_title": storyInfo.description,
                "browse_count": storyInfo.referencecount,
                "collection_count": storyInfo.collectioncount,
                "pub_url": storyInfo.h5url,
                // "story_type": "3"
            };
            storyInterface = JSON.stringify(storyInterface);
            // tab.homeDetail({ storyObject: '{{story}}'})
            // // $rootScope.openGroupModal();
            $state.go('tab.homeDetail', { storyObject: storyInterface });
        };

        // 过滤并重新渲染标记的方法：传入一个json对象{category:'线下活动'}
        $scope.myFilter = function(json, type) {
            $scope.toggle(json);
            // 清除之前的标记
            map.remove($scope.markers);
            // jQuery('.amap-info').remove();
            if (json.category == "全部") {
                $scope.filterDatas = $filter('filter')($scope.datas, {});
            } else {
                $scope.filterDatas = $filter('filter')($scope.datas, json);
            }
            if (!type) {
                // 当type没传的时候，重新渲染标记
                $scope.createMap($scope.filterDatas);
            }
        }

        // 切换按钮
        $scope.activeTit = '全部';
        $scope.dropDownArr = [{ name: '全部', icon: '', active: true, lbsIconUrl: '' }, { name: '线下活动', icon: 'icon-upalapp-huodong-off', active: false, lbsIconUrl: 'img/huodong@2x.png' }, { name: '神秘事件', icon: 'icon-upalapp-shijian-off', active: false, lbsIconUrl: 'img/shijian@2x.png' }, { name: '折扣优惠', icon: 'icon-upalapp-zhekou-off', active: false, lbsIconUrl: 'img/zhekou.png' }, { name: '文青聚点', icon: 'icon-upalapp-wenqing-off', active: false, lbsIconUrl: 'img/wenqing@2x.png' }, { name: '桌游聚点', icon: 'icon-upalapp-zhuoyou-off', active: false, lbsIconUrl: 'img/zhuoyou@2x.png' }];
        $scope.visible = false;
        $scope.toggle = function(json) {
            console.log(json);
            console.log($scope.dropDownArr);

            var filterArr = $filter('filter')($scope.dropDownArr, { name: json.category })[0];
            jQuery('.lbsTitSpan').text(json.category);
            jQuery.each($scope.dropDownArr, function(k, v) {
                if (v.name == json.category) {
                    $scope.dropDownArr[k].active = true;
                    $scope.activeTit = json.category;
                } else {
                    $scope.dropDownArr[k].active = false;
                }
            })
            if (json.category == "全部") {
                jQuery('.lbsTitSpan').text('发现');
            }
            $scope.visible = !$scope.visible;
            $scope.dropshow = !$scope.dropshow;
        };
        $scope.dropshow = true;


        // 调用获取位置信息
        $scope.getLocation();

        // IonicService.postStoryData({"storyId":21505,"webPrefix":"-webkit-"}).then(function(data) {
        //     Con.log(data);

        // });

    }])

// lbs组详细页面
.controller('lbsGroupDetailCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
        // $rootScope.menuShow = true;
        // $rootScope.backShow = true;
        // Con.log($stateParams);
        Con.log('lbs组控制器');
        // Con.log($stateParams);
        // 用ifarme展示
        console.log($rootScope.lbsStoryList)
            // $scope.lbsStoryList = JSON.parse($stateParams.lbsStoryList);
            // console.log($scope.lbsStoryList)


    }])
    // 设计器
    .controller('editCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', 'MsgBox', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent, MsgBox) {
        // Con.log($stateParams.storyId);
        var storyId = $stateParams.storyId;
        $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(false);
        IonicService.postStoryData({ "storyId": storyId }).then(function(data) {
            console.log(data);
            if (data.message == "Success") {
                $scope.pages = data.pages;

                $timeout(function() {
                    $ionicSlideBoxDelegate.$getByHandle('sectionBox').update();
                    var win_w = angular.element(window)[0].innerWidth;
                    Con.log(win_w);
                    var ionSlideH = jQuery('.storySlideBox .slider-slide')[0].clientHeight;
                    Con.log(ionSlideH);
                    var storyBoxW = win_w * 0.9;
                    var storyBoxH = ionSlideH * 0.9;
                    var storyBoxLeft = (win_w - 320) / 2;
                    var storyBoxTop = (ionSlideH - 504) / 2;
                    var storyBoxSectionScaleX = storyBoxW / 320;
                    var storyBoxSectionScaleY = storyBoxH / 504;
                    var scale = storyBoxSectionScaleX > storyBoxSectionScaleY ? storyBoxSectionScaleY : storyBoxSectionScaleX;
                    Con.log('scale' + scale);
                    Con.log(storyBoxSectionScaleX);
                    Con.log(storyBoxSectionScaleY);
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
        };
        // 删除元素
        $scope.delElement = function() {
            jQuery('.mobileEvent').remove();
            jQuery('.editBox').hide();
        };
        //上一层
        $scope.upElement = function() {
            var oldZIndex1 = parseInt(jQuery('.mobileEvent').css('zIndex')) || 0;
            var newZIndex1 = oldZIndex1 + 1;
            // console.log(oldZIndex.css('zIndex'));
            jQuery('.mobileEvent').css({
                zIndex: newZIndex1
            });
        };
        // 下一层
        $scope.downElement = function() {
            var oldZIndex2 = jQuery('.mobileEvent').css('zIndex');
            var newZIndex2 = (oldZIndex2 - 1) > 0 ? (oldZIndex2 - 1) : 0;
            // console.log(oldZIndex.css('zIndex'));
            jQuery('.mobileEvent').css({
                zIndex: newZIndex2
            });
        };
        // 复制元素
        $scope.copyElement = function() {
            var cloneElem = jQuery('.mobileEvent').clone();
            cloneElem.css({
                border: ''
            }).removeClass('mobileEvent');
            cloneElem.find('.leftright,.topbottom,.rightbottom,.righttop').remove();
            cloneElem.prependTo(jQuery('.mobileEvent').parents('output'));
        };
        $scope.storySave = function() {
            // var data = {
            //         "storyId": storyId,
            //         "storyData": [],
            //         // "userId":'123',
            //         // "userToken":'3333',

            //     }
            // 保存之前先把选中状态清除
            SectionEvent.blurFn();
            var data = [];
            // console.log(jQuery('.editSlide .storyPage'))
            jQuery('.editSlide .storyPage').each(function(k, v) {
                var idval = jQuery(v).attr('page_id');
                var numval = k + 1;
                var contenthtml = jQuery(v).html().toString();
                // Con.log(contenthtml);
                var pageInfo = {
                    "storyId": storyId,
                    "id": idval,
                    "number": numval.toString(),
                    "content": contenthtml
                };
                data.push(pageInfo);
            });
            // console.log(data)

            data = JSON.stringify(data);
            // data = angular.toJson(data);
            // console.log(data)
            IonicService.saveStoryData(data).then(function(data) {
                console.log(data);
                if (data.status == '1') {
                    MsgBox.showTexts('保存成功');
                }
            });
            // jQuery.ajax({
            //     url: 'http://192.168.2.154:8080/mobileplatform/page/h5save',
            //     type: 'post',
            //     dataType: 'json',
            //     data: data,
            // })
            // .done(function() {
            //     console.log("success");
            // })
            // .fail(function() {
            //     console.log("error");
            // })
            // .always(function() {
            //     console.log("complete");
            // });

        };
        // 后退
        $scope.goBackView = function() {
            console.log($ionicHistory.viewHistory().backView)
            if ($ionicHistory.viewHistory().backView) {
                // $ionicGoBack()
                $ionicHistory.goBack();
            } else {
                $rootScope.changePage('tab.home');
            };
            // stateName
            // $ionicGoBack()
        }

        // 模态框编辑
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
        };

        //模态框图库
        $ionicModal.fromTemplateUrl('templates/gallery.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.galleryEditmodal = modal;
        });

        //获取类别大类
        $scope.getOnlineMainCates=function(){
           var postParams = {
               categoryId: 0
           };
           $scope.mainCates=[];
           IonicService.getOnlineMainCates(postParams).then(function(data) {
               if (data.message == '0') {
                   $rootScope.loginOut();
               }
               angular.forEach(data.categorys, function(item) {
                   if (item.id != 1) {
                       $scope.mainCates.push(item);
                   }
               });
           }).finally(function() {
               Con.log('完成');
           });
        }

        $scope.getMyCates=function(){
            var User = JSON.parse(localStorageService.get('User'));
            var postParams = {
                userToken: User.token,
                userId: User.id,
            };
            $scope.myCates=[];
            $scope.myCates.push({id:1,name:"全部"});
            IonicService.getMyCates(postParams).then(function(data) {
                if (data.message == '0') {
                    $rootScope.loginOut();
                }
                Con.log(data);
                angular.forEach(data.categorys, function(item) {
                    $scope.myCates.push(item);
                });
                $scope.cates=$scope.myCates;
                $scope.more=true;
            }).finally(function() {
                Con.log('完成mycats');
                Con.log('完成');
            });
        }

        $scope.closeGalleryEditModal=function(){
            $scope.galleryEditmodal.hide();
        }


        $rootScope.openImgEditModal = function() {
            $scope.isSelf=true;
            $scope.isLine=false;
            $scope.cateShow=false;
            $scope.pageNum=1;
            $scope.cateIndex=0;
            $scope.galleryEditmodal.show();
            $scope.getOnlineMainCates();
            $scope.getMyCates();
            // 初始化Web Uploader
            var win_w = angular.element(window)[0].innerWidth;
            $scope.img_w = win_w * 0.33 * 0.9 + 'px';
            if( $scope.uploader==null){
                var uploader = WebUploader.create({
                    // 选完文件后，是否自动上传。
                    auto: true,
                    dnd: '#uploader .queueList',
                    paste: document.body,
                    // swf文件路径
                    //swf: BASE_URL + '/js/Uploader.swf',

                    // 文件接收服务端。
                    // server: host + '/tfcm/userdiscount/uploadFile.gm',
                    server: ' http://api.upalapp.com/util/uploadFile',
                    // 选择文件的按钮。可选。
                    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                    pick: {
                        id:'#picker',
                        innerHTML : "上传图片",
                        multiple: false //是否开起同时选择多个文件能力
                    },
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    },
                    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                    resize: false,
                    compress: false,
                    sendAsBinary: false, //二进制的流的方式发送文件
                    fileNumLimit:1,
                    duplicate: true
                });
                //console.log( $scope.img_w);
                var $list = $("#thelist"),
                    thumbnailWidth = win_w * 0.33 * 0.9;
                    thumbnailHeight = win_w * 0.33 * 0.9;

                // 当有文件添加进来的时候
                uploader.on( 'fileQueued', function( file ) {
                    var $li = $(
                            '<div id="' + file.id + '" class="file-item thumbnail">' +
                            '<img>' +
                            '<div class="info">' + file.name + '</div>' +
                            '</div>'
                        ),
                        $img = $li.find('img');

                    // $list为容器jQuery实例
                    $list.html( $li );

                    // 创建缩略图
                    // 如果为非图片文件，可以不用调用此方法。
                    // thumbnailWidth x thumbnailHeight 为 100 x 100
                    uploader.makeThumb( file, function( error, src ) {
                        if ( error ) {
                            $img.replaceWith('<span>不能预览</span>');
                            return;
                        }
                        $img.attr( 'src', src );
                    }, thumbnailWidth, thumbnailHeight );

                    $("#picker").hide();
                });

                // 文件上传过程中创建进度条实时显示。
                uploader.on( 'uploadProgress', function( file, percentage ) {
                    var $li = $( '#'+file.id ),
                        $percent = $li.find('.progress span');

                    // 避免重复创建
                    if ( !$percent.length ) {
                        $percent = $('<p class="progress"><span></span></p>')
                            .appendTo( $li )
                            .find('span');
                    }

                    $percent.css( 'width', percentage * 100 + '%' );
                });

                // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                uploader.on( 'uploadSuccess', function( file,response  ) {
                    //var data = JSON.parse(response);

                    //console.log(response[0])
                    $( '#'+file.id ).addClass('upload-state-done');
                    alert("图片上传成功");

                    var img=response[0];
                    var cate=$scope.cates[$scope.cateIndex];
                    var User = JSON.parse(localStorageService.get('User'));
                    var postParams = {
                        userToken: User.token,
                        userId: User.id,
                        categoryId:cate.id,
                        categoryName:cate.name,
                        imagePath:img.imagePath,//图片路径
                        thumbImagePath:img.thumbImagePath,//缩略图片路径
                        name:img.name,//图片名
                    };
                    IonicService.saveImage(postParams).then(function(data) {
                       if (data.message == '0') {
                            $rootScope.loginOut();
                        }
                        console.log(data);
                      //  $scope.images.push(data.image);
                      //  Con.log($scope.images);
                        $scope.pageNum=1;
                        $scope.galleryLoadMore();
                    }).finally(function() {

                        Con.log('完成');
                    });
                });

                // 文件上传失败，显示上传出错。
                uploader.on( 'uploadError', function( file ) {
                    var $li = $( '#'+file.id ),
                        $error = $li.find('div.error');

                    // 避免重复创建
                    if ( !$error.length ) {
                        $error = $('<div class="error"></div>').appendTo( $li );
                    }
                    $error.text('上传失败');
                    console.log("test");
                });

                // 完成上传完了，成功或者失败，先删除进度条。
                uploader.on( 'uploadComplete', function( file ) {
                    $( '#'+file.id ).find('.progress').remove();
                    $list.html("");
                    $("#picker").show();
                });

                uploader.on('error', function(handler) {

                    if(handler=="Q_EXCEED_NUM_LIMIT"){
                        uploader.reset();
                    }
                    if(handler=="F_DUPLICATE"){
                        alert("文件重复");
                    }
                });
                $scope.uploader=uploader;
            }
        };




        $scope.cateChoose =function(order){
            if($scope.cateIndex==order){
                return;
            }
            $scope.cateIndex=order;
            $scope.cateShow=false;
            $scope.pageNum=1;
            $scope.galleryLoadMore();
            if($scope.isLine){
                $scope.cates= $scope.secondCates;
            }
        }


        $scope.cateSChoose=function(order){
            var parentId=$scope.mainCates[order].id
            var postParams = {
                parentId: parentId
            };
            IonicService.getOnlineCates(postParams).then(function(data) {
                if (data.message == '0') {
                    $rootScope.loginOut();
                }
                Con.log(data);
                $scope.onLineCates=[];
                angular.forEach(data.categorys, function(item) {
                    $scope.onLineCates.push(item);
                });
                $scope.secondCates=$scope.onLineCates;
            }).finally(function() {
                Con.log('完成');
            });
        }

        $scope.galleryLoadMore = function() {
            $scope.more=true;
            var postParams = {
                userId: 0,
                categoryId: parseInt($scope.cates[ $scope.cateIndex].id),
                index: $scope.pageNum
            };
            $scope.pageNum++;
            if($scope.isSelf){
                var User = JSON.parse(localStorageService.get('User'));
                postParams.userId=User.id;
            }
            console.log(postParams.index);
            console.log($scope.cates[ $scope.cateIndex].id);
            try {
                IonicService.getImages(postParams).then(function(data) {
                    if (data.images) {
                        if (postParams.index == 1) {
                            $scope.images = data.images;
                        } else {
                            angular.forEach(data.images, function(item) {
                                $scope.images.push(item);
                            });
                        }
                        if (data.images.length<20) {
                            $scope.more = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }else{
                        $scope.images=[];
                        $scope.more = false;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                 });
            } catch (ex) {
                $scope.more = false;
            }
        };

        $scope.onSelf=function(){
            $scope.isSelf=true;
            $scope.isLine=false;
            $scope.cateShow=false;
            $scope.cateIndex=0;
            $scope.cates=$scope.myCates;
            $scope.pageNum=1;
            $scope.galleryLoadMore();
        }

        $scope.onLine=function(){
            $scope.isSelf=false;
            $scope.isLine=true;
            $scope.cateShow=false;

            var parentId=$scope.mainCates[0].id
            var postParams = {
                parentId: parentId
            };
            IonicService.getOnlineCates(postParams).then(function(data) {
                if (data.message == '0') {
                    $rootScope.loginOut();
                }
                Con.log(data);
                $scope.onLineCates=[];
                angular.forEach(data.categorys, function(item) {
                    $scope.onLineCates.push(item);
                });
                $scope.cateIndex=0;
                $scope.cates=$scope.onLineCates;
                $scope.pageNum=1;
                $scope.galleryLoadMore();
            }).finally(function() {
                Con.log('完成');
            });
        }

        //图库注册事件
        $scope.cateOp =function(){
            $scope.cateShow=!$scope.cateShow;
            if($scope.isLine){
                $scope.secondCates= $scope.cates;
            }
        }

        $scope.imageOp = function(order) {
            var imageurl=$scope.images[order].imageurl;
            //localStorageService.set('Imageurl', imageurl);
            //$state.go('tab.edit', {storyId: storyId });
            console.log(imageurl);
            jQuery('.mobileEvent').find('img').attr("src",imageurl);
            console.log( jQuery('.mobileEvent').find('img'));
            $scope.galleryEditmodal.hide();
        };


     /*   $scope.picOp =function(){
            var test= jQuery('#upload').click();
            console.log(jQuery('#upload').val());
            if(jQuery('#upload').val()!=null && jQuery('#upload').val()!=""){
                var postParams = {
                   file1:jQuery('#upload').val()
                };
                console.log(postParams);
                IonicService.uploadImage(postParams).then(function(data) {
                    console.log(data);
                }).finally(function() {
                    Con.log('完成');
                });
            };
        }*/


    }])
    // 模板展示页面
    .controller('designCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent) {


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
