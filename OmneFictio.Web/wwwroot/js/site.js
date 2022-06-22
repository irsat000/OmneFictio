// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

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

$('body').click(function(event) {
    var target = $(event.target);
    if($('.account-dropdown').hasClass('d-block') && !target.parents('.account-cont').length){
        $('.account-dropdown').removeClass('opacity-100');
        setTimeout(function(){
            $('.account-dropdown').removeClass('d-block');
        }, 100);
    }
});