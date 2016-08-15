appController.controller('IndexCtrl', ['$scope', '$rootScope', 'localStorageService', '$state', '$ionicModal', '$ionicSlideBoxDelegate', '$timeout', 'IonicService', 'TabService', 'Con', function($scope, $rootScope, localStorageService, $state, $ionicModal, $ionicSlideBoxDelegate, $timeout, IonicService, TabService, Con) {
    $scope.badges = {
        message: 0
    };
    $scope.tabs = TabService.getTabs();
    $rootScope.UserInfo = JSON.parse(localStorageService.get('User'));
    // var User = JSON.parse(localStorageService.get('User'));
    // if (User) {
    //     // IonicService.getMessageCount(User.token).then(function(data) {
    //     //     $scope.badges.message = data.data;
    //     // });
    // }
    //退出
    $rootScope.loginOut = function() {
        Con.log('退出');
        localStorageService.remove('User');
        // $ionicHistory.nextViewOptions({
        //     disableAnimate: true,
        //     disableBack: true
        // });
        // $state.go("login");
        location.reload(true);
    };

}])
