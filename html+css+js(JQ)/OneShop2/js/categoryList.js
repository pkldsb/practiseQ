
$(function () {
    //.cate_list
    //#sortPrice
    //获取单个商品价格
    function getPrice(Element_li) {
        let price = Element_li.find('.price > span').text().slice(1);
        return parseFloat(price);
    }

    //把li对象按价格大小存入数组
    let goodsArr = [];
    $('.cate_list > li').each(function () {
        goodsArr.push({ 'price': getPrice($(this)), 'element': $(this) });
        console.log(getPrice($(this)));
    });

    //把数组按升序排列
    for (let i = 0; i < goodsArr.length - 1; i++) {
        for (let j = 0; j < goodsArr.length - 1 - i; j++) {
            if (goodsArr[j].price > goodsArr[j + 1].price) {
                let temp = goodsArr[j];
                goodsArr[j] = goodsArr[j + 1];
                goodsArr[j + 1] = temp;
            }
        }
    }

    console.log('排序后价格');
    for (let i = 0; i < goodsArr.length; i++) {
        console.log(getPrice(goodsArr[i].element));
    }

    //点击价格升序降序
    let isFlag = true;
    $('#sortPrice').click(function () {
        $('.cate_list > li').each(function () {
            $(this).remove();
        });

        if (isFlag) {
            for (let i = 0; i < goodsArr.length; i++) {
                goodsArr[i].element.appendTo('.cate_list');
            }
            isFlag = false;
        } else {
            for (let i = goodsArr.length - 1; i >= 0; i--) {
                goodsArr[i].element.appendTo('.cate_list');
            }
            isFlag = true;
        }
    });

});