// lbs
appController.controller('lbsCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$timeout', '$ionicNavBarDelegate', '$filter', '$compile', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'Tool', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $timeout, $ionicNavBarDelegate, $filter, $compile, localStorageService, ShareService, IonicService, Con, Tool) {
    // 重置左上角的按钮
    // $rootScope.menuShow = true;
    // $rootScope.backShow = false;
    var map = new AMap.Map('container', {
        zoom: 10,
        center: [116.39, 23.9],
    });
    //获取坐标
    $scope.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    $scope.showPosition = function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        AMap.convertFrom([longitude, latitude],
            // AMap.convertFrom([116.368904, 39.923423],
            'gps',
            function(status, result) {
                if (status == "complete") {
                    latitude = result.locations[0].lat;
                    longitude = result.locations[0].lng;
                    // alert(latitude);
                    // alert(longitude);
                    $scope.ininMap(longitude, latitude);

                }

                // if(status=='compile'){}
            })

    }
    $scope.ininMap = function(longitude, latitude) {
        // alert(latitude);
        // alert(longitude);
        AMap.service('AMap.CloudDataSearch', function() { //回调函数
            var center = [longitude, latitude];
            var search;
            var searchOptions = {
                keywords: '',
                // pageSize: 5,
                orderBy: '_id:ASC'
            };
            //加载CloudDataSearch服务插件
            search = new AMap.CloudDataSearch('57b67df9afdf522d4e2ab76d', searchOptions); //构造云数据检索类
            //周边检索
            search.searchNearBy(center, 10000, function(status, result) {
                // alert(status)
                if (status == "complete" && result.info == "OK") {
                    console.log(result);
                    console.log(result.datas);
                    // 成功筛选

                    // $scope.datas = $filter('filter')(result.datas,{category:'线下活动'});
                    $scope.datas = result.datas;
                    console.log($scope.datas);
                    console.log($scope.datas.length)
                    console.log($filter('filter')($scope.datas, { category: '线下' }));
                    $scope.createMap($scope.datas);
                }
            });
            // console.log(search.searchNearBy(center, 10000))
        })
        var infoWindow = new AMap.InfoWindow();
        marker = new AMap.Marker({
            position: [longitude, latitude],
            map: map
        });
        marker.content = '你的位置';
        marker.on('click', markerClick);

        function markerClick(e) {
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
        }
        map.setCenter([longitude, latitude]);
        map.setZoom(18);
    }

    var isPC = Tool.isPC();
    // var isPC=true;
    // 为了方便电脑伤调试
    if (isPC) {
        $scope.ininMap(113.366693, 23.096714);
    }



    // var lnglats = [ //也可以使用LngLat对象
    //     [116.368904, 39.923423],
    //     [116.382122, 39.921176],
    //     [116.387271, 39.922501],
    //     [116.398258, 39.914600]
    // ];
    // var infoWindow = new AMap.InfoWindow();
    // for (var i = 0, marker; i < lnglats.length; i++) {
    //     marker = new AMap.Marker({
    //         position: lnglats[i],
    //         map: map
    //     });
    //     marker.content = '我是第' + i + '个信息窗体的内容';
    //     //给Marker绑定单击事件
    //     marker.on('click', markerClick);
    // }
    // map.setFitView();

    // function markerClick(e) {
    //     infoWindow.setContent(e.target.content);
    //     infoWindow.open(map, e.target.getPosition());
    // }

    // AMap.service('AMap.CloudDataSearch', function() { //回调函数
    //     var center = [113.366681, 23.096619];
    //     var search;
    //     var searchOptions = {
    //         keywords: '',
    //         // pageSize: 5,
    //         orderBy: '_id:ASC'
    //     };
    //     //加载CloudDataSearch服务插件
    //     search = new AMap.CloudDataSearch('57a94cc4305a2a693efc0d6e', searchOptions); //构造云数据检索类
    //     //周边检索
    //     search.searchNearBy(center, 10000, function(status, result) {
    //         if (status == "complete" && result.info == "OK") {
    //             console.log(result);
    //             console.log(result.datas);
    //             // 成功筛选

    //             // $scope.datas = $filter('filter')(result.datas,{category:'线下活动'});
    //             $scope.datas = result.datas;
    //             console.log($scope.datas);
    //             console.log($scope.datas.length)

    //             $scope.createMap($scope.datas);
    //         }
    //     });
    //     // console.log(search.searchNearBy(center, 10000))
    // })
    $scope.markers = [];
    $scope.test = 1;
    var iconJson = {

        }
        //描标注点并添加监听的方法 
    $scope.createMap = function(obj) {
        var infoWindow = new AMap.InfoWindow();
        for (var i = 0, marker; i < obj.length; i++) {
            if (obj[i].type == 'group') {
                marker = new AMap.Marker({
                    position: [obj[i]._location.lng, obj[i]._location.lat],
                    icon: 'http://vdata.amap.com/icons/b18/1/2.png',
                    map: map
                });
                marker.content = '<div class="markerDiv groupDiv" groupid="' + obj[i].groupID + '" grouptit="' + obj[i].h5title + '"><a href="javascript:;" class="markerDiva"><div class="imgarea"><img class="h5Img" src="' + obj[i].h5logo + '" /></div><div class="wordArea"><h2>' + obj[i].h5title + '</h2><p>' + obj[i].description + '</p></div><div class="linkIcon"><img  src="img/iconRight.png" /></div></a></div>';
            } else if (obj[i].type == 'story' && obj[i].groupID == '0') {

                var iconArr = $filter('filter')($scope.dropDownArr, { name: obj[i].category })[0];
                var IconUrl = iconArr.lbsIconUrl;
                marker = new AMap.Marker({
                    position: [obj[i]._location.lng, obj[i]._location.lat],
                    icon: IconUrl,
                    map: map
                });
                marker.content = '<div class="markerDiv storyDiv" storyId="' + obj[i].storyId + '"><a href="javascript:;" ><div class="imgarea"><img class="h5Img" src="' + obj[i].h5logo + '" /></div><div class="wordArea"><h2>' + obj[i].h5title + '</h2><p>' + obj[i].description + '</p></div></a></div>';
            }
            //给Marker绑定单击事件
            marker.on('click', markerClick);
            marker.emit('click', { target: marker });
            $scope.markers.push(marker);

        }
        map.setFitView(); //加这句所有点会聚焦

        function markerClick(e) {
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
            map.setCenter([e.target.getPosition().lng, e.target.getPosition().lat]);
            $timeout(function() {
                jQuery('.groupDiv').on('click', function() {
                    var groupid = jQuery(this).attr('groupid');
                    console.log(groupid)
                    $rootScope.grouptit = jQuery(this).attr('grouptit');
                    $timeout(function() {
                        $scope.fliterStoryByGroupId(groupid);
                    });
                });
                jQuery('.storyDiv').on('click', function() {
                    var storyId = jQuery(this).attr('storyId');
                    console.log(storyId)
                    $timeout(function() {
                        $scope.fliterStoryByStoryId(storyId);
                    });
                })
            }, 200);

        }
    };

    //根据groupId筛选组别中的故事(根据groupId 跟故事类型为故事的，把type:group的剔除)
    $scope.fliterStoryByGroupId = function(groupId) {
        groupId = groupId.toString();
        $scope.StoryList = $filter('filter')($scope.datas, { groupID: groupId, type: "story" });
        $rootScope.lbsStoryList = [];
        $rootScope.lbsGroupTitle =
            console.log($scope.StoryList);
        jQuery.each($scope.StoryList, function(k, v) {
            var jsonInterface = {
                "story_title": v.h5title,
                "img_src": v.h5logo,
                // "id": "21",
                "story_id": v.storyId,
                "share_count": v.sharecount,
                "second_title": v.description,
                "browse_count": v.referencecount,
                "collection_count": v.collectioncount,
                "pub_url": v.h5url,
                // "story_type": "3"
            };
            $rootScope.lbsStoryList.push(jsonInterface);
        });
        console.log($scope.lbsStoryList);
        // $rootScope.openGroupModal();
        $state.go('tab.lbsGroupDetail');
    };
    // 根据storyId筛选数据
    $scope.fliterStoryByStoryId = function(storyId) {
        storyId = storyId.toString();
        var storyInfo = $filter('filter')($scope.datas, { storyId: storyId })[0];
        console.log(storyInfo);
        var storyInterface = {
            "story_title": storyInfo.h5title,
            "img_src": storyInfo.h5logo,
            // "id": "21",
            "story_id": storyInfo.storyId,
            "share_count": storyInfo.sharecount,
            "second_title": storyInfo.description,
            "browse_count": storyInfo.referencecount,
            "collection_count": storyInfo.collectioncount,
            "pub_url": storyInfo.h5url,
            // "story_type": "3"
        };
        storyInterface = JSON.stringify(storyInterface);
        // tab.homeDetail({ storyObject: '{{story}}'})
        // // $rootScope.openGroupModal();
        $state.go('tab.homeDetail', { storyObject: storyInterface });
    };

    // 过滤并重新渲染标记的方法：传入一个json对象{category:'线下活动'}
    $scope.myFilter = function(json, type) {
        $scope.toggle(json);
        // 清除之前的标记
        map.remove($scope.markers);
        // jQuery('.amap-info').remove();
        if (json.category == "全部") {
            $scope.filterDatas = $filter('filter')($scope.datas, {});
        } else {
            $scope.filterDatas = $filter('filter')($scope.datas, json);
        }
        if (!type) {
            // 当type没传的时候，重新渲染标记
            $scope.createMap($scope.filterDatas);
        }
    }

    // 切换按钮
    $scope.activeTit = '全部';
    $scope.dropDownArr = [{ name: '全部', icon: '', active: true, lbsIconUrl: '' }, { name: '线下活动', icon: 'icon-upalapp-huodong-off', active: false, lbsIconUrl: 'img/huodong@2x.png' }, { name: '神秘事件', icon: 'icon-upalapp-shijian-off', active: false, lbsIconUrl: 'img/shijian@2x.png' }, { name: '折扣优惠', icon: 'icon-upalapp-zhekou-off', active: false, lbsIconUrl: 'img/zhekou.png' }, { name: '文青聚点', icon: 'icon-upalapp-wenqing-off', active: false, lbsIconUrl: 'img/wenqing@2x.png' }, { name: '桌游聚点', icon: 'icon-upalapp-zhuoyou-off', active: false, lbsIconUrl: 'img/zhuoyou@2x.png' }];
    $scope.visible = false;
    $scope.toggle = function(json) {
        console.log(json);
        console.log($scope.dropDownArr);

        var filterArr = $filter('filter')($scope.dropDownArr, { name: json.category })[0];
        jQuery('.lbsTitSpan').text(json.category);
        jQuery.each($scope.dropDownArr, function(k, v) {
            if (v.name == json.category) {
                $scope.dropDownArr[k].active = true;
                $scope.activeTit = json.category;
            } else {
                $scope.dropDownArr[k].active = false;
            }
        })
        if (json.category == "全部") {
            jQuery('.lbsTitSpan').text('发现');
        }
        $scope.visible = !$scope.visible;
        $scope.dropshow = !$scope.dropshow;
    };
    $scope.dropshow = true;


    // 调用获取位置信息
    $scope.getLocation();

    // IonicService.postStoryData({"storyId":21505,"webPrefix":"-webkit-"}).then(function(data) {
    //     Con.log(data);

    // });

}]);
