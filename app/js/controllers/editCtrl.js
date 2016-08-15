// 设计器
appController.controller('editCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', 'MsgBox', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent, MsgBox) {
    // Con.log($stateParams.storyId);
    var storyId = $stateParams.storyId;
    $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(false);
    IonicService.postStoryData({ "storyId": storyId }).then(function(data) {
        console.log(data);
        if (data.message == "Success") {
            $scope.pages = data.pages;

            $timeout(function() {
                $ionicSlideBoxDelegate.$getByHandle('sectionBox').update();
                var win_w = angular.element(window)[0].innerWidth;
                Con.log(win_w);
                var ionSlideH = jQuery('.storySlideBox .slider-slide')[0].clientHeight;
                Con.log(ionSlideH);
                var storyBoxW = win_w * 0.9;
                var storyBoxH = ionSlideH * 0.9;
                var storyBoxLeft = (win_w - 320) / 2;
                var storyBoxTop = (ionSlideH - 504) / 2;
                var storyBoxSectionScaleX = storyBoxW / 320;
                var storyBoxSectionScaleY = storyBoxH / 504;
                var scale = storyBoxSectionScaleX > storyBoxSectionScaleY ? storyBoxSectionScaleY : storyBoxSectionScaleX;
                Con.log('scale' + scale);
                Con.log(storyBoxSectionScaleX);
                Con.log(storyBoxSectionScaleY);
                jQuery('.storyPage').css({
                    transform: 'scale(' + scale + ')',
                    left: storyBoxLeft,
                    top: storyBoxTop
                });
                SectionEvent.cli();
            }, 50);

        }
    });

    // 切换按钮
    $scope.visible = false;
    $scope.toggle = function() {
        $scope.visible = !$scope.visible;
    };
    // 删除元素
    $scope.delElement = function() {
        jQuery('.mobileEvent').remove();
        jQuery('.editBox').hide();
    };
    //上一层
    $scope.upElement = function() {
        var oldZIndex1 = parseInt(jQuery('.mobileEvent').css('zIndex')) || 0;
        var newZIndex1 = oldZIndex1 + 1;
        // console.log(oldZIndex.css('zIndex'));
        jQuery('.mobileEvent').css({
            zIndex: newZIndex1
        });
    };
    // 下一层
    $scope.downElement = function() {
        var oldZIndex2 = jQuery('.mobileEvent').css('zIndex');
        var newZIndex2 = (oldZIndex2 - 1) > 0 ? (oldZIndex2 - 1) : 0;
        // console.log(oldZIndex.css('zIndex'));
        jQuery('.mobileEvent').css({
            zIndex: newZIndex2
        });
    };
    // 复制元素
    $scope.copyElement = function() {
        var cloneElem = jQuery('.mobileEvent').clone();
        cloneElem.css({
            border: ''
        }).removeClass('mobileEvent');
        cloneElem.find('.leftright,.topbottom,.rightbottom,.righttop').remove();
        cloneElem.prependTo(jQuery('.mobileEvent').parents('output'));
    };
    $scope.storySave = function() {
        // var data = {
        //         "storyId": storyId,
        //         "storyData": [],
        //         // "userId":'123',
        //         // "userToken":'3333',

        //     }
        // 保存之前先把选中状态清除
        SectionEvent.blurFn();
        var data = [];
        // console.log(jQuery('.editSlide .storyPage'))
        jQuery('.editSlide .storyPage').each(function(k, v) {
            var idval = jQuery(v).attr('page_id');
            var numval = k + 1;
            var contenthtml = jQuery(v).html().toString();
            // Con.log(contenthtml);
            var pageInfo = {
                "storyId": storyId,
                "id": idval,
                "number": numval.toString(),
                "content": contenthtml
            };
            data.push(pageInfo);
        });
        // console.log(data)

        data = JSON.stringify(data);
        // data = angular.toJson(data);
        // console.log(data)
        IonicService.saveStoryData(data).then(function(data) {
            console.log(data);
            if (data.status == '1') {
                MsgBox.showTexts('保存成功');
            }
        });
        // jQuery.ajax({
        //     url: 'http://192.168.2.154:8080/mobileplatform/page/h5save',
        //     type: 'post',
        //     dataType: 'json',
        //     data: data,
        // })
        // .done(function() {
        //     console.log("success");
        // })
        // .fail(function() {
        //     console.log("error");
        // })
        // .always(function() {
        //     console.log("complete");
        // });

    };
    // 后退
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

    // 模态框登陆
    $ionicModal.fromTemplateUrl('templates/textedit.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.textEditmodal = modal;
    });
    $scope.model = { text: 123 };
    $rootScope.openTextEditModal = function() {
        $scope.textEditmodal.show();
        var oldText = jQuery('.mobileEvent').find('.txt-con').text();
        $scope.model = { text: oldText };
        jQuery('.editTextArea').focus();
    };
    $rootScope.closeTextEditModal = function(type) {
        $scope.textEditmodal.hide();
    };
    $scope.changeText = function(text) {
        jQuery('.mobileEvent').find('.txt-con').text(text);
        $scope.textEditmodal.hide();
    };
}]);
