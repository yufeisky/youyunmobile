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
                            title: '轻故事', // 分享标题
                            desc: '您身边的营销助手', // 分享描述
                            share_link: 'http://www.upalapp.com/app/2016070401/index.html#/tab/home', // 分享链接
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
                },
                cache:false,
            })
            .state('tab.displayData', {
                // url: '/homeDetail:pubUrl:imgSrc:storyId:storyTitle:secondTitle:shareCount:browseCount:collectCount',
                url: '/displayData',
                views: {
                    'home': {
                        templateUrl: 'templates/displayData.html',
                        controller: 'displayDataCtrl'
                    }
                }
            })
            .state('tab.lbs', {
                url: '/lbs',
                views: {
                    'lbs': {
                        templateUrl: 'templates/lbs.html',
                        controller: 'lbsCtrl'
                    }
                },
                // cache:false,
            })
            .state('tab.lbsGroupDetail', {
                // url: '/homeDetail:pubUrl:imgSrc:storyId:storyTitle:secondTitle:shareCount:browseCount:collectCount',
                url: '/lbsGroupDetail:lbsStoryList',
                views: {
                    'lbs': {
                        templateUrl: 'templates/lbsGroupDetail.html',
                        controller: 'lbsGroupDetailCtrl'
                    }
                }
            })        
            .state('tab.design', {
                url: '/design',
                views: {
                    'design': {
                        templateUrl: 'templates/design.html',
                        controller: 'designCtrl'
                    }
                },
                // cache:false,
            })
            .state('tab.moreDesign', {
                url: '/moreDesign:designType:main:moreDesinTitle',
                views: {
                    'design': {
                        templateUrl: 'templates/moredesign.html',
                        controller: 'moreDesignCtrl'
                    }
                },
                cache:false,
                // cache:false,
            })
            .state('tab.designDetail', {
                // url: '/homeDetail:pubUrl:imgSrc:storyId:storyTitle:secondTitle:shareCount:browseCount:collectCount',
                url: '/designDetail:itemPars',
                views: {
                    'design': {
                        templateUrl: 'templates/designDetail.html',
                        controller: 'designDetailCtrl'
                    }
                },
                cache:false,
            })
            .state('tab.previewStory', {
                url: '/previewStory:storyInfo',
                views: {
                    'design': {
                        templateUrl: 'templates/previewStory.html',
                        controller: 'previewStoryCtrl'
                    }
                },
                cache:false,
            })
            .state('tab.setStoryInfo', {
                url: '/setStoryInfo:storyInfo',
                views: {
                    'design': {
                        templateUrl: 'templates/setStoryInfo.html',
                        controller: 'setStoryInfoCtrl'
                    }
                },
                cache:false,
            })
            .state('tab.setStoryCategories', {
                url: '/setStoryCategories:storyInfo',
                views: {
                    'design': {
                        templateUrl: 'templates/setStoryCategories.html',
                        controller: 'setStoryCategoriesCtrl'
                    }
                },
                cache:false,
            })
            .state('tab.edit', {
                url: '/edit:storyId',
                views: {
                    'design': {
                        templateUrl: 'templates/edit.html',
                        controller: 'editCtrl'
                    }
                },
                cache:false,
            })
            .state('tab.sortPage', {
                url: '/sortPage:pages',
                views: {
                    'design': {
                        templateUrl: 'templates/sortPage.html',
                        controller: 'sortPageCtrl'
                    }
                },
                cache:false,
            })
            .state('tab.addPage', {
                url: '/addPage',
                views: {
                    'design': {
                        templateUrl: 'templates/addPageByTemplate.html',
                        controller: 'addPageCtrl'
                    }
                },
                cache:false,
            })
            .state('tab.changeStoryMusic', {
                url: '/changeStoryMusic',
                views: {
                    'design': {
                        templateUrl: 'templates/changeBackgroundMusic.html',
                        controller: 'changeBackgroundMusicCtrl'
                    }
                },
                cache:false,
            })
            .state('tab.works', {
                url: '/works:storyStatus',
                views: {
                    'user': {
                        templateUrl: 'templates/userList.html',
                        controller: 'userListCtrl',

                    }
                },
            })
            .state('tab.message', {
                url: '/message',
                views: {
                    'user': {
                        templateUrl: 'templates/innerMessage.html',
                        controller: 'innerMessageCtrl',

                    }
                },
            })
            .state('tab.uplevel', {
                url: '/uplevel',
                views: {
                    'user': {
                        templateUrl: 'templates/upLevel.html',
                        controller: 'userCtrl',

                    }
                }
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
