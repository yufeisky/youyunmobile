// 设计器
appController.controller('setStoryInfoCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', 'MsgBox', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent, MsgBox) {
    // Con.log($stateParams.storyId)
    $rootScope.hideTabs = false;
    $scope.urlParams = JSON.parse($stateParams.storyInfo);
    console.log($scope.urlParams)
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
        加载文字修改模态框
    $ionicModal.fromTemplateUrl('templates/textedit.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.textEditmodal = modal;
    });
    $scope.model = { text: 123 };
    $scope.openTextEditModal = function() {
        alert('ok')
        $scope.textEditmodal.show();
        // var oldText = jQuery('.mobileEvent').find('.txt-con').text();
        // $scope.model = { text: oldText };
        // jQuery('.editTextArea').focus();
    };
    $scope.closeTextEditModal = function(type) {
        $scope.textEditmodal.hide();
    };
    $scope.changeText = function(text) {
        // jQuery('.mobileEvent').find('.txt-con').text(text);
        $scope.textEditmodal.hide();
    };

}]);
