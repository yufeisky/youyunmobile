// 智能展示统计页面控制器
appController.controller('displayDataCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent) {
    //默认可以加载更多数据
    console.log('智能展示数据')
        // $ionicLoading.show({
        //     content: 'Loading',
        //     animation: 'fade-in',
        //     showBackdrop: false,
        //     maxWidth: 200,
        //     showDelay: 0,
        //     duration: 10000
        // });
    $scope.win_w = angular.element(window)[0].innerWidth * 0.8;

    $scope.createChart = function() {

        console.log('chatdata');
        console.log($scope.display_items)
        console.log(ctx)
            // if (!ctx) {
        jQuery('.charArea').html('');
        jQuery('.charArea').append('<canvas id="myChart" width="' + $scope.win_w + '" height="' + $scope.win_w + '"></canvas>');
        var ctx = document.getElementById("myChart").getContext("2d");

        // ctx.clearRect(0,0,500,500);
        // }
        // var data = {
        //     labels: ["January", "February", "March", "April", "May", "June", "July"],
        //     datasets: [{
        //         fillColor: "rgba(220,220,220,0.5)",
        //         strokeColor: "rgba(220,220,220,1)",
        //         pointColor: "rgba(220,220,220,1)",
        //         pointStrokeColor: "#fff",
        //         data: [65, 59, 90, 81, 56, 55, 40]
        //     }, {
        //         fillColor: "rgba(151,187,205,0.5)",
        //         strokeColor: "rgba(151,187,205,1)",
        //         pointColor: "rgba(151,187,205,1)",
        //         pointStrokeColor: "#fff",
        //         data: [28, 48, 40, 19, 96, 27, 100]
        //     }]
        // }
        $scope.data = {
            label: [],
            datasets: []
        };
        $scope.strokeColor = ["#F44336", "#3F51B5", "#009688", "#FF9800", "#9E9E9E", "#E91E63", "#9C27B0", "#673AB7", "#2196F3"];
        $scope.data.labels = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
        jQuery.each($scope.display_items, function(k, v) {
            console.log(v.today_interaction_per_hour)
            var dataset = {
                fillColor: "rgba(255,255,255,0)",
                strokeColor: $scope.strokeColor[k],
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: v.today_interaction_per_hour
            }
            $scope.data.datasets.push(dataset);
        });
        if (myNewChart) {
            myNewChart.clear();
        }
        var myNewChart = new Chart(ctx).Line($scope.data, {
            animation: true,
            animationSteps: 60,
        });
        $scope.isShow = true;
        // ctx.font = "18px Courier New";
        // ctx.fillStyle = "blue";
        // ctx.fillText("次数", 10, 10);
        // ctx.fillText("时间", 100, 100);
        // myNewChart.update();
    }

    // 建立饼图
    $scope.createPieChart = function() {
            console.log($scope.display_items);
            jQuery('.pieCharArea').html('');
            jQuery('.pieCharArea').append('<canvas id="myPieChart" width="' + $scope.win_w * 0.6 + '" height="' + $scope.win_w * 0.6 + '"></canvas>');
            var ctx2 = document.getElementById("myPieChart").getContext("2d");
            $scope.strokePieColor = ["#F44336", "#3F51B5", "#009688", "#FF9800", "#9E9E9E", "#E91E63", "#9C27B0", "#673AB7", "#2196F3"];
            var data = [];
            jQuery.each($scope.display_items, function(k, v) {
                // console.log($scope.strokePieColor)
                var item = {
                    value: v.interaction_count,
                    name: v.name,
                    color: $scope.strokePieColor[k]
                }
                data.push(item);
            })
            console.log(data);
            $scope.PieData = data;
            new Chart(ctx2).Pie(data);
        }
        // 切换按钮
    $scope.isActive = true;
    $scope.myActiveSlide = 0;
    $scope.chooseActiveTab = function(isTrue) {
        console.log(isTrue)
        if (isTrue) {
            $scope.isActive = true;
            $scope.myActiveSlide = 0;
        } else {
            $scope.isActive = false;
            $scope.myActiveSlide = 1;
            $scope.loadTwoPageData();
        }
    };
    // 滑动的时候触发的函数
    $scope.slideHasChanged = function(index) {
            console.log(index);
            if (index == 0) {
                $scope.chooseActiveTab(true);
            } else if (index == 1) {
                $scope.chooseActiveTab(false);
            }
        }
        // 后退历史
    $scope.goBackView = function() {
            if ($ionicHistory.viewHistory().backView) {
                // $ionicGoBack()
                $ionicHistory.goBack();
            } else {
                $rootScope.changePage('tab.home');
            };
        }
        /**
         *selectIndex:第一页的select选中value
         *myActiveSlide:当前滑动页的序号
         *productSelectIndex：第二页选择商品的下拉select的value
         *tapSelectIndex：第二页第二个下拉value
         *colorSelectIndex：第二页第三个下拉value
         **/
    $scope.doRefresh = function(selectIndex, myActiveSlide, productSelectIndex, tapSelectIndex, colorSelectIndex) {
            // IonicService.getDataStatistics().then(function(data) {
            //     console.log(data);
            //     if(data.status=="1"&&data.message=="Success"){
            //        $scope.display_items = data.display_items; 
            //     }
            //     $scope.$broadcast('scroll.refreshComplete');
            // });
            console.log('---------doRefresh-------')
            console.log(selectIndex)
            console.log(myActiveSlide);
            console.log(productSelectIndex)
            console.log(tapSelectIndex)
            console.log(colorSelectIndex)
            if (myActiveSlide == '0') {
                $scope.selectChange(selectIndex.toString());
            } else if (myActiveSlide == '1') {
                console.log('刷新第二页数据');
                console.log(selectIndex);
                console.log(myActiveSlide)
                    // $scope.tapSelectIndex=1;
                $scope.loadTwoPageData();
            }
        }
        // 今天
    $scope.selectIndex = 1;
    $scope.getDisplayData = function(getType) {
        // 根据传入的类型来查询数据
        // var params={
        //     type:getType
        // }
        // 假数据
        var params = {
            type: 'fake'
        }
        IonicService.getDataStatistics(params).then(function(data) {
            console.log(data);
            $ionicLoading.hide();
            if (data.status == "1" && data.message == "Success") {
                $scope.display_items = data.display_items;
                $scope.createPieChart();
                $timeout(function() {
                    if (getType == 'today') {
                        $scope.createChart();
                    }
                }, 200)
            }
            $scope.$broadcast('scroll.refreshComplete');
        });

    }
    $scope.getDisplayData('today');
    $scope.selectChange = function(selectIndex) {
        console.log(selectIndex)
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000
        });
        switch (selectIndex) {
            case '1':
                console.log(1);
                $scope.getDisplayData('today');
                break;
            case '2':
                console.log(2);
                $scope.getDisplayData('week');
                break;
            case '3':
                console.log(3);
                $scope.getDisplayData('month');
                break;
        }

    }

    $scope.productSelectIndex = 0;
    // 建立tap饼图
    $scope.createTapPieChart = function() {
            console.log($scope.productDataList);
            console.log('-----option--------')
            console.log(jQuery('.productSelect').find('option'))
            console.log(jQuery('.productSelect').find('option'))
            // jQuery('.productSelect').find('option').eq(parseInt($scope.productSelectIndex)).attr('selected', true);
            jQuery('.tapPieCharArea').html('');
            jQuery('.tapPieCharArea').append('<canvas id="myTapPieChart" width="' + $scope.win_w * 0.6 + '" height="' + $scope.win_w * 0.6 + '"></canvas>');
            var ctx2 = document.getElementById("myTapPieChart").getContext("2d");
            $scope.strokePieColor = ["#F44336", "#3F51B5", "#009688", "#FF9800", "#9E9E9E", "#E91E63", "#9C27B0", "#673AB7", "#2196F3"];
            var data = [];
            jQuery.each($scope.productDataList, function(k, v) {
                // console.log($scope.strokePieColor)
                var item = {
                    value: v,
                    color: $scope.strokePieColor[k]
                }
                data.push(item);
            })
            console.log(data);
            $scope.tapPieData = $scope.productNameList;
            new Chart(ctx2).Pie(data);
        }
        // 建立style饼图
    $scope.createStylePieChart = function() {
            console.log($scope.productDataList);
            jQuery('.tapStyleCharArea').html('');
            jQuery('.tapStyleCharArea').append('<canvas id="myStylePieChart" width="' + $scope.win_w * 0.6 + '" height="' + $scope.win_w * 0.6 + '"></canvas>');
            var ctx3 = document.getElementById("myStylePieChart").getContext("2d");
            $scope.strokePieColor = ["#F44336", "#3F51B5", "#009688", "#FF9800", "#9E9E9E", "#E91E63", "#9C27B0", "#673AB7", "#2196F3"];
            var data = [];
            jQuery.each($scope.productStyleDataList, function(k, v) {
                // console.log($scope.strokePieColor)
                var item = {
                    value: v,
                    color: $scope.strokePieColor[k]
                }
                data.push(item);
            })
            console.log(data);
            $scope.stylePieData = $scope.productStyleNameList;
            new Chart(ctx3).Pie(data);
        }
        // tab产品切换调用函数
    $scope.productSelectChange = function(productSelectIndex, timeType) {
        console.log(productSelectIndex);
        console.log(timeType)
        jQuery('.tapTimeSelect').find('option').eq(timeType).attr('selected', true);
        $timeout(function() {
            $scope.tapSelectIndex = timeType;
            $scope.productSelectIndex = productSelectIndex;
        }, 1000)

        var timeTypeArr = ['today', 'thisWeek', 'thisMonth'];
        $scope.productInformation = $scope.productList[productSelectIndex];
        console.log($scope.productInformation)
        $scope.productTapInformation = $scope.productInformation['tap'];
        $scope.productNameList = $scope.productInformation['tap']['tabNameList'];
        $scope.productDataList = $scope.productInformation['tap'][timeTypeArr[timeType - 1]];

        $scope.createTapPieChart();
        // console.log($scope.productTapInformation)
    }

    // style产品切换调用函数
    $scope.styleSelectChange = function(productSelectIndex, timeType) {
        console.log(productSelectIndex);
        console.log(timeType)
        jQuery('.colorTimeSelect').find('option').eq(timeType).attr('selected', true);
        $timeout(function() {
            $scope.colorSelectIndex = timeType;
            // $scope.productSelectIndex = productSelectIndex;
        }, 1000)

        var timeTypeArr = ['today', 'thisWeek', 'thisMonth'];
        $scope.productInformation = $scope.productList[productSelectIndex];
        console.log($scope.productInformation)
        $scope.productStyleInformation = $scope.productInformation['stylePick'];
        $scope.productStyleNameList = $scope.productInformation['stylePick']['tabNameList'];
        $scope.productStyleDataList = $scope.productStyleInformation[timeTypeArr[timeType - 1]];
        console.log('---productStyleDataList----')
        console.log($scope.productStyleDataList)
        $scope.createStylePieChart();
        // console.log($scope.productTapInformation)
    }

    // $scope.productSelectChange();
    $scope.colorSelectIndex = 1;
    $scope.loadTwoPageData = function() {
            var params = {
                type: 'fake'
            }
            IonicService.getMobilePageTabDataStatistics(params).then(function(data) {
                console.log(data);
                $ionicLoading.hide();
                if (data.status == "1" && data.message == "Success") {
                    $scope.productList = data.productList;
                    console.log($scope.productList)
                    $scope.productSelectChange($scope.productSelectIndex, $scope.tapSelectIndex);
                    console.log('---------productSelectIndex--------')
                    console.log($scope.productSelectIndex)
                    $scope.styleSelectChange($scope.productSelectIndex, $scope.colorSelectIndex)

                    // $timeout(function(){
                    //     $scope.productSelectIndex = 1;
                    // },2000)
                    // $scope.productSelectIndex=1;
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
        // 默认看今天数据
    $scope.tapSelectIndex = 1;
    // tap类型切换调用函数
    $scope.tapSelectChange = function(value) {
        console.log(value);
    }
}]);
