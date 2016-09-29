/**
 * 页面添加控制器：
 * create by yufei
 */
// 模板使用页面
appController.controller('addPageCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', '$timeout', '$state', '$ionicHistory', '$filter', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, $timeout,
    $state, $ionicHistory, $filter, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {

    Con.log('根据模板添加页面');
    console.log('----------添加页面前的当前页面序号-----------')
    console.log($rootScope.storyCurrentIndex);
    // $scope.urlParams = JSON.parse($stateParams.pages);
    var User = JSON.parse(localStorageService.get('User'));
    if (User) {
        var postParams = {
            userToken: User.token,
            userId: User.id,
        };
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000
        });
        IonicService.getSingleTemplateCategory(postParams).then(function(data) {
            console.log(data);
            $ionicLoading.hide();
            $scope.parentCategories = data.parentCategories;
            $scope.childrenCategories = data.childrenCategories;
            $timeout(function() {
                jQuery('.firstLevelList li').eq(0).trigger('click');
                jQuery('.twoLevelList li').eq(0).trigger('click');
                // 把loaded变为true,启用toggle功能;
                $scope.loaded = true;
            })
        });




        // toggle方法
        $scope.toggle = function() {
            // var filterArr = $filter('filter')($scope.dropDownArr, { name: json.category })[0];
            // jQuery('.lbsTitSpan').text(json.category);
            // jQuery.each($scope.dropDownArr, function(k, v) {
            //     if (v.name == json.category) {
            //         $scope.dropDownArr[k].active = true;
            //         $scope.activeTit = json.category;
            //     } else {
            //         $scope.dropDownArr[k].active = false;
            //     }
            // })
            // if (json.category == "全部") {
            //     jQuery('.lbsTitSpan').text('发现');
            // }
            if ($scope.loaded) {
                $scope.visible = !$scope.visible;
                $scope.dropshow = !$scope.dropshow;
            }
        };
        $scope.getTwoLevelFn = function(id, index) {
            jQuery('.firstLevelList li').removeClass('active');
            jQuery('.firstLevelList li').eq(index).addClass('active');
            console.log(id)
            $scope.childrenLists = $filter('filter')($scope.childrenCategories, { parentId: id });
            console.log($scope.childrenList);
        }

        $scope.getTemplateList = function(categoryId, index) {
            jQuery('.twoLevelList li').removeClass('active');
            jQuery('.twoLevelList li').eq(index).addClass('active');
            jQuery('.scroll-bar-indicator').css({ transform: 'translate3d(0px, 0px, 0px) scale(1)' });
            jQuery('.templateListCon .scroll').css({ transform: 'translate3d(0px, 0px, 0px) scale(1)' });
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0,
                duration: 10000
            });
            var getSingleTemplateCategoryListParams = {
                userToken: User.token,
                userId: User.id,
                categoryId: categoryId
            }
            IonicService.getSingleTemplateCategoryList(getSingleTemplateCategoryListParams).then(function(data) {
                console.log(data);
                $ionicLoading.hide();
                $scope.templateList = data.templates;
            });
        }
    } else {
        // 提示已下线
        $scope.showNoDataTip = true;
    }
    // 后退历史
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

    $scope.dropshow = true;
    // $scope.visible = false;

    //设置图片高度
    var win_w = angular.element(window)[0].innerWidth;
    var win_h = angular.element(window)[0].innerHeight;
    console.log(win_h)
    $scope.img_w = win_w * 0.45 * 229 / 158 + 'px';
    $scope.listHeight = (win_h - 88) + 'px';
    console.log($scope.listHeight)

    $scope.addPageByTemplateId = function(templateId) {
        console.log(templateId);
        $scope.storyId = JSON.parse(localStorageService.get('editStoryId'));
        var storyCurrentIndex = JSON.parse(localStorageService.get('storyCurrentIndex'));
        var editStoryPages = JSON.parse(localStorageService.get('editStoryPages'));
        var getSingleTemplateParams = {
            userToken: User.token,
            userId: User.id,
            templateId: templateId
        }
        IonicService.getSingleTemplate(getSingleTemplateParams).then(function(data) {
            console.log(data);
            //想到的是： 把故事数据循环一次，把新页面添加进去

            $scope.newStoryPages = [];
            for (var i = 0; i < editStoryPages.length + 1; i++) {
                if (i < storyCurrentIndex + 1) {
                    $scope.newStoryPages.push(editStoryPages[i])
                } else if (i == storyCurrentIndex + 1) {
                    console.log(data.template);
                    var pageInfo = {
                        "storyId": $scope.storyId,
                        "id": '',
                        "number": (i + 1).toString(),
                        "content": data.template
                    };
                    $scope.newStoryPages.push(pageInfo)
                } else {
                    editStoryPages[i - 1].number = (parseInt(editStoryPages[i - 1].number) + 1).toString();
                    $scope.newStoryPages.push(editStoryPages[i - 1])
                }
            };
            console.log($scope.newStoryPages)
            $scope.pageDataString = JSON.stringify($scope.newStoryPages);
            // 保存当前编辑的故事数据
            localStorageService.set('editStoryPages', $scope.pageDataString);
            // 跳转到编辑页面
            $state.go('tab.edit', { storyId: $scope.storyId });
           
        });

    }
}]);
