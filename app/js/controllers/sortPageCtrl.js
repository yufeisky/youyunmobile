/**
 * 页面排序控制器：
 * create by yufei
 */
// 模板使用页面
appController.controller('sortPageCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', '$timeout', '$state', '$ionicHistory', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, $timeout,
    $state, $ionicHistory, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
    // $rootScope.menuShow = true;
    // $rootScope.backShow = true;
    // Con.log($stateParams);
    Con.log('排序页面');
    // console.log($stateParams);
    // 用ifarme展示

    $scope.urlParams = JSON.parse($stateParams.pages);
    console.log($scope.urlParams)
    // $scope.storyId = JSON.parse($stateParams.storyId);
    // 获取编辑的storyId,跳转回去编辑页面的时候需要用
    $scope.storyId = JSON.parse(localStorageService.get('editStoryId'));
    // console.log($scope.urlParams)
    $scope.pages = $scope.urlParams;
    $scope.oldPages= angular.copy($scope.pages);
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
        /**
         * 渲染页面的方法： 
         * 1. 计算出单个item的宽高跟页面的缩放比scale；
         * 2. 把所有元素的动画属性清除；
         **/
    $scope.renderPage = function() {
        // 计算出块的高度
        var win_w = angular.element(window)[0].innerWidth;
        // $scope.itemWith = win_w * 0.30 + 'px';
        $scope.itemWith = win_w * 0.45;
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
    /**
     * 排序方法:
     *item:需要配需的元素
     *fromIndex:需要移动元素的位置
     *toIndex:需要移动到的目标位置
     *type:up:往上 down:往下
     **/
     $scope.sortedPageData=[];
    $scope.moveItem = function(item, fromIndex, toIndex, type) {
        if (fromIndex > 0 && type == "up") {
            //把该项移动到数组中
            $scope.pages.splice(fromIndex, 1);
            $scope.pages.splice(toIndex, 0, item);
            console.log($scope.pages);
        }
        if ((fromIndex < ($scope.pages.length - 1)) && type == "down") {
            //把该项移动到数组中
            $scope.pages.splice(fromIndex, 1);
            $scope.pages.splice(toIndex, 0, item);
            console.log($scope.pages);
        }
        jQuery.each($scope.pages,function(index, el) {
        	console.log(index)
        	console.log(el)
        	el.number = index+1;
        	// $scope.sortedPageData.push(el);
        });
    };
    /*确定修改排序方法并返回到编辑页面*/
    $scope.saveSortData = function() {
        // 把排序后的数据挂载到全局
        $scope.pageDataString = JSON.stringify($scope.pages);
        // 保存当前编辑的故事数据
        localStorageService.set('editStoryPages', $scope.pageDataString);
        // 跳转到编辑页面
        $state.go('tab.edit', { storyId: $scope.storyId });
    }
}]);
