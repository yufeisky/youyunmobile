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
                // var url = 'http://192.168.4.195:8090/mobileplatform/page/h5save';
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
            //获取模板展示页的三大类别的最热故事
            getTemplateIndex: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/template/gettemplateindex';
                $http({
                    method: 'GET',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
            //根据分类名获取模板展示页的故事
            getTemplateByName: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/template/gettemplate';
                $http({
                    method: 'GET',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    params: data
                }).success(
                    function(data, status, header, config) {
                        deferred.resolve(data);
                    }).error(
                    function(data, status, header, config) {
                        console.log(data);
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            //获取模板分类子分类
            getChildCategoryByParentId: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/template/getchildcategory';
                $http({
                    method: 'GET',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    params: data
                }).success(
                    function(data, status, header, config) {
                        deferred.resolve(data);
                    }).error(
                    function(data, status, header, config) {
                        console.log(data);
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            //根据分类id检索故事列表
            getStoryListByCategoryId: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/template/gettemplate';
                $http({
                    method: 'GET',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    params: data
                }).success(
                    function(data, status, header, config) {
                        deferred.resolve(data);
                    }).error(
                    function(data, status, header, config) {
                        console.log(data);
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            //根据模板id新建轻故事
            createStoryByTemplateId: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/template/createstory';
                $http({
                    method: 'GET',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    params: data
                }).success(
                    function(data, status, header, config) {
                        deferred.resolve(data);
                    }).error(
                    function(data, status, header, config) {
                        console.log(data);
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            //得到用户信息:
            getUserInfo: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/user/getuserinfo';
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
            //设置故事信息:封面 标题 描述
            setStoryInfo: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/page/finishcreate';
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
            //获取单页模板分类接口
            getSingleTemplateCategory: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/template/getSingleTemplateCategory';
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
            //获取单页模板接口
            getSingleTemplate: function(data) {
                var deferred = $q.defer();
                var url = 'http://test.upalapp.com/mobileplatform/template/getSingleTemplate';
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
        var isControl = true;
        var service = {
            blurFn: function($scope) {
                //要是点击的不是可以改变的元素就把之前的选中状态清除
                if (d1 && d1.obj) {
                    d1.obj = null;
                }
                //要是点击的不是可以改变的元素就把之前的选中状态清除
                if ($('.bf-basic').hasClass('mobileEvent')) {

                }
                $('.bf-basic').removeClass('mobileEvent');
                $('.leftright,.topbottom,.rightbottom,.righttop,.rightbottomcopy, .control-button ,.control-button-copy').remove();
                $('.editBox').appendTo(jQuery('.storySlideBox')).hide();
                $timeout(function() {
                        $scope.textEditHide = false;
                        $scope.textStyleEditShow = false;
                        $scope.fontFamilyEditShow = false;
                        $scope.fontColorEditShow = false;
                        $scope.fontSizeEditShow = false;
                        $scope.textAlignEditShow = false;
                        $scope.visible = false;
                        $scope.pageEditHide = false;
                        service.start();
                    })
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
                var leftbottomoffsetleft = $('.mobileEvent')[0].offsetLeft - 15;
                var leftbottomoffsettop = $('.mobileEvent')[0].offsetTop + $('.rightbottom')[0].offsetTop;

                console.log($('.leftbottomcopy')[0].width);

                $('.leftbottomcopy').css({
                    left: leftbottomoffsetleft,
                    top: leftbottomoffsettop
                });

                var lefttopffsetleft = $('.mobileEvent')[0].offsetLeft - 10;
                var lefttopoffsettop = $('.mobileEvent')[0].offsetTop - 10;

                $('.lefttopcopy').css({
                    left: lefttopffsetleft,
                    top: lefttopoffsettop
                });

                var righttopffsetleft = $('.mobileEvent')[0].offsetLeft + $('.rightbottom')[0].offsetLeft + 5;
                var righttopoffsettop = $('.mobileEvent')[0].offsetTop - 10;

                $('.righttopcopy').css({
                    left: righttopffsetleft,
                    top: righttopoffsettop
                });



            },
            // 设置编辑栏的位置方法
            setToolTipPoint: function(targetObj, toolTipObj) {
                toolTipObj.show();
                var storyPageWidth = $('.storyPage').width();
                // targetObj
                var targetLeft = targetObj[0].offsetLeft;
                // console.log('----------targetLeft----------');
                // console.log(targetLeft);
                var targetWidth = targetObj[0].offsetWidth;
                // console.log('----------targetWidth----------');
                // console.log(targetWidth);
                var toolTipWidth = toolTipObj[0].offsetWidth;
                // console.log('----------toolTipWidth----------');
                // console.log(toolTipWidth);
                var toolTipLeft = toolTipObj[0].offsetLeft;
                // console.log('----------toolTipLeft----------');
                // console.log(toolTipLeft);
                var targetCenter = targetLeft + targetWidth / 2;
                var rightTargetCenter = storyPageWidth - targetCenter;
                //  当为提示栏在左边时候，三角形的位置
                var leftToolPoint = (targetLeft + targetWidth) / 2;
                var rightToolPoint = targetLeft + targetWidth / 2 - toolTipLeft;

                if (targetCenter < storyPageWidth / 2) {
                    console.log('在左边');
                    toolTipObj.css({
                        left: 0,
                        right: ''
                    });
                    leftToolPoint = leftToolPoint < 20 ? 20 : leftToolPoint;
                    $('.triangle-down,.triangle-up').css({
                        left: leftToolPoint
                    });
                } else {
                    console.log('在右边');
                    var toolleft = storyPageWidth - toolTipWidth;
                    rightToolPoint = rightToolPoint > (toolTipWidth - 30) ? (toolTipWidth - 30) : rightToolPoint;
                    toolTipObj.css({
                        left: '',
                        right: 0
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
                        right: ''
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
            stop: function() {
                isControl = false;
            },
            start: function() {
                console.log('start')
                isControl = true;
            },
            cli: function($scope) {
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
                            service.start();
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
                            $('.leftright,.topbottom,.rightbottom,.righttop,.rightbottomcopy, .control-button, .control-button-copy').remove();
                            //给当前点击的元素获得焦点
                            $(e.target).parents('section').addClass('mobileEvent');

                            // 把第二级别的操作框隐藏
                            $scope.textStyleEditShow = false;
                            $scope.fontFamilyEditShow = false;
                            $scope.fontColorEditShow = false;
                            $scope.fontSizeEditShow = false;
                            $scope.textAlignEditShow = false;
                            $scope.visible = false;
                            $scope.pageEditHide = false;
                            // if ($scope.textStyleEditShow == true) {
                            //     console.log('文字样式框')
                            //     $scope.textStyleCancelFn();
                            // }
                            // if ($scope.fontFamilyEditShow == true) {
                            //     console.log('文字字体框')
                            //     $scope.fontFamilyCancelFn();
                            // }
                            // //当字体大小框显示的时候，取消，没有显示的时候 
                            // if ($scope.fontSizeEditShow == true) {
                            //     console.log('文字字体大小框')
                            //     $scope.fontSizeCancelFn();
                            // }
                            // console.log(oldzIndex);
                            // $('.mobileEvent').css({
                            //     zIndex: 100000
                            // })

                            // $('<div class="leftright">左右</div>').appendTo($(e.target).parents('section'));
                            // $('<div class="topbottom">上下</div>').appendTo($(e.target).parents('section'));
                            $('<div class="rightbottom "></div>').appendTo($(e.target).parents('section'));
                            $('<div class="rightbottomcopy control-button-copy icon-duodong"></div>').appendTo($(e.target).parents('.storyPage'));
                            $('<div class="leftbottomcopy control-button-copy"></div>').appendTo($(e.target).parents('.storyPage'));
                            $('<div class="lefttopcopy control-button"></div>').appendTo($(e.target).parents('.storyPage'));
                            $('<div class="righttopcopy control-button"></div>').appendTo($(e.target).parents('.storyPage'));
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
                                $timeout(function() {
                                    $scope.textEditHide = false;
                                })
                            } else {
                                $('.editElementText').show();
                                $timeout(function() {
                                    $scope.textEditHide = true;
                                })
                            }
                            // console.log($scope);
                            $('.editBox').appendTo($(e.target).parents('.storyPage'));
                            service.setToolTipPoint($(e.target).parents('section'), $('.editBox'));
                            service.drag();

                            // console.log(d1)
                        } else if ($(e.target).parent().hasClass('editBox')) {
                            console.log('点击的是编辑框');
                        } else {
                            // console.log($(e.target))
                            // 执行失去焦点事件
                            service.blurFn($scope);
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
                            toStart: function() {  },
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
                        if (isControl == false) {
                            return false;
                        }
                        // console.log(e);
                        e.preventDefault();
                        e.stopPropagation();

                        // 当拖动的目标是当前被选中元素才操作,因为修改了监听的对象为document，所以需要这个判断
                        // console.log($(e.target));

                        if ($(e.target).hasClass('rightbottomcopy') || $(e.target).hasClass('lefttopcopy') || $(e.target).hasClass('leftbottomcopy') || $(this.obj).find($(e.target)).length > 0) {
                            // console.log($(e.target));
                            this.settings.toStart();
                            e.preventDefault();
                            this.start_x = e.touches[0].pageX;
                            this.start_y = e.touches[0].pageY;
                            // console.log(this.start_y);
                            this.sectionleft = this.obj[0].offsetLeft;
                            this.sectiontop = this.obj[0].offsetTop;
                            this.sectionWidth = this.obj[0].offsetWidth;
                            this.sectionHeight = this.obj[0].offsetHeight;
                            $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(false);
                            if ($(e.target).hasClass('lefttopcopy')) {
                                console.log('改变宽度');
                                this.touchType = 'widthMove';
                            } else if ($(e.target).hasClass('leftbottomcopy')) {
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
                        if (isControl == false) {
                            return false;
                        }
                        isSave = true;
                        // console.log(e);
                        e.preventDefault();
                        e.stopPropagation();
                        // console.log($(e.target));
                        // console.log(this.obj.find($(e.target)).length>0)
                        // console.log('--------this.obj--------');
                        // console.log(this.obj);
                        if (!$(e.target).hasClass('rightbottomcopy') && $(this.obj).find($(e.target)).length > 0) {
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
                                // console.log(this.obj);
                                // console.log(move_W);
                                // console.log(move_X);
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
                        if (isControl == false) {
                            return false;
                        }
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
    }])
    // 获取图片
    .service('Gallery', ['$ionicModal', 'IonicService', 'localStorageService', 'Con', function($ionicModal, IonicService, localStorageService, Con) {
        var initGalleryModal = function($scope) {
            var modal = $ionicModal.fromTemplateUrl('templates/gallery.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.gallerymodal = modal;
                return modal
            });
            //获取类别大类
            $scope.getOnlineMainCates = function() {
                var postParams = {
                    categoryId: 0
                };
                $scope.mainCates = [];
                IonicService.getOnlineMainCates(postParams).then(function(data) {
                    if (data.message == '0') {
                        $rootScope.loginOut();
                    }
                    angular.forEach(data.categorys, function(item) {
                        if (item.id != 1) {
                            $scope.mainCates.push(item);
                        }
                    });
                }).finally(function() {
                    Con.log('完成');
                });
            }
            $scope.getMyCates = function() {
                var User = JSON.parse(localStorageService.get('User'));
                var postParams = {
                    userToken: User.token,
                    userId: User.id,
                };
                $scope.myCates = [];
                $scope.myCates.push({ id: 1, name: "全部" });
                IonicService.getMyCates(postParams).then(function(data) {
                    if (data.message == '0') {
                        $rootScope.loginOut();
                    }
                    Con.log(data);
                    angular.forEach(data.categorys, function(item) {
                        $scope.myCates.push(item);
                    });
                    $scope.cates = $scope.myCates;
                    $scope.more = true;
                }).finally(function() {
                    Con.log('完成mycats');
                    Con.log('完成');
                });
            }
            $scope.openGalleryModal = function(galleryChoose, isHide) {
                $scope.galleryChoose = galleryChoose;

                //默认显示我的图库
                $scope.isSelf = true;
                $scope.isLine = false;
                //默认不显示种类选择
                $scope.cateShow = false;
                //默认第一页
                $scope.pageNum = 1;
                $scope.cateIndex = 0;
                console.log($scope.gallerymodal);
                $scope.gallerymodal.show();
                $scope.getOnlineMainCates();
                $scope.getMyCates();
                // 初始化Web Uploader
                var win_w = angular.element(window)[0].innerWidth;
                $scope.img_w = win_w * 0.33 * 0.9 + 'px';
                // if( $scope.uploader==null){
                var uploader = WebUploader.create({
                    // 选完文件后，是否自动上传。
                    auto: true,
                    dnd: '#uploader .queueList',
                    paste: document.body,
                    // swf文件路径
                    //swf: BASE_URL + '/js/Uploader.swf',

                    // 文件接收服务端。
                    // server: host + '/tfcm/userdiscount/uploadFile.gm',
                    server: ' http://api.upalapp.com/util/uploadFile',
                    // 选择文件的按钮。可选。
                    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                    pick: {
                        id: '#picker',
                        innerHTML: "<i class='icon-add'></i>",
                        multiple: false //是否开起同时选择多个文件能力
                    },
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    },
                    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                    resize: false,
                    compress: false,
                    sendAsBinary: false, //二进制的流的方式发送文件
                    fileNumLimit: 1,
                    duplicate: true
                });
                //console.log( $scope.img_w);
                var $list = $("#thelist"),
                    thumbnailWidth = win_w * 0.33 * 0.9;
                thumbnailHeight = win_w * 0.33 * 0.9;

                // 当有文件添加进来的时候
                uploader.on('fileQueued', function(file) {
                    var $li = $(
                            '<div id="' + file.id + '" class="file-item thumbnail">' +
                            '<img>' +
                            '<div class="info">' + file.name + '</div>' +
                            '</div>'
                        ),
                        $img = $li.find('img');

                    // $list为容器jQuery实例
                    $list.html($li);

                    // 创建缩略图
                    // 如果为非图片文件，可以不用调用此方法。
                    // thumbnailWidth x thumbnailHeight 为 100 x 100
                    uploader.makeThumb(file, function(error, src) {
                        if (error) {
                            $img.replaceWith('<span>不能预览</span>');
                            return;
                        }
                        $img.attr('src', src);
                    }, thumbnailWidth, thumbnailHeight);

                    $("#picker").hide();
                });

                // 文件上传过程中创建进度条实时显示。
                uploader.on('uploadProgress', function(file, percentage) {
                    var $li = $('#' + file.id),
                        $percent = $li.find('.progress span');

                    // 避免重复创建
                    if (!$percent.length) {
                        $percent = $('<p class="progress"><span></span></p>')
                            .appendTo($li)
                            .find('span');
                    }

                    $percent.css('width', percentage * 100 + '%');
                });

                // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                uploader.on('uploadSuccess', function(file, response) {
                    //var data = JSON.parse(response);

                    //console.log(response[0])
                    $('#' + file.id).addClass('upload-state-done');
                    alert("图片上传成功");

                    var img = response[0];
                    var cate = $scope.cates[$scope.cateIndex];
                    var User = JSON.parse(localStorageService.get('User'));
                    var postParams = {
                        userToken: User.token,
                        userId: User.id,
                        categoryId: cate.id,
                        categoryName: cate.name,
                        imagePath: img.imagePath, //图片路径
                        thumbImagePath: img.thumbImagePath, //缩略图片路径
                        name: img.name, //图片名
                    };
                    IonicService.saveImage(postParams).then(function(data) {
                        if (data.message == '0') {
                            $rootScope.loginOut();
                        }
                        // console.log(data);
                        //  $scope.images.push(data.image);
                        //  Con.log($scope.images);
                        $scope.pageNum = 1;
                        $scope.galleryLoadMore();
                    }).finally(function() {

                        Con.log('完成');
                    });
                });

                // 文件上传失败，显示上传出错。
                uploader.on('uploadError', function(file) {
                    var $li = $('#' + file.id),
                        $error = $li.find('div.error');

                    // 避免重复创建
                    if (!$error.length) {
                        $error = $('<div class="error"></div>').appendTo($li);
                    }
                    $error.text('上传失败');
                    console.log("test");
                });

                // 完成上传完了，成功或者失败，先删除进度条。
                uploader.on('uploadComplete', function(file) {
                    $('#' + file.id).find('.progress').remove();
                    $list.html("");
                    $("#picker").show();
                });

                uploader.on('error', function(handler) {

                    if (handler == "Q_EXCEED_NUM_LIMIT") {
                        uploader.reset();
                    }
                    if (handler == "F_DUPLICATE") {
                        alert("文件重复");
                    }
                });
                $scope.uploader = uploader;
                //当第二个参数isHide设置为true时，隐藏在线那个栏目
                if (isHide) {
                    jQuery('.onlineBtn').hide();
                    jQuery('.gallery .gallery-option').css({
                        width: '76px'
                    });
                } else {
                    jQuery('.onlineBtn').show();
                    jQuery('.gallery .gallery-option').css({
                        width: '152px'
                    });
                }
                // }
            };
            $scope.cateChoose = function(order) {
                if ($scope.cateIndex == order) {
                    return;
                }
                $scope.cateIndex = order;
                $scope.cateShow = false;
                $scope.pageNum = 1;
                $scope.galleryLoadMore();

            }
            $scope.activeOLCateIndex = 0;
            $scope.cateSChoose = function(order) {
                $scope.activeOLCateIndex = order;
                $scope.cateIndex = 0;
                $scope.pageNum = 1;
                var parentId = $scope.mainCates[order].id
                var postParams = {
                    parentId: parentId
                };
                IonicService.getOnlineCates(postParams).then(function(data) {
                    if (data.message == '0') {
                        $rootScope.loginOut();
                    }
                    Con.log(data);
                    $scope.onLineCates = [];
                    angular.forEach(data.categorys, function(item) {
                        $scope.onLineCates.push(item);
                    });
                    $scope.cates = $scope.onLineCates;
                    $scope.galleryLoadMore();
                }).finally(function() {
                    Con.log('完成');
                });
            }

            $scope.galleryLoadMore = function() {
                $scope.more = true;
                var postParams = {
                    userId: 0,
                    categoryId: parseInt($scope.cates[$scope.cateIndex].id),
                    index: $scope.pageNum
                };
                $scope.pageNum++;
                if ($scope.isSelf) {
                    var User = JSON.parse(localStorageService.get('User'));
                    postParams.userId = User.id;
                }
                console.log(postParams.index);
                console.log($scope.cates[$scope.cateIndex].id);
                try {
                    IonicService.getImages(postParams).then(function(data) {
                        if (data.images) {
                            if (postParams.index == 1) {
                                $scope.images = data.images;
                            } else {
                                angular.forEach(data.images, function(item) {
                                    $scope.images.push(item);
                                });
                            }
                            if (data.images.length < 20) {
                                $scope.more = false;
                            }
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        } else {
                            $scope.images = [];
                            $scope.more = false;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    });
                } catch (ex) {
                    $scope.more = false;
                }
            };

            $scope.onSelf = function() {
                $scope.isSelf = true;
                $scope.isLine = false;
                $scope.cateShow = false;
                $scope.cateIndex = 0;
                $scope.cates = $scope.myCates;
                $scope.pageNum = 1;
                $scope.galleryLoadMore();
            }

            $scope.onLine = function() {
                $scope.isSelf = false;
                $scope.isLine = true;
                $scope.cateShow = false;
                $scope.activeOLCateIndex = 0;
                $scope.currentOLCateIndex = 0;
                var parentId = $scope.mainCates[0].id
                var postParams = {
                    parentId: parentId
                };
                IonicService.getOnlineCates(postParams).then(function(data) {
                    if (data.message == '0') {
                        $rootScope.loginOut();
                    }
                    Con.log(data);
                    $scope.onLineCates = [];
                    angular.forEach(data.categorys, function(item) {
                        $scope.onLineCates.push(item);
                    });
                    $scope.cateIndex = 0;
                    $scope.cates = $scope.onLineCates;
                    $scope.pageNum = 1;
                    $scope.galleryLoadMore();
                }).finally(function() {
                    Con.log('完成');
                });
            }


            $scope.isActiveCate = function(index) {
                return index == $scope.activeOLCateIndex;
            }

            //图库注册事件
            $scope.cateOp = function() {
                $scope.cateShow = !$scope.cateShow;

            }

            $scope.imageOp = function(order) {
                var imageurl = $scope.images[order].imageurl;
                //localStorageService.set('Imageurl', imageurl);
                //$state.go('tab.edit', {storyId: storyId });
                console.log(imageurl);
                $scope.galleryChoose(imageurl);
                $scope.gallerymodal.hide();

            };

            $scope.closeGalleryModal = function() {
                $scope.gallerymodal.hide();
            };
            $scope.$on('$destroy', function() {
                $scope.gallerymodal.remove();
            });
            return modal;
        };
        return {
            initGalleryModal: initGalleryModal
        }
    }]);
