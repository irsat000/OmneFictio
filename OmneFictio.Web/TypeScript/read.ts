
document.addEventListener("DOMContentLoaded", function () {
    const modalbg1 = document.querySelector('.modalbg1') as HTMLDivElement;
    const modalbg2 = document.querySelector('.modalbg2') as HTMLDivElement;
    const orderbyModal = document.getElementById('orderby-modal') as HTMLDivElement;
    const filterModal = document.getElementById('filter-modal') as HTMLDivElement;
    const filterTagddModal = document.getElementById('filter-tagddmodal') as HTMLDivElement;
    const filterAddseriesModal = document.getElementById('filter-addseriesmodal') as HTMLDivElement;
    const filterTagList = document.getElementById('f-tagdd-list') as HTMLUListElement;
    
    
    
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
        const pagInstance = document.getElementById('paginationTemplate') as HTMLMetaElement;
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
    [document.getElementById('orderby-btn'),
    document.getElementById('sb-close')].forEach(element => {
        element?.addEventListener('click', function(){
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
    [document.getElementById('po-filter'),
    document.getElementById('f-close')].forEach(element => {
        element?.addEventListener('click', function(){
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
    $('#f-resetbtn').click(function () {
        //type
        if ($('.f-typebtns').length) {
            $('.f-typebtns').classList.remove('f-type_active');
            $('.f-typebtns').each(function (i, x) {
                var buttontext = $(x).val();
                $(x).val(buttontext.replace('-', '+'));
            });
            $('.f-type_cont > input[type="hidden"]').remove();
        }
        //tags
        $('.f-tagsincexc').empty();
        //fanfiction series
        if ($('.ffs-series_include').length) {
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
    $('#f-tagdd-list > li').click(function (e) {
        const li = e.currentTarget as HTMLLIElement;
        const tagname = li.getAttribute('data-tagddvalue')!;
        if(tagname === null){
            return;
        }
        const tagnamedisplay = capitalizeFirstLetter(tagname.replaceAll('_', ' '));
        if (filterTagList.getAttribute('data-action') == 'include') {
            $('.f-tagsincexc span[data-ftag="' + tagname + '"]').remove();
            $('.f-tagsincexc input[data-ftagref="' + tagname + '"]').remove();
            $(".f-tags_include").append(`<span data-ftag="` + tagname + `">` + tagnamedisplay + `<i class="bi bi-x-circle f-removetagbtn"></i></span>
                                        <input type="hidden" name="taginclude" value="`+ tagname + `" data-ftagref="` + tagname + `"/>`);
        }
        else {
            $('.f-tagsincexc span[data-ftag="' + tagname + '"]').remove();
            $('.f-tagsincexc input[data-ftagref="' + tagname + '"]').remove();
            $(".f-tags_exclude").append(`<span data-ftag="` + tagname + `">` + tagnamedisplay + `<i class="bi bi-x-circle f-removetagbtn"></i></span>
                                    <input type="hidden" name="tagexclude" value="`+ tagname + `" data-ftagref="` + tagname + `"/>`);
        }
        $('#tagdd-searchbar').val("");
        $("#f-tagdd-list > li").show();
        closeTagModal();
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


    //Hides the tag X icon when clicked outside
    $(document).on('click', '.filter-cont *', function (event) {
        var target = $(event.target);
        if (filterModal.classList.contains('dflex') && !target.parents('.f-tagsincexc').length && $('.f-removetagbtn').classList.contains('dflex')) {
            $('.f-removetagbtn').classList.remove('dflex');
        }
    });

    //--------FANFICTION SERIES OPTIONS-----------

    //choose series or add crossover menu for fanfictions
    //closes modal if it's open
    document.getElementById('fanfic-chooseseries')?.addEventListener('click', function () {
        filterAddseriesModal.classList.add('dflex');
        modalbg2.classList.add('dblock');
    });

    //adding series to the filter modal / fanfiction
    //fadds = fanfiction add series
    $('#fadds-list > li').click(function (e) {
        const li = e.currentTarget as HTMLLIElement;
        var name = li.getAttribute('data-seriesval')!;
        var namedisplay = capitalizeFirstLetter(name.replaceAll('_', ' '));
        //delete if span-input already exist
        $('.ffs-series_include span[data-fseries="' + name + '"]').remove();
        $('.ffs-series_include input[value="' + name + '"]').remove();

        $(".ffs-series_include").append(`<span data-fseries="` + name + `">` + namedisplay + `<i class="bi bi-x-circle f-removeseriesbtn"></i></span>
                                    <input type="hidden" name="seriesinclude" value="`+ name + `"/>`);
        $('#fadds-searchbar').val("");
        $("#fadds-list > li").show();
        closeSeriesModal();
    });

    //--------------------

    //this hides, shows X and removes the tag if clicked on the X
    //appended elements require this method
    $(document).on('click', '.f-tagsincexc span', function (event) {
        var target = $(event.target);
        if (target.classList.contains('f-removetagbtn')) {
            var tagname = $(this).attr('data-ftag');
            this.remove();
            $('.f-tagsincexc > input[data-ftagref="' + tagname + '"]').remove();
        }
        else {
            var removetagbtn = $(this).children('.f-removetagbtn');
            if (!removetagbtn.classList.contains('dflex')) {
                $('.f-removetagbtn').classList.remove('dflex');
                removetagbtn.classList.add('dflex');
            }
            else {
                removetagbtn.classList.remove('dflex');
            }
        }
    });
    //this is for removing series from filters
    $(document).on('click', '.ffs-series_include span', function (event) {
        var target = $(event.target);
        if (target.classList.contains('f-removeseriesbtn')) {
            var seriesname = $(this).attr('data-fseries');
            this.remove();
            $('.ffs-series_include > input[value="' + seriesname + '"]').remove();
        }
    });


});