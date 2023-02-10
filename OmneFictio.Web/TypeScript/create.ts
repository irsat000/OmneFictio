
document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.getElementById('create-category') as HTMLSelectElement;
    const createBody = document.querySelector('.cc-body') as HTMLDivElement;

    const create__TagListModal = document.getElementById('create-tag_list_modal') as HTMLDivElement;
    const tagSearchbar = document.getElementById('taglist-searchbar') as HTMLInputElement;
    const create__TagList = document.getElementById('c-taglist-list') as HTMLUListElement;

    const create__SeriesListModal = document.getElementById('create-serieslistmodal') as HTMLDivElement;
    const seriesSearchbar = document.getElementById('serieslist-searchbar') as HTMLInputElement;
    const create__SeriesList = document.getElementById('c-serieslist-list') as HTMLUListElement;

    const ff_tagfield = document.querySelector('.ff-tags-cont > .fftags-body') as HTMLDivElement;
    const ff_seriesfield = document.querySelector('.ff-series-cont > .ffseries-body') as HTMLDivElement;

    //--------MODALS--------------

    //open tag list modal
    document.getElementById('ff-open_taglist-btn')!.addEventListener('click', function () {
        create__TagListModal.classList.add('dflex');
        //create__TagList.setAttribute('data-action', "");
    }); //Close tag list modal
    create__TagListModal.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'c-taglist-close' || target.id === 'create-tag_list_modal') {
            create__TagListModal.classList.remove('dflex');
        }
    });


    //Open filter series modal (fanfiction)
    document.getElementById('ff-open_serieslist-btn')!.addEventListener('click', function () {
        create__SeriesListModal.classList.add('dflex');
    }); //Close filter series modal
    create__SeriesListModal.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'csl-close' || target.id === 'create-serieslistmodal') {
            create__SeriesListModal.classList.remove('dflex');
        }
    });



    create__TagList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const selectedTag__value = target.getAttribute('data-taglistvalue') as string | null;
        const selectedTag__displayName = target.textContent as string | null;
        if (selectedTag__value === null || selectedTag__displayName === null) {
            create__TagList
            return;
        }
        //Remove the selected tag if it exists already
        ff_tagfield.querySelectorAll('li').forEach(body => {
            body.querySelector('span[data-tag_val="' + selectedTag__value + '"]')?.remove();
        });
        //Add new tag to the field
        const newTagSpan = document.createElement("span") as HTMLSpanElement;
        newTagSpan.setAttribute('data-tag_val', selectedTag__value);
        newTagSpan.textContent = selectedTag__displayName;
        newTagSpan.innerHTML += '<i class="bi bi-x-circle ff-removetagbtn" onclick="this.parentNode.remove();"></i>';
        ff_tagfield.appendChild(newTagSpan);
        //Close the modal
        create__TagListModal.classList.remove('dflex');
    });


    create__SeriesList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const selectedSeries__value = target.getAttribute('data-seriesval') as string | null;
        const selectedSeries__displayName = target.textContent as string | null;
        if (selectedSeries__value === null || selectedSeries__displayName === null) {
            return;
        }
        //Remove the selected tag if it exists already
        ff_seriesfield.querySelectorAll('li').forEach(body => {
            body.querySelector('span[data-series_val="' + selectedSeries__value + '"]')?.remove();
        });
        //Add new tag to the field
        const newSeriesSpan = document.createElement("span") as HTMLSpanElement;
        newSeriesSpan.setAttribute('data-series_val', selectedSeries__value);
        newSeriesSpan.textContent = selectedSeries__displayName;
        newSeriesSpan.innerHTML += '<i class="bi bi-x-circle ff-removeseriesbtn" onclick="this.parentNode.remove();"></i>';
        ff_seriesfield.appendChild(newSeriesSpan);
        //Close the modal
        create__SeriesListModal.classList.remove('dflex');
    });




    categorySelect.addEventListener('change', () => {
        switch (categorySelect.value) {
            case "novel":
            case "graphical":
            case "script":
            case "plot":
                switch__FictionBody();
                break;
            case "fanfiction":
                switch__FictionBody();
                document.querySelector('.ff-series-cont')!.classList.add('active');
                break;
            case "community_post":
                switch__CommunityPostBody();
                break;
            default:
                break;
        }
    });
    function switch__FictionBody() {
        [...createBody.children].forEach(form => form.classList.remove('active'));
        document.querySelector('.ff-series-cont')!.classList.remove('active');
        document.getElementById('fiction-form')!.classList.add('active');
    }

    function switch__CommunityPostBody() {
        [...createBody.children].forEach(form => form.classList.remove('active'));
        document.getElementById('community_post-form')!.classList.add('active');
    }

});


