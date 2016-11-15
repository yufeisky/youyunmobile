// 首页详情
appController.controller('feedbackCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', '$state', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, $state, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
    Con.log('意见反馈');
    // 用ifarme展示
    // iframe需要sce转化之后才可以打开
    // console.log($stateParams.businessUrl)
    $scope.pubUrl = '意见反馈';
    $scope.suggestion = { content: '' };
    $scope.addFeedBack = function() {
    	$ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        var User = JSON.parse(localStorageService.get('User'));
        var postData = {
                userId: User.id,
                userToken: User.token,
                content: $scope.suggestion.content
            }
            // console.log(User);
            console.log(postData);
            IonicService.addFeedBack(postData).then(function(data) {
                console.log(data)
                $ionicLoading.hide();
                if (data.status == 1 && data.message == "success") {
                    MsgBox.showTexts('提交成功，感谢您的建议');
                } else {
                    MsgBox.showTexts('提交失败,请稍后再试');
                }
            });
    }
}]);
