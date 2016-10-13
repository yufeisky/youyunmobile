// 首页详情
appController.controller('homeDetailCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup','$state', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup,$state, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
    // $rootScope.menuShow = true;
    // $rootScope.backShow = true;
    // Con.log($stateParams);
    Con.log('首页详情');
    // Con.log($stateParams);
    // 用ifarme展示
    console.log($stateParams.storyObject)
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
    $scope.toDisplayDataFn = function(){
        // alert('跳转到统计数据页面')
        $scope.closePopover();
        // 跳转到统计数据页面
        $state.go('tab.displayData');
    }

    $scope.openPopover = function($event) {
        console.log('---------category-----------');
        console.log($scope.urlParams.category);
        if($scope.urlParams.category&&$scope.urlParams.category=="智能展示"){
          console.log($scope.urlParams.category);
          $scope.isIntelligenceDisplay = true;
        }
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

}]);
