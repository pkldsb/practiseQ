$(function () {
    //选择颜色
    $('#choice2>ul>li,#choice1>ul>li').click(function () {
        $(this).addClass('checked').siblings('li').removeClass('checked');
    });


    let beforeValue;

    //数据合理性判断
    //更新复选框数量
    function updateGoodsNum(element, index) {

        // 使用正则表达式匹配0到99的正整数
        if (!index.toString().match(/^(?:[1-9][0-9]?)$/)) {
            alert("数量不能小于0或大于99！");
            return;
        }

        element.val(index);
    }

    //点击+号
    $('.n_btn_1').on('click', function () {
        let nowValue = $(this).siblings('.n_ipt').val();
        updateGoodsNum($(this).siblings('.n_ipt'), parseInt(nowValue) + 1);
    });

    //点击-号
    $('.n_btn_2').on('click', function () {
        let nowValue = $(this).siblings('.n_ipt').val();
        updateGoodsNum($(this).siblings('.n_ipt'), parseInt(nowValue) - 1);
    });

    //input的输入
    $('.n_ipt').on('focus', function () {
        beforeValue = $(this).val();
    }).on('blur', function () {
        let afterValue = $(this).val();
        updateGoodsNum($(this), parseInt(afterValue));
    });


    //更新总价格
    function updatePriceTotal() {
        let perPrice = 0;
        $('.l_list .price').each(function () {
            if ($(this).find('.checkbox input').is(':checked')) {
                perPrice += parseFloat($(this).find('span').text().slice(1));
                console.log(perPrice);
            }
        });

        let sum = parseFloat($('.sum_ipt').val());
        let totalPrice = (sum * perPrice).toFixed(1);

        $('.team_sum span').text(totalPrice);
    }


    updatePriceTotal();

    //当复选框被选中
    $('.l_list .price >.checkbox input').click(function () {
        updatePriceTotal();
    });

    //点击数量框和失焦数量框时
    $('.sum_ipt').on('focus', function () {
        beforeValue = $(this).val();
    }).on('blur', function () {
        let afterValue = $(this).val();
        $(this).val(beforeValue);
        updateGoodsNum($(this), afterValue);
        updatePriceTotal();
    });
});