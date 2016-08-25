/**
 * create by linbin
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
            //修改的故事保存接口
            saveStoryData: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/page/h5save';
                $http({
                    method: 'POST',
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    // transformRequest: function(obj) {
                    //     var str = [];
                    //     for (var p in obj)
                    //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    //     return str.join("&");
                    // },
                    data: data
                }).success(
                    function(data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            //获取我的图片分类接口
            getMyCates: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/imagecategory/getmycategory';
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


            //获取我的图片分类接口
            getOnlineMainCates: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/imagecategory/getparentcategory';
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


            getOnlineCates: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/imagecategory/getcategory';
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
            //获取图片接口
            getImages: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/image/getimage';
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
            //获取图片接口

            saveImage: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/image/saveimage';
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
                        console.log(data);
                        deferred.resolve(data);
                    }).error(
                    function(data, status, header, config) {
                        console.log(data);
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
    // 判断是不是PC端
    .service('Tool', function() {
        var service = {
            isPC: function() {
                var userAgentInfo = navigator.userAgent;
                var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"
                ];
                var flag = true;
                for (var v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            }
        };
        return service;
    })
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
        var d1 = null;
        var isSave = true;
        var service = {
            blurFn: function() {
                //要是点击的不是可以改变的元素就把之前的选中状态清除
                if (d1 && d1.obj) {
                    d1.obj = null;
                }
                //要是点击的不是可以改变的元素就把之前的选中状态清除
                if ($('.bf-basic').hasClass('mobileEvent')) {

                }
                $('.bf-basic').removeClass('mobileEvent');
                $('.leftright,.topbottom,.rightbottom,.righttop,.rightbottomcopy').remove();
                $('.editBox').appendTo(jQuery('.storySlideBox')).hide();
                // $('.editBox').hide();
            },
            // cancelblurFn: function() {
            //     //要是点击的不是可以改变的元素就把之前的选中状态清除
            //     if (d1 && d1.obj) {
            //         d1.obj = null;
            //     }
            //     //要是点击的不是可以改变的元素就把之前的选中状态清除
            //     if ($('.bf-basic').hasClass('mobileEvent')) {

            //     }
            //     $('.bf-basic').css({
            //         border: ''
            //     }).removeClass('mobileEvent');
            //     $('.leftright,.topbottom,.rightbottom,.righttop').remove();
            //     // $('.editBox').hide();
            // },
            //设置拖拽按钮的位置
            setFollow: function() {
                var rightbottomoffsetleft = $('.mobileEvent')[0].offsetLeft + $('.rightbottom')[0].offsetLeft;
                var rightbottomoffsettop = $('.mobileEvent')[0].offsetTop + $('.rightbottom')[0].offsetTop;
                $('.rightbottomcopy').css({
                    left: rightbottomoffsetleft,
                    top: rightbottomoffsettop
                });
            },
            // 设置编辑栏的位置方法
            setToolTipPoint: function(targetObj, toolTipObj) {
                toolTipObj.show();
                var storyPageWidth = $('.storyPage').width();
                // targetObj
                var targetLeft = targetObj[0].offsetLeft;
                var targetWidth = targetObj[0].offsetWidth;
                var toolTipWidth = toolTipObj[0].offsetWidth;
                var toolTipLeft = toolTipObj[0].offsetLeft;
                var targetCenter = targetLeft + targetWidth / 2;
                var rightTargetCenter = storyPageWidth - targetCenter;
                //  当为提示栏在左边时候，三角形的位置
                var leftToolPoint = (targetLeft + targetWidth) / 2;
                var rightToolPoint = targetLeft + targetWidth / 2 - toolTipLeft;

                if (targetCenter < storyPageWidth / 2) {
                    console.log('在左边');
                    toolTipObj.css({
                        left: 0,
                    });
                    leftToolPoint = leftToolPoint < 20 ? 20 : leftToolPoint;
                    $('.triangle-down,.triangle-up').css({
                        left: leftToolPoint
                    });
                } else {
                    console.log('在右边');
                    var toolleft = storyPageWidth - toolTipWidth;
                    rightToolPoint = rightToolPoint > toolTipWidth ? (toolTipWidth - 30) : rightToolPoint;
                    toolTipObj.css({
                        left: toolleft,
                    });
                    $('.triangle-down,.triangle-up').css({
                        left: rightToolPoint
                    });
                }
                //中间可以容纳的时候放中间
                if ((targetCenter > toolTipWidth / 2) && (rightTargetCenter > toolTipWidth / 2)) {
                    var middleToolLeft = targetCenter - toolTipWidth / 2;
                    toolTipObj.css({
                        left: middleToolLeft,
                    });
                    $('.triangle-down,.triangle-up').css({
                        left: toolTipWidth / 2
                    });
                }
                var targetTop = targetObj[0].offsetTop;
                var targetHeight = targetObj[0].offsetHeight;
                var toolTop1 = targetTop - 45;
                var toolTop2 = targetTop + targetHeight + 20;
                if (targetTop > 45) {
                    toolTipObj.css({
                        top: toolTop1,
                    });
                    $('.triangle-up').hide();
                    $('.triangle-down').show();
                } else {
                    toolTipObj.css({
                        top: toolTop2,
                    });
                    $('.triangle-up').show();
                    $('.triangle-down').hide();
                }

            },
            cli: function() {
                jQuery(function() {
                    var $ = jQuery;
                    // console.log(jQuery('.bf-basic'))z
                    // 音乐的层级太高，编辑的时候先把音乐隐藏，等保存的时候再把它显示出来
                    if ($('.music.musicCloneCode').length > 0) {
                        $('.music.musicCloneCode').hide();
                    }


                    // 编辑元素失去焦点事件
                    // function blurFn() {
                    //     //要是点击的不是可以改变的元素就把之前的选中状态清除
                    //     if (d1.obj) {
                    //         d1.obj = null;
                    //     }
                    //     //要是点击的不是可以改变的元素就把之前的选中状态清除
                    //     if ($('.bf-basic').hasClass('mobileEvent')) {

                    //     }
                    //     $('.bf-basic').css({
                    //         border: ''
                    //     }).removeClass('mobileEvent');
                    //     $('.leftright,.topbottom,.rightbottom,.righttop').remove();
                    //     $('.editBox').hide();
                    // }
                    // jQuery('.bf-basic').on('click', function() {
                    jQuery('.storyPage').on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        //要是点击的是可以改变的元素，就把之前的一个元素还原，让当前元素选中
                        if ($(e.target).parents('section').length > 0) {
                            // console.log('even');
                            // console.log(this);
                            // console.log($(e.target).parents('section'));
                            // console.log(d1);
                            if (isSave) {
                                jQuery('.virtualSaveBtn').trigger('click');
                                isSave = false;
                            }

                            if (d1) {
                                d1.obj = null;
                            }
                            // if ($('.bf-basic').hasClass('mobileEvent')) {
                            //     console.log('有')
                            //     console.log(oldzIndex)
                            //     $('.mobileEvent').css({
                            //         zIndex: oldzIndex
                            //     });
                            // }
                            //撤销所有元素焦点
                            $('.bf-basic').css({
                                border: ''
                            }).removeClass('mobileEvent');
                            $('.leftright,.topbottom,.rightbottom,.righttop,.rightbottomcopy').remove();
                            //给当前点击的元素获得焦点
                            $(e.target).parents('section').addClass('mobileEvent');
                            // console.log(oldzIndex);
                            // $('.mobileEvent').css({
                            //     zIndex: 100000
                            // })

                            // $('<div class="leftright">左右</div>').appendTo($(e.target).parents('section'));
                            // $('<div class="topbottom">上下</div>').appendTo($(e.target).parents('section'));
                            $('<div class="rightbottom">等比例</div>').appendTo($(e.target).parents('section'));
                            $('<div class="rightbottomcopy">等比例</div>').appendTo($(e.target).parents('.storyPage'));
                            // console.log($('.rightbottom'))
                            service.setFollow();
                            // $('<div class="righttop">X</div>').appendTo($(e.target).parents('section'));


                            // 计算提示栏的位置
                            // if()
                            if ($(e.target).parents('section').find('.img-con').length === 0) {
                                $('.imgElementText').hide();
                            } else {
                                $('.imgElementText').show();
                            }

                            if ($(e.target).parents('section').find('.txt-con').length === 0) {
                                $('.editElementText').hide();
                            } else {
                                $('.editElementText').show();
                            }
                            service.setToolTipPoint($(e.target).parents('section'), $('.editBox'));
                            $('.editBox').appendTo($(e.target).parents('.storyPage'));



                            service.drag();
                            // console.log(d1)
                        } else if ($(e.target).parent().hasClass('editBox')) {
                            console.log('点击的是编辑框');
                        } else {
                            // console.log($(e.target))
                            // 执行失去焦点事件
                            service.blurFn();
                        }


                    });
                    //启用拖拽监听事件
                    // console.log(service)
                });
            },
            drag: function() {
                // console.log('拖拽开启');
                jQuery(function() {
                    var $ = jQuery;

                    function Drag() {
                        this.obj = null;
                        this.start_x = 0;
                        this.start_y = null;
                        this.sectionleft = null;
                        this.sectiontop = null;
                        this.sectionWidth = null;
                        this.sectionHeight = null;
                        //属于哪种拖拽
                        this.touchType = null; //touchMove：移动 widthMove:宽度变换 heightMove：高度变换 equalMove：等比例变换
                        this.settings = {
                            toStart: function() { console.log('测试开始'); },
                            toMove: function() {},
                            toEnd: function() {}
                        };
                    }

                    Drag.prototype.init = function(opt) {
                        var This = this;
                        this.obj = $('.mobileEvent');
                        $.extend(true, this.settings, opt);
                        document.addEventListener('touchstart', function(e) { This.fnStart(e); }, false);
                        document.addEventListener('touchmove', function(e) { This.fnMove(e); }, false);
                        document.addEventListener('touchend', function(e) { This.fnEnd(e); }, false);

                    };
                    Drag.prototype.fnStart = function(e) {
                        console.log(e);
                        e.preventDefault();
                        e.stopPropagation();

                        // 当拖动的目标是当前被选中元素才操作,因为修改了监听的对象为document，所以需要这个判断
                        console.log($(e.target));
                        if ($(e.target).hasClass('rightbottomcopy') || this.obj.find($(e.target)).length > 0) {
                            console.log($(e.target));
                            this.settings.toStart();
                            e.preventDefault();
                            this.start_x = e.touches[0].pageX;
                            this.start_y = e.touches[0].pageY;
                            console.log(this.start_y);
                            this.sectionleft = this.obj[0].offsetLeft;
                            this.sectiontop = this.obj[0].offsetTop;
                            this.sectionWidth = this.obj[0].offsetWidth;
                            this.sectionHeight = this.obj[0].offsetHeight;
                            $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(false);
                            if ($(e.target).hasClass('leftright')) {
                                console.log('改变宽度');
                                this.touchType = 'widthMove';
                            } else if ($(e.target).hasClass('topbottom')) {
                                console.log('改变高度');
                                this.touchType = 'heightMove';
                            } else if ($(e.target).hasClass('rightbottomcopy')) {
                                console.log('等比例缩放');
                                this.touchType = 'equalMove';
                            } else {
                                console.log('移动');
                                this.touchType = 'touchMove';
                            }
                            if ($(e.target).hasClass('righttop')) {
                                this.touchType = 'del';
                                // this.obj.remove();
                                // $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(true);
                            }
                        } else {
                            // 拖动的不是当前选中元素  slide可翻页
                            $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(true);
                        }
                        return false;
                    };
                    Drag.prototype.fnMove = function(e) {
                        // 当有移动的时候需要把isSave设为true,下一次选中的时候需要保存回退数据
                        isSave =true;
                        console.log(e);
                        e.preventDefault();
                        e.stopPropagation();
                        // console.log($(e.target));
                        // console.log(this.obj.find($(e.target)).length>0)
                        if (!$(e.target).hasClass('rightbottomcopy') && this.obj.find($(e.target)).length > 0) {
                            service.setToolTipPoint($(e.target).parents('section'), $('.editBox'));
                        } else {
                            $('.editBox').hide();
                        }
                        this.settings.toMove();
                        switch (this.touchType) {
                            case 'widthMove':
                                console.log('widthMove');
                                var move_W = this.sectionWidth - (e.touches[0].pageX - this.start_x);
                                var move_X = (e.touches[0].pageX - this.start_x) + this.sectionleft;
                                console.log(this.obj);
                                console.log(move_W);
                                console.log(move_X);
                                this.obj.css({
                                    width: move_W,
                                    left: move_X,
                                });
                                break;
                            case 'heightMove':
                                move_H = (e.touches[0].pageY - this.start_y) + this.sectionHeight;
                                this.obj.css({
                                    height: move_H,
                                });
                                break;
                            case 'equalMove':
                                move_H = (e.touches[0].pageY - this.start_y) + this.sectionHeight;
                                move_W = move_H * this.sectionWidth / this.sectionHeight;
                                this.obj.css({
                                    width: move_W,
                                    height: move_H,
                                });
                                break;
                            case 'touchMove':
                                move_X = (e.touches[0].pageX - this.start_x) + this.sectionleft;
                                move_Y = (e.touches[0].pageY - this.start_y) + this.sectiontop;
                                this.obj.css({
                                    left: move_X,
                                    top: move_Y,
                                });
                                break;
                        }

                    };
                    Drag.prototype.fnEnd = function() {
                        this.settings.toEnd();
                        if (this.touchType == 'del') {
                            this.obj.remove();
                        }
                        this.touchType = null;
                        $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(true);

                        
                        // this.obj = null;//
                    };

                    d1 = new Drag();
                    d1.init({ //配置参数
                        class: '.mobileEvent',
                        toStart: function() {
                            // d1.trigger('click');
                        },
                        toMove: function() {
                            service.setFollow();

                            // $('.editBox').hide();
                        },
                        toEnd: function() {
                            // $('.editBox').show();
                        }
                    });

                });
            },
            scaleWidth: function() {

            }
        };
        return service;
    }]);
