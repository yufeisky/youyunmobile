/**
 * 控制器入口：个人中心控制器
 */
// 模板使用页面
appController.controller('sortPageCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', '$timeout', '$state', '$ionicHistory', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, $timeout,
    $state, $ionicHistory, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
    // $rootScope.menuShow = true;
    // $rootScope.backShow = true;
    // Con.log($stateParams);
    Con.log('预览页面');
    // console.log($stateParams);
    // 用ifarme展示

    $scope.urlParams = JSON.parse($stateParams.pages);
    // console.log($scope.urlParams)
    $scope.pages = $scope.urlParams;
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
    $scope.renderPage = function() {
        // 计算出块的高度
        var win_w = angular.element(window)[0].innerWidth;
        // $scope.itemWith = win_w * 0.30 + 'px';
        $scope.itemWith = win_w * 0.30;
        console.log($scope.itemWith)
        $scope.pageWidthScale = $scope.itemWith / 320;
        console.log($scope.pageWidthScale)
        $scope.itemHeight = 505 * $scope.pageWidthScale + 'px';
        console.log($scope.itemHeight)

        $timeout(function() {
            jQuery(function() {
                jQuery('.sortUl .bf-com-impl').each(function(k, v) {
                    jQuery(v).css({
                        'animation-duration': '0s',
                        '-moz-animation-duration': '0s',
                        '-webkit-animation-duration': '0s',
                        '-o-animation-duration': '0s',
                        'animation-delay': '0s',
                        '-moz-animation-delay': '0s',
                        '-webkit-animation-delay': '0s',
                        '-o-animation-delay': '0s',
                    })
                });
                jQuery('.sortUl .storyPage').show();
            });
        })
    }
    $scope.renderPage();

    $scope.moveItem = function(item, fromIndex, toIndex) {
        if (fromIndex > 0) {
            //把该项移动到数组中
            $scope.pages.splice(fromIndex, 1);
            $scope.pages.splice(toIndex, 0, item);
            console.log($scope.pages);
        }
    };
}]);
