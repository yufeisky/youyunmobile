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
            //分享
            postShareStory: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/moblie/story/addUserShare';
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
            //要修改的故事数据接口
            postStoryData: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/page/test2';
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
            title: '随身看的轻故事H5', // 分享标题
            desc: ' 想浏览更多精彩故事？客官请点这里。', // 分享描述
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
                $rootScope.shareStory();
            }
        };
        return service;
    }])
    // 信息提示弹出框
    .service('Con', ['$timeout', function($timeout) {
        var service = {
            log: function(data) {
                console.log(data);
            }
        };
        return service;
    }])
    // 点击获得焦点
    .service('SectionEvent', ['$timeout', '$ionicSlideBoxDelegate', function($timeout, $ionicSlideBoxDelegate) {
        var service = {
            cli: function() {
                jQuery(function() {
                    // console.log(jQuery('.bf-basic'))z
                    var oldzIndex = null;
                    // jQuery('.bf-basic').on('click', function() {
                    jQuery('.storyPage').on('click', function(e) {
                        var $ = jQuery;
                        //要是点击的是可以改变的元素，就把之前的一个元素还原，让当前元素选中
                        if ($(e.target).parents('section').length > 0) {
                            console.log('even');
                            console.log(this);
                            console.log($(e.target).parents('section'))
                            console.log('有没有')
                            if ($('.bf-basic').hasClass('mobileEvent')) {
                                console.log('有')
                                console.log(oldzIndex)
                                $('.mobileEvent').css({
                                    zIndex: oldzIndex
                                });
                            }
                            //撤销所有元素焦点
                            $('.bf-basic').css({
                                border: ''
                            }).removeClass('mobileEvent');
                            $('.leftright,.topbottom,.rightbottom,.righttop').remove();
                            //给当前点击的元素获得焦点
                            $(e.target).parents('section').css({
                                border: '1px solid #1490ef'
                            }).addClass('mobileEvent');
                            oldzIndex = $('.mobileEvent').css("zIndex");
                            console.log(oldzIndex);
                            $('.mobileEvent').css({
                                zIndex: 100000
                            })

                            $('<div class="leftright">左右</div>').appendTo($(e.target).parents('section'));
                            $('<div class="topbottom">上下</div>').appendTo($(e.target).parents('section'));
                            $('<div class="rightbottom">等比例</div>').appendTo($(e.target).parents('section'));
                            $('<div class="righttop">X</div>').appendTo($(e.target).parents('section'));
                            service.drag();
                        } else {
                            //要是点击的不是可以改变的元素就把之前的选中状态清除
                            if ($('.bf-basic').hasClass('mobileEvent')) {
                                console.log('有')
                                console.log(oldzIndex)
                                $('.mobileEvent').css({
                                    zIndex: oldzIndex
                                });
                            }
                            $('.bf-basic').css({
                                border: ''
                            }).removeClass('mobileEvent');
                            $('.leftright,.topbottom,.rightbottom,.righttop').remove();
                        }


                    });
                    //启用拖拽监听事件
                    // console.log(service)
                });
            },
            drag: function() {
                console.log('拖拽开启')
                jQuery(function() {
                    var $ = jQuery;
                    var start_x = null;
                    var start_y = null;
                    var startoffSet = null;
                    //移动
                    var touchMove = false;
                    //宽度变换
                    var widthMove = false;
                    // 高度变换
                    var heightMove = false;
                    // 等比例变换
                    var equalMove = false;
                    $('.mobileEvent')[0].addEventListener('touchstart', sectiontouchstart, false);
                    $('.mobileEvent')[0].addEventListener('touchmove', sectiontouchmove, false);
                    $('.mobileEvent')[0].addEventListener('touchend', sectiontouchend, false);

                    function sectiontouchstart(e) {
                        e.preventDefault();
                        // e.stopPropagation();
                        console.log($(e.target))
                        start_x = e.touches[0].pageX;
                        start_y = e.touches[0].pageY;
                        // storyPageoffSet = $('.storyPage').offset();
                        startoffSet = $('.mobileEvent').offset();
                        sectionleft = $('.mobileEvent')[0].offsetLeft;
                        sectiontop = $('.mobileEvent')[0].offsetTop;
                        sectionWidth = $('.mobileEvent')[0].offsetWidth;
                        sectionHeight = $('.mobileEvent')[0].offsetHeight;
                        console.log('sectionWidth' + sectionWidth)
                            // startoffSet = $('.mobileEvent');
                            // console.log(storyPageoffSet)
                        console.log($(e.target).hasClass('leftright'))
                        console.log($(e.target).hasClass('topbottom'))
                        if ($(e.target).hasClass('leftright')) {
                            widthMove = true;
                            heightMove = false;
                            touchMove = false;
                            equalMove = false;
                        } else if ($(e.target).hasClass('topbottom')) {
                            widthMove = false;
                            heightMove = true;
                            touchMove = false;
                            equalMove = false;
                        } else if ($(e.target).hasClass('rightbottom')) {
                            widthMove = false;
                            heightMove = false;
                            touchMove = false;
                            equalMove = true;
                        } else {
                            widthMove = false;
                            heightMove = false;
                            touchMove = true;
                            equalMove = false;
                        }

                        $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(false);
                        if ($(e.target).hasClass('righttop')) {
                            widthMove = false;
                            heightMove = false;
                            touchMove = false;
                            equalMove = false;
                            $('.mobileEvent').remove();
                            $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(true);
                        }
                    }

                    function sectiontouchmove(e) {
                        // 改变宽度
                        if (widthMove) {
                            var move_W = sectionWidth - (e.touches[0].pageX - start_x);
                            var move_X = (e.touches[0].pageX - start_x) + sectionleft;
                            console.log(move_W)
                            $(this).css({
                                width: move_W,
                                left: move_X,
                            });
                        }
                        // 改变高度
                        if (heightMove) {
                            var move_H = (e.touches[0].pageY - start_y) + sectionHeight;
                            // var move_Y = (e.touches[0].pageY - start_y) + sectiontop;
                            console.log(move_W)
                            $(this).css({
                                height: move_H,
                            });
                        }
                        // 等比例
                        if (equalMove) {
                            var move_H = (e.touches[0].pageY - start_y) + sectionHeight;
                            var move_W = move_H * sectionWidth / sectionHeight;
                            console.log(move_H)
                            console.log(move_W)
                                // var move_Y = (e.touches[0].pageY - start_y) + sectiontop;
                            console.log(move_W)
                            $(this).css({
                                width: move_W,
                                height: move_H,
                            });
                        }
                        // 拖拽改变位置
                        if (touchMove) {
                            // console.log(startoffSet)
                            var move_X = (e.touches[0].pageX - start_x) + sectionleft;
                            var move_Y = (e.touches[0].pageY - start_y) + sectiontop;
                            $(this).css({
                                left: move_X,
                                top: move_Y,
                            });
                        }
                    }

                    function sectiontouchend(e) {
                        touchMove = false;
                        $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(true);
                    }
                })
            },
            scaleWidth: function() {

            }
        };
        return service;
    }]);
