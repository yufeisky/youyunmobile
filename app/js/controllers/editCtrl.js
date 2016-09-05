// 设计器
appController.controller('editCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', 'MsgBox', 'Gallery', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent, MsgBox, Gallery) {
    // Con.log($stateParams.storyId);
    var storyId = $stateParams.storyId;
    $scope.gallery = Gallery.initGalleryModal($scope);
    // 默认一进来是透明
    $scope.opacity = 0;
    $ionicSlideBoxDelegate.$getByHandle('sectionBox').enableSlide(false);
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000
    });
    IonicService.postStoryData({ "storyId": storyId }).then(function(data) {
        console.log(data);

        if (data.status == '0') {
            MsgBox.showTexts('该app不存在');
            $ionicLoading.hide();
        } else if (data.message == "Success") {
            $scope.pages = data.pages;

            $scope.resetPage();

        }

    });
    //更新数据之后重置页面
    $scope.resetPage = function() {
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
                SectionEvent.cli($scope);
                SectionEvent.blurFn($scope);
                // 当加载完之后要显示出来
                $scope.opacity = 1;
                $timeout(function() {

                    $ionicLoading.hide();
                }, 500);

            }, 50);
        }
        // 切换按钮
    $scope.visible = false;
    $scope.toggle = function() {
        $scope.visible = !$scope.visible;
    };
    // 删除元素
    $scope.delElement = function() {
        $scope.virtualSave();
        jQuery('.mobileEvent').remove();
        jQuery('.editBox').hide();
        $('.rightbottomcopy,.leftbottomcopy,.lefttopcopy,.righttopcopy').hide();
    };
    //上一层
    $scope.upElement = function() {
        $scope.virtualSave();
        var oldZIndex1 = parseInt(jQuery('.mobileEvent').css('zIndex')) || 0;
        var newZIndex1 = oldZIndex1 + 1;
        // console.log(oldZIndex.css('zIndex'));
        jQuery('.mobileEvent').css({
            zIndex: newZIndex1
        });
    };
    // 下一层
    $scope.downElement = function() {
        $scope.virtualSave();
        var oldZIndex2 = jQuery('.mobileEvent').css('zIndex');
        var newZIndex2 = (oldZIndex2 - 1) > 0 ? (oldZIndex2 - 1) : 0;
        // console.log(oldZIndex.css('zIndex'));
        jQuery('.mobileEvent').css({
            zIndex: newZIndex2
        });
    };
    // 复制元素
    $scope.copyElement = function() {
        $scope.virtualSave();
        var cloneElem = jQuery('.mobileEvent').clone();
        cloneElem.css({
            border: ''
        }).removeClass('mobileEvent');
        cloneElem.find('.leftright,.topbottom,.rightbottom,.righttop').remove();
        cloneElem.prependTo(jQuery('.mobileEvent').parents('output'));
    };
    // 存放遍历每个页面的信息
    $scope.pageData = [];
    // 用来存放把遍历后的数组转为字符串，以便传输
    $scope.stringData = null;

    //保存h5的方法：
    $scope.storySave = function() {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 0,
            duration: 10000
        });
        // var data = {
        //         "storyId": storyId,
        //         "storyData": [],
        //         // "userId":'123',
        //         // "userToken":'3333',

        //     }
        // 保存之前先把选中状态清除
        // SectionEvent.cancelblurFn();

        // 遍历页面信息
        $scope.eachData();
        console.log($scope.stringData);
        IonicService.saveStoryData($scope.stringData).then(function(data) {
            $ionicLoading.hide();
            console.log(data);

            if (data.status == '1') {
                MsgBox.showTexts('保存成功');

                var storycategories = JSON.stringify(data.storycategories);
                $scope.storyInfo = {
                        puburl: data.puburl,
                        storyId: data.storyId,
                        title: data.title,
                        description: data.description,
                        logo: data.logo,
                        storycategory: data.storycategory,
                        storycategories: storycategories
                    }
                    // $scope.storyInfo = {
                    //     puburl: 'http://test.upalapp.com/p/template/qUjaA3.html',
                    //     storyId: '22115',
                    //     title: '模拟标题',
                    //     description: '模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述',
                    //     logo: 'http://cdn.upalapp.com/upload/images/2016/08/thumb/1472179734159_d0426ff4-bdb9-4f51-b0ec-caf47ca07f76.png',
                    // }
                console.log($scope.storyInfo);
                $scope.storyInfo = JSON.stringify($scope.storyInfo);
                // 跳转到预览界面
                $state.go('tab.previewStory', { storyInfo: $scope.storyInfo });
            }
        });
    };
    // 遍历数据的方法
    $scope.eachData = function() {
            $scope.pageData = [];
            jQuery('.editSlide .storyPage output').each(function(k, v) {
                var idval = jQuery(v).parents('.storyPage').attr('page_id');
                var numval = k + 1;
                // console.log(v)
                var contenthtml = jQuery(v).prop('outerHTML').toString();
                // Con.log(contenthtml);
                var pageInfo = {
                    "storyId": storyId,
                    "id": idval,
                    "number": numval.toString(),
                    "content": contenthtml
                };
                // console.log($scope.pageData)
                $scope.pageData.push(pageInfo);
            });
            // console.log(data)

            $scope.stringData = JSON.stringify($scope.pageData);
        }
        //用来保存每一步操作的数据，以便撤销操作
    $scope.cancelData = [];

    // 虚拟保存
    $scope.virtualSave = function() {
            $scope.eachData();
            $scope.cancelData.push($scope.pageData);
            console.log($scope.cancelData);
        }
        // 撤销操作
    $scope.cancelOperation = function() {
        var previousStepData = $scope.cancelData.pop();
        console.log(previousStepData);
        // 假如存在上一步操作就返回上一步操作
        if (previousStepData) {
            $scope.pages = previousStepData;
            $scope.resetPage();
        }

    }

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

    // 加载文字修改模态框
    $ionicModal.fromTemplateUrl('templates/textedit.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.textEditmodal = modal;
    });
    $scope.model = { text: 123 };
    $scope.openTextEditModal = function() {
        $scope.textEditmodal.show();
        var oldText = jQuery('.mobileEvent').find('.txt-con').text();
        $scope.model = { text: oldText };
        jQuery('.editTextArea').focus();
    };
    $scope.closeTextEditModal = function(type) {
        $scope.textEditmodal.hide();
    };
    $scope.changeText = function(text) {
        jQuery('.mobileEvent').find('.txt-con').text(text);
        $scope.textEditmodal.hide();
    };

    $scope.normalGalleryChoose = function(imageurl) {
        jQuery('.mobileEvent').find('img').attr("src", imageurl);
        SectionEvent.start();
    }
    $scope.backGalleryChoose = function(imageurl) {
        jQuery('.bgbox').each(function() {
            var data = $(this).parents("ion-slide").attr("data-index");
            var nowIndex = $ionicSlideBoxDelegate.currentIndex();
            if (data == nowIndex) {
                $(this).css("background", "url(" + imageurl + ")  no-repeat 50% 50%");
            }
        })
        SectionEvent.start();
    }

    $rootScope.openImgEditModal = function() {
        SectionEvent.stop();
        $scope.openGalleryModal($scope.normalGalleryChoose);
    };

    $rootScope.openBackEditModal = function() {
        SectionEvent.stop();
        $scope.openGalleryModal($scope.backGalleryChoose);
    }


    // 文字样式字体字号字色对齐方式编辑栏部分
    // 默认隐藏修改文字样式编辑栏
    $scope.textEditHide = false;
    // 第三级别：文字样式编辑栏
    $scope.textStyleEditShow = false;
    // 打开文字样式设置栏并且保存并设置初始值
    $scope.textStyleEditShowFn = function() {
        $scope.textStyleEditShow = true;
        $scope.fontWeightVal = jQuery('.mobileEvent').css('fontWeight');
        $scope.fontStyleVal = jQuery('.mobileEvent').css('fontStyle');
        $scope.textDecorationVal = jQuery('.mobileEvent').css('textDecoration');
        if ($scope.fontWeightVal == 'bold' || $scope.fontWeightVal == 'bolder') {
            jQuery('.setfontWeightBtn').addClass('active');
        } else {
            jQuery('.setfontWeightBtn').removeClass('active');
        }
        console.log($scope.fontStyleVal)
        if ($scope.fontStyleVal == 'italic') {
            console.log('有斜体')
            jQuery('.setFontStyleBtn').addClass('active');
        } else {
            jQuery('.setFontStyleBtn').removeClass('active');
        }
        if ($scope.textDecorationVal == 'underline') {
            jQuery('.setTextDecorationBtn').addClass('active');
        } else {
            jQuery('.setTextDecorationBtn').removeClass('active');
        }
    }

    // 设置文字粗细
    $scope.setFontWeightFn = function() {
            if (jQuery('.setfontWeightBtn').hasClass('active')) {
                jQuery('.setfontWeightBtn').removeClass('active');
                jQuery('.mobileEvent').css({
                    'fontWeight': 'normal',
                });
            } else {
                jQuery('.setfontWeightBtn').addClass('active');
                jQuery('.mobileEvent').css({
                    'fontWeight': 'bold',
                });
            }
        }
        // 设置斜体
    $scope.setFontStyleFn = function() {
            if (jQuery('.setFontStyleBtn').hasClass('active')) {
                jQuery('.setFontStyleBtn').removeClass('active');
                jQuery('.mobileEvent').css({
                    'fontStyle': 'normal',
                });
            } else {
                jQuery('.setFontStyleBtn').addClass('active');
                jQuery('.mobileEvent').css({
                    'fontStyle': 'italic',
                });
            }
        }
        // 设置文字下划线
    $scope.setTextDecorationFn = function() {
            if (jQuery('.setTextDecorationBtn').hasClass('active')) {
                jQuery('.setTextDecorationBtn').removeClass('active');
                jQuery('.mobileEvent').css({
                    'textDecoration': 'none',
                });
            } else {
                jQuery('.setTextDecorationBtn').addClass('active');
                jQuery('.mobileEvent').css({
                    'textDecoration': 'underline',
                });
            }
        }
        // 取消设置并恢复默认值
    $scope.textStyleCancelFn = function() {
            $scope.textStyleEditShow = false;
            jQuery('.mobileEvent').css({
                'fontWeight': $scope.fontWeightVal,
                'fontStyle': $scope.fontStyleVal,
                'textDecoration': $scope.textDecorationVal,
            })
        }
        // 确认修改
    $scope.textStyleSureFn = function() {
        $scope.textStyleEditShow = false;
    }
}]);
