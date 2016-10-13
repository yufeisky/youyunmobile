// 智能展示统计页面控制器
appController.controller('displayDataCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent) {
    //默认可以加载更多数据
    console.log('智能展示数据')
        // $ionicLoading.show({
        //     content: 'Loading',
        //     animation: 'fade-in',
        //     showBackdrop: false,
        //     maxWidth: 200,
        //     showDelay: 0,
        //     duration: 10000
        // });
        // 后退历史
    $scope.goBackView = function() {
        if ($ionicHistory.viewHistory().backView) {
            // $ionicGoBack()
            $ionicHistory.goBack();
        } else {
            $rootScope.changePage('tab.lbs');
        };
    }
    $scope.doRefresh = function() {
        // IonicService.getDataStatistics().then(function(data) {
        //     console.log(data);
        //     if(data.status=="1"&&data.message=="Success"){
        //        $scope.display_items = data.display_items; 
        //     }
        //     $scope.$broadcast('scroll.refreshComplete');
        // });
        $scope.getDisplayData();
    }
    $scope.getDisplayData = function() {
        IonicService.getDataStatistics().then(function(data) {
            console.log(data);
            $ionicLoading.hide();
            if (data.status == "1" && data.message == "Success") {
                $scope.display_items = data.display_items;
            }
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
    $scope.getDisplayData();
    $scope.selectChange = function(){
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000
        });
        $scope.getDisplayData();
    }
    $scope.selectIndex =1;
}]);
