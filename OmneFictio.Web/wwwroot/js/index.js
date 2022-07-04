
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

$('#po-filter, #f-close').click(function(){
    if($('#filter-popup').hasClass('d-flex')){
        $('#filter-popup').removeClass('d-flex');
        $('#filter-popup').removeClass('opacity-100');
        $('.body-outside').removeClass('d-block');
    }
    else{
        $('#filter-popup').addClass('d-flex');
        $('.body-outside').addClass('d-block');
        setTimeout(function(){
            $('#filter-popup').addClass('opacity-100');
        }, 100);
    }
});
