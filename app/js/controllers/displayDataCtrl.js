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
            $scope.isShow=true;
            // ctx.font = "18px Courier New";
            // ctx.fillStyle = "blue";
            // ctx.fillText("次数", 10, 10);
            // ctx.fillText("时间", 100, 100);
            // myNewChart.update();
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
    $scope.doRefresh = function() {
        // IonicService.getDataStatistics().then(function(data) {
        //     console.log(data);
        //     if(data.status=="1"&&data.message=="Success"){
        //        $scope.display_items = data.display_items; 
        //     }
        //     $scope.$broadcast('scroll.refreshComplete');
        // });
        $scope.getDisplayData();
    }
    $scope.getDisplayData = function() {
        IonicService.getDataStatistics().then(function(data) {
            console.log(data);
            $ionicLoading.hide();
            if (data.status == "1" && data.message == "Success") {
                $scope.display_items = data.display_items;
                $timeout(function() {
                    $scope.createChart();
                }, 200)
            }
            $scope.$broadcast('scroll.refreshComplete');
        });

    }
    $scope.getDisplayData();
    $scope.selectChange = function() {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0,
                duration: 10000
            });
            $scope.getDisplayData();
        }
        // 今天
    $scope.selectIndex = 1;



}]);
