// 模板使用页面
appController.controller('setStoryCategoriesCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', '$filter', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', 'MsgBox', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, $filter, localStorageService, ShareService, IonicService, Con, SectionEvent, MsgBox) {
    // $rootScope.menuShow = true;
    // $rootScope.backShow = true;
    // Con.log($stateParams);
    Con.log('预览页面');
    // console.log($stateParams);
    // 用ifarme展示

    $scope.urlParams = JSON.parse($stateParams.storyInfo);
    console.log($scope.urlParams);

    // 三大类类别集合
    $scope.allCategories = JSON.parse($scope.urlParams.storycategories);
    // 品牌故事
    $scope.brandStoryCategories = null;
    $scope.brandStoryCategories = $filter('filter')($scope.allCategories, { "name": "品牌故事" })[0].categories;
    console.log($scope.brandStoryCategories);
    // 热点新闻
    $scope.hotNewsCategories = null;
    $scope.hotNewsCategories = $filter('filter')($scope.allCategories, { "name": "热点新闻" })[0].categories;
    console.log($scope.hotNewsCategories);
    // 生活故事
    $scope.lifeStoryCategories = null;
    $scope.lifeStoryCategories = $filter('filter')($scope.allCategories, { "name": "生活故事" })[0].categories;
    console.log($scope.lifeStoryCategories);
    //选中的类型数组
    $scope.activeCategories = $scope.urlParams.storycategory;
    console.log($scope.activeCategories);
    jQuery.each($scope.activeCategories, function(k, v) {
        $timeout(function() {
            jQuery('.categoriesWrap li[id=' + v.id + ']').addClass('active');
        })
    });
    // 后退历史
    $scope.goBackView = function() {
       var storyInfo = JSON.stringify($scope.urlParams);
        // 跳转到设置页面
        $state.go('tab.setStoryInfo', { storyInfo: storyInfo });
    }

    $scope.toggleClick = function(id) {
            var thisJqObj = jQuery('.categoriesWrap li[id=' + id + ']');
            var selectedLen = thisJqObj.parents('.categoriesWrap').find('li.active').length;
            console.log(thisJqObj.parents('.categoriesWrap').find('li.active'))
            console.log(selectedLen)
            if (thisJqObj.hasClass('active')) {
                thisJqObj.removeClass('active');
            } else {
                if (selectedLen >= 3) {
                    MsgBox.showTexts('每个类型最多只能选3个标签！')
                } else {
                    thisJqObj.addClass('active');
                }
            }
        }
        // $scope.storycategories = JSON.parse($scope.urlParams.storycategories);
        // console.log($scope.storycategories)
    $scope.setCategory = function() {
        var categories = jQuery('.categoriesWrap li.active');
        // console.log(categories);
        var storyCategoryArr = [];
        console.log(categories)
        jQuery.each(categories, function(k, v) {
            var storyCategory = {id:jQuery(v).attr('id'),name:jQuery(v).text()};
            storyCategoryArr.push(storyCategory);
        });
        // console.log(storyCategoryArr)
        // var idStrings = idArr.toString();
        $scope.urlParams.storycategory=storyCategoryArr;
        // console.log($scope.urlParams);
        var storyInfo = JSON.stringify($scope.urlParams);
        // 跳转到设置页面
        $state.go('tab.setStoryInfo', { storyInfo: storyInfo });
        // $scope.storyInfo = {
        //     puburl: $scope.urlParams.puburl,
        //     storyId: $scope.urlParams.storyId,
        //     title: $scope.urlParams.title,
        //     description: $scope.urlParams.description,
        //     logo: $scope.urlParams.logo,
        //     storycategory: data.storycategory,
        //     storycategories: $scope.urlParams.storycategories
        // }
    }
}]);
