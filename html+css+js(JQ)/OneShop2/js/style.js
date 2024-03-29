$(function () {
    //左侧商品二级分类菜单
    $('.leftNav>ul>li').on('mouseenter', function () {
        $(this).find('.zj').show();
    }).on('mouseleave', function () {
        $(this).find('.zj').hide();
    });

    //树形菜单
    $('.ss_list').on('mouseenter', function () {
        $(this).find('.ss_list_bg').stop().slideDown();
    }).on('mouseleave', function () {
        $(this).find('.ss_list_bg').stop().slideUp();
    });

    // 轮播图
    let imgBox = $('.slide_box');
    let num = $('.num');
    let index = 0;

    //替换图片
    //times为毫秒数：淡入淡出的时间
    function imgRpls(times) {
        imgBox.find('li').eq(index).siblings('li').stop(true).fadeOut(times, function () {
            imgBox.find('li').eq(index).stop(true).fadeIn(times, function () {
                num.find('li').eq(index).addClass('active').siblings('li').removeClass('active');
            });
        });
    }

    let intervalId;

    //循环轮播图片
    //淡入淡出的毫秒，执行函数的周期（毫秒）
    function runRpls(times, rplsTimes) {
        intervalId = setInterval(function () {

            index++;
            if (index == imgBox.find('li').length) {
                index = 0;
            }
            imgRpls(times);
        }, rplsTimes);
    }

    runRpls(500, 3000);


    //鼠标移入数字标记
    num.find('li').mouseenter(function () {
        $(this).siblings('li').removeClass('active');
        clearInterval(intervalId);
        let count = $(this).index();
        index = count;
        imgRpls(500);
    }).mouseleave(function () {
        runRpls('fast', 3000);
    });

    //鼠标移入图片
    imgBox.find('li').mouseenter(function () {
        clearInterval(intervalId);
    }).mouseleave(function () {
        runRpls('fast', 3000);
    });



    //显示购物车
    function showShopCar() {
        let carDiv = $('.i_car .last');
        let count = carDiv.find('li').length;
        carDiv.show();
        if (count == 0) {
            carDiv.find('.noshop').show();
            carDiv.find('.shop').hide();
        } else {
            carDiv.find('.noshop').hide();
            carDiv.find('.shop').show();
        }
    }

    //鼠标移入购物车
    $('.i_car ').on('mouseenter', '.car_t', function () {
        showShopCar();
    }).on('mouseleave', function () {
        $(this).find('.last').hide();
    });


    //更新总计部分
    function updatePrice() {
        let goods = $('.last').find('li');
        let priceNum = 0;
        let goodsNum = goods.length;

        goods.each(function (i, element) {
            let perPrice = $(element).find('.J_smallTotalPrice').text();
            priceNum = priceNum + parseFloat(perPrice.slice(1));
        });

        priceNum = parseFloat(priceNum.toFixed(1));

        //更新文本内容
        $('.buy').find('.J_totalCount').text('(' + goodsNum + ')');
        //更新总价
        $('.buy').find('.J_totalPrice').text('￥' + priceNum);
    }


    updatePrice();


    //删除商品按钮
    $('.J_btnDelete').on('click', function () {
        $(this).closest('li').remove();
        showShopCar();
        updatePrice();
    });


    let beforeValue;


    //数据合理性判断
    //更新单个商品金额
    function updatePerGoodsPrice(element, index) {

        // 使用正则表达式匹配0到99的正整数
        if (!index.toString().match(/^(?:[1-9][0-9]?)$/)) {
            alert("数量不能小于1或大于99！");
            return;
        }

        let nowValue = parseFloat(element.find('.J_inputCount').val());
        let nowPrice = parseFloat(element.siblings('.J_smallTotalPrice').text().slice(1));
        let newPrice = parseFloat(parseFloat(index) * parseFloat(nowPrice / nowValue)).toFixed(1);
        element.find('.J_inputCount').val(parseInt(index));
        element.siblings('.J_smallTotalPrice').text('￥' + newPrice);
        updatePrice();
    }

    //点击+号
    $('.plush').find('.J_btnDelCount').on('click', function () {
        let nowValue = $(this).siblings('.J_inputCount').val();
        updatePerGoodsPrice($(this).parent(), parseInt(nowValue) - 1);
    });

    //点击-号
    $('.plush').find('.J_btnAddCount').on('click', function () {
        let nowValue = $(this).siblings('.J_inputCount').val();
        updatePerGoodsPrice($(this).parent(), parseInt(nowValue) + 1);
    });

    //input的输入
    $('.plush').find('.J_inputCount').on('focus', function () {
        beforeValue = $(this).val();
    }).on('blur', function () {
        let afterValue = $(this).val();
        $(this).val(beforeValue);
        updatePerGoodsPrice($(this).parent(), parseInt(afterValue));
    });

    //广告循环
    let intervalExpress;
    let marginTop = 0;

    function runExpress() {
        intervalExpress = setInterval(
            function () {
                let firstLi = $('#express').find('li').first();
                marginTop++;
                firstLi.animate({
                    'margin-top': '-' + marginTop + 'px'
                }, 0, 'linear', function () {
                    if (marginTop > firstLi.height()) {
                        marginTop = 0;
                        firstLi.css('margin-top', '0px');
                        firstLi.appendTo('#express');
                    }
                });


            }
            , 50);
    }

    runExpress();


    $('#express').mouseenter(function () {
        clearInterval(intervalExpress);
    }).mouseleave(function () {
        runExpress();
    });
});     