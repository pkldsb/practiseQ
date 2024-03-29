$(function(){
    $('input[name=userName]').css('pattern','^(?:[\u4e00-\u9fa5]{2,4}|^(13|15|17|18)\d{10}$|^[\w.-]+@[\w-]+(\.[\w-]+)+)$');
});