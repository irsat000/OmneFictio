
$('#orderby-btn, #sb-close').click(function(){
    if($('#orderby-modal').hasClass('d-flex')){
        $('#orderby-modal').removeClass('d-flex');
        $('#orderby-modal').removeClass('opacity-100');
        $('.body-outside').removeClass('d-block');
    }
    else{
        $('#orderby-modal').addClass('d-flex');
        $('.body-outside').addClass('d-block');
        setTimeout(function(){
            $('#orderby-modal').addClass('opacity-100');
        }, 100);
    }
});
$('#po-type, #t-close').click(function(){
    if($('#type-modal').hasClass('d-flex')){
        $('#type-modal').removeClass('d-flex');
        $('#type-modal').removeClass('opacity-100');
        $('.body-outside').removeClass('d-block');
    }
    else{
        $('#type-modal').addClass('d-flex');
        $('.body-outside').addClass('d-block');
        setTimeout(function(){
            $('#type-modal').addClass('opacity-100');
        }, 100);
    }
});

$('#po-filter, #f-close').click(function(){
    if($('#filter-modal').hasClass('d-flex')){
        $('#filter-modal').removeClass('d-flex');
        $('#filter-modal').removeClass('opacity-100');
        $('.body-outside').removeClass('d-block');
    }
    else{
        $('#filter-modal').addClass('d-flex');
        $('.body-outside').addClass('d-block');
        setTimeout(function(){
            $('#filter-modal').addClass('opacity-100');
        }, 100);
    }
});


$('#f-addtagbtn').click(function(){
    openFilterTagDD("include");
});
$('#f-removetagbtn').click(function(){
    openFilterTagDD("exclude");
});
$('.f-modaldarkness, #f-taggdd-close').click(function(){
    openFilterTagDD("close");
});
function openFilterTagDD(action){
    if($('#filter-taggddmodal').hasClass('d-flex')){
        $('#filter-taggddmodal').removeClass('d-flex');
        $('.f-modaldarkness').removeClass('d-block');
    }
    else{
        $('#filter-taggddmodal').addClass('d-flex');
        $('.f-modaldarkness').addClass('d-block');
    }
    if(action == "include") {
        $('#f-tagdd-include').addClass('d-block');
        $('#f-tagdd-exclude').removeClass('d-block');
    }
    else if(action == "exclude"){
        $('#f-tagdd-include').removeClass('d-block');
        $('#f-tagdd-exclude').addClass('d-block');
    }
}
