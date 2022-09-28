
$(document).ready(function(){
    
    document.querySelector('.modalbg1').addEventListener("click", function () {
        var oldFunc = modalbg1_click;
        return modalbg1_click_read();
    });
    document.querySelector('.modalbg2').addEventListener("click", function () {
        return modalbg2_click_read();
    });

    //Close second modals on the page
    $('#f-taggdd-close').click(function(){
        closeTagModal();
    });
    $('#fadds-close').click(function(){
        closeSeriesModal();
    });
});

function modalbg1_click_read(){
    const modalbg1 = document.querySelector('.modalbg1');
    const orderbyModal = document.getElementById('orderby-modal');
    const filterModal = document.getElementById('filter-modal');
    if (orderbyModal !== null && orderbyModal.classList.contains('d-flex')) {
        orderbyModal.classList.remove('d-flex');
        orderbyModal.classList.remove('opacity-100');
        modalbg1.classList.remove('d-block');
    }
    if (filterModal !== null && filterModal.classList.contains('d-flex')) {
        filterModal.classList.remove('d-flex');
        filterModal.classList.remove('opacity-100');
        modalbg1.classList.remove('d-block');
    }
}
function modalbg2_click_read(){
    closeTagModal();
    closeSeriesModal();
}

$('#orderby-btn, #sb-close').click(function(){
    if($('#orderby-modal').hasClass('d-flex')){
        $('#orderby-modal').removeClass('d-flex');
        $('#orderby-modal').removeClass('opacity-100');
        $('.modalbg1').removeClass('d-block');
    }
    else{
        $('#orderby-modal').addClass('d-flex');
        $('.modalbg1').addClass('d-block');
        setTimeout(function(){
            $('#orderby-modal').addClass('opacity-100');
        }, 100);
    }
});
$('#po-type, #t-close').click(function(){
    if($('#type-modal').hasClass('d-flex')){
        $('#type-modal').removeClass('d-flex');
        $('#type-modal').removeClass('opacity-100');
        $('.modalbg1').removeClass('d-block');
    }
    else{
        $('#type-modal').addClass('d-flex');
        $('.modalbg1').addClass('d-block');
        setTimeout(function(){
            $('#type-modal').addClass('opacity-100');
        }, 100);
    }
});

$('#po-filter, #f-close').click(function(){
    if($('#filter-modal').hasClass('d-flex')){
        $('#filter-modal').removeClass('d-flex');
        $('#filter-modal').removeClass('opacity-100');
        $('.modalbg1').removeClass('d-block');
    }
    else{
        $('#filter-modal').addClass('d-flex');
        $('.modalbg1').addClass('d-block');
        setTimeout(function(){
            $('#filter-modal').addClass('opacity-100');
        }, 100);
    }
});

//----------Modals----------------------------------------

function closeTagModal(){
    if($('#filter-tagddmodal').hasClass('d-flex')){
        $('#filter-tagddmodal').removeClass('d-flex');
        $('.modalbg2').removeClass('d-block');
    }
}
function closeSeriesModal(){
    if($("#filter-addseriesmodal").hasClass('d-flex')){
        $("#filter-addseriesmodal").removeClass('d-flex');
        $('.modalbg2').removeClass('d-block');
    }
}

//Resets the filters
$('#f-resetbtn').click(function(){
    //type
    if($('.f-typebtns').length){
        $('.f-typebtns').removeClass('f-type_active');
        $('.f-typebtns').each(function(i, x){
            var buttontext = $(x).val();
            $(x).val(buttontext.replace('-', '+'));
        });
        $('.f-type_cont > input[type="hidden"]').remove();
    }
    //tags
    $('.f-tagsincexc').empty();
    //fanfiction series
    if($('.ffs-series_include').length){
        $('.ffs-series_include').empty();
    }
    //options
    $(".f-options > select").val('0');
    //tag modal
    $('#tagdd-searchbar').val("");
    $("#f-tagdd-list > li").show();
    //fanfiction modal
    $('#fadds-searchbar').val("");
    $("#fadds-list > li").show();
    $(".fadds-dropdowns > select").val('0');
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
    $('#filter-tagddmodal').addClass('d-flex');
    $('.modalbg2').addClass('d-block');
    
    if(action == "include") {
        $('#f-tagdd-list').attr('data-action', 'include');
    }
    else if(action == "exclude"){
        $('#f-tagdd-list').attr('data-action', 'exclude');
    }
}
//adding tags to the filter modal
$('#f-tagdd-list > li').click(function(){
    var tagname = $(this).attr('data-tagddvalue');
    var tagnamedisplay = capitalizeFirstLetter(tagname.replaceAll('_', ' '));
    if($('#f-tagdd-list').attr('data-action') == 'include'){
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
    $('#tagdd-searchbar').val("");
    $("#f-tagdd-list > li").show();
    closeTagModal();
});
//searchbar that works with keyup. it's for finding the option more easily.
$("#tagdd-searchbar").keyup(function(){
    var filter = $(this).val();
    $("#f-tagdd-list > li").each(function () {
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).hide();
        } else {
            $(this).show()
        }
    });
});
//Hides the tag X icon when clicked outside
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
    $("#filter-addseriesmodal").addClass('d-flex');
    $('.modalbg2').addClass('d-block');
});

//adding series to the filter modal / fanfiction
//fadds = fanfiction add series
$('#fadds-list > li').click(function(){
    var name = $(this).attr('data-seriesval');
    var namedisplay = capitalizeFirstLetter(name.replaceAll('_', ' '));
    //delete if span-input already exist
    $('.ffs-series_include span[data-fseries="'+name+'"]').remove();
    $('.ffs-series_include input[value="'+name+'"]').remove();

    $(".ffs-series_include").append(`<span data-fseries="`+name+`">`+namedisplay+`<i class="bi bi-x-circle f-removeseriesbtn"></i></span>
                                    <input type="hidden" name="seriesinclude" value="`+name+`"/>`);
    $('#fadds-searchbar').val("");
    $("#fadds-list > li").show();
    closeSeriesModal();
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

//--------------------

//this hides, shows X and removes the tag if clicked on the X
//appended elements require this method
$(document).on('click', '.f-tagsincexc span', function(event){
    var target = $(event.target);
    if(target.hasClass('f-removetagbtn')){
        var tagname = $(this).attr('data-ftag');
        this.remove();
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
        this.remove();
        $('.ffs-series_include > input[value="'+seriesname+'"]').remove();
    }
});

