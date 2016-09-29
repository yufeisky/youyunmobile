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

    //更新数据之后重置页面
    $scope.resetPage = function() {
            $scope.activePageNum = 1;
            $timeout(function() {
                $ionicSlideBoxDelegate.$getByHandle('sectionBox').update();
                var storyCurrentIndex = JSON.parse(localStorageService.get('storyCurrentIndex'));
                // alert(storyCurrentIndex)
                if (storyCurrentIndex) {
                    $ionicSlideBoxDelegate.$getByHandle('sectionBox').slide(storyCurrentIndex + 1, 500);
                    $scope.activePageNum = storyCurrentIndex + 2;
                }
                var win_w = angular.element(window)[0].innerWidth;
                Con.log(win_w);
                var ionSlideH = jQuery('.storySlideBox .slider-slide')[0].clientHeight;
                Con.log(ionSlideH);
                var storyBoxW = win_w * 0.9;
                var storyBoxH = ionSlideH * 0.9;
                var storyBoxLeft = (win_w - 320) / 2;
                var storyBoxTop = (ionSlideH - 504) / 2 - 10;
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
                //不把contenteditable属性设置成false,点文字会弹出键盘
                jQuery('.bf-com-impl.txt').attr('contenteditable', false);
                // 初始化艺术字
                $scope.setWordart();
                SectionEvent.cli($scope);
                SectionEvent.blurFn($scope);
                $scope.pageLength = jQuery('.storySlideBox ion-slide').length;
                // 当加载完之后要显示出来
                $scope.opacity = 1;
                $timeout(function() {
                    $ionicLoading.hide();
                    localStorageService.set('storyCurrentIndex', null);
                }, 500);

            }, 50);
        }
        // 有初始数据
    var editStoryPages = JSON.parse(localStorageService.get('editStoryPages'));
    console.log(editStoryPages);
    if (editStoryPages && (storyId == JSON.parse(localStorageService.get('editStoryId')))) {
        console.log('有初始数据并且是上一次的故事');
        $scope.pages = editStoryPages;
        $ionicLoading.hide();
        $scope.resetPage();
    } else {
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
            // 把本地数据中的故事数据清空
            localStorageService.set('editStoryPages', null);
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
    //滑动框切换时候触发的函数
    $scope.slideHasChanged = function(index) {
            console.log(index);
            $scope.activePageNum = index + 1;
        }
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
    // 插入文字控制：为true为插入，false为更改
    $scope.isInsertText = false;
    // 打开修改文字编辑框
    $scope.openTextEditModal = function() {
        $scope.isInsertText = false;
        $scope.textEditmodal.show();
        var oldText = jQuery('.mobileEvent').find('.txt-con').text();
        $scope.model = { text: oldText };
        jQuery('.editTextArea').focus();
    };
    $scope.closeTextEditModal = function(type) {
        $scope.textEditmodal.hide();
    };
    // 文字框确定之后的方法
    $scope.changeText = function(text) {
        if ($scope.isInsertText) {
            $scope.ionCurrentIndex = $ionicSlideBoxDelegate.$getByHandle('sectionBox').currentIndex();
            jQuery('.storySlideBox ion-slide').eq($scope.ionCurrentIndex).find('output').append('<section id="faglwbkt" class="bf-com bf-basic" _libid="bf-basic" _comid="txt" _version="1.2" style="left: 50px; top: 234px; z-index: 111; width: 224.069px; height: 32px; min-height: inherit; line-height: 1.5; font-size: 16px; padding-top: 0px; padding-bottom: 0px; font-weight: bold; font-family: ExLight;" data-x="2" data-y="0" data-z="1" xf-animatenum="12" xf-animatexh="0" family="ExLight"><div class="bf-com-impl txt" contenteditable="false" ><div class="txt-con">' + text + '</div></div><div class="bf-com-cover" style="display: block;"></div><textarea class="bf-com-meta"></textarea></section>');
            SectionEvent.start();

        } else {
            jQuery('.mobileEvent').find('.txt-con').text(text);
        }
        $scope.textEditmodal.hide();
    };
    // 打开文字框并把状态修改为插入状态
    $scope.openTextEditModalAndInsterText = function() {
        $scope.isInsertText = true;
        $scope.textEditmodal.show();
        $scope.model = { text: '请输入文字' };
        jQuery('.editTextArea').focus();
    }

    $scope.normalGalleryChoose = function(imageurl) {
            jQuery('.mobileEvent').find('img').attr("src", imageurl);
            SectionEvent.start();
        }
        // 更换背景图片
    $scope.backGalleryChoose = function(imageurl) {
        $scope.ionCurrentIndex = $ionicSlideBoxDelegate.$getByHandle('sectionBox').currentIndex();
        jQuery('.storySlideBox ion-slide').eq($scope.ionCurrentIndex).find('.bgbox').css("background", "url(" + imageurl + ")  no-repeat 50% 50%");
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

    // 插入图片的回调函数
    $scope.backInsertPictureFn = function(imageurl) {
            $scope.ionCurrentIndex = $ionicSlideBoxDelegate.$getByHandle('sectionBox').currentIndex();
            jQuery('.storySlideBox ion-slide').eq($scope.ionCurrentIndex).find('output')
                .append('<section xf-animatexh="0" xf-animatenum="14" data-z="1" data-y="0" data-x="2" style="left: 51px; top: 159px; z-index: 105; width: 223.182px; height: 236px;" id="mokmaysj" class="bf-com bf-basic" _libid="bf-basic" _comid="image" _version="1.2">\
                                                            <div class="bf-com-impl image" style="-webkit-animation: zoomIn 2s ease 0s 1 both;">\
                                                                <div class="img-con"><img style="width: 100%; height: 100%;" src="' + imageurl + '"></div>\
                                                            </div>\
                                                            <div class="bf-com-cover"></div>\
                                                            <textarea class="bf-com-meta"></textarea>\
                                                        </section>');
            SectionEvent.start();
        }
        // 插入图片时候打开图片modal
    $scope.openModalAndInsertPicture = function() {
        SectionEvent.stop();
        $scope.openGalleryModal($scope.backInsertPictureFn);
    }

    /**
     *文字样式字体字号字色对齐方式编辑栏部分
     **/
    // 默认隐藏修改文字样式编辑栏
    $scope.textEditHide = false;
    // 第三级别：文字样式编辑栏
    $scope.textStyleEditShow = false;
    // 打开文字样式设置栏并且保存并设置初始值
    $scope.textStyleEditShowFn = function() {
        SectionEvent.stop();
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
            SectionEvent.start();
            $scope.textStyleEditShow = false;
            jQuery('.mobileEvent').css({
                'fontWeight': $scope.fontWeightVal,
                'fontStyle': $scope.fontStyleVal,
                'textDecoration': $scope.textDecorationVal,
            })
        }
        // 确认修改
    $scope.textStyleSureFn = function() {
        SectionEvent.start();
        $scope.textStyleEditShow = false;
    }

    /**
     * 获取api的domain
     * @author zhengxinren
     */
    $scope.getApiDoMain = function() {
            var href = document.location.href;
            if (href.indexOf('www.upalapp.com') != -1 || href.indexOf('beta.upalapp.com') != -1 || href.indexOf('h.upalapp.com') != -1) {
                return 'http://api.upalapp.com';
            } else {
                return 'http://testapi.upalapp.com';
            }
        }
        /*设置艺术字体*/

    $scope.setWordart = function() {
            /* 艺术字 */
            var family = [];
            var texts = [];

            jQuery(".bf-com[_comid=txt][family]").each(function() {
                var f = jQuery(this).attr('family');
                var text = jQuery(this).text();
                if (family.indexOf(f) >= 0) {
                    texts[family.indexOf(f)] += text;
                } else {
                    family.push(f);
                    texts.push(text);
                }
            });

            for (var i = 0; i < texts.length; i++) {
                var strArr = texts[i].split("");
                //排序
                strArr.sort();
                var result = jQuery.unique(strArr);
                texts[i] = result.join("");
                jQuery.ajax({
                    url: $scope.getApiDoMain() + '/artFontApi/createArtFont',
                    //url:'/api/artFontApi/createArtFont',
                    type: 'post',
                    data: {
                        str: texts[i],
                        fontName: family[i]
                    },
                    before: function() {
                        console.log('-------------------------------------before------------------')
                        console.log(texts[i]);
                        console.log(family[i]);
                    },
                    success: function(result) { //ttf
                        result = JSON.parse(result);
                        console.log('----------familyresult---------------');
                        console.log(result);
                        jQuery("body").append("<style>@font-face{font-family:'" + result.fontType + "';src:url('" + result.ttfCdnUrl + "') format('truetype'), url('" + result.eotCdnUrl + "'), url('" + result.woffCdnUrl + "') format('woff');}</style>")
                            //jQuery("body").append("<style>@font-face{font-family:'"+ result.fontType +"';src:url('"+ result.ttfWebPath +"') format('truetype'), url('"+result.eotWebPath+"'), url('"+result.woffWebPath+"') format('woff');}</style>")
                    },
                    error: function() {
                        console.log('生成艺术字库失败！');
                    }
                });
            }
        }
        // $scope.setWordart = function() {
        //     /* 艺术字 */
        //     var family = [];
        //     var texts = [];

    //     jQuery(".bf-com[_comid=txt][family]").each(function() {
    //         var text = jQuery(this).text();
    //         if (family.indexOf(f) < 0) {
    //             family.push(f);
    //         }
    //         texts.push(text);
    //     });

    //     for (var i = 0; i < texts.length; i++) {
    //         var strArr = texts[i].split("");
    //         //排序
    //         strArr.sort();
    //         var result = jQuery.unique(strArr);
    //         texts[i] = result.join("");
    //         jQuery.ajax({
    //             url: $scope.getApiDoMain() + '/artFontApi/createArtFont',
    //             //url:'/api/artFontApi/createArtFont',
    //             type: 'post',
    //             data: {
    //                 str: texts[i],
    //                 fontName: family[i]
    //             },
    //             success: function(result) { //ttf
    //                 result = JSON.parse(result);
    //                 jQuery("body").append("<style>@font-face{font-family:'" + result.fontType + "';src:url('" + result.ttfCdnUrl + "') format('truetype'), url('" + result.eotCdnUrl + "'), url('" + result.woffCdnUrl + "') format('woff');}</style>")
    //                     //jQuery("body").append("<style>@font-face{font-family:'"+ result.fontType +"';src:url('"+ result.ttfWebPath +"') format('truetype'), url('"+result.eotWebPath+"'), url('"+result.woffWebPath+"') format('woff');}</style>")
    //             },
    //             error: function() {
    //                 console.log('生成艺术字库失败！');
    //             }
    //         });
    //     }
    // }
    $scope.updateWordart = function() {
            /* 更新艺术字 */
            var family = [];
            var texts = [];

            jQuery(".mobileEvent.bf-com[_comid=txt][family]").each(function() {
                var f = jQuery(this).attr('family');
                var text = jQuery(this).text();
                if (family.indexOf(f) >= 0) {
                    texts[family.indexOf(f)] += text;
                } else {
                    family.push(f);
                    texts.push(text);
                }
            });

            for (var i = 0; i < texts.length; i++) {
                var strArr = texts[i].split("");
                //排序
                strArr.sort();
                var result = jQuery.unique(strArr);
                texts[i] = result.join("");
                jQuery.ajax({
                    url: $scope.getApiDoMain() + '/artFontApi/createArtFont',
                    //url:'/api/artFontApi/createArtFont',
                    type: 'post',
                    data: {
                        str: texts[i],
                        fontName: family[i]
                    },
                    success: function(result) { //ttf
                        result = JSON.parse(result);
                        jQuery("body").append("<style>@font-face{font-family:'" + result.fontType + "';src:url('" + result.ttfCdnUrl + "') format('truetype'), url('" + result.eotCdnUrl + "'), url('" + result.woffCdnUrl + "') format('woff');}</style>")
                            //jQuery("body").append("<style>@font-face{font-family:'"+ result.fontType +"';src:url('"+ result.ttfWebPath +"') format('truetype'), url('"+result.eotWebPath+"'), url('"+result.woffWebPath+"') format('woff');}</style>")
                    },
                    error: function() {
                        console.log('生成艺术字库失败！');
                    }
                });
            }
        }
        /**
         *字体编辑
         **/
        // 默认不显示字体选择框
    $scope.fontFamilyEditShow = false;
    // 点击字体时候设置框弹出的方法
    $scope.fontFamilyEditShowFn = function() {
            SectionEvent.stop();
            $scope.fontFamilyEditShow = true;
            $scope.fontFamilyVal = jQuery('.mobileEvent').css('fontFamily');
            $scope.attrFamily = jQuery('.mobileEvent').attr('family');
            console.log($scope.fontFamilyVal);
            console.log($scope.attrFamily);
            if (!$scope.attrFamily) {
                console.log('为默认');
                $scope.fontFamilySelVal = 'YaHei';
            } else {
                $scope.fontFamilySelVal = $scope.attrFamily;
            }
            // 
        }
        // 当字体设置select值改变的时候，更新字体大小
    jQuery('.fontFamilySel').on('change', function() {

        $timeout(function() {
            jQuery('.mobileEvent').css({
                'fontFamily': $scope.fontFamilySelVal,
            });
            jQuery('.mobileEvent').attr("family", $scope.fontFamilySelVal);
            $scope.updateWordart();
        })
    });

    // $scope.fontFamilyChange = function(){
    //     console.log('change')
    // }
    $scope.fontFamilyCancelFn = function() {
            SectionEvent.start();
            jQuery('.mobileEvent').css({
                'fontFamily': $scope.fontFamilyVal,
            });
            jQuery('.mobileEvent').attr("family", $scope.attrFamily);
            $scope.fontFamilyEditShow = false;
        }
        // 确认修改
    $scope.fontFamilySureFn = function() {
        SectionEvent.start();
        $scope.fontFamilyEditShow = false;
    }
    console.log("-------fontFamilySel-----------")
    console.log(jQuery('.fontFamilySel'))

    /**
     *字体大小编辑
     **/
    // 默认不显示编辑框
    $scope.fontSizeEditShow = false;
    $scope.fontSizeEditShowFn = function() {
        SectionEvent.stop();
        $scope.fontSizeEditShow = true;
        $scope.fontSizeVal = jQuery('.mobileEvent').css('fontSize');
        console.log($scope.fontSizeVal);
        $scope.fontSizeSelVal = $scope.fontSizeVal;
    }

    $scope.fontSizeCancelFn = function() {
            SectionEvent.start();
            jQuery('.mobileEvent').css({
                'fontSize': $scope.fontSizeVal,
            });
            $scope.fontSizeEditShow = false;
        }
        // 确认修改
    $scope.fontSizeSureFn = function() {
            SectionEvent.start();
            $scope.fontSizeEditShow = false;
        }
        // 当select值改变的时候，更新字体大小
    jQuery('.fontSizeSel').on('change', function() {
        $timeout(function() {
            jQuery('.mobileEvent').css({
                'fontSize': $scope.fontSizeSelVal,
            });
        })
    });
    /**
     *字体颜色部分
     **/
    $scope.colorArr = ['#ffffff', '#000000', '#345a7c', '#115ebb', '#00ccff', '#4de6e6', '#cc3300', '#ca3593', '#9933cc', '#f96c8c', '#ffcc00', '#ff7c11', '#095e09', '#009933', '#a6ee44', '#432323'];
    $scope.fontColorEditShow = false;
    $scope.colorUlWidth = ($scope.colorArr.length + 1) * 50;
    $scope.textActiveColor = '#ffffff';
    $scope.fontColorEditShowFn = function() {
        SectionEvent.stop();
        $scope.fontColorEditShow = true;
        $scope.fontColorVal = jQuery('.mobileEvent').css('color');
        console.log($scope.fontColorVal);
        $scope.textActiveColor = $scope.fontColorVal;

    }
    $scope.fontColorCancelFn = function() {
            SectionEvent.start();
            $scope.fontColorEditShow = false;
        }
        // 确认修改
    $scope.fontColorSureFn = function() {
            SectionEvent.start();
            $scope.fontColorEditShow = false;
        }
        // 改变颜色的方法
    $scope.changeTextColor = function(color) {
            $scope.textActiveColor = color;
            jQuery('.mobileEvent').css({
                'color': color
            })
        }
        /**
         *设置对齐方式
         **/
    $scope.textAlignEditShow = false;
    $scope.textAlignEditShowFn = function() {
        SectionEvent.stop();
        $scope.textAlignEditShow = true;
        $scope.textAlignVal = jQuery('.mobileEvent').css('textAlign');
        jQuery('.setTextAligntBtn').removeClass('active');
        switch ($scope.textAlignVal) {
            case 'center':
                jQuery('.setTextAligntBtn.center').addClass('active');
                break;
            case 'left':
                jQuery('.setTextAligntBtn.left').addClass('active');
                break;
            case 'right':
                jQuery('.setTextAligntBtn.right').addClass('active');
                break;
        }
        console.log($scope.textAlignVal);
    }
    $scope.textAlignCancelFn = function() {
            SectionEvent.start();
            jQuery('.mobileEvent').css({
                'textAlign': $scope.textAlignVal,
            });
            $scope.textAlignEditShow = false;
        }
        // 确认修改
    $scope.textAlignSureFn = function() {
            SectionEvent.start();
            $scope.textAlignEditShow = false;
        }
        //  设置对齐方式的方法
    $scope.setTextAlignFn = function(type) {
        jQuery('.mobileEvent').css({
            'textAlign': type,
        });
        jQuery('.setTextAligntBtn').removeClass('active');
        switch (type) {
            case 'center':
                jQuery('.setTextAligntBtn.center').addClass('active');
                break;
            case 'left':
                jQuery('.setTextAligntBtn.left').addClass('active');
                break;
            case 'right':
                jQuery('.setTextAligntBtn.right').addClass('active');
                break;
        }
    }

    /**
     **页面设置部分
     **/
    // 默认隐藏页面设置编辑栏
    $scope.pageEditHide = false;

    $scope.pageEdit = function() {
            $scope.visible = false;
            $scope.pageEditHide = true;
        }
        // 删除当前页面
    $scope.delActivePage = function() {
            console.log('--------currentIndex-------');
            $scope.ionCurrentIndex = $ionicSlideBoxDelegate.$getByHandle('sectionBox').currentIndex();
            // console.log($scope.ionCurrentIndex)
            jQuery('.storySlideBox ion-slide').eq($scope.ionCurrentIndex).remove();
            $ionicSlideBoxDelegate.$getByHandle('sectionBox').update();
            $scope.ionCurrentIndex = $ionicSlideBoxDelegate.$getByHandle('sectionBox').currentIndex();
            // console.log($scope.ionCurrentIndex)
            $scope.ionSlideLength = jQuery('ion-slide').length;
            // console.log($scope.ionSlideLength);
            if ($scope.ionCurrentIndex == $scope.ionSlideLength) {
                console.log('是最后一个ion');
                $ionicSlideBoxDelegate.$getByHandle('sectionBox').previous();
            }
        }
        // 复制当前页面
    $scope.copyActivePage = function() {
            console.log('复制页面')
            $scope.ionCurrentIndex = $ionicSlideBoxDelegate.$getByHandle('sectionBox').currentIndex();
            console.log($scope.ionCurrentIndex)
            $scope.activePage = jQuery('.storySlideBox ion-slide').eq($scope.ionCurrentIndex).prop('outerHTML');
            // console.log($scope.activePage)
            jQuery('.storySlideBox ion-slide').eq($scope.ionCurrentIndex).after($scope.activePage);
            // $ionicSlideBoxDelegate.$getByHandle('sectionBox').update();
            $scope.resetPage();
            // $scope.pageLength +=1;
            jQuery('.storySlideBox ion-slide').eq($scope.ionCurrentIndex + 1).find('.storyPage').attr('page_id', '');
            $ionicSlideBoxDelegate.$getByHandle('sectionBox').next(5000);
        }
        // 跳转到排序页面
    $scope.goToSortPage = function() {
        $scope.eachData();
        console.log($scope.pageData);
        $scope.pageDataString = JSON.stringify($scope.pageData);
        console.log($scope.pageDataString);
        SectionEvent.stop();
        localStorageService.set('editStoryId', storyId);
        $state.go('tab.sortPage', { pages: $scope.pageDataString });
    }

    // 根据模板添加页面
    $scope.addPageByTemplate = function() {
        $rootScope.storyCurrentIndex = $ionicSlideBoxDelegate.$getByHandle('sectionBox').currentIndex();
        localStorageService.set('editStoryId', storyId);
        localStorageService.set('storyCurrentIndex', $rootScope.storyCurrentIndex);
        $scope.eachData();
        $scope.pageDataString = JSON.stringify($scope.pageData);
        // 保存当前编辑的故事数据
        localStorageService.set('editStoryPages', $scope.pageDataString);
        // 跳转添加页面
        $state.go('tab.addPage');
    }
}]);
