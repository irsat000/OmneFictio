"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const orderbyModal = document.getElementById('orderby-modal');
    const filterModal = document.getElementById('filter-modal');
    const filterTagListModal = document.getElementById('filter-tag_list_modal');
    const ftagsIncExc = Array.from(document.querySelectorAll('.f-tagsincexc'));
    const tagSearchbar = document.getElementById('taglist-searchbar');
    const filterTagList = document.getElementById('f-taglist-list');
    const filterSeriesListModal = document.getElementById('filter-serieslistmodal');
    const filterSeriesInclude = document.querySelector('.ffs-series_include');
    const seriesSearchbar = document.getElementById('serieslist-searchbar');
    const filterSeriesList = document.getElementById('f-serieslist-list');
    const params = new URLSearchParams(window.location.search);
    const plwarning = document.getElementById('plwarning');
    const plw_message = plwarning.querySelector('.plwarning-message');
    const plw_img = plwarning.querySelector('.plwarning-img');
    window.createSkeletons("read-posts");
    fetchPosts();
    function fetchPosts() {
        const pl_column1 = document.getElementById('pl-column1');
        const pl_column2 = document.getElementById('pl-column2');
        fetch("/g/GetPosts?" + params, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
            pl_column1.innerHTML = "";
            pl_column2.innerHTML = "";
            if (data.statusCode === 200) {
                const response = JSON.parse(data.value);
                for (const post of response.posts) {
                    if (pl_column1.offsetHeight <= pl_column2.offsetHeight) {
                        pl_column1.appendChild(window.fillPostTemplate(post));
                    }
                    else {
                        pl_column2.appendChild(window.fillPostTemplate(post));
                    }
                }
                const postShowroom = document.querySelector('.posts-cont');
                createPaginationForPosts(postShowroom, response.pages);
            }
            else if (data.statusCode === 404) {
                plw_message.textContent = "In terms of posts, we have no posts.";
                plw_img.setAttribute("src", "/images/onerror/noposts.webp");
                plwarning.style.display = "flex";
            }
            else {
                plw_message.textContent = "Couldn't connect to servers.";
                plw_img.setAttribute("src", "/images/onerror/connectionerror.png");
                plwarning.style.display = "flex";
            }
        })
            .catch(error => {
            pl_column1.innerHTML = "";
            pl_column2.innerHTML = "";
            plw_message.textContent = "Please feedback, this was not supposed to happen.";
            plw_img.setAttribute("src", "/images/onerror/connectionerror.png");
            plwarning.style.display = "flex";
            console.log('Fetch failed -> ' + error);
        });
    }
    function createPaginationForPosts(appendLocation, pageCount) {
        const curpage = params.has('page')
            ? parseInt(params.get('page'), 10)
            : 1;
        const pagInstance = document.getElementById('paginationTemplate');
        const pagClone = window.cloneFromTemplate(pagInstance);
        const pagSelect = pagClone.querySelector('.page_select');
        for (let i = 1; i <= pageCount; i++) {
            const opt = document.createElement('option');
            opt.value = i.toString();
            opt.textContent = i.toString();
            pagSelect.appendChild(opt);
        }
        pagSelect.value = curpage.toString();
        const params_pag = params;
        let newUrl = new URL(window.location.toString());
        let urlPath = newUrl.origin + newUrl.pathname;
        if (curpage < pageCount) {
            params_pag.set('page', (curpage + 1).toString());
            pagClone.querySelector('#nextPageBtn')
                .setAttribute('href', urlPath + "?" + params_pag);
            if (curpage == 1) {
                pagClone.querySelector('#prevPageBtn').classList.add('opacity-50');
                pagClone.querySelector('.firstPageBtn').classList.add('opacity-50');
            }
        }
        if (curpage > 1) {
            params_pag.set('page', (curpage - 1).toString());
            pagClone.querySelector('#prevPageBtn')
                .setAttribute('href', urlPath + "?" + params_pag);
            if (curpage == pageCount) {
                pagClone.querySelector('#nextPageBtn').classList.add('opacity-50');
                pagClone.querySelector('.lastPageBtn').classList.add('opacity-50');
            }
        }
        pagClone.querySelector('.firstPageBtn').addEventListener('click', function () {
            params_pag.set('page', '1');
            window.location.href = urlPath + "?" + params_pag;
        });
        pagClone.querySelector('.lastPageBtn').addEventListener('click', function () {
            params_pag.set('page', pageCount.toString());
            window.location.href = urlPath + "?" + params_pag;
        });
        pagSelect.addEventListener('change', function () {
            params_pag.set('page', this.value);
            window.location.href = urlPath + "?" + params_pag;
        });
        if (pageCount !== 1) {
            appendLocation.appendChild(pagClone);
        }
    }
    document.getElementById('f-includetagbtn')?.addEventListener('click', function () {
        filterTagListModal.classList.add('dflex');
        filterTagList.setAttribute('data-action', "include");
    });
    document.getElementById('f-excludetagbtn')?.addEventListener('click', function () {
        filterTagListModal.classList.add('dflex');
        filterTagList.setAttribute('data-action', "exclude");
    });
    filterTagListModal.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'f-taglist-close' || target.id === 'filter-tag_list_modal') {
            filterTagListModal.classList.remove('dflex');
        }
    });
    document.getElementById('fanfic-chooseseries')?.addEventListener('click', function () {
        filterSeriesListModal.classList.add('dflex');
    });
    filterSeriesListModal.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'fsl-close' || target.id === 'filter-serieslistmodal') {
            filterSeriesListModal.classList.remove('dflex');
        }
    });
    document.querySelector('#orderby-btn').addEventListener('click', () => {
        orderbyModal.classList.add('dflex');
        setTimeout(function () {
            orderbyModal.classList.add('opacity1');
        }, 100);
    });
    orderbyModal.addEventListener('click', e => {
        const target = e.target;
        if (target.id === 'ob-close' || target.closest('#ob-close') || target.id === 'orderby-modal') {
            orderbyModal.classList.remove('dflex');
            orderbyModal.classList.remove('opacity1');
        }
    });
    document.querySelector('#po-filter').addEventListener('click', () => {
        filterModal.classList.add('dflex');
        setTimeout(function () {
            filterModal.classList.add('opacity1');
        }, 100);
    });
    filterModal.addEventListener('click', e => {
        const target = e.target;
        if (target.id === 'f-close' || target.closest('#f-close') || target.id === 'filter-modal') {
            filterModal.classList.remove('dflex');
            filterModal.classList.remove('opacity1');
        }
    });
    filterModal.addEventListener('click', function (e) {
        const target = e.target;
        if (!target.hasAttribute('data-tagvalue')) {
            filterModal.querySelectorAll('.f-removetagbtn').forEach(btn => btn.classList.remove('dflex'));
        }
    });
    ftagsIncExc.forEach(body => {
        body.addEventListener('click', function (e) {
            const target = e.target;
            if (target.tagName === 'SPAN') {
                const removeBtn = target.querySelector('.f-removetagbtn');
                removeBtn.classList.toggle('dflex');
            }
        });
    });
    filterTagList.addEventListener('click', (e) => {
        const target = e.target;
        const selectedTag__value = target.getAttribute('data-tagvalue');
        const selectedTag__displayName = target.textContent;
        if (selectedTag__value === null || selectedTag__displayName === null) {
            return;
        }
        ftagsIncExc.forEach(body => body.querySelector('span[data-tagvalue="' + selectedTag__value + '"]')?.remove());
        const newTagSpan = document.createElement("span");
        newTagSpan.setAttribute('data-tagvalue', selectedTag__value);
        newTagSpan.textContent = selectedTag__displayName;
        newTagSpan.innerHTML += '<i class="bi bi-x-circle f-removetagbtn" onclick="this.parentNode.remove();"></i>';
        const targetList = filterTagList.getAttribute('data-action') === 'include'
            ? filterModal.querySelector(".f-tags_include")
            : filterModal.querySelector(".f-tags_exclude");
        targetList.appendChild(newTagSpan);
        tagSearchbar.value = "";
        filterTagListModal.classList.remove('dflex');
    });
    filterSeriesList.addEventListener('click', (e) => {
        const target = e.target;
        const selectedSeries__value = target.getAttribute('data-series_val');
        const selectedSeries__displayName = target.textContent;
        if (selectedSeries__value === null || selectedSeries__displayName === null) {
            return;
        }
        filterSeriesInclude.querySelector('span[data-fseries="' + selectedSeries__value + '"]')?.remove();
        const newSeriesSpan = document.createElement("span");
        newSeriesSpan.setAttribute('data-series_val', selectedSeries__value);
        newSeriesSpan.textContent = selectedSeries__displayName;
        newSeriesSpan.innerHTML += '<i class="bi bi-x-circle f-removeseriesbtn" onclick="this.parentNode.remove();"></i>';
        filterSeriesInclude.appendChild(newSeriesSpan);
        seriesSearchbar.value = "";
        filterSeriesListModal.classList.remove('dflex');
    });
    filterModal.querySelector('#f-resetbtn')?.addEventListener('click', function () {
        ftagsIncExc.forEach(body => {
            body.innerHTML = "";
        });
        if (filterSeriesInclude != null) {
            filterSeriesInclude.innerHTML = "";
        }
        filterModal.querySelectorAll(".f-options > select").forEach(select => {
            select.value = "0";
        });
        tagSearchbar.value = "";
        seriesSearchbar.value = "";
        filterSeriesListModal.querySelectorAll(".fsl-filters > select").forEach(select => {
            select.value = "0";
        });
    });
});
