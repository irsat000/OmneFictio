// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$('.body-outside').click(function(){
    if($('.drawer').hasClass('drawer-active')){
        $('.drawer').removeClass('drawer-active');
        $('.body-outside').removeClass('d-block');
    }
    if($('#orderby-modal').hasClass('d-flex')){
        $('#orderby-modal').removeClass('d-flex');
        $('#orderby-modal').removeClass('opacity-100');
        $('.body-outside').removeClass('d-block');
    }
    if($('#type-modal').hasClass('d-flex')){
        $('#type-modal').removeClass('d-flex');
        $('#type-modal').removeClass('opacity-100');
        $('.body-outside').removeClass('d-block');
    }
    if($('#filter-modal').hasClass('d-flex')){
        $('#filter-modal').removeClass('d-flex');
        $('#filter-modal').removeClass('opacity-100');
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

//Drawer for mobile
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


$('body').click(function(event) {
    var target = $(event.target);

    //Deactivate dropdown of account container in header if clicked somewhere else
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