/**
 * 控制器入口：内部信息控制器
 */
appController.controller('innerMessageCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$ionicLoading', '$ionicPopup', '$ionicHistory', '$ionicModal', '$timeout', 'localStorageService', 'IonicService', 'TabService', 'Con','LoginConfirm',
    function($scope, $rootScope, $stateParams, $state, $ionicLoading, $ionicPopup, $ionicHistory, $ionicModal, $timeout, localStorageService, IonicService, TabService, Con,LoginConfirm) {
        var User =LoginConfirm.login();
        var postParams = {
            userToken: User.token,
            userId: User.id,
        };
        $scope.more = true;
        console.log( postParams);
        $scope.loadMore = function(myActiveSlide, del) {
            $scope.more = true;
            try {
                postParams.pageNo = 1;
                postParams.pageSize = 15;
                IonicService.postInnerMessage(postParams).then(function(data) {
                    if (data.status == '2') {
                        $rootScope.loginOut();
                    }
                    if (data.count==0) {
                        $scope.more = false;
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                    console.log(data);
                    if (data.data) {
                        if (postParams.pageNo== 1) {
                            $scope.messages=data.data;
                        } else {
                            angular.forEach(data.data, function(item) {
                                $scope.messages.push(item);
                            });
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.more = false;

                    }
                    console.log( $scope.messages);
                });
            } catch (ex) {
                $scope.more = false;
            }
        };
    }]);
