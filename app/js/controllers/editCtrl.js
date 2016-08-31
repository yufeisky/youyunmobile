// 设计器
appController.controller('editCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicLoading', '$ionicScrollDelegate', '$ionicModal', '$ionicHistory', '$ionicSlideBoxDelegate', '$timeout', 'localStorageService', 'ShareService', 'IonicService', 'Con', 'SectionEvent', 'MsgBox', function($scope, $rootScope, $state, $stateParams, $ionicLoading, $ionicScrollDelegate, $ionicModal, $ionicHistory, $ionicSlideBoxDelegate, $timeout, localStorageService, ShareService, IonicService, Con, SectionEvent, MsgBox) {
    // Con.log($stateParams.storyId);
    var storyId = $stateParams.storyId;
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
                SectionEvent.cli();
                SectionEvent.blurFn();
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

        IonicService.saveStoryData($scope.stringData).then(function(data) {
            $ionicLoading.hide();
            console.log(data);
            if (data.status == '1') {
                MsgBox.showTexts('保存成功');
                // $scope.storyInfo = {
                //     puburl: data.puburl,
                //     storyId: data.storyId,
                //     title: data.title,
                //     description: data.description,
                //     logo:data.logo,
                // }
                $scope.storyInfo = {
                    puburl: 'http://test.upalapp.com/p/template/qUjaA3.html',
                    storyId:'22115',
                    title: '模拟标题',
                    description: '模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述模拟描述',
                    logo:'http://cdn.upalapp.com/upload/images/2016/08/thumb/1472179734159_d0426ff4-bdb9-4f51-b0ec-caf47ca07f76.png',
                }
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

    //模态框图库
    $ionicModal.fromTemplateUrl('templates/gallery.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.galleryEditmodal = modal;
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

    $scope.closeGalleryEditModal = function() {
        SectionEvent.start();
        $scope.galleryEditmodal.hide();
    }


    $rootScope.openImgEditModal = function() {
        $scope.isSelf = true;
        $scope.isLine = false;
        $scope.cateShow = false;
        $scope.pageNum = 1;
        $scope.cateIndex = 0;
        $scope.galleryEditmodal.show();
        $scope.getOnlineMainCates();
        $scope.getMyCates();
        // 初始化Web Uploader
        SectionEvent.stop();
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
                innerHTML: "<i class='icon-add'></>",
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
                console.log(data);
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
        jQuery('.mobileEvent').find('img').attr("src", imageurl);
        console.log(jQuery('.mobileEvent').find('img'));
        $scope.galleryEditmodal.hide();
        SectionEvent.start();
    };


    /*   $scope.picOp =function(){
           var test= jQuery('#upload').click();
           console.log(jQuery('#upload').val());
           if(jQuery('#upload').val()!=null && jQuery('#upload').val()!=""){
               var postParams = {
                  file1:jQuery('#upload').val()
               };
               console.log(postParams);
               IonicService.uploadImage(postParams).then(function(data) {
                   console.log(data);
               }).finally(function() {
                   Con.log('完成');
               });
           };
       }*/
}]);
