

$(document).ready(function(){
    //swapping between request form and writing form
    var swapToWrite = document.getElementById('sf-swapToWriting');
    var swapToRequest = document.getElementById('sf-swapToRequest');
    swapToWrite.addEventListener('click', function(){
        swapForm('writing');
    });
    swapToRequest.addEventListener('click', function(){
        swapForm('request');
    });

//---TAG AND SERIES OPTIONS----
    //Variables for tag/series options
    var modalbg = document.getElementsByClassName('modalbg')[0];
    var tagmenu = document.getElementById('wf-addtagmodal');
    var seriesmenu = document.getElementById('wf-addseriesmodal');
    var addtagbtn = document.getElementById('wf-addtagbtn');
    var addseriesbtn = document.getElementById('wf-addseriesbtn');

    function closeTagAndSeriesDD(){
        if(tagmenu.classList.contains('d-flex')){
            tagmenu.classList.remove('d-flex');
            modalbg.classList.remove('d-block');
        }
        if(seriesmenu.classList.contains('d-flex')){
            seriesmenu.classList.remove('d-flex');
            modalbg.classList.remove('d-block');
        }
    }
    //Close modals on the page
    $('.modalbg, #wf-taggdd-close, #wf-addseries-close').click(function(){
        closeTagAndSeriesDD();
    });
    //removing selected tags and series
    $(document).on('click', '.wf-removespanbtn', function(){
        this.parentElement.remove();
    });
    //activate/deactivate adding series option depending on post type
    const seriesbtndiv = document.getElementsByClassName('wf-addseries')[0];
    const serieslistdiv = document.getElementsByClassName('wf-fanfic_series')[0];
    document.getElementById('wf-posttype').onchange = function() {
        if(this.selectedIndex === 3) {
            seriesbtndiv.style.display = 'flex';
            serieslistdiv.style.display = 'flex';
        } else {
            seriesbtndiv.style.display = 'none';
            serieslistdiv.style.display = 'none';
        }
    }

//-----TAG SELECTIONS------

    //open/close 'add tag' modal
    addtagbtn.addEventListener('click', function(){
        tagmenu.classList.add('d-flex');
        modalbg.classList.add('d-block');
    });

    //searchbar for tags
    $("#wf-addtag-searchbar").keyup(function(){
        var filter = $(this).val();
        $("#wf-addtag-list > li").each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show()
            }
        });
    });
    
    //adding tags
    $('#wf-addtag-list > li').click(function(){
        var name = $(this).attr('data-tagvalue');
        var id = $(this).attr('data-id');
        //var tagnamedisplay = capitalizeFirstLetter(name.replaceAll('_', ' '));
        //delete if span already exist
        $('.wf-tags span[data-id="'+id+'"]').remove();

        $(".wf-tags").append(`<span class="wf-taglist" data-id="`+id+`">`+name+`<i class="bi bi-x-circle wf-removespanbtn"></i></span>`);
        
        $('#wf-addtag-searchbar').val("");
        $("#wf-addtag-list > li").show();
        closeTagAndSeriesDD();
    });


//--------FANFICTION SERIES OPTIONS-----------
    
    addseriesbtn.addEventListener('click', function(){
        seriesmenu.classList.add('d-flex');
        modalbg.classList.add('d-block');
    });

    //searchbar for choosing series
    $("#wf-addseries-searchbar").keyup(function(){
        var filter = $(this).val();
        $("#wf-addseries-list > li").each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show()
            }
        });
    });

    //adding series to the filter modal / fanfiction
    //fadds = fanfiction add series
    $('#wf-addseries-list > li').click(function(){
        var name = $(this).attr('data-seriesval');
        var id = $(this).attr('data-id');
        //var namedisplay = capitalizeFirstLetter(name.replaceAll('_', ' '));
        //delete if span already exist
        $('.wf-fanfic_series span[data-id="'+id+'"]').remove();

        $(".wf-fanfic_series").append(`<span class="wf-serieslist" data-id="`+id+`">`+name+`<i class="bi bi-x-circle wf-removespanbtn"></i></span>`);
        
        $('#wf-addseries-searchbar').val("");
        $("#wf-addseries-list > li").show();
        closeTagAndSeriesDD();
    });



    
    //create post form - fetch api
    const createpost_form = document.getElementById('writing_form');
    createpost_form.addEventListener('submit', async function(event){
        //disables redirection of form element
        event.preventDefault();
        //Get message elements
        const error = document.getElementsByClassName('wf-errormessage')[0];
        const success = document.getElementsByClassName('wf-successmessage')[0];
        error.innerHTML = "";

        /*const payload = JSON.stringify(Object.fromEntries(new FormData(createpost_form)));
        const payload = {
            Title: 'Post title from fetch api',
            PostDescription: 'Post description from fetch api',
            PostTypeId: 3,
            LanguageId: 1,
            RatedAsId: 2,
            CoverImage: null,
            TagList: null
        };*/

        //Request
        var payload = Object.fromEntries(new FormData(createpost_form));

        var tagsList = [];
        Array.prototype.forEach.call(document.getElementsByClassName('wf-taglist'), function(tag) {
            tagsList.push(parseInt(tag.getAttribute('data-id')));
        });
        payload["TagList"] = tagsList;

        var seriesList = [];
        Array.prototype.forEach.call(document.getElementsByClassName('wf-serieslist'), function(series) {
            seriesList.push(parseInt(series.getAttribute('data-id')));
        });
        payload["SeriesList"] = seriesList;
        
        var coverImg = document.getElementById('uploadCoverImg').value.replace(/.*[\/\\]/, '');
        if(coverImg !== null && coverImg !== ""){
            payload["CoverImage"] = coverImg;
        }

        await fetch("/HomeAction/CreatePost", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(function (response) {
            if (response.ok) {
                success.innerHTML = "SUCCESS";
                setTimeout(function() {
                    window.location.replace("https://localhost:7067");
                }, 500);
            }
            else if(response.status === 499){ error.innerHTML = "*Login to be able to create your post*"; }
            else if(response.status === 480){ error.innerHTML = "*Fill the form properly*"; }
            else if(response.status === 481){ error.innerHTML = "*Title is too long (max 250 character)*"; }
            else if(response.status === 482){ error.innerHTML = "*Description is too long (max 2000 character)*"; }
            else if(response.status === 483){ error.innerHTML = "*Title is empty*"; }
            else if(response.status === 484){ error.innerHTML = "*Description is too short or empty* (min 50 character)"; }
            else{ error.innerHTML = "*Server error*"; }
        })
        .catch(error => console.log('Create post submit has failed.', error));
    });



});









function swapForm(form){
    var showform;
    var hideform;
    var showicon;
    var hideicon;
    if(form === "writing"){
        showform = document.getElementById('writing_form');
        hideform = document.getElementById('request_form');
        showicon = document.getElementById('sf-w_icon');
        hideicon = document.getElementById('sf-r_icon');
    }
    else{
        showform = document.getElementById('request_form');
        hideform = document.getElementById('writing_form');
        showicon = document.getElementById('sf-r_icon');
        hideicon = document.getElementById('sf-w_icon');
    }

    if(!showform.classList.contains('d-flex')){
        showform.classList.add('d-flex');
    }
    if(hideform.classList.contains('d-flex')){
        hideform.classList.remove('d-flex');
    }

    if(!showicon.classList.contains('d-block')){
        showicon.classList.add('d-block');
    }
    if(hideicon.classList.contains('d-block')){
        hideicon.classList.remove('d-block');
    }
}
