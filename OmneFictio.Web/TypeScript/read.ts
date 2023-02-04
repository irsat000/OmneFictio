
document.addEventListener("DOMContentLoaded", function () {
    const orderbyModal = document.getElementById('orderby-modal') as HTMLDivElement;
    const filterModal = document.getElementById('filter-modal') as HTMLDivElement;
    
    const filterTagddModal = document.getElementById('filter-tagddmodal') as HTMLDivElement;
    const ftagsIncExc = Array.from(document.querySelectorAll('.f-tagsincexc') as NodeListOf<HTMLElement>) as HTMLElement[];
    const tagSearchbar = document.getElementById('tagdd-searchbar') as HTMLInputElement;
    const filterTagList = document.getElementById('f-tagdd-list') as HTMLUListElement;

    const filterAddseriesModal = document.getElementById('filter-addseriesmodal') as HTMLDivElement;
    const filterSeriesInclude = document.querySelector('.ffs-series_include') as HTMLDivElement;
    const seriesSearchbar = document.getElementById('fadds-searchbar') as HTMLInputElement;
    const filterSeriesList = document.getElementById('fadds-list') as HTMLUListElement;



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
        filterTagddModal.classList.add('dflex');
        filterTagList.setAttribute('data-action', "include");
    });
    document.getElementById('f-excludetagbtn')?.addEventListener('click', function () {
        filterTagddModal.classList.add('dflex');
        filterTagList.setAttribute('data-action', "exclude");
    });//Close tag include or exclude menu
    filterTagddModal.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'f-taggdd-close' || target.id === 'filter-tagddmodal') {
            filterTagddModal.classList.remove('dflex');
        }
    });

    //Open filter series modal (fanfiction)
    document.getElementById('fanfic-chooseseries')?.addEventListener('click', function () {
        filterAddseriesModal.classList.add('dflex');
        filterAddseriesModal.classList.add('opacity1');
    }); //Close filter series modal
    filterAddseriesModal.addEventListener('click', (e) => {
        //fadds = filter add series
        const target = e.target as HTMLElement;
        if (target.id === 'fadds-close' || target.id === 'filter-addseriesmodal') {
            filterAddseriesModal.classList.remove('dflex');
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

    //adding tags to the filter modal
    filterTagList.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', function () {
            const tagname = li.getAttribute('data-tagddvalue') as string;
            if (tagname === null) {
                return;
            }
            ftagsIncExc.forEach(body => {
                body.querySelector('span[data-ftag="' + tagname + '"]')?.remove();
                body.querySelector('input[data-ftagref="' + tagname + '"]')?.remove();
            });
            const tagnamedisplay = capitalizeFirstLetter(tagname.replaceAll('_', ' '));

            const newTagSpan = document.createElement("span") as HTMLSpanElement;
            newTagSpan.setAttribute('data-ftag', tagname);
            newTagSpan.innerHTML = tagnamedisplay + '<i class="bi bi-x-circle f-removetagbtn"></i>';
            const newTagInput = document.createElement("input") as HTMLInputElement;
            newTagInput.setAttribute('data-ftagref', tagname)
            newTagInput.type = "hidden"
            newTagInput.value = tagname;

            const includeBody = filterModal.querySelector(".f-tags_include")!;
            const excludeBody = filterModal.querySelector(".f-tags_exclude")!;
            if (filterTagList.getAttribute('data-action') == 'include') {
                newTagInput.name = "taginclude";
                includeBody.appendChild(newTagSpan);
                includeBody.appendChild(newTagInput);
            }
            else {
                newTagInput.name = "tagexclude";
                excludeBody.appendChild(newTagSpan);
                excludeBody.appendChild(newTagInput);
            }
            tagSearchbar.value = "";
            filterTagddModal.classList.remove('dflex');
        })
    });
    //Hides the tag X/close icon when clicked outside
    filterModal.addEventListener('click', function (e) {
        if ((<HTMLElement>e.target).getAttribute('data-ftag') === null) {
            filterModal.querySelectorAll('.f-removetagbtn').forEach(btn => {
                if (btn.classList.contains('dflex')) {
                    btn.classList.remove('dflex');
                }
            });
        }
    });

    //this hides, shows X/close and removes the tag if clicked on the X
    filterModal.addEventListener('click', function (e) {
        const target = e.target as HTMLElement;
        if (target.classList.contains('f-removetagbtn')) {
            const tagname = target.parentElement!.getAttribute('data-ftag') as string;
            filterModal.querySelector('input[data-ftagref="' + tagname + '"]')?.remove();
            target.parentElement!.remove();
        }
        else if (target.tagName === 'SPAN') {
            const removeBtn = target.querySelector('.f-removetagbtn')! as HTMLElement;
            if (removeBtn.classList.contains('dflex')) {
                removeBtn.classList.remove('dflex');
            } else {
                removeBtn.classList.add('dflex');
            }
        }
    });


    //searchbar that works with keyup. it's for finding the option more easily.
    //WE WILL HAVE TO FIND VANILLA JS VERSION
    /*
    $("#tagdd-searchbar").keyup(function (bar: HTMLInputElement) {
        var filter = $(this).val();
        $("#f-tagdd-list > li").each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show()
            }
        });
    });
    
    $("#fadds-searchbar").keyup(function () {
        var filter = $(this).val();
        $("#fadds-list > li").each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show()
            }
        });
    });
    */



    //--------FANFICTION SERIES OPTIONS-----------

    //adding series to the filter modal / fanfiction
    //fadds = fanfiction add series

    filterSeriesList.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', function () {
            const name = li.getAttribute('data-seriesval') as string;
            const namedisplay = capitalizeFirstLetter(name.replaceAll('_', ' '));

            //delete if span-input already exist
            filterSeriesInclude.querySelector('span[data-fseries="' + name + '"]')?.remove();
            filterSeriesInclude.querySelector('input[value="' + name + '"]')?.remove();

            const newSeriesSpan = document.createElement("span") as HTMLSpanElement;
            newSeriesSpan.setAttribute('data-fseries', name);
            newSeriesSpan.innerHTML = namedisplay + '<i class="bi bi-x-circle f-removeseriesbtn"></i>';
            const newSeriesInput = document.createElement("input") as HTMLInputElement;
            newSeriesInput.type = "hidden"
            newSeriesInput.value = name;
            newSeriesInput.name = "seriesinclude";
            filterSeriesInclude.appendChild(newSeriesSpan);
            filterSeriesInclude.appendChild(newSeriesInput);

            seriesSearchbar.value = "";
            filterAddseriesModal.classList.remove('dflex');
        });
    });

    //this is for removing series from filters
    filterSeriesInclude.addEventListener('click', function (e) {
        const target = e.target as HTMLElement;
        if (target.classList.contains('f-removeseriesbtn')) {
            const seriesname = target.parentElement!.getAttribute('data-fseries') as string;
            filterSeriesInclude.querySelector('input[value="' + seriesname + '"]')?.remove();
            target.parentElement!.remove();
        }
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
        filterSeriesInclude.innerHTML = "";
        //options
        filterModal.querySelectorAll(".f-options > select").forEach(select => {
            (<HTMLInputElement>select).value = "0";
        });
        //tag modal
        tagSearchbar.value = "";
        //fanfiction modal
        seriesSearchbar.value = "";
        filterAddseriesModal.querySelectorAll(".fadds-dropdowns > select").forEach(select => {
            (<HTMLInputElement>select).value = "0";
        });
    });


});