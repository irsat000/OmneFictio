"use strict";
class Fiction_Post_Data {
    title;
    postDescription;
    postType;
    languageId;
    ratedAsId;
    coverImage;
    tagList;
    seriesList;
}
document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.getElementById('create-category');
    const createBody = document.querySelector('.cc-body');
    const fiction_form = document.getElementById('fiction-form');
    const coverImg_input = fiction_form.querySelector('[name="coverimg"]');
    const coverImg_preview = document.getElementById('coverimage_preview');
    const ff_requirements = fiction_form.querySelector('.ff-requirements');
    const create__TagListModal = document.getElementById('create-tag_list_modal');
    const tagSearchbar = document.getElementById('taglist-searchbar');
    const create__TagList = document.getElementById('c-taglist-list');
    const create__SeriesListModal = document.getElementById('create-serieslistmodal');
    const seriesSearchbar = document.getElementById('serieslist-searchbar');
    const create__SeriesList = document.getElementById('c-serieslist-list');
    const ff_tagfield = document.querySelector('.ff-tags-cont > .fftags-body');
    const ff_seriesfield = document.querySelector('.ff-series-cont > .ffseries-body');
    document.getElementById('ff-open_taglist-btn').addEventListener('click', function () {
        create__TagListModal.classList.add('dflex');
    });
    create__TagListModal.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'c-taglist-close' || target.id === 'create-tag_list_modal') {
            create__TagListModal.classList.remove('dflex');
        }
    });
    document.getElementById('ff-open_serieslist-btn').addEventListener('click', function () {
        create__SeriesListModal.classList.add('dflex');
    });
    create__SeriesListModal.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'csl-close' || target.id === 'create-serieslistmodal') {
            create__SeriesListModal.classList.remove('dflex');
        }
    });
    create__TagList.addEventListener('click', (e) => {
        const target = e.target;
        const selectedTag__value = target.getAttribute('data-taglistvalue');
        const selectedTag__displayName = target.textContent;
        if (selectedTag__value === null || selectedTag__displayName === null) {
            create__TagList;
            return;
        }
        ff_tagfield.querySelectorAll('li').forEach(body => {
            body.querySelector('span[data-tag_val="' + selectedTag__value + '"]')?.remove();
        });
        const newTagSpan = document.createElement("span");
        newTagSpan.setAttribute('data-tag_val', selectedTag__value);
        newTagSpan.textContent = selectedTag__displayName;
        newTagSpan.innerHTML += '<i class="bi bi-x-circle ff-removetagbtn" onclick="this.parentNode.remove();"></i>';
        ff_tagfield.appendChild(newTagSpan);
        create__TagListModal.classList.remove('dflex');
    });
    create__SeriesList.addEventListener('click', (e) => {
        const target = e.target;
        const selectedSeries__value = target.getAttribute('data-seriesval');
        const selectedSeries__displayName = target.textContent;
        if (selectedSeries__value === null || selectedSeries__displayName === null) {
            return;
        }
        ff_seriesfield.querySelectorAll('li').forEach(body => {
            body.querySelector('span[data-series_val="' + selectedSeries__value + '"]')?.remove();
        });
        const newSeriesSpan = document.createElement("span");
        newSeriesSpan.setAttribute('data-series_val', selectedSeries__value);
        newSeriesSpan.textContent = selectedSeries__displayName;
        newSeriesSpan.innerHTML += '<i class="bi bi-x-circle ff-removeseriesbtn" onclick="this.parentNode.remove();"></i>';
        ff_seriesfield.appendChild(newSeriesSpan);
        create__SeriesListModal.classList.remove('dflex');
    });
    coverImg_input.addEventListener('change', () => {
        const coverimg_file = coverImg_input.files;
        if (coverimg_file && coverimg_file[0]) {
            const file = coverimg_file[0];
            if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg" && file.type !== "image/webp") {
                coverImg_input.value = "";
                coverImg_preview.style.display = "none";
                return;
            }
            const reader = new FileReader();
            reader.onloadend = (event) => {
                const dataURL = reader.result;
                coverImg_preview.style.display = "block";
                coverImg_preview.querySelector('img').setAttribute('src', dataURL);
            };
            reader.readAsDataURL(file);
        }
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
                document.querySelector('.ff-series-cont').classList.add('active');
                break;
            case "Fanfiction":
                switch__FictionBody();
                document.querySelector('.ff-series-cont').classList.add('active');
                ff_requirements.querySelector('[data-ref="series"]').classList.remove('dnone');
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
        fiction_form.querySelector('.ff-series-cont').classList.remove('active');
        fiction_form.classList.add('active');
        ff_requirements.querySelectorAll('[data-ref]').forEach((li) => {
            li.classList.remove('failed');
            li.classList.remove('passed');
        });
        ff_requirements.querySelector('[data-ref="series"]').classList.add('dnone');
    }
    function switch__CommunityPostBody() {
        [...createBody.children].forEach(form => form.classList.remove('active'));
        document.getElementById('community_post-form').classList.add('active');
    }
    const ff_savebtns = document.querySelectorAll('.ff-save_draft, .ff-save_and_continue');
    ff_savebtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const postType = categorySelect.value;
            const title = fiction_form.querySelector('[name="title"]').value;
            const description = fiction_form.querySelector('[name="description"]').value;
            const language = parseInt(fiction_form.querySelector('[name="language"]').value, 10);
            const ratedAs = parseInt(fiction_form.querySelector('[name="ratedas"]').value, 10);
            const tagNames = Array.from(fiction_form.querySelectorAll('[data-tag_val]'))
                .map(span => span.getAttribute('data-tag_val'));
            ff_requirements.querySelectorAll('[data-ref]').forEach((li) => li.classList.remove('failed'));
            if (title.length < 3 || description.length < 3) {
                ff_requirements.querySelector('[data-ref="title_desc"]').classList.add('failed');
            }
            else {
                ff_requirements.querySelector('[data-ref="title_desc"]').classList.add('passed');
            }
            if (language === 0) {
                ff_requirements.querySelector('[data-ref="language"]').classList.add('failed');
            }
            else {
                ff_requirements.querySelector('[data-ref="language"]').classList.add('passed');
            }
            if (ratedAs === 0) {
                ff_requirements.querySelector('[data-ref="rating"]').classList.add('failed');
            }
            else {
                ff_requirements.querySelector('[data-ref="rating"]').classList.add('passed');
            }
            if (tagNames.length < 2) {
                ff_requirements.querySelector('[data-ref="tag"]').classList.add('failed');
            }
            else {
                ff_requirements.querySelector('[data-ref="tag"]').classList.add('passed');
            }
            let formData = {
                title: title,
                postDescription: description,
                postType: postType,
                languageId: language,
                ratedAsId: ratedAs,
                coverImage: null,
                tagList: tagNames,
                seriesList: null
            };
            var coverimg_file = coverImg_input.files;
            if (coverimg_file && coverimg_file[0]) {
                var file = coverimg_file[0];
                formData.coverImage = await ImageToByteArray(file);
            }
            if (categorySelect.value === "Graphical" || categorySelect.value === "Fanfiction") {
                const seriesNames = Array.from(fiction_form.querySelectorAll('[data-series_val]'))
                    .map(span => span.getAttribute('data-series_val'));
                if (seriesNames.length > 0) {
                    formData.seriesList = seriesNames;
                }
                if (categorySelect.value === "Fanfiction" && seriesNames.length < 1) {
                    ff_requirements.querySelector('[data-ref="series"]').classList.add('failed');
                }
                else {
                    ff_requirements.querySelector('[data-ref="series"]').classList.add('passed');
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
            })
                .catch((err) => console.log("Create post function failed -> " + err));
        });
    });
});
async function ImageToByteArray(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            var data = reader.result;
            if (data != null) {
                return resolve([...new Uint8Array(data)]);
            }
            else {
                return resolve(null);
            }
        };
        reader.readAsArrayBuffer(file);
    });
}
