// 模板使用页面
appController.controller('designDetailCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', '$timeout', '$state', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, $timeout,
    $state, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
    // $rootScope.menuShow = true;
    // $rootScope.backShow = true;
    // Con.log($stateParams);
    Con.log('首页详情');
    // console.log($stateParams);
    // 用ifarme展示
    var User = JSON.parse(localStorageService.get('User'));
    console.log(User);
    if (User) {
        $scope.urlParams = JSON.parse($stateParams.itemPars);
        // console.log($scope.urlParams)

        // var url =$stateParams.puburl;
        // console.log(url);
        // iframe需要sce转化之后才可以打开
        $scope.pubUrl = $sce.trustAsResourceUrl($scope.urlParams.puburl);
        $scope.storyTit = $scope.urlParams.title;
        $scope.templateId = $scope.urlParams.id;
        console.log($scope.urlParams)

        $scope.createStoryByTemplateId = function(templateId) {
            var createStoryInfo = {
                templateID: templateId,
                userId: User.id,
                userToken: User.token,
                device: 'h5'
            }
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0,
                duration: 10000
            });
            IonicService.createStoryByTemplateId(createStoryInfo).then(function(data) {
                $ionicLoading.hide();
                if (data.status == 1 && data.message == 'success') {
                    $state.go('tab.edit', { storyId: data.storyId });
                }
            })
        }
    } else {
        $timeout(function() {
            $rootScope.changePage('tab.design');
        }, 100);
    }
}]);
