/**
 * 页面添加控制器：
 * create by yufei
 */
// 模板使用页面
appController.controller('changeBackgroundMusicCtrl', ['$scope', '$rootScope', '$sce', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopup', '$timeout', '$interval', '$state', '$ionicHistory', '$filter', 'localStorageService', 'ShareService', 'IonicService', 'MsgBox', 'WechatApi', 'Con', function($scope, $rootScope, $sce, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicPopover, $ionicPopup, $timeout, $interval,
    $state, $ionicHistory, $filter, localStorageService, ShareService, IonicService, MsgBox, WechatApi, Con) {

    Con.log('根据模板添加页面');
    // $scope.urlParams = JSON.parse($stateParams.pages);
    var User = JSON.parse(localStorageService.get('User'));
    if (User) {
        var postParams = {
            userToken: User.token,
            userId: User.id,
        };
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000
        });
        IonicService.getMusicIndex().then(function(data) {
            console.log(data);
            $ionicLoading.hide();
            $scope.musicCategories = data.categories;
            $scope.musicList = data.musicList;
            $timeout(function() {
                jQuery('.firstLevelList li').eq(0).trigger('click');
                jQuery('.twoLevelList li').eq(0).trigger('click');
                $scope.func = function(e) {
                        return e.id == data.categoryId
                    }
                    // 添加当前分类音乐列表
                $scope.activeMusicCategory = $filter('filter')(data.categories, $scope.func)[0].name;
                console.log($scope.activeMusicCategory)
                    // 把loaded变为true,启用toggle功能;
                $scope.loaded = true;
            })
        });

        $scope.getMusicByCategory = function(categoryId) {
            IonicService.getMusicByCategory({ 'categoryId': categoryId }).then(function(data) {
                console.log(data);
                $ionicLoading.hide();
                if (data.status == '1' && data.message == 'success') {
                    $scope.musicList = null;
                    $scope.musicList = data.musicList;
                    $scope.func = function(e) {
                        return e.id == categoryId
                    }
                    $scope.activeMusicCategory = $filter('filter')($scope.musicCategories, $scope.func)[0].name;
                    $scope.toggle();
                }
                // $scope.musicCategories = data.categories;
                // $scope.musicList = data.musicList;
                // $timeout(function() {
                //     jQuery('.firstLevelList li').eq(0).trigger('click');
                //     jQuery('.twoLevelList li').eq(0).trigger('click');
                //     $scope.func = function(e) {
                //             return e.id == data.categoryId }
                //         // 添加当前分类音乐列表
                //     $scope.activeMusicCategory = $filter('filter')(data.categories, $scope.func)[0].name;
                //     console.log($scope.activeMusicCategory)
                //         // 把loaded变为true,启用toggle功能;
                //     $scope.loaded = true;
                // })
            });
        }



        // toggle方法
        $scope.toggle = function() {
            // var filterArr = $filter('filter')($scope.dropDownArr, { name: json.category })[0];
            // jQuery('.lbsTitSpan').text(json.category);
            // jQuery.each($scope.dropDownArr, function(k, v) {
            //     if (v.name == json.category) {
            //         $scope.dropDownArr[k].active = true;
            //         $scope.activeTit = json.category;
            //     } else {
            //         $scope.dropDownArr[k].active = false;
            //     }
            // })
            // if (json.category == "全部") {
            //     jQuery('.lbsTitSpan').text('发现');
            // }
            // 把滚动条拉回到最初位置
            jQuery('.scroll-bar-indicator').css({ transform: 'translate3d(0px, 0px, 0px) scale(1)' });
            jQuery('.musicListContent .scroll').css({ transform: 'translate3d(0px, 0px, 0px) scale(1)' });
            if ($scope.loaded) {
                $scope.visible = !$scope.visible;
                $scope.dropshow = !$scope.dropshow;
            }
        };

    } else {
        // 提示已下线
        $scope.showNoDataTip = true;
    }
    // 后退历史
    $scope.goBackView = function() {
        console.log($ionicHistory.viewHistory().backView)
        if (audio) {
            document.body.removeChild(audio);
        }
        if ($ionicHistory.viewHistory().backView) {
            // $ionicGoBack()
            $ionicHistory.goBack();
        } else {
            $rootScope.changePage('tab.home');
        };
        // stateName
        // $ionicGoBack()
    }
    var audio = null;
    $scope.setStoryMusic = function(musicUrl, index) {
        if (index == '-1') {
            jQuery('.loadingIcon').remove();
            jQuery('.noMusicBtn').append('<div class="loadingIcon loadedIcon"></div>');
            if (document.getElementById('audioId')) {
                document.body.removeChild(audio);
                console.log(document.getElementById('audioId'))
            }
            return false;
        }
        jQuery('.loadingIcon').remove();
        jQuery('.musicItem').eq(index).append('<div class="loadingIcon"><img class="loadingImg" src="img/loading.gif" alt=""></div>')

        if (document.getElementById('audioId')) {
            document.body.removeChild(audio);
            console.log(document.getElementById('audioId'))
        }

        audio = document.createElement("audio");
        audio.id = "audioId";
        document.body.appendChild(audio);
        console.log(document.getElementById('audioId'))
        audio.src = musicUrl;
        audio.play();
        $scope.timer = $interval(function() {
            // 检测开始播放
            if (audio.currentTime > 0) {
                $scope.newMusicData = {};
                $scope.storyId = JSON.parse(localStorageService.get('editStoryId'));
                $scope.newMusicData.editStoryId = $scope.storyId;
                $scope.newMusicData.storyMusicUrl = musicUrl;
                $scope.newMusicDataString = JSON.stringify($scope.newMusicData);
                localStorageService.set('newMusicData', $scope.newMusicDataString);
                $interval.cancel($scope.timer);
                jQuery('.loadingImg').remove();
                jQuery('.loadingIcon').addClass('loadedIcon');
            }
        }, 100)

    }
    $scope.dropshow = true;

}]);
