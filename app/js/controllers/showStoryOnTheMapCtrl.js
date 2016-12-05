// 模板使用页面
appController.controller('showStoryOnTheMapCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', '$filter', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', 'MsgBox', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, $filter, localStorageService, ShareService, IonicService, Con, SectionEvent, MsgBox) {
    // $rootScope.menuShow = true;
    // $rootScope.backShow = true;
    // Con.log($stateParams);
    Con.log('显示在地图上');
    // console.log($stateParams);
    // 用ifarme展示

    $scope.urlParams = JSON.parse($stateParams.storyInfo);
    console.log($scope.urlParams);
    $scope.longitude = $scope.urlParams.longitude;
    $scope.latitude = $scope.urlParams.latitude;
    $scope.address = $scope.urlParams.address;
    //获取坐标
    $scope.getLocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }
        //用户同意获取地理位置执行该函数
    $scope.showPosition = function(position) {
            console.log(position);
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            // if($scope.latitude){
            //     latitude = $scope.latitude;
            //     longitude = $scope.longitude;
            // }
            // 这里到时候要加判断
            var map = new AMap.Map('container2', {
                resizeEnable: false,
                zoom: 14,
                center: [longitude, latitude],
            });
            if ($scope.latitude) {
                // latitude = $scope.latitude;
                // longitude = $scope.longitude;
                // 之前有设置的位置
                var marker2 = new AMap.Marker({
                    map: map,
                    icon: 'img/point@2x.png',
                    // position: [113.898278, 23.081495],//这里填之前设定过的位置
                    position: [$scope.longitude, $scope.latitude], //这里填之前设定过的位置
                    bubble: true
                });
                $scope.newLongitude = $scope.longitude;
                $scope.newLatitude = $scope.latitude;
                $scope.newAddress = $scope.address;
            } else {
                // 之前没有标注，在当前位置的偏移200处设一个点，让初始时的点看不到
                var marker2 = new AMap.Marker({
                    map: map,
                    icon: 'img/point@2x.png',
                    // position: [113.898278, 23.081495],
                    position: [longitude, latitude],
                    bubble: true
                });
            }
            // marker = new AMap.Marker({
            //     position: [longitude, latitude],
            //     map: map,
            //     offset: new AMap.Pixel(-12, 0)
            // });
            // marker.content = '你的位置';
            // marker.on('click', markerClick);

            // function markerClick(e) {
            //     infoWindow.setContent(e.target.content);
            //     infoWindow.open(map, e.target.getPosition());
            // }

            AMap.plugin('AMap.Geocoder', function() {
                var geocoder = new AMap.Geocoder({
                    city: "010" //城市，默认：“全国”
                });
                var marker = new AMap.Marker({
                    map: map,
                    // position: [113.898278, 23.081495],//这里填之前设定过的位置
                    position: [longitude, latitude], //这里填之前设定过的位置
                    bubble: true
                })
                map.on('click', function(e) {
                    var distance = lnglat.distance(e.lnglat)
                    if (distance > 1000) {
                        MsgBox.showTexts('这里距离太远了，请选择您附近的位置');
                    }
                })

                var circle = new AMap.Circle({
                    map: map,
                    center: [longitude, latitude], //设置线覆盖物路径
                    radius: 1000,
                    strokeColor: "#3366FF", //边框线颜色
                    strokeOpacity: 0.3, //边框线透明度
                    strokeWeight: 3, //边框线宽
                    fillColor: "#FFA500", //填充色
                    fillOpacity: 0.35 //填充透明度
                });
                circle.on('click', function(e) {
                    console.log(e.lnglat);
                    marker2.setPosition(e.lnglat);
                    geocoder.getAddress(e.lnglat, function(status, result) {
                        if (status == 'complete') {
                            console.log(result.regeocode.formattedAddress);
                            $scope.newLongitude = e.lnglat.lng;
                            $scope.newLatitude = e.lnglat.lat;
                            $scope.newAddress = result.regeocode.formattedAddress;
                        }
                    })
                });
                var lnglat = new AMap.LngLat(longitude, latitude);
            });

        }
        //用户不同意或出错的时候执行该函数
    $scope.showError = function(error) {
            $scope.showPosition({ coords: { latitude: 23.096714, longitude: 113.366693 } })
                // // 广州
                // // $scope.ininMap(113.366693, 23.096714, true);
                // // 东莞
                // // $scope.ininMap(113.898278, 23.081495, true);
        }
        // 后退历史
    $scope.goBackView = function() {
        var storyInfo = JSON.stringify($scope.urlParams);
        // 跳转到设置页面
        $state.go('tab.setStoryInfo', { storyInfo: storyInfo });
    }

    $scope.sureAdress = function() {
            if (!$scope.newLongitude) {
                MsgBox.showTexts('请在圆圈内设置故事显示的位置;')
            } else {
                $scope.urlParams.longitude = $scope.newLongitude;
                $scope.urlParams.latitude = $scope.newLatitude;
                $scope.urlParams.address = $scope.newAddress;
                var storyInfo = JSON.stringify($scope.urlParams);
                // 跳转到设置页面
                $state.go('tab.setStoryInfo', { storyInfo: storyInfo });
            }
        }
        // $scope.storycategories = JSON.parse($scope.urlParams.storycategories);
        // console.log($scope.storycategories)
    $scope.notShowOnMap = function() {
            $scope.urlParams.longitude = '';
            $scope.urlParams.latitude = '';
            $scope.urlParams.address = '';
            var storyInfo = JSON.stringify($scope.urlParams);
            // 跳转到设置页面
            $state.go('tab.setStoryInfo', { storyInfo: storyInfo });
        }
        //调用获取位置信息
    $scope.getLocation();
}]);
