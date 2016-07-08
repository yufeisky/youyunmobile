/**
 * 服务
 */
angular.module('IonicClub.services', [])
    // Ionic
    .service('IonicService', ['$http', '$q', 'ConfigService', function($http, $q, ConfigService) {
        return {
            //登录
            postLogin: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/admin/ajaxUserLogin';
                $http({
                    method: 'POST',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                }).success(
                    function(data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            //获取手机验证码:
             postPhoneCode: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/admin/ajaxSendValidate';
                $http({
                    method: 'POST',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                }).success(
                    function(data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
             //手机快速登录:
             postQuickLogin: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/admin/ajaxPhoneLogin';
                $http({
                    method: 'POST',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                }).success(
                    function(data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            //获取上线跟未上线的故事数据
            getStorys: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/moblie/story/ajaxGetStotyList';
                $http({
                    method: 'GET',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    params: data
                }).success(
                    function(data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            //获取上线跟未上线的故事数据
            getHomeStorys: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/moblie/story/ajaxGetHomePageStorysList';
                $http({
                    method: 'GET',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    params: data
                }).success(
                    function(data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
        };
    }])
    .service('ConfigService', [function() {
        var hostURL = "http://test.upalapp.com/";

        var service = {
            getHost: function() {
                return hostURL;
            }
        };
        return service;
    }])
    .service('TabService', function() {
        var tabs = [{
            value: 'share',
            label: '分享'
        }, {
            value: 'ask',
            label: '问答'
        }, {
            value: 'job',
            label: '招聘'
        }, {
            value: 'bb',
            label: '吐槽'
        }];

        var service = {
            getTabs: function() {
                return tabs;
            }
        };
        return service;
    })
    // 信息提示弹出框
    .service('MsgBox', ['$timeout', function($timeout) {
        var service = {
            showTexts: function(texts, removetime) {
                var times = removetime || 1000;
                angular.element(document.body).append('<div id="msgbox" ><span>' + texts + '</span></div>');
                // console.log(angular.element(document.querySelector('#msgbox')));
                $timeout(function() {
                    angular.element(document.querySelector('#msgbox')).addClass('msgboxani');
                    $timeout(function() {
                        angular.element(document.querySelector('#msgbox')).remove();
                    }, 1000);
                }, times); //文字显示时间
            }
        };
        return service;
    }]);
