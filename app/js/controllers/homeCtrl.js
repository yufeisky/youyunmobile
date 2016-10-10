 // 首页
 appController.controller('homeCtrl', ['$scope', '$rootScope', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicSlideBoxDelegate', 'localStorageService', 'ShareService', 'IonicService', 'Con', function($scope, $rootScope, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicSlideBoxDelegate, localStorageService, ShareService, IonicService, Con) {
     // 重置左上角的按钮
     // $rootScope.menuShow = true;
     // $rootScope.backShow = false;
     $scope.storys = [
         [],
         [],
         [],
         []
     ];
     $scope.more = true;
     $scope.navs = [{
         title: '推荐',
         order: 0,
         storyStatus: '3', //4暂时没数据 所以写3
         pageNum: 0
     }, {
         title: '品牌故事',
         order: 1,
         storyStatus: '1',
         pageNum: 0
     }, {
         title: '热点资讯',
         order: 2,
         storyStatus: '2',
         pageNum: 0
     }, {
         title: '生活故事',
         order: 3,
         storyStatus: '3',
         pageNum: 0
     }];

     $scope.isActiveTab = function(order) {
         // Con.log('isactive')
         // Con.log($scope.currentTab == order)
         return $scope.currentTab == order;
     };
     var User = JSON.parse(localStorageService.get('User'));
     if (User) {
         postParams = {
             userToken: User.token,
             userId: User.id,
         };
     } else {
         postParams = {
             userToken: '',
             userId: '',
         };
     }
     // Con.log('width');
     // Con.log(angular.element(window)[0].innerWidth);
     var win_w = angular.element(window)[0].innerWidth;
     $scope.img_w = win_w * 0.45 * 0.9 + 'px';
     // Con.log($scope.img_w);

     $scope.doRefresh = function(myActiveSlide) {
         $scope.more = true;
         $scope.currentTab = myActiveSlide;
         // Con.log($scope.currentTab);
         $scope.myActiveSlide = myActiveSlide;
         postParams.storyType = $scope.navs[myActiveSlide].storyStatus;
         $scope.navs[myActiveSlide].pageNum = 1;
         postParams.pageNum = $scope.navs[myActiveSlide].pageNum;
         IonicService.getHomeStorys(postParams).then(function(data) {
              Con.log(data.storys)
             if (angular.equals(data.storys, [])) {
                 $scope.more = false;
                 $scope.$broadcast('scroll.infiniteScrollComplete');
             }
             if (data.storys) {
                 if (postParams.pageNum == 1) {
                     $scope.storys[$scope.currentTab] = data.storys;
                 }
             }
             // Con.log($scope.storys);
         }).finally(function() {
             $scope.$broadcast('scroll.refreshComplete');
         });
     };

     $scope.loadMore = function(myActiveSlide, del) {
         $scope.more = true;
         // Con.log('-----myActiveSlide------');
         // Con.log(myActiveSlide)
         try {
            
             $scope.currentTab = myActiveSlide;
             // Con.log($scope.currentTab);
             $scope.myActiveSlide = myActiveSlide;
             postParams.storyType = $scope.navs[myActiveSlide].storyStatus;
             $scope.navs[myActiveSlide].pageNum = $scope.navs[myActiveSlide].pageNum + 1;
             postParams.pageNum = $scope.navs[myActiveSlide].pageNum;
             Con.log(postParams.storyType);
             IonicService.getHomeStorys(postParams).then(function(data) {
                 console.log('------storys-----');
                  Con.log(data.storys)
                 if (angular.equals(data.storys, [])) {
                     $scope.more = false;
                     $scope.$broadcast('scroll.infiniteScrollComplete');
                 }
                 if (data.storys) {
                     if (postParams.pageNum == 1) {
                         $scope.storys[$scope.currentTab] = data.storys;
                     } else {
                         angular.forEach(data.storys, function(item) {
                             $scope.storys[$scope.currentTab].push(item);
                         });
                     }
                     $scope.$broadcast('scroll.infiniteScrollComplete');

                 }
                 // Con.log($scope.storys);
             });
             // switch (postParams.storyType) {
             //     case '1':
             //         IonicService.getHomeStorys(postParams).then(function(data) {
             //             Con.log(data)
             //             if (!data.storys[0]) {
             //                 $scope.more = false;
             //             }
             //             if (data.storys) {
             //                 if (postParams.pageNum == 1) {
             //                     $scope.storys = data.storys;
             //                 } else {
             //                     angular.forEach(data.storys, function(item) {
             //                         $scope.storys.push(item);
             //                     });
             //                 }
             //                 $scope.$broadcast('scroll.infiniteScrollComplete');

             //             }
             //         });
             //         break;
             //     case '2':
             //         IonicService.getHomeStorys(postParams).then(function(data) {
             //             if (!data.storys[0]) {
             //                 $scope.more = false;
             //             }
             //             if (data.storys) {
             //                 if (postParams.pageNum == 1) {
             //                     $scope.brandStorys = data.storys;
             //                 } else {
             //                     angular.forEach(data.storys, function(item) {
             //                         $scope.offLineStorys.push(item);
             //                     });
             //                 }
             //                 $scope.$broadcast('scroll.infiniteScrollComplete');
             //             }
             //         });
             //         break;
             //     case '3':
             //         Con.log('我的收藏');
             //         break;
             //     case '4':
             //         Con.log('我的动态');
             //         break;
             // }
         } catch (ex) {
             $scope.more = false;
         }

     };
     // 当前选中：
     $scope.myActiveSlide = '0';
     // $ionicSlideBoxDelegate.enableSlide(false);
 }]);
