// 模板使用页面
appController.controller('designDetailCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {
    // $rootScope.menuShow = true;
    // $rootScope.backShow = true;
    // Con.log($stateParams);
    Con.log('首页详情');
    console.log($stateParams);
    // 用ifarme展示
    $scope.urlParams = JSON.parse($stateParams.itemPars);
    console.log($scope.urlParams)

    // var url =$stateParams.puburl;
    // console.log(url);
    // iframe需要sce转化之后才可以打开
    $scope.pubUrl = $sce.trustAsResourceUrl($scope.urlParams.puburl);
    $scope.storyTit=$scope.urlParams.title;
    
    // 微信授权
    // $rootScope.upal_share = {
    //     title: $scope.urlParams.story_title, // 分享标题
    //     desc: $scope.urlParams.second_title, // 分享描述
    //     share_link: $scope.urlParams.pub_url, // 分享链接
    //     imgUrl: $scope.urlParams.img_src, // 分享图标
    //     currentUrl: location.href //当前页面的网址，签名的时候要用
    // };
    // WechatApi.f_wxReady();
    // Con.log(User);

}]);
