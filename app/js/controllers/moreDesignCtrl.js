// 模板展示详细页面
appController.controller('moreDesignCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent) {
    //默认可以加载更多数据
    $scope.more = true;
    //设置图片高度
    var win_w = angular.element(window)[0].innerWidth;
    $scope.img_w = win_w * 0.45 * 229 / 158 + 'px';
    console.log($stateParams.designType)
    console.log($stateParams.main)
    console.log('title');
    console.log($stateParams.moreDesinTitle);
    $scope.dropshow = true;
    $scope.visible = false;
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000
    });
    // 分类列表显示隐藏切换
    $scope.toggle = function() {
        console.log($scope.visible)
        if ($scope.visible == false) {
            console.log('关闭到打开');
            var liItemId = jQuery('.mainTypeList li.active').attr('liItemId');
            console.log(jQuery('.restList li[liItemId=' + liItemId + ']'))
            console.log(liItemId)
            jQuery('.restList li').removeClass('active');
            jQuery('.restList li[liItemId=' + liItemId + ']').addClass('active');

        } else {
            console.log('打开到关闭');
            var liItemId = jQuery('.restList li.active').attr('liItemId');
            console.log(jQuery('.restList li[liItemId=' + liItemId + ']'))
            console.log(liItemId)
            jQuery('.mainTypeList li').removeClass('active');
            jQuery('.mainTypeList li[liItemId=' + liItemId + ']').addClass('active');
            var scrollLeft1 = jQuery('.mainTypeList li[liItemId=' + liItemId + ']').offset().left - jQuery('.mainTypeList').offset().left;
            console.log('--------offset--------')
            console.log(scrollLeft1)
            jQuery('.mainTypeWrap').scrollLeft(scrollLeft1);
        }
        console.log(jQuery('.mainTypeList li.active').attr('liItemId'));


        $scope.dropshow = !$scope.dropshow;
        $scope.visible = !$scope.visible;
    }

    /* 根据分类id检索故事列表:searchItemByCategoryId
        categoryId:分类id
        type：区分是点的哪里的li：0为没展开的 1为展开的 2为不是通过li加载
        index:li的索引 为了同步li选中状态
        pageNo:页码
        isLoad:通过点击li加载的不传值，通过上拉加载方式的要设为true;
    */
    $scope.displayOrder = 0;
    $scope.searchItemByCategoryId = function(categoryId, type, index, pageNo, isLoad) {

        console.log('------scrollTop-----')
            // console.log(jQuery('.moreDesignPageContent .scroll').css('scrollTop'))
        console.log(index)
        if (type == '0') {
            console.log('点击了未展开的li');
            jQuery('.mainTypeList li').removeClass('active');
            jQuery('.mainTypeList li').eq(index).addClass('active');
            // this.addClass('active');
            console.log(jQuery('.mainTypeList li'));
        } else if (type == '1') {
            console.log('点击了展开后的li');
            jQuery('.restList li').removeClass('active');
            jQuery('.restList li').eq(index).addClass('active');
            // jQuery('.restList li').eq(index).clone().prependTo(jQuery('.mainTypeList'));
            // jQuery('.searchAll').hide();
            $scope.toggle();
        }


        var pageNo = pageNo || 1;
        $scope.getListInfo = {
                "category": categoryId,
                "pageNo": pageNo,
                "loadCount": '4',
                "displayOrder": $scope.displayOrder,
                "search": ''
            }
            // // console.log(this)
            // var pageNo = pageNo || 1;
            // $scope.getListInfo = {
            //         "category": categoryId,
            //         "pageNo": pageNo,
            //         "loadCount": '4',
            //         "displayOrder": 0,
            //         "search": ''
            //     }
            //     // console.log($scope.getListInfo);
        if (!isLoad) {
            // 通过按钮切换的时候才需要走这部分逻辑
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0,
                duration: 10000
            });
            $scope.more = true;
            $scope.mainNo = 1;
            $scope.getListInfo = {
                "category": categoryId,
                "pageNo": 1,
                "loadCount": '4',
                "displayOrder": $scope.displayOrder,
                "search": ''
            }
            IonicService.getStoryListByCategoryId($scope.getListInfo).then(function(data) {
                console.log(data)
                $ionicLoading.hide();
                if (data.status == 1 && data.message == "Success") {
                    if (pageNo == 1) {
                        $scope.storyList = data.tempates;
                    } else {
                        angular.forEach(data.tempates, function(item) {
                            $scope.storyList.push(item);
                        });
                    }
                } else {
                    $scope.storyList = [];
                }
            });
            jQuery('.scroll-bar-indicator').css({ transform: 'translate3d(0px, 0px, 0px) scale(1)' });
            jQuery('.moreDesignPageContent .scroll').css({ transform: 'translate3d(0px, 0px, 0px) scale(1)' });
        }
    }

    // 获取核心分类的数据方法:// 根据名字获取数据
    $scope.getMainListStory = function(sendData) {
            IonicService.getTemplateByName(sendData).then(function(data) {
                console.log(data);
                $ionicLoading.hide();
                if (data.status == 1 && data.message == "Success") {
                    $scope.storyList = data.tempates;
                }
            });
        }
        // 获取更多数据
    $scope.mainNo = 1;
    $scope.loadStoryMore = function() {
            console.log('loadmore');
            var pageNo = $scope.mainNo++
                $scope.more = true;
            try {
                if ($stateParams.main == 'true') {
                    console.log('是推荐的几个分类')
                        // 假如是运营列出的几个重点分类：旅游 结婚 教育，需要走这部分逻辑
                    $scope.pageTitle = $stateParams.designType;
                    var sendData = {
                            categoryName: $stateParams.designType,
                            pageNo: pageNo,
                            loadCount: '4',
                            displayOrder: $scope.displayOrder
                        }
                        // 把分类列表隐藏
                    $scope.typeBoxIsHide = true;
                    console.log(sendData)
                    IonicService.getTemplateByName(sendData).then(function(data) {
                        console.log(data.tempates);
                        $ionicLoading.hide();
                        if (angular.equals(data.tempates, [])) {
                            $scope.more = false;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                        if (data.status == 1 && data.message == "Success") {
                            if (pageNo == 1) {
                                $scope.storyList = data.tempates;
                            } else {
                                angular.forEach(data.tempates, function(item) {
                                    $scope.storyList.push(item);
                                });
                            }
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    });

                } else {
                    console.log('不是推荐的几个分类')
                        //不是推荐的几个分类的时候，需要把对应的子分类列表显示出来
                    $scope.pageTitle = $stateParams.moreDesinTitle;
                    $scope.typeBoxIsHide = false;
                    if (!$scope.getListInfo) {
                        //第一次加载才load分类列表，第二次就不重新加载
                        var parentInfo = {
                            parentId: $stateParams.designType
                        }
                        var ul_width = 0;
                        IonicService.getChildCategoryByParentId(parentInfo).then(function(data) {
                            // if (angular.equals(data.tempates, 'undefined')) {
                            //  alert('ok')
                            //     $scope.more = false;
                            //     $scope.$broadcast('scroll.infiniteScrollComplete');
                            // }
                            console.log('--------------data------------')
                            console.log(data)
                            if (data.status == 1 && data.message == "Success") {
                                ul_width = 0;
                                console.log(data.categories)
                                $scope.categories = data.categories;
                                $ionicLoading.hide();
                                $timeout(function() {
                                    jQuery.each(jQuery('.mainTypeList li'), function(k, v) {
                                        ul_width += jQuery(v).outerWidth(true);
                                    });
                                    ul_width = ul_width + 10
                                    jQuery('.mainTypeList').css({
                                        width: ul_width + 'px'
                                    })
                                })

                            }
                        });
                        console.log('--------getListInfo------')
                        console.log($scope.getListInfo)

                        // 默认加载全部类别的故事
                        $scope.searchItemByCategoryId(0, 0, 0, pageNo, true);

                    } else {
                        $scope.searchItemByCategoryId($scope.getListInfo.category, 2, 0, pageNo, true);
                    }

                    // console.log(this)
                    // console.log($scope.getListInfo
                    IonicService.getStoryListByCategoryId($scope.getListInfo).then(function(data) {
                        $ionicLoading.hide();
                        console.log('-------data.tempates------');
                        console.log(data.tempates);
                        if (angular.equals(data.tempates, undefined)) {
                            $scope.more = false;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                        if (data.status == 1 && data.message == "Success") {
                            if (pageNo == 1) {
                                $scope.storyList = data.tempates;
                            } else {
                                angular.forEach(data.tempates, function(item) {
                                    $scope.storyList.push(item);
                                });
                            }
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }

                    });
                    // $scope.$broadcast('scroll.infiniteScrollComplete');

                }
            } catch (ex) {
                $scope.more = false;
            }
        }
        // 下拉刷新
    $scope.doRefresh = function() {
        $timeout(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 500)
    };

    $scope.hottest = function() {
        jQuery('.latestandhottest').removeClass('active');
        jQuery('.latestandhottest').eq(0).addClass('active');
        jQuery('.scroll-bar-indicator').css({ transform: 'translate3d(0px, 0px, 0px) scale(1)' });
        jQuery('.moreDesignPageContent .scroll').css({ transform: 'translate3d(0px, 0px, 0px) scale(1)' });
        $scope.displayOrder = 0;
        $scope.getListInfo.pageNo = 1;
        $scope.loadStoryMore();
        IonicService.getStoryListByCategoryId($scope.getListInfo).then(function(data) {
            $ionicLoading.hide();
            console.log('-------data.tempates------');
            console.log(data.tempates);
            if (angular.equals(data.tempates, undefined)) {
                $scope.more = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
            if (data.status == 1 && data.message == "Success") {
                $scope.storyList = data.tempates;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }

        });
    }
    $scope.newest = function() {
        jQuery('.latestandhottest').removeClass('active');
        jQuery('.latestandhottest').eq(1).addClass('active');
        jQuery('.scroll-bar-indicator').css({ transform: 'translate3d(0px, 0px, 0px) scale(1)' });
        jQuery('.moreDesignPageContent .scroll').css({ transform: 'translate3d(0px, 0px, 0px) scale(1)' });
        $scope.displayOrder = 1;
        $scope.getListInfo.pageNo = 1;
        $scope.loadStoryMore();
        IonicService.getStoryListByCategoryId($scope.getListInfo).then(function(data) {
            $ionicLoading.hide();
            console.log('-------data.tempates------');
            console.log(data.tempates);
            if (angular.equals(data.tempates, undefined)) {
                $scope.more = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
            if (data.status == 1 && data.message == "Success") {
                $scope.storyList = data.tempates;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }

        });
    }
}]);
