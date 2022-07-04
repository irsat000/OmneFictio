// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$('.body-outside').click(function(){
    if($('.drawer').hasClass('drawer-active')){
        $('.drawer').removeClass('drawer-active');
        $('.body-outside').removeClass('d-block');
    }
    if($('#orderby-popup').hasClass('d-flex')){
        $('#orderby-popup').removeClass('d-flex');
        $('#orderby-popup').removeClass('opacity-100');
        $('.body-outside').removeClass('d-block');
    }
    if($('#type-popup').hasClass('d-flex')){
        $('#type-popup').removeClass('d-flex');
        $('#type-popup').removeClass('opacity-100');
        $('.body-outside').removeClass('d-block');
    }
    /* Maybe I use it
    if($('.account-dropdown').hasClass('d-block')){
        $('.account-dropdown').removeClass('opacity-100');
        setTimeout(function(){
            $('.account-dropdown').removeClass('d-block');
        }, 100);
    }*/
});

$('.ppic-wrap, .dropdown_icon-wrap').click(function(){
    if($('.account-dropdown').hasClass('d-block')){
        $('.account-dropdown').removeClass('opacity-100');
        setTimeout(function(){
            $('.account-dropdown').removeClass('d-block');
        }, 100);
    }
    else{
        $('.account-dropdown').addClass('d-block');
        setTimeout(function(){
            $('.account-dropdown').addClass('opacity-100');
        }, 100);
    }
});

$('.drawerbtn-cont > i, .dw-close > i').click(function(){
    if($('.drawer').hasClass('drawer-active')){
        $('.drawer').removeClass('drawer-active');
        $('.body-outside').removeClass('d-block');
    }
    else{
        $('.drawer').addClass('drawer-active');
        $('.body-outside').addClass('d-block');
    }
});

$('#orderby-btn, #sb-close').click(function(){
    if($('#orderby-popup').hasClass('d-flex')){
        $('#orderby-popup').removeClass('d-flex');
        $('#orderby-popup').removeClass('opacity-100');
        $('.body-outside').removeClass('d-block');
    }
    else{
        $('#orderby-popup').addClass('d-flex');
        $('.body-outside').addClass('d-block');
        setTimeout(function(){
            $('#orderby-popup').addClass('opacity-100');
        }, 100);
    }
});
$('#po-type, #t-close').click(function(){
    if($('#type-popup').hasClass('d-flex')){
        $('#type-popup').removeClass('d-flex');
        $('#type-popup').removeClass('opacity-100');
        $('.body-outside').removeClass('d-block');
    }
    else{
        $('#type-popup').addClass('d-flex');
        $('.body-outside').addClass('d-block');
        setTimeout(function(){
            $('#type-popup').addClass('opacity-100');
        }, 100);
    }
});

$('body').click(function(event) {
    var target = $(event.target);
    if($('.account-dropdown').hasClass('d-block') && !target.parents('.account-cont').length){
        $('.account-dropdown').removeClass('opacity-100');
        setTimeout(function(){
            $('.account-dropdown').removeClass('d-block');
        }, 100);
    }
    /*
    if($('.drawer').hasClass('drawer-active') && !target.parents('.drawer').length){
        $('.drawer').removeClass('drawer-active');
        $('.body-outside').removeClass('d-block');
    }*/
});

$('.p-menubtn, .pd-closebtn').click(function(){
    var postwrap = $(this).parent().closest('.post');
    var postdetail = $(postwrap).find('.post-detail');
    var postmenu = $(postwrap).find('.post-menu');
    if($(postdetail).hasClass('d-flex')){
        $(postdetail).removeClass('d-flex');
        $(postdetail).addClass('d-none');
        $(postmenu).removeClass('d-none');
        $(postmenu).addClass('d-flex');
    }
    else{
        $(postdetail).removeClass('d-none');
        $(postdetail).addClass('d-flex');
        $(postmenu).removeClass('d-flex');
        $(postmenu).addClass('d-none');
    }
});