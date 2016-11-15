// 首页详情
appController.controller('businessCooperationCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover','$state', 'localStorageService', 'ShareService', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover,$state, localStorageService, ShareService) {
    // 用ifarme展示
    // iframe需要sce转化之后才可以打开
    // console.log($stateParams.businessUrl)
    $scope.pubUrl = $sce.trustAsResourceUrl($stateParams.businessUrl);

}]);
