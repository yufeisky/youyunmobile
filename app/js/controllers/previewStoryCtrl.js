// 模板使用页面
appController.controller('previewStoryCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', '$timeout', '$state', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, $timeout,
    $state, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
    // $rootScope.menuShow = true;
    // $rootScope.backShow = true;
    // Con.log($stateParams);
    Con.log('预览页面');
    // console.log($stateParams);
    // 用ifarme展示

    $scope.urlParams = JSON.parse($stateParams.storyInfo);
    console.log($scope.urlParams)

    // var url =$stateParams.puburl;
    // console.log(url);
    // iframe需要sce转化之后才可以打开
    $scope.pubUrl = $sce.trustAsResourceUrl($scope.urlParams.puburl);
    $scope.storyTit = $scope.urlParams.title;
    // $scope.templateId = $scope.urlParams.id;
    console.log($scope.urlParams.puburl)
     console.log('--------缩放-------')
    var win_w = angular.element(window)[0].innerWidth;
    var scaleValue = win_w / 320;
    console.log(scaleValue);
    jQuery('<meta id="mt-viewport" name="viewport" content="width=320, initial-scale=' + scaleValue + ', minimum-scale=' + scaleValue + ', maximum-scale=' + scaleValue + ', user-scalable=no" servergenerated="true">').appendTo('head');
    $scope.changeStoryInfo = function(storyInfo) {
        if (jQuery('#mt-viewport').length > 0) {
            console.log('-----------移除viewport----------');
            $rootScope.viewportRemoved = true;
            jQuery('#mt-viewport').remove();
             jQuery('<meta name="viewport" content="width=320, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" servergenerated="true">').appendTo('head');
        }
        $scope.storyInfo = JSON.stringify(storyInfo);
        console.log(storyInfo);
        // 跳转到设置页面
        $state.go('tab.setStoryInfo', { storyInfo: $scope.storyInfo });
        // var createStoryInfo = {
        //     templateID: templateId,
        //     userId: User.id,
        //     userToken: User.token,
        //     device: 'h5'
        // }
        // $ionicLoading.show({
        //     content: 'Loading',
        //     animation: 'fade-in',
        //     showBackdrop: false,
        //     maxWidth: 200,
        //     showDelay: 0,
        //     duration: 10000
        // });
        // IonicService.createStoryByTemplateId(createStoryInfo).then(function(data) {
        //     $ionicLoading.hide();
        //     if (data.status == 1 && data.message == 'success') {
        //         $state.go('tab.edit', { storyId: data.storyId })
        //     }
        // })
    }
}]);
