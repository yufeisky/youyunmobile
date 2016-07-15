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
            //获取首页故事数据
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
            //获取收藏故事数据
            getCollectStorys: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/moblie/story/ajaxGetFavoriteStorysList';
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
            //收藏
            postCollectStory: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/moblie/story/addUserFavorite';
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
            label: '轻故事'
        }, {
            value: 'ask',
            label: '首页'
        }, {
            value: 'job',
            label: '关于'
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
    }])
    // 微信授权
    .service('WechatApi', ['$rootScope', '$http', function($rootScope, $http) {
        $rootScope.upal_share = {
            title: '轻故事H5平台', // 分享标题
            desc: ' 讲好故事，做好推广', // 分享描述
            share_link: 'http://www.upalapp.com/app/2016070401/index.html', // 分享链接
            imgUrl: 'http://www.upalapp.com/app/2016070401/img/p01.png', // 分享图标
            currentUrl: location.href //当前页面的网址，签名的时候要用
        };
        var service = {
            f_wxShare: function() {

                jQuery(function() {
                    jQuery.ajax({
                        type: "get",
                        async: false,
                        url: "http://vip.upalapp.com/weixin/GetSignatureJson.do", //upal_share.currentUrl,
                        data: {
                            url: $rootScope.upal_share.currentUrl
                        },
                        dataType: "jsonp",
                        jsonp: "callbackparam",
                        success: function(data) {
                            //var data = JSON.parse(data);
                            var nonceStr = data.nonceStr;
                            var signature = data.signature;
                            var timestamp = data.timestamp;
                            wx.config({
                                debug: false,
                                appId: 'wxbca4b4a3e2f790aa',
                                timestamp: timestamp,
                                nonceStr: nonceStr,
                                signature: signature,
                                jsApiList: [
                                    'onMenuShareTimeline',
                                    'onMenuShareAppMessage',
                                    // 'translateVoice',
                                    // 'startRecord',
                                    // 'stopRecord',
                                    // 'onRecordEnd',
                                ]
                            });
                            service.f_wxReady();
                        },
                        error: function() {
                            //alert('请求失败');
                        }
                    });
                });
            },
            f_wxReady: function() {
                wx.ready(function() {
                    wx.onMenuShareAppMessage({
                        title: $rootScope.upal_share.title, // 分享标题
                        desc: $rootScope.upal_share.desc, // 分享描述
                        link: $rootScope.upal_share.share_link, // 分享链接
                        imgUrl: $rootScope.upal_share.imgUrl, // 分享图标
                        success: function() {
                            service.suc_callback();
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: $rootScope.upal_share.desc, // 分享副标题标题
                        link: $rootScope.upal_share.share_link, // 分享链接
                        imgUrl: $rootScope.upal_share.imgUrl, // 分享图标
                        success: function() {
                            service.suc_callback();
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
            },
            suc_callback: function() {
                // alert('分享回调成功');
            }
        };
        return service;
    }])
    // 信息提示弹出框
    .service('Con', ['$timeout', function($timeout) {
        var service = {
            log: function(data) {
                // console.log(data);
            }
        };
        return service;
    }]);
