// 设计器
appController.controller('setStoryInfoCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', 'MsgBox', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent, MsgBox) {
    // Con.log($stateParams.storyId)
    $rootScope.hideTabs = false;
    $scope.urlParams = JSON.parse($stateParams.storyInfo);
    console.log($scope.urlParams)
    $scope.logo = $scope.urlParams.logo;
    $scope.storyTit = $scope.urlParams.title;
    $scope.storyDescription = $scope.urlParams.description;
    $scope.storyId = $scope.urlParams.storyId;
    var User = JSON.parse(localStorageService.get('User'));
    console.log(User);
    if (User) {
        // 后退历史
        $scope.goBackView = function() {
            console.log($ionicHistory.viewHistory().backView)
            if ($ionicHistory.viewHistory().backView) {
                // $ionicGoBack()
                $ionicHistory.goBack();
            } else {
                $rootScope.changePage('tab.home');
            };
            // stateName
            // $ionicGoBack()
        }

        // $scope.test = function(){
        //     alert('ok')
        // }
        // 加载文字修改模态框
        $ionicModal.fromTemplateUrl('templates/textedit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.textEditmodal = modal;
        });
        $scope.model = { text: 123 };
        $scope.editType = null;
        $scope.openTextEditModal = function(type) {
            $scope.textEditmodal.show();
            $scope.editType = type;
            var oldText = null;
            if (type == 'title') {
                oldText = jQuery('.storyTitleContent').text();
            } else if (type == 'description') {
                oldText = jQuery('.storyDescriptionContent').text();
            }
            console.log(oldText);
            $scope.model = { text: oldText };
            // jQuery('.editTextArea').focus();
        };
        $scope.closeTextEditModal = function(type) {
            $scope.textEditmodal.hide();
        };
        $scope.changeText = function(text) {
            // jQuery('.mobileEvent').find('.txt-con').text(text);
            if ($scope.editType == 'title') {
                jQuery('.storyTitleContent').text(text);
            } else if ($scope.editType == 'description') {
                jQuery('.storyDescriptionContent').text(text);
            }
            $scope.textEditmodal.hide();
        };
        $scope.saveStoryInfo = function() {
            var storyInfo = {
                logo: jQuery('.storyLogo').attr('src'),
                title: jQuery('.storyTitleContent').text(),
                description: jQuery('.storyDescriptionContent').text(),
                storyId: $scope.storyId,
                userToken: User.token,
                userId: User.id,
            }
            console.log(storyInfo);
        }
    } else {
        $timeout(function() {
            $rootScope.changePage('tab.home');
        }, 100);
    }
}]);
