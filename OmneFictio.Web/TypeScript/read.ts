
document.addEventListener("DOMContentLoaded", function () {
    const orderbyModal = document.getElementById('orderby-modal') as HTMLDivElement;
    const filterModal = document.getElementById('filter-modal') as HTMLDivElement;

    const filterTagListModal = document.getElementById('filter-tag_list_modal') as HTMLDivElement;
    const ftagsIncExc = Array.from(document.querySelectorAll('.f-tagsincexc') as NodeListOf<HTMLElement>) as HTMLElement[];
    const tagSearchbar = document.getElementById('taglist-searchbar') as HTMLInputElement;
    const filterTagList = document.getElementById('f-taglist-list') as HTMLUListElement;

    const filterSeriesListModal = document.getElementById('filter-serieslistmodal') as HTMLDivElement;
    const filterSeriesInclude = document.querySelector('.ffs-series_include') as HTMLDivElement | null;
    const seriesSearchbar = document.getElementById('serieslist-searchbar') as HTMLInputElement;
    const filterSeriesList = document.getElementById('f-serieslist-list') as HTMLUListElement;



    const params = new URLSearchParams(window.location.search);
    //Error message references
    const plwarning = document.getElementById('plwarning') as HTMLDivElement;
    const plw_message = plwarning.querySelector('.plwarning-message') as HTMLHeadingElement;
    const plw_img = plwarning.querySelector('.plwarning-img') as HTMLImageElement;

    //-----fetch post START--------------
    window.createSkeletons("read-posts");
    fetchPosts();
    function fetchPosts() {
        //I use columns for masonry design.
        const pl_column1 = document.getElementById('pl-column1') as HTMLDivElement;
        const pl_column2 = document.getElementById('pl-column2') as HTMLDivElement;
        fetch("/g/GetPosts?" + params, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data: any) => {
                pl_column1.innerHTML = "";
                pl_column2.innerHTML = "";
                if (data.statusCode === 200) {
                    //GET THE POSTS
                    const response = JSON.parse(data.value) as ofRead_GetPosts;
                    for (const post of response.posts) {
                        if (pl_column1.offsetHeight <= pl_column2.offsetHeight) {
                            pl_column1.appendChild(window.fillPostTemplate(post));
                        } else {
                            pl_column2.appendChild(window.fillPostTemplate(post));
                        }
                    }
                    //PAGINATION
                    const postShowroom = document.querySelector('.posts-cont') as HTMLDivElement;
                    createPaginationForPosts(postShowroom, response.pages);
                } else if (data.statusCode === 404) {
                    plw_message.textContent = "In terms of posts, we have no posts.";
                    plw_img.setAttribute("src", "/images/onerror/noposts.webp");
                    plwarning.style.display = "flex";
                } else {
                    plw_message.textContent = "Couldn't connect to servers.";
                    plw_img.setAttribute("src", "/images/onerror/connectionerror.png");
                    plwarning.style.display = "flex";
                    //Codes that will return an apology instead of post list
                }
            })
            .catch(error => {
                pl_column1.innerHTML = "";
                pl_column2.innerHTML = "";
                plw_message.textContent = "Please feedback, this was not supposed to happen.";
                plw_img.setAttribute("src", "/images/onerror/connectionerror.png");
                plwarning.style.display = "flex";
                console.log('Fetch failed -> ' + error); //MUST NOT BE GIVEN TO USERS
            });
    }

    function createPaginationForPosts(appendLocation: HTMLElement, pageCount: number) {
        const curpage = params.has('page')
            ? parseInt(params.get('page')!, 10)
            : 1;
        //PAGINATION
        const pagInstance = document.getElementById('paginationTemplate') as HTMLTemplateElement;
        const pagClone = window.cloneFromTemplate(pagInstance);

        const pagSelect = pagClone.querySelector('.page_select') as HTMLSelectElement;
        for (let i = 1; i <= pageCount; i++) {
            const opt = document.createElement('option');
            opt.value = i.toString();
            opt.textContent = i.toString();
            pagSelect.appendChild(opt);
        }
        pagSelect.value = curpage.toString();
        //----
        const params_pag = params;
        let newUrl = new URL(window.location.toString());
        let urlPath = newUrl.origin + newUrl.pathname;

        if (curpage < pageCount) {
            params_pag.set('page', (curpage + 1).toString());
            pagClone.querySelector('#nextPageBtn')!
                .setAttribute('href', urlPath + "?" + params_pag);
            if (curpage == 1) {
                pagClone.querySelector('#prevPageBtn')!.classList.add('opacity-50');
                pagClone.querySelector('.firstPageBtn')!.classList.add('opacity-50');
            }
        }
        if (curpage > 1) {
            params_pag.set('page', (curpage - 1).toString());
            pagClone.querySelector('#prevPageBtn')!
                .setAttribute('href', urlPath + "?" + params_pag);
            if (curpage == pageCount) {
                pagClone.querySelector('#nextPageBtn')!.classList.add('opacity-50');
                pagClone.querySelector('.lastPageBtn')!.classList.add('opacity-50');
            }
        }
        pagClone.querySelector('.firstPageBtn')!.addEventListener('click', function () {
            params_pag.set('page', '1');
            window.location.href = urlPath + "?" + params_pag;
        });
        pagClone.querySelector('.lastPageBtn')!.addEventListener('click', function () {
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
    //-------fetch post END----------------------



    //--------MODALS--------------

    //open tag include or exclude menu.
    document.getElementById('f-includetagbtn')?.addEventListener('click', function () {
        filterTagListModal.classList.add('dflex');
        filterTagList.setAttribute('data-action', "include");
    });
    document.getElementById('f-excludetagbtn')?.addEventListener('click', function () {
        filterTagListModal.classList.add('dflex');
        filterTagList.setAttribute('data-action', "exclude");
    });//Close tag include or exclude menu
    filterTagListModal.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'f-taglist-close' || target.id === 'filter-tag_list_modal') {
            filterTagListModal.classList.remove('dflex');
        }
    });

    //Open filter series modal (fanfiction)
    document.getElementById('fanfic-chooseseries')?.addEventListener('click', function () {
        filterSeriesListModal.classList.add('dflex');
    }); //Close filter series modal
    filterSeriesListModal.addEventListener('click', (e) => {
        //fsl = filter series list
        const target = e.target as HTMLElement;
        if (target.id === 'fsl-close' || target.id === 'filter-serieslistmodal') {
            filterSeriesListModal.classList.remove('dflex');
        }
    });

    //Open orderby modal
    document.querySelector('#orderby-btn')!.addEventListener('click', () => {
        orderbyModal.classList.add('dflex');
        setTimeout(function () {
            orderbyModal.classList.add('opacity1');
        }, 100);
    }); //close orderby modal
    orderbyModal.addEventListener('click', e => {
        const target = e.target as HTMLElement;
        if (target.id === 'ob-close' || target.closest('#ob-close') || target.id === 'orderby-modal') {
            orderbyModal.classList.remove('dflex');
            orderbyModal.classList.remove('opacity1');
        }
    });

    //Open filter modal
    document.querySelector('#po-filter')!.addEventListener('click', () => {
        filterModal.classList.add('dflex');
        setTimeout(function () {
            filterModal.classList.add('opacity1');
        }, 100);
    }); //close filter modal
    filterModal.addEventListener('click', e => {
        const target = e.target as HTMLElement;
        if (target.id === 'f-close' || target.closest('#f-close') || target.id === 'filter-modal') {
            filterModal.classList.remove('dflex');
            filterModal.classList.remove('opacity1');
        }
    });


    //-----TAG SELECTIONS------

    //Hides the tag X/close icon when clicked outside
    filterModal.addEventListener('click', function (e) {
        const target = e.target as HTMLElement;
        if (!target.hasAttribute('data-tagvalue')) {
            filterModal.querySelectorAll('.f-removetagbtn').forEach(btn => btn.classList.remove('dflex'));
        }
    }); //this hides, shows X/close
    ftagsIncExc.forEach(body => {
        body.addEventListener('click', function (e) {
            const target = e.target as HTMLElement;
            if (target.tagName === 'SPAN') {
                const removeBtn = target.querySelector('.f-removetagbtn')! as HTMLElement;
                removeBtn.classList.toggle('dflex');
            }
        });
    });

    //adding tags to the filter modal / exclude or include
    filterTagList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const selectedTag__value = target.getAttribute('data-tagvalue') as string | null;
        const selectedTag__displayName = target.textContent as string | null;
        if (selectedTag__value === null || selectedTag__displayName === null) {
            return;
        }
        //Remove the tag from tag lists if it already exists
        ftagsIncExc.forEach(body => body.querySelector('span[data-tagvalue="' + selectedTag__value + '"]')?.remove());
        //new tag span
        const newTagSpan = document.createElement("span") as HTMLSpanElement;
        newTagSpan.setAttribute('data-tagvalue', selectedTag__value);
        newTagSpan.textContent = selectedTag__displayName;
        newTagSpan.innerHTML += '<i class="bi bi-x-circle f-removetagbtn" onclick="this.parentNode.remove();"></i>';

        const targetList = filterTagList.getAttribute('data-action') === 'include'
            ? filterModal.querySelector(".f-tags_include")!
            : filterModal.querySelector(".f-tags_exclude")!;
        targetList!.appendChild(newTagSpan);

        //clean tag list modal
        tagSearchbar.value = "";
        filterTagListModal.classList.remove('dflex');
    });


    //--------FANFICTION SERIES OPTIONS-----------

    //adding series to the filter modal / fanfiction - graphical
    filterSeriesList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const selectedSeries__value = target.getAttribute('data-series_val') as string | null;
        const selectedSeries__displayName = target.textContent as string | null;
        if (selectedSeries__value === null || selectedSeries__displayName === null) {
            return;
        }

        //delete if span already exist
        filterSeriesInclude!.querySelector('span[data-fseries="' + selectedSeries__value + '"]')?.remove();

        const newSeriesSpan = document.createElement("span") as HTMLSpanElement;
        newSeriesSpan.setAttribute('data-series_val', selectedSeries__value);
        newSeriesSpan.textContent = selectedSeries__displayName;
        newSeriesSpan.innerHTML += '<i class="bi bi-x-circle f-removeseriesbtn" onclick="this.parentNode.remove();"></i>';
        filterSeriesInclude!.appendChild(newSeriesSpan);

        seriesSearchbar.value = "";
        filterSeriesListModal.classList.remove('dflex');
    });
    //--------------------


    //-------FILTERS---------

    //Resets the filters
    filterModal.querySelector('#f-resetbtn')?.addEventListener('click', function () {
        //tags
        ftagsIncExc.forEach(body => {
            body.innerHTML = "";
        })
        //fanfiction series
        if (filterSeriesInclude != null) {
            filterSeriesInclude.innerHTML = "";
        }
        //options
        filterModal.querySelectorAll(".f-options > select").forEach(select => {
            (<HTMLInputElement>select).value = "0";
        });
        //tag modal
        tagSearchbar.value = "";
        //fanfiction modal
        seriesSearchbar.value = "";
        filterSeriesListModal.querySelectorAll(".fsl-filters > select").forEach(select => {
            (<HTMLInputElement>select).value = "0";
        });
    });


});