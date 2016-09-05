// 设计器
appController.controller('setStoryInfoCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', 'MsgBox', 'Gallery', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent, MsgBox, Gallery) {
    // Con.log($stateParams.storyId)
    $rootScope.hideTabs = false;
    $scope.urlParams = JSON.parse($stateParams.storyInfo);
    console.log($scope.urlParams)
    $scope.logo = $scope.urlParams.logo;
    $scope.storyTit = $scope.urlParams.title;
    $scope.storyDescription = $scope.urlParams.description;
    $scope.storyId = $scope.urlParams.storyId;
    $scope.storycategory = '';
    $scope.storycategory = $scope.urlParams.storycategory;
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
                $scope.urlParams.title=text;
            } else if ($scope.editType == 'description') {
                jQuery('.storyDescriptionContent').text(text);
                $scope.urlParams.description=text;
            }
            
            $scope.textEditmodal.hide();
        };
        // 调用图片model设置封面图片
        $scope.gallery = Gallery.initGalleryModal($scope);
        $scope.normalGalleryChoose = function(imageurl) {
            jQuery('.storyLogo').attr("src", imageurl);
            // 这个数据需要改，传到下一个页面返回的时候需要用到
            $scope.urlParams.logo=imageurl;
        }
        $scope.openSetCoverImgModal = function() {
            $scope.openGalleryModal($scope.normalGalleryChoose, true);
        };
        $scope.closeSetCoverImgModal = function() {
            $scope.closeGalleryModal();
        };
        //保存故事信息方法
        $scope.saveStoryInfo = function() {
            var categoriesSpan = jQuery('.storyCategoryContent span');
            // console.log(categories);
            var categoryIdArr = [];
            var categoryIdsString = '';
            console.log(categoriesSpan)
            jQuery.each(categoriesSpan, function(k, v) {
                categoryIdArr.push(jQuery(v).attr('id'));
            });
            categoryIdsString = categoryIdArr.toString();
            console.log(categoryIdsString);
            var storyInfo = {
                logo: jQuery('.storyLogo').attr('src'),
                title: jQuery('.storyTitleContent').text(),
                description: jQuery('.storyDescriptionContent').text(),
                storyId: $scope.storyId,
                userToken: User.token,
                userId: User.id,
                categoryIds:categoryIdsString
            }
            if(!storyInfo.title){
                MsgBox.showTexts('标题不能为空');
                return false;
            }
            if(!storyInfo.categoryIds){
                MsgBox.showTexts('类型不能为空');
                return false;
            }
            console.log(storyInfo);
            IonicService.setStoryInfo(storyInfo).then(function(data) {
                console.log(data);
                if(data.status=="1" && data.message == "success"){
                   console.log(data); 
                   $state.go('tab.user');
                }
            })
        }


        //分类信息
        // $scope.categories = JSON.parse($scope.urlParams.storycategories);
        // console.log($scope.categories)
        // 选择分类方法

        var storyCategory = JSON.stringify($scope.urlParams.storycategory);
        console.log(storyCategory)
        $scope.setStoryCategories = function() {
            // var storyCategories ={
            //         activeCategory:storyCategory,
            //         allCategories:$scope.urlParams.storycategories
            //     }
            //     console.log(storyCategories)
                $scope.newUrlParams = JSON.stringify($scope.urlParams);
            // console.log(storyInfo);
            // 跳转到分类选择页面
            $state.go('tab.setStoryCategories', { storyInfo: $scope.newUrlParams });
        }
    } else {
        $timeout(function() {
            $rootScope.changePage('tab.home');
        }, 100);
    }
}]);
