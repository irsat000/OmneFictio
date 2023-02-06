
document.addEventListener("DOMContentLoaded", function () {
    const createTagListModal = document.getElementById('create-tag_list_modal') as HTMLDivElement;
    const tagSearchbar = document.getElementById('taglist-searchbar') as HTMLInputElement;
    const createTagList = document.getElementById('c-taglist-list') as HTMLUListElement;

    const createSeriesListModal = document.getElementById('create-tag_list_modal') as HTMLDivElement;
    const seriesSearchbar = document.getElementById('serieslist-searchbar') as HTMLInputElement;
    const createSeriesList = document.getElementById('c-serieslist-list') as HTMLUListElement;


    //--------MODALS--------------

    //open tag list modal
    document.getElementById('ff-open_taglist-btn')!.addEventListener('click', function () {
        createTagListModal.classList.add('dflex');
        //createTagList.setAttribute('data-action', "");
    }); //Close tag list modal
    createTagListModal.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'c-taglist-close' || target.id === 'create-tag_list_modal') {
            createTagListModal.classList.remove('dflex');
        }
    });


    //Open filter series modal (fanfiction)
    document.getElementById('ff-open_serieslist-btn')!.addEventListener('click', function () {
        createSeriesListModal.classList.add('dflex');
    }); //Close filter series modal
    createSeriesListModal.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'csl-close' || target.id === 'create-serieslistmodal') {
            createSeriesListModal.classList.remove('dflex');
        }
    });
});


