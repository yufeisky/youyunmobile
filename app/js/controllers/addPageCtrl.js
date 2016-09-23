/**
 * 页面添加控制器：
 * create by yufei
 */
// 模板使用页面
appController.controller('addPageCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', '$timeout', '$state', '$ionicHistory', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, $timeout,
    $state, $ionicHistory, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
    
    Con.log('根据模板添加页面');

    // $scope.urlParams = JSON.parse($stateParams.pages);
    
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

}]);
