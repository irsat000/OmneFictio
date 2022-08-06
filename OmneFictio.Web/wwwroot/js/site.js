// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//google auth
$(document).ready(function() {
    $(".google").append('<i class="bi bi-google"></i>');
});
function googleHandleCredentialResponse(response) {
    $.ajax({
        type : "POST",
        url: "https://localhost:7067/Auth/GoogleSignup",
        data: {jwt: response.credential},
        timeout: 0,
        success: function () {
            alert("success");
        },
        error: function () {
            alert("failed");
        }
    });
    /*const responsePayload = decodeJwtResponse(response.credential);
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log("Email: " + responsePayload.email);*/
 }
 function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};
//--------------






$('.click-outside').click(function(){
    closeModalsDrowpdownsEtc();
    /* Maybe I use it
    if($('.account-dropdown').hasClass('d-block')){
        $('.account-dropdown').removeClass('opacity-100');
        setTimeout(function(){
            $('.account-dropdown').removeClass('d-block');
        }, 100);
    }*/
});

//Top-right account dropdown menu
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
        $('.click-outside').removeClass('d-block');
    }
    else{
        $('.drawer').addClass('drawer-active');
        $('.click-outside').addClass('d-block');
    }
});

//Open/close login modal
$('.login-openbtn, .lm-closebtn').click(function(){
    if($('#login-modal').hasClass('d-flex')){
        $('#login-modal').removeClass('d-flex');
        $('#login-modal').removeClass('opacity-100');
        $('.click-outside').removeClass('d-block');
    }
    else{
        $('#login-modal').addClass('d-flex');
        $('.click-outside').addClass('d-block');
        setTimeout(function(){
            $('#login-modal').addClass('opacity-100');
        }, 100);
    }
    //Close others after opening login modal
    if($('.account-dropdown').hasClass('d-block')){
        $('.account-dropdown').removeClass('opacity-100');
        setTimeout(function(){
            $('.account-dropdown').removeClass('d-block');
        }, 100);
    }
    if($('.drawer').hasClass('drawer-active')){
        $('.drawer').removeClass('drawer-active');
    }
});


$('body').click(function(event) {
    var target = $(event.target);

    //Close dropdown of account container in header if clicked somewhere else
    if($('.account-dropdown').hasClass('d-block') && !target.parents('.account-cont').length){
        $('.account-dropdown').removeClass('opacity-100');
        setTimeout(function(){
            $('.account-dropdown').removeClass('d-block');
        }, 100);
    }
    /*
    if($('.drawer').hasClass('drawer-active') && !target.parents('.drawer').length){
        $('.drawer').removeClass('drawer-active');
        $('.click-outside').removeClass('d-block');
    }*/
});

//Post menu actions
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

//close modals, dropdowns, drawer etc
function closeModalsDrowpdownsEtc(){
    if($('.drawer').hasClass('drawer-active')){
        $('.drawer').removeClass('drawer-active');
        $('.click-outside').removeClass('d-block');
    }
    if($('#orderby-modal').hasClass('d-flex')){
        $('#orderby-modal').removeClass('d-flex');
        $('#orderby-modal').removeClass('opacity-100');
        $('.click-outside').removeClass('d-block');
    }
    if($('#type-modal').hasClass('d-flex')){
        $('#type-modal').removeClass('d-flex');
        $('#type-modal').removeClass('opacity-100');
        $('.click-outside').removeClass('d-block');
    }
    if($('#filter-modal').hasClass('d-flex')){
        $('#filter-modal').removeClass('d-flex');
        $('#filter-modal').removeClass('opacity-100');
        $('.click-outside').removeClass('d-block');
    }
    if($('#login-modal').hasClass('d-flex')){
        $('#login-modal').removeClass('d-flex');
        $('.click-outside').removeClass('d-block');
    }
}