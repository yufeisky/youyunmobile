// 没有数字展柜权限的时候进去是播放广告
appController.controller('noPermissionsCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover','$state', 'localStorageService', 'ShareService', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover,$state, localStorageService, ShareService) {
    // 用ifarme展示
    // iframe需要sce转化之后才可以打开
    // console.log($stateParams.businessUrl)
    $scope.noPermissionsUrl = $sce.trustAsResourceUrl($stateParams.noPermissionsUrl);

}]);
