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

//----------FILTERS----------------------------------------

//Changes the condition of types in filter modal. Also changes input that will be sent to back end.
$('.f-typebtns').click(function(){
    var buttontext = $(this).val();
    var type = $(this).attr('data-type');
    if($(this).hasClass('f-type_active')){
        $(this).removeClass('f-type_active');
        $(this).val(buttontext.replace('-', '+'));
        $('.f-type_cont > input[data-typeref="'+type+'"]').val(type + '-0');
    }
    else{
        $(this).addClass('f-type_active');
        $(this).val(buttontext.replace('+', '-'));
        $('.f-type_cont > input[data-typeref="'+type+'"]').val(type + '-1');
    }
});

//Close second modals on the page
$('.f-modaldarkness, #f-taggdd-close, #fadds-close').click(function(){
    if($('#filter-taggddmodal').hasClass('d-flex')){
        openFilterTagDD("close");
    }
    if($("#filter-addseriesmodal").hasClass('d-flex')){
        openFilterFanficSeriesMenu();
    }
});

//Resets the filters
$('#f-resetbtn').click(function(){
    //type
    if($('.f-typebtns').length){
        $('.f-typebtns').removeClass('f-type_active');
        $('.f-typebtns').each(function(i, x){
            var buttontext = $(x).val();
            $(x).val(buttontext.replace('-', '+'));
            var type = $(x).attr('data-type');
            $('.f-type_cont > input[data-typeref="'+type+'"]').val(type + '-0');
        });
    }
    //tags
    $('.f-tagsincexc').empty();
    //fanfiction series
    if($('.ffs-series_include').length){
        $('.ffs-series_include').empty();
    }
    //options
    $(".f-options > select").val('0');
    $("#checkboxInputOverride").prop("checked", false);
});

//-----TAG SELECTIONS------

//open tag include and exclude menus.
//closes modal if it's open
$('#f-includetagbtn').click(function(){
    openFilterTagDD("include");
});
$('#f-excludetagbtn').click(function(){
    openFilterTagDD("exclude");
});
function openFilterTagDD(action){
    $('#taggdd-searchbar').val("");
    $("#filter-taggddmodal > ul > li").each(function(){
        $(this).show();
    });
    var menu = $('#filter-taggddmodal');
    if(menu.hasClass('d-flex')){
        menu.removeClass('d-flex');
        $('.f-modaldarkness').removeClass('d-block');
    }
    else{
        menu.addClass('d-flex');
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
//adding tags to the filter modal
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
//searchbar that works with keyup. it's for finding the option more easily.
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
//Hidex the tag X icon when clicked outside
$(document).on('click', '.filter-cont *', function(event){
    var target = $(event.target);
    if($('#filter-modal').hasClass('d-flex') && !target.parents('.f-tagsincexc').length && $('.f-removetagbtn').hasClass('d-flex')){
        $('.f-removetagbtn').removeClass('d-flex');
    }
});



//--------FANFICTION SERIES OPTIONS-----------

//choose series or add crossover menu for fanfictions
//closes modal if it's open
$("#fanfic-chooseseries").click(function(){
    openFilterFanficSeriesMenu();
});
function openFilterFanficSeriesMenu(){
    $('#fadds-searchbar').val("");
    $("#fadds-list > li").each(function(){
        $(this).show();
    });
    var menu = $("#filter-addseriesmodal");
    if(menu.hasClass('d-flex')){
        menu.removeClass('d-flex');
        $('.f-modaldarkness').removeClass('d-block');
    }
    else{
        menu.addClass('d-flex');
        $('.f-modaldarkness').addClass('d-block');
    }
}
//adding series to the filter modal / fanfiction
$('#fadds-list > li').click(function(){
    var name = $(this).attr('data-seriesval');
    var namedisplay = capitalizeFirstLetter(name.replace('_', ' '));
    //delete if span-input already exist
    $('.ffs-series_include span[data-fseries="'+name+'"]').remove();
    $('.ffs-series_include input[value="'+name+'"]').remove();

    $(".ffs-series_include").append(`<span data-fseries="`+name+`">`+namedisplay+`<i class="bi bi-x-circle f-removeseriesbtn"></i></span>
                                    <input type="hidden" name="seriesinclude" value="`+name+`"/>`);
    openFilterFanficSeriesMenu();
});
$("#fadds-searchbar").keyup(function(){
    var filter = $(this).val();
    $("#fadds-list > li").each(function () {
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).hide();
        } else {
            $(this).show()
        }
    });
});
//this hides, shows X and removes the tag if clicked on the X
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
//this is for removing series from filters
$(document).on('click', '.ffs-series_include span', function(event){
    var target = $(event.target);
    if(target.hasClass('f-removeseriesbtn')){
        var seriesname = $(this).attr('data-fseries');
        $(this).remove();
        $('.ffs-series_include > input[value="'+seriesname+'"]').remove();
    }
});

