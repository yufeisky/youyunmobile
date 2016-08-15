// lbs组详细页面
appController.controller('lbsGroupDetailCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
    // $rootScope.menuShow = true;
    // $rootScope.backShow = true;
    // Con.log($stateParams);
    Con.log('lbs组控制器');
    // Con.log($stateParams);
    // 用ifarme展示
    console.log($rootScope.lbsStoryList)
        // $scope.lbsStoryList = JSON.parse($stateParams.lbsStoryList);
        // console.log($scope.lbsStoryList)


}]);
