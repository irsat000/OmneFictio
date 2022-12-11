
document.addEventListener("DOMContentLoaded", function () {
    const modalbg1 = document.querySelector('.modalbg1') as HTMLDivElement;
    const modalbg2 = document.querySelector('.modalbg2') as HTMLDivElement;

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
    async function fetchPosts() {
        //I use columns for masonry design.
        const pl_column1 = document.getElementById('pl-column1') as HTMLDivElement;
        const pl_column2 = document.getElementById('pl-column2') as HTMLDivElement;
        await fetch("/g/GetPosts?" + params, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(async (data) => {
                pl_column1.innerHTML = "";
                pl_column2.innerHTML = "";
                if (data.statusCode === 200) {
                    //GET THE POSTS
                    const response = JSON.parse(data.value);
                    for (const post of response.posts) {
                        const clone = window.fillPostTemplate(post);
                        if (pl_column1.offsetHeight <= pl_column2.offsetHeight) {
                            pl_column1.appendChild(clone);
                        } else {
                            pl_column2.appendChild(clone);
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


    modalbg1.addEventListener("click", function () {
        return modalbg1_click_readpage();
    });
    modalbg2.addEventListener("click", function () {
        return modalbg2_click_readpage();
    });

    //Close second modals on the page
    document.getElementById('f-taggdd-close')?.addEventListener('click', function () {
        closeTagModal();
    });
    document.getElementById('fadds-close')?.addEventListener('click', function () {
        closeSeriesModal();
    });

    //Open-close orderby modal
    document.querySelectorAll('#orderby-btn, #sb-close').forEach(element => {
        element.addEventListener('click', function () {
            if (orderbyModal.classList.contains('dflex')) {
                orderbyModal.classList.remove('dflex');
                orderbyModal.classList.remove('opacity1');
                modalbg1.classList.remove('dblock');
            }
            else {
                orderbyModal.classList.add('dflex');
                modalbg1.classList.add('dblock');
                setTimeout(function () {
                    orderbyModal.classList.add('opacity1');
                }, 100);
            }
        })
    });

    //Open-close filter modal
    document.querySelectorAll('#po-filter, #f-close').forEach(element => {
        element.addEventListener('click', function () {
            if (filterModal.classList.contains('dflex')) {
                filterModal.classList.remove('dflex');
                filterModal.classList.remove('opacity1');
                modalbg1.classList.remove('dblock');
            }
            else {
                filterModal.classList.add('dflex');
                modalbg1.classList.add('dblock');
                setTimeout(function () {
                    filterModal.classList.add('opacity1');
                }, 100);
            }
        })
    });

    //----------Modals----------------------------------------


    function modalbg1_click_readpage() {
        if (orderbyModal.classList.contains('dflex')) {
            orderbyModal.classList.remove('dflex');
            orderbyModal.classList.remove('opacity1');
            modalbg1.classList.remove('dblock');
        }
        if (filterModal.classList.contains('dflex')) {
            filterModal.classList.remove('dflex');
            filterModal.classList.remove('opacity1');
            modalbg1.classList.remove('dblock');
        }
    }
    function modalbg2_click_readpage() {
        closeTagModal();
        closeSeriesModal();
    }
    function closeTagModal() {
        if (filterTagddModal.classList.contains('dflex')) {
            filterTagddModal.classList.remove('dflex');
            modalbg2.classList.remove('dblock');
        }
    }
    function closeSeriesModal() {
        if (filterAddseriesModal.classList.contains('dflex')) {
            filterAddseriesModal.classList.remove('dflex');
            modalbg2.classList.remove('dblock');
        }
    }

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


    //-----TAG SELECTIONS------

    //open tag include and exclude menus.
    //closes modal if it's open
    document.getElementById('f-includetagbtn')?.addEventListener('click', function () {
        openFilterTagDD("include");
    });
    document.getElementById('f-excludetagbtn')?.addEventListener('click', function () {
        openFilterTagDD("exclude");
    });
    function openFilterTagDD(action: string) {
        filterTagddModal.classList.add('dflex');
        modalbg2.classList.add('dblock');

        if (action == "include") {
            filterTagList.setAttribute('data-action', 'include');
        }
        else if (action == "exclude") {
            filterTagList.setAttribute('data-action', 'exclude');
        }
    }
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
            closeTagModal();
        })
    });
    //Hides the tag X icon when clicked outside
    filterModal.addEventListener('click', function (e) {
        if ((<HTMLElement>e.target).getAttribute('data-ftag') === null) {
            filterModal.querySelectorAll('.f-removetagbtn').forEach(btn => {
                if (btn.classList.contains('dflex')) {
                    btn.classList.remove('dflex');
                }
            });
        }
    });
    
    //this hides, shows X and removes the tag if clicked on the X
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

    //choose series or add crossover menu for fanfictions
    //closes modal if it's open
    document.getElementById('fanfic-chooseseries')?.addEventListener('click', function () {
        filterAddseriesModal.classList.add('dflex');
        modalbg2.classList.add('dblock');
    });

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
            closeSeriesModal();
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



});