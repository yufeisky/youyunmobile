// 模板展示页面
appController.controller('designCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent) {

    var User = JSON.parse(localStorageService.get('User'));
    Con.log(User);
    // if (User) {
        //设置图片高度
        var win_w = angular.element(window)[0].innerWidth;
        $scope.img_w = win_w * 0.45 * 229 / 158 + 'px';
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000
        });
        $scope.loadValue = false;
        //请求三大类别的最热数据
        IonicService.getTemplateIndex().then(function(data) {
            console.log(data);
            if (data.status == 1) {
                jQuery.each(data.data, function(k, v) {
                    if (v.name == "个人") {
                        $scope.personalTemplateArr = v;
                        console.log($scope.personalTemplateArr)
                    }
                    if (v.name == "行业") {
                        $scope.industryTemplateArr = v;
                        console.log($scope.industryTemplateArr)
                    }
                    if (v.name == "场景") {
                        $scope.sceneTemplateArr = v;
                        console.log($scope.sceneTemplateArr)
                    }

                });
                $ionicLoading.hide();
                $scope.loadValue = true;
            }
        });
    // } else {
    //     $timeout(function() {
    //         $rootScope.changePage('tab.design');
    //     }, 100);
    // }
}]);
