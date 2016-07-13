/**
 * 路由
 */
angular.module('IonicClub.router', [])
    .config(['$provide', '$stateProvider', '$urlRouterProvider', function($provide, $stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('tab.home', {
                url: '/home',
                views: {
                    'home': {
                        templateUrl: 'templates/home.html',
                        controller: 'homeCtrl'
                    }
                },
                // 检测要是没有登陆  跳回到登录页
                resolve: {
                    validater: ['$rootScope', 'WechatApi', function($rootScope, WechatApi) {
                        console.log('重置微信分享');
                        //重置微信分享
                        $rootScope.upal_share = {
                            title: '悠云轻故事', // 分享标题
                            desc: '我们期待你的加入', // 分享描述
                            share_link: 'http://www.upalapp.com/app/2016070401/index.html', // 分享链接
                            imgUrl: 'http://www.upalapp.com/app/2016070401/img/p01.png', // 分享图标
                            currentUrl: location.href //当前页面的网址，签名的时候要用
                        };
                        WechatApi.f_wxReady();
                    }]
                }
                // cache:false,
            })
            .state('tab.homeDetail', {
                // url: '/homeDetail:pubUrl:imgSrc:storyId:storyTitle:secondTitle:shareCount:browseCount:collectCount',
                url: '/homeDetail:storyObject',
                views: {
                    'home': {
                        templateUrl: 'templates/homeDetail.html',
                        controller: 'homeDetailCtrl'
                    }
                }
            })
            .state('tab.star', {
                url: '/star',
                views: {
                    'star': {
                        templateUrl: 'templates/star.html',
                        controller: 'starCtrl'
                    }
                },
                // cache:false,
            })
            .state('tab.user', {
                url: '/user',
                views: {
                    'user': {
                        templateUrl: 'templates/user.html',
                        controller: 'userCtrl',

                    }
                },
                // 检测要是没有登陆  跳回到登录页
                // resolve: {
                //     validater: ['$location', 'localStorageService', function($location, localStorageService) {
                //         var loginInfo = localStorageService.get('User');
                //         // var loginInfo = '';
                //         if (!loginInfo) {
                //             $location.path('/login');
                //         }
                //     }]
                // }
            });
        // .state('tab.user.userstory', {
        //     url: '/userstory',
        //     views: {
        //         'userstory': {
        //             templateUrl: 'templates/userstory.html',
        //             controller: 'userstoryCtrl'
        //         }
        //     },
        //     // 检测要是没有登陆  跳回到登录页
        //     resolve: {
        //         validater: ['$location', 'localStorageService', function($location, localStorageService) {
        //             var loginInfo = localStorageService.get('User');
        //             // var loginInfo = '';
        //             if (!loginInfo) {
        //                 $location.path('/login');
        //             }
        //         }]
        //     }
        // })
        // .state('login', {
        //     url: '/login',
        //     templateUrl: "templates/login.html",
        //     controller: 'loginCtrl',
        //     cache:false,
        //     resolve: {
        //         validater: ['$location', 'localStorageService', function($location, localStorageService) {
        //             var loginInfo = localStorageService.get('User');
        //             if (loginInfo) {
        //                 // $location.path('/tab/user');
        //                 $ionicHistory.goBack();
        //             }
        //         }]
        //     }
        //     // views: {
        //     //     'user': {
        //     //         templateUrl: 'templates/login.html',
        //     //         controller: 'loginCtrl'
        //     //     }
        //     // },

        // });

        $urlRouterProvider.otherwise('tab/home');
    }]);
