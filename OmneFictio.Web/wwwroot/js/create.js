"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const createTagListModal = document.getElementById('create-tag_list_modal');
    const tagSearchbar = document.getElementById('taglist-searchbar');
    const createTagList = document.getElementById('c-taglist-list');
    const createSeriesListModal = document.getElementById('create-tag_list_modal');
    const seriesSearchbar = document.getElementById('serieslist-searchbar');
    const createSeriesList = document.getElementById('c-serieslist-list');
    document.getElementById('ff-open_taglist-btn').addEventListener('click', function () {
        createTagListModal.classList.add('dflex');
    });
    createTagListModal.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'c-taglist-close' || target.id === 'create-tag_list_modal') {
            createTagListModal.classList.remove('dflex');
        }
    });
    document.getElementById('ff-open_serieslist-btn').addEventListener('click', function () {
        createSeriesListModal.classList.add('dflex');
    });
    createSeriesListModal.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'csl-close' || target.id === 'create-serieslistmodal') {
            createSeriesListModal.classList.remove('dflex');
        }
    });
});
