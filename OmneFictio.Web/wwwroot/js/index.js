function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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


$('#f-includetagbtn').click(function(){
    openFilterTagDD("include");
});
$('#f-excludetagbtn').click(function(){
    openFilterTagDD("exclude");
});
$('.f-modaldarkness, #f-taggdd-close').click(function(){
    openFilterTagDD("close");
});
function openFilterTagDD(action){
    $('#taggdd-searchbar').val("");
    $("#filter-taggddmodal > ul > li").each(function(){
        $(this).show()
    });
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

$('#f-tagdd-include > li, #f-tagdd-exclude > li').click(function(){
    var tagname = $(this).attr('data-tagddvalue');
    var tagnamedisplay = capitalizeFirstLetter(tagname.replace('_', ' '));
    if($(this).parents('#f-tagdd-include').length){
        $('.f-tagsincexc span[data-ftag="'+tagname+'"]').remove();
        $('.f-tagsincexc input[data-ftagref="'+tagname+'"]').remove();
        $(".f-tags_include").append(`<span data-ftag="`+tagname+`">`+tagnamedisplay+`<i class="bi bi-x-circle f-removetagbtn"></i></span>
                                        <input type="hidden" name="taginclude" value="`+tagname+`" data-ftagref="`+tagname+`"/>`);
    }
    else{
        $('.f-tagsincexc span[data-ftag="'+tagname+'"]').remove();
        $('.f-tagsincexc input[data-ftagref="'+tagname+'"]').remove();
        $(".f-tags_exclude").append(`<span data-ftag="`+tagname+`">`+tagnamedisplay+`<i class="bi bi-x-circle f-removetagbtn"></i></span>
                                        <input type="hidden" name="tagexclude" value="`+tagname+`" data-ftagref="`+tagname+`"/>`);
    }
    openFilterTagDD("close");
});

$("#taggdd-searchbar").keyup(function(){
    var filter = $(this).val();
    $("#filter-taggddmodal > ul > li").each(function () {
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).hide();
        } else {
            $(this).show()
        }
    });
});

//appended elements require this method
$(document).on('click', '.f-tagsincexc span', function(event){
    var target = $(event.target);
    if(target.hasClass('f-removetagbtn')){
        var tagname = $(this).attr('data-ftag');
        $(this).remove();
        $('.f-tagsincexc > input[data-ftagref="'+tagname+'"]').remove();
    }
    else{
        var removetagbtn = $(this).children('.f-removetagbtn');
        if(!removetagbtn.hasClass('d-flex')){
            $('.f-removetagbtn').removeClass('d-flex');
            removetagbtn.addClass('d-flex');
        }
        else{
            removetagbtn.removeClass('d-flex');
        }
    }
});
$(document).on('click', '.filter-cont *', function(event){
    var target = $(event.target);
    if($('#filter-modal').hasClass('d-flex') && !target.parents('.f-tagsincexc').length && $('.f-removetagbtn').hasClass('d-flex')){
        $('.f-removetagbtn').removeClass('d-flex');
    }
});