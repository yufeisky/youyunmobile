/**
 * 控制器入口：个人中心控制器
 */
appController.controller('userListCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$ionicLoading', '$ionicPopup', '$ionicHistory', '$ionicModal', '$timeout', 'localStorageService', 'IonicService', 'TabService', 'Con', function($scope, $rootScope, $stateParams, $state, $ionicLoading, $ionicPopup, $ionicHistory, $ionicModal, $timeout, localStorageService, IonicService, TabService, Con) {
        Con.log('个人中心控制器已加载');
        var postParams = {

        };
        //nav数据
        $scope.navs = [{
            order: 0,
            storyStatus: '1',
            pageNum: 0
        }, {
            order: 1,
            storyStatus: '0',
            pageNum: 0
        }, {
            order: 2,
            storyStatus: '3',
            pageNum: 0
        }];
        console.log($stateParams.storyStatus);
        $scope.myActiveSlide = $stateParams.storyStatus;
        $scope.more = true;
        $scope.storys = [];
        $scope.offLineStorys = [];
        $scope.collectStorys = [];
        var User = JSON.parse(localStorageService.get('User'));

        Con.log(User);
        Con.log('已登录');
        postParams = {
            userToken: User.token,
            userId: User.id,
        };
        //判断哪个选中方法:
        $scope.isActiveTab = function(order) {
            return $scope.myActiveSlide == order;
        };
        $scope.chooseActiveTab = function(order) {
            $scope.myActiveSlide = order;
        };

        $scope.doRefresh = function(myActiveSlide, del) {
            $scope.more = true;
            try {
                $scope.myActiveSlide = myActiveSlide;
                postParams.storyStatus = $scope.navs[myActiveSlide].storyStatus;
                $scope.navs[myActiveSlide].pageNum = 1;
                postParams.pageNum = $scope.navs[myActiveSlide].pageNum;
                postParams.search=null;
                Con.log(postParams.storyStatus);
                switch (postParams.storyStatus) {
                    case '1':
                        IonicService.getStorys(postParams).then(function(data) {
                            // console.log(data.storys);
                            if (data.messageType == '2') {
                                $rootScope.loginOut();
                            }
                            if (angular.equals(data.storys, [])) {
                                $scope.more = false;
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            }
                            if (data.storys) {
                                if (postParams.pageNum == 1) {
                                    $scope.storys = data.storys;
                                }
                                $scope.$broadcast('scroll.infiniteScrollComplete');

                            }
                        }).finally(function() {
                            Con.log('完成');
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                        break;
                    case '0':
                        IonicService.getStorys(postParams).then(function(data) {
                            if (data.messageType == '2') {
                                $rootScope.loginOut();
                            }
                            if (angular.equals(data.storys, [])) {
                                $scope.more = false;
                                $scope.$broadcast('scroll.refreshComplete');
                            }
                            if (data.storys) {
                                if (postParams.pageNum == 1) {
                                    $scope.offLineStorys = data.storys;
                                }
                                $scope.$broadcast('scroll.refreshComplete');
                            }
                        }).finally(function() {
                            Con.log('完成');
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                        break;
                    case '3':
                        IonicService.getCollectStorys(postParams).then(function(data) {
                            Con.log(data);
                            if (data.messageType == '2') {
                                $rootScope.loginOut();
                            }
                            if (angular.equals(data.storys, [])) {
                                $scope.more = false;
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            }
                            if (data.storys) {
                                if (postParams.pageNum == 1) {
                                    $scope.collectStorys = data.storys;
                                }
                                $scope.$broadcast('scroll.refreshComplete');
                            }
                        }).finally(function() {
                            Con.log('完成');
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                        break;
                }
            } catch (ex) {
            }
        };

        $scope.isSelect=function(index){
            return !$scope.collectStorys[index].isSelect;
        }

        $scope.onSelect=function(index){
           $scope.collectStorys[index].isSelect=true;
        }

        $scope.unSelect=function(index){
            $scope.collectStorys[index].isSelect=null;
        }

        $scope.isEdit=false;
        $scope.gotoEdit=function(){
            $scope.isEdit=true;
        }
        $scope.gotoShow=function(){
            $scope.isEdit=null;
        }
        $scope.deleteCollect=function(){
            postParams.objectIds="";
            angular.forEach($scope.collectStorys, function(item) {
                if(item.isSelect){
                    if(postParams.objectIds!=""){
                        postParams.objectIds=postParams.objectIds+",";
                    }
                    postParams.objectIds= postParams.objectIds+item.id;
                }
            });
            console.log($scope.collectStorys);
            console.log(postParams.objectIds);
            IonicService.postUnCollectStory(postParams).then(function(data) {
                Con.log(data);
                if (data.messageType == '2') {
                    $rootScope.loginOut();
                }
                if (angular.equals(data.storys, [])) {
                    $scope.more = false;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
                if (data.storys) {
                    if (postParams.pageNum == 1) {
                        $scope.collectStorys = data.storys;
                    }
                    $scope.$broadcast('scroll.refreshComplete');
                }
            }).finally(function() {
                Con.log('完成');
                $scope.$broadcast('scroll.refreshComplete');
            });
        }


        $scope.searchText="";
        $scope.search=function(){
            var myActiveSlide=2;
            $scope.myActiveSlide = myActiveSlide;
            postParams.storyStatus = $scope.navs[myActiveSlide].storyStatus;
            $scope.navs[myActiveSlide].pageNum = 1;
            postParams.pageNum = $scope.navs[myActiveSlide].pageNum;
            postParams.search =$scope.searchText;
            IonicService.getCollectStorys(postParams).then(function(data) {
                Con.log(data);
                if (data.messageType == '2') {
                    $rootScope.loginOut();
                }
                if (angular.equals(data.storys, [])) {
                    $scope.more = false;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
                if (data.storys) {
                    if (postParams.pageNum == 1) {
                        $scope.collectStorys = data.storys;
                    }
                    $scope.$broadcast('scroll.refreshComplete');
                }
            }).finally(function() {
                Con.log('完成');
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        $scope.loadMore = function(myActiveSlide, del) {
            $scope.more = true;
            try {
                $scope.myActiveSlide = myActiveSlide;
                postParams.storyStatus = $scope.navs[myActiveSlide].storyStatus;
                $scope.navs[myActiveSlide].pageNum = $scope.navs[myActiveSlide].pageNum + 1;
                postParams.pageNum = $scope.navs[myActiveSlide].pageNum;
                Con.log(postParams.storyStatus);
                Con.log('我的动态');
                switch (postParams.storyStatus) {
                    case '1':
                        IonicService.getStorys(postParams).then(function(data) {
                            if (data.messageType == '2') {
                                $rootScope.loginOut();
                            }
                            if (angular.equals(data.storys, [])) {
                                $scope.more = false;
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            }
                            if (data.storys) {
                                if (postParams.pageNum == 1) {
                                    $scope.storys = data.storys;
                                } else {
                                    angular.forEach(data.storys, function(item) {
                                        $scope.storys.push(item);
                                    });
                                }
                                $scope.$broadcast('scroll.infiniteScrollComplete');

                            }
                        });
                        break;
                    case '0':
                        IonicService.getStorys(postParams).then(function(data) {
                            Con.log(data);
                            if (data.messageType == '2') {
                                $rootScope.loginOut();
                            }
                            if (angular.equals(data.storys, [])) {
                                $scope.more = false;
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            }
                            if (data.storys) {
                                if (postParams.pageNum == 1) {
                                    $scope.offLineStorys = data.storys;
                                } else {
                                    angular.forEach(data.storys, function(item) {
                                        $scope.offLineStorys.push(item);
                                    });
                                }
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            }
                        });
                        break;
                    case '3':
                        IonicService.getCollectStorys(postParams).then(function(data) {
                            Con.log(data);
                            if (data.messageType == '2') {
                                $rootScope.loginOut();
                            }
                            if (angular.equals(data.storys, [])) {
                                $scope.more = false;
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            }
                            if (data.storys) {
                                if (postParams.pageNum == 1) {
                                    $scope.collectStorys = data.storys;
                                } else {
                                    angular.forEach(data.storys, function(item) {
                                        $scope.collectStorys.push(item);
                                    });
                                }
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            }
                        });
                        break;
                }
            } catch (ex) {
                $scope.more = false;
            }
        };


    }]);
