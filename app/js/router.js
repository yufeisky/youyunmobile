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
                }
            })
            .state('tab.star', {
                url: '/star',
                views: {
                    'star': {
                        templateUrl: 'templates/star.html',
                        controller: 'starCtrl'
                    }
                }
            })
            .state('tab.user', {
                url: '/user',
                views: {
                    'user': {
                        templateUrl: 'templates/user.html',
                        controller: 'userCtrl'
                    }
                },
                // 检测要是没有登陆  跳回到登录页
                resolve: {
                    validater: ['$location', 'localStorageService', function($location, localStorageService) {
                        var loginInfo = localStorageService.get('User');
                        // var loginInfo = '';
                        if (!loginInfo) {
                            $location.path('/login');
                        }
                    }]
                }
            })
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
            .state('login', {
                url: '/login',
                templateUrl: "templates/login.html",
                controller: 'loginCtrl'
                    // views: {
                    //     'user': {
                    //         templateUrl: 'templates/login.html',
                    //         controller: 'loginCtrl'
                    //     }
                    // },
                    // resolve: {
                    //     validater: ['$location', 'localStorageService', function($location, localStorageService) {
                    //         var loginInfo = localStorageService.get('User');
                    //         if (loginInfo) {
                    //             $location.path('/tab/user');
                    //         }
                    //     }]
                    // }
            })
        $urlRouterProvider.otherwise('tab/home');
    }])
