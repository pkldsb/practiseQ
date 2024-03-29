$(function () {
    //设置验证码按钮
    $('a.tableText.fr').click(function () {
        $(this).css('pointer-events','none');
        let countdown = 59;
        let element = $(this);
        let interval = setInterval(function () {
            element.text("倒计时 " + countdown + "s");
            countdown--;
            if (countdown < 0) {
                clearInterval(interval);
                element.text("获取验证码");
                element.css('pointer-events','');
                countdown = 59;
            }
        }, 1000);
    });


    //设置正则表达式匹配字符
    $('input[name="phone"]').css('pattern','^(13|15|17|18)\d{10}$');
    $('input[name="password"],input[name="rePassword"]').css('pattern','^\d{6,10}$');
});