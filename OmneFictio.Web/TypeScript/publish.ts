
document.addEventListener("DOMContentLoaded", function () {
    const modalbg2 = document.querySelector('.modalbg2') as HTMLDivElement;
    const createpost_form = document.getElementById('writing_form') as HTMLFormElement;

    const tagmenu = document.getElementById('wf-addtagmodal') as HTMLDivElement;
    const addtagbtn = document.getElementById('wf-addtagbtn') as HTMLButtonElement;
    const chosenTags = document.querySelector('.wf-tags') as HTMLDivElement;
    const tagSearchbar = document.getElementById('wf-addtag-searchbar') as HTMLInputElement;
    
    const seriesmenu = document.getElementById('wf-addseriesmodal') as HTMLDivElement;
    const addseriesbtn = document.getElementById('wf-addseriesbtn') as HTMLButtonElement;
    const chosenSeries = document.querySelector('.wf-fanfic_series') as HTMLDivElement;
    const seriesSearchbar = document.getElementById('wf-addseries-searchbar') as HTMLInputElement;
    
    

    //swapping between request form and writing form
    const swapToWrite = document.getElementById('sf-swapToWriting') as HTMLDivElement;
    const swapToRequest = document.getElementById('sf-swapToRequest') as HTMLDivElement;
    swapToWrite.addEventListener('click', function(){
        swapForm('writing');
    });
    swapToRequest.addEventListener('click', function(){
        swapForm('request');
    });

//---TAG AND SERIES OPTIONS----
    function closeTagAndSeriesDD(){
        if(tagmenu.classList.contains('dflex')){
            tagmenu.classList.remove('dflex');
            modalbg2.classList.remove('dblock');
        }
        if(seriesmenu.classList.contains('dflex')){
            seriesmenu.classList.remove('dflex');
            modalbg2.classList.remove('dblock');
        }
    }
    //Close modals on the page
    [modalbg2, ...document.querySelectorAll('#wf-taggdd-close, #wf-addseries-close')].forEach(e => {
        e.addEventListener('click', () => closeTagAndSeriesDD());
    });
    
    //removing selected tags and series
    document.querySelector('.wf-post_details')!.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('wf-removespanbtn')) {
            target.parentElement!.remove();
        }
    });
    
    //activate/deactivate adding series option depending on post type
    const seriesbtndiv = document.querySelector('.wf-addseries') as HTMLDivElement;
    document.getElementById('wf-posttype')?.addEventListener('change', (e) => {
        if((<HTMLSelectElement>e.currentTarget).selectedIndex === 3) {
            seriesbtndiv.style.display = 'flex';
            chosenSeries.style.display = 'flex';
        } else {
            seriesbtndiv.style.display = 'none';
            chosenSeries.style.display = 'none';
        }
    });

//-----TAG SELECTIONS------

    //open/close 'add tag' modal
    addtagbtn.addEventListener('click', function(){
        tagmenu.classList.add('dflex');
        modalbg2.classList.add('dblock');
    });

    //searchbar for tags
    //Will be used vanilla instead
    /*$("#wf-addtag-searchbar").keyup(function(){
        var filter = $(this).val();
        $("#wf-addtag-list > li").each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show()
            }
        });
    });*/
    
    //adding tags
    document.getElementById('wf-addtag-list')!.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if(target.parentElement!.id = "wf-addtag-list"){
            const name = target.getAttribute('data-tagvalue') as string;
            const id = target.getAttribute('data-id') as string;
            //delete if span already exist
            chosenTags.querySelector('span[data-id="'+id+'"]')?.remove();

            let newTagSpan = document.createElement("span") as HTMLSpanElement;
            newTagSpan.classList.add('wf-taglist');
            newTagSpan.setAttribute('data-id', id);
            newTagSpan.innerHTML = name + '<i class="bi bi-x-circle wf-removespanbtn"></i>';
            chosenTags.appendChild(newTagSpan)

            tagSearchbar.value = "";
            closeTagAndSeriesDD();
        }
    });


//--------FANFICTION SERIES OPTIONS-----------
    
    addseriesbtn.addEventListener('click', function(){
        seriesmenu.classList.add('dflex');
        modalbg2.classList.add('dblock');
    });

    //searchbar for choosing series
    //Will be vanilla
    /*$("#wf-addseries-searchbar").keyup(function(){
        var filter = $(this).val();
        $("#wf-addseries-list > li").each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show()
            }
        });
    });*/

    //adding series to the filter modal / fanfiction
    document.getElementById('wf-addseries-list')!.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if(target.parentElement!.id = "wf-addseries-list"){
            const name = target.getAttribute('data-seriesval') as string;
            const id = target.getAttribute('data-id') as string;
            //delete if span already exist
            chosenSeries.querySelector('span[data-id="'+id+'"]')?.remove();

            let newSeriesSpan = document.createElement("span") as HTMLSpanElement;
            newSeriesSpan.classList.add('wf-serieslist');
            newSeriesSpan.setAttribute('data-id', id);
            newSeriesSpan.innerHTML = name + '<i class="bi bi-x-circle wf-removespanbtn"></i>';
            chosenSeries.appendChild(newSeriesSpan)

            seriesSearchbar.value = "";
            closeTagAndSeriesDD();
        }
    });



    
    //create post form - fetch api
    createpost_form.addEventListener('submit', async function(event){
        //disables redirection of form element
        event.preventDefault();
        //Get message elements
        let message = document.querySelector('.wf-message') as HTMLSpanElement;
        message.innerHTML = "";
        message.style.color = "#b22525";

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
        let payload = Object.fromEntries(new FormData(createpost_form)) as any;

        let tagsList = [] as Array<number>;
        Array.from(document.getElementsByClassName('wf-taglist')).forEach(tag => {
            tagsList.push(parseInt(tag.getAttribute('data-id') as string));
        });
        payload["TagList"] = tagsList;

        let seriesList = [] as Array<number>;
        Array.from(document.getElementsByClassName('wf-serieslist')).forEach(series => {
            seriesList.push(parseInt(series.getAttribute('data-id') as string));
        });
        payload["SeriesList"] = seriesList;
        
        const coverImg = (<HTMLInputElement>document.getElementById('uploadCoverImg')).value.replace(/.*[\/\\]/, '');
        if(coverImg !== null && coverImg !== ""){
            payload["CoverImage"] = coverImg;
        }
        
        await fetch("/Action/CreatePost", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then(async (data) => {
            if (data.statusCode === 200) {
                message.style.color = "#36914e";
                message.innerHTML = "SUCCESS";
                setTimeout(function() {
                    window.location.replace("https://localhost:7067");
                }, 500);
            }
            else{ message.innerHTML = "*Error*"; }
        })
        .catch(error => console.log('Create post submit has failed.', error));
    });



});









function swapForm(form: string){
    let showform;
    let hideform;
    let showicon;
    let hideicon;
    if(form === "writing"){
        showform = document.getElementById('writing_form') as HTMLFormElement;
        hideform = document.getElementById('request_form') as HTMLFormElement;
        showicon = document.getElementById('sf-w_icon') as HTMLDivElement;
        hideicon = document.getElementById('sf-r_icon') as HTMLDivElement;
    }
    else{
        showform = document.getElementById('request_form') as HTMLFormElement;
        hideform = document.getElementById('writing_form') as HTMLFormElement;
        showicon = document.getElementById('sf-r_icon') as HTMLDivElement;
        hideicon = document.getElementById('sf-w_icon') as HTMLDivElement;
    }

    if(!showform.classList.contains('dflex')){
        showform.classList.add('dflex');
    }
    if(hideform.classList.contains('dflex')){
        hideform.classList.remove('dflex');
    }

    if(!showicon.classList.contains('dblock')){
        showicon.classList.add('dblock');
    }
    if(hideicon.classList.contains('dblock')){
        hideicon.classList.remove('dblock');
    }
}
