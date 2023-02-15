
class Fiction_Post_Data {
    title!: String;
    postDescription!: String;
    postTypeId!: Number;
    languageId!: Number;
    ratedAsId!: Number;
    coverImage!: string | null;
    tagList!: Number[];
    seriesList!: Number[] | null;
}

document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.getElementById('create-category') as HTMLSelectElement;
    const createBody = document.querySelector('.cc-body') as HTMLDivElement;

    const fiction_form = document.getElementById('fiction-form') as HTMLDivElement;
    const coverImg_input = fiction_form.querySelector('[name="coverimg"]') as HTMLInputElement;
    const coverImg_preview = document.getElementById('coverimage_preview') as HTMLDivElement;
    const ff_requirements = fiction_form.querySelector('.ff-requirements') as HTMLDivElement;

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

    coverImg_input.addEventListener('change', () => {
        const coverimg_file = coverImg_input.files;
        if (coverimg_file && coverimg_file[0]) {
            const file = coverimg_file[0];
            // If it's one of the unwanted file types
            if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg" && file.type !== "image/webp") {
                coverImg_input.value = "";
                coverImg_preview.style.display = "none";
                return;
            }
            // If it's an image with allowed type
            const reader = new FileReader();
            reader.onloadend = (event) => {
                const dataURL = reader.result as string;
                coverImg_preview.style.display = "block";
                coverImg_preview.querySelector('img')!.setAttribute('src', dataURL);
            };
            reader.readAsDataURL(file);
        }
        // Using readAsDataURL to show preview of the image
    });




    categorySelect.addEventListener('change', () => {
        switch (categorySelect.value) {
            case "Novel":
            case "Script":
            case "Plot":
                switch__FictionBody();
                break;
            case "Graphical":
                switch__FictionBody();
                document.querySelector('.ff-series-cont')!.classList.add('active');
                break;
            case "Fanfiction":
                switch__FictionBody();
                document.querySelector('.ff-series-cont')!.classList.add('active');
                ff_requirements.querySelector('[data-ref="series"]')!.classList.remove('dnone');
                break;
            case "Community_post":
                switch__CommunityPostBody();
                break;
            default:
                break;
        }
    });
    function switch__FictionBody() {
        [...createBody.children].forEach(form => form.classList.remove('active'));
        fiction_form.querySelector('.ff-series-cont')!.classList.remove('active');
        fiction_form.classList.add('active');

        ff_requirements.querySelectorAll('[data-ref]').forEach((li) => {
            li.classList.remove('failed');
            li.classList.remove('passed');
        });
        ff_requirements.querySelector('[data-ref="series"]')!.classList.add('dnone');
    }

    function switch__CommunityPostBody() {
        [...createBody.children].forEach(form => form.classList.remove('active'));
        document.getElementById('community_post-form')!.classList.add('active');
    }



    const ff_savebtns = document.querySelectorAll('.ff-save_draft, .ff-save_and_continue') as NodeListOf<HTMLButtonElement>;
    ff_savebtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const postTypeId = parseInt(categorySelect.options[categorySelect.selectedIndex].getAttribute('data-id')!, 10);
            const title = (<HTMLInputElement>fiction_form.querySelector('[name="title"]')).value;
            const description = (<HTMLInputElement>fiction_form.querySelector('[name="description"]')).value;
            const language = parseInt((<HTMLSelectElement>fiction_form.querySelector('[name="language"]')).value, 10);
            const ratedAs = parseInt((<HTMLSelectElement>fiction_form.querySelector('[name="ratedas"]')).value, 10);

            const tagNames = Array.from(fiction_form.querySelectorAll('[data-tag_val]'))
                .map(span => parseInt(span.getAttribute('data-tag_val')!, 10));

            ff_requirements.querySelectorAll('[data-ref]').forEach((li) => li.classList.remove('failed'));
            if (title.length < 3 || description.length < 3) {
                ff_requirements.querySelector('[data-ref="title_desc"]')!.classList.add('failed');
            } else {
                ff_requirements.querySelector('[data-ref="title_desc"]')!.classList.add('passed');
            }
            if (language === 0) {
                ff_requirements.querySelector('[data-ref="language"]')!.classList.add('failed');
            } else {
                ff_requirements.querySelector('[data-ref="language"]')!.classList.add('passed');
            }
            if (ratedAs === 0) {
                ff_requirements.querySelector('[data-ref="rating"]')!.classList.add('failed');
            } else {
                ff_requirements.querySelector('[data-ref="rating"]')!.classList.add('passed');
            }
            if (tagNames.length < 2) {
                ff_requirements.querySelector('[data-ref="tag"]')!.classList.add('failed');
            } else {
                ff_requirements.querySelector('[data-ref="tag"]')!.classList.add('passed');
            }

            let formData: Fiction_Post_Data = {
                title: title,
                postDescription: description,
                postTypeId: postTypeId,
                languageId: language,
                ratedAsId: ratedAs,
                coverImage: null,
                tagList: tagNames,
                seriesList: null
            };


            //Get cover image
            var coverimg_file = coverImg_input.files;
            if (coverimg_file && coverimg_file[0]) {
                var file = coverimg_file[0];
                formData.coverImage = await ArrayBufferToBase64(file);
            }


            //If type allows fanfiction, include them
            if (categorySelect.value === "Graphical" || categorySelect.value === "Fanfiction") {
                const seriesNames = Array.from(fiction_form.querySelectorAll('[data-series_val]'))
                    .map(span => parseInt(span.getAttribute('data-series_val')!, 10));
                if (seriesNames.length > 0) {
                    formData.seriesList = seriesNames;
                }

                if (categorySelect.value === "Fanfiction" && seriesNames.length < 1) {
                    ff_requirements.querySelector('[data-ref="series"]')!.classList.add('failed');
                } else {
                    ff_requirements.querySelector('[data-ref="series"]')!.classList.add('passed');
                }
            }

            await fetch('Action/CreatePost', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.statusCode);
                    //const response = JSON.parse(data.value);
                })
                .catch((err) => console.log("Create post function failed -> " + err));

        });
    });
});

async function ImageToByteArray(file: File): Promise<Number[] | null> {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            var data = reader.result as ArrayBuffer | null;
            if (data != null) {
                return resolve([...new Uint8Array(data)]);
            }
            else {
                return resolve(null);
            }
        };
        reader.readAsArrayBuffer(file);
    })
}

async function ArrayBufferToBase64(file: File): Promise<string | null> {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            var buffer = reader.result as ArrayBuffer | null;
            if (buffer != null) {
                var binary = '';
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return resolve(window.btoa(binary));
            }
            else {
                return resolve(null);
            }
        };
        reader.readAsArrayBuffer(file);
    })
}
