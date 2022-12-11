"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const modalbg2 = document.querySelector('.modalbg2');
    const createpost_form = document.getElementById('writing_form');
    const tagmenu = document.getElementById('wf-addtagmodal');
    const addtagbtn = document.getElementById('wf-addtagbtn');
    const chosenTags = document.querySelector('.wf-tags');
    const tagSearchbar = document.getElementById('wf-addtag-searchbar');
    const seriesmenu = document.getElementById('wf-addseriesmodal');
    const addseriesbtn = document.getElementById('wf-addseriesbtn');
    const chosenSeries = document.querySelector('.wf-fanfic_series');
    const seriesSearchbar = document.getElementById('wf-addseries-searchbar');
    const swapToWrite = document.getElementById('sf-swapToWriting');
    const swapToRequest = document.getElementById('sf-swapToRequest');
    swapToWrite.addEventListener('click', function () {
        swapForm('writing');
    });
    swapToRequest.addEventListener('click', function () {
        swapForm('request');
    });
    function closeTagAndSeriesDD() {
        if (tagmenu.classList.contains('dflex')) {
            tagmenu.classList.remove('dflex');
            modalbg2.classList.remove('dblock');
        }
        if (seriesmenu.classList.contains('dflex')) {
            seriesmenu.classList.remove('dflex');
            modalbg2.classList.remove('dblock');
        }
    }
    [modalbg2, ...document.querySelectorAll('#wf-taggdd-close, #wf-addseries-close')].forEach(e => {
        e.addEventListener('click', () => closeTagAndSeriesDD());
    });
    document.querySelector('.wf-post_details').addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('wf-removespanbtn')) {
            target.parentElement.remove();
        }
    });
    const seriesbtndiv = document.querySelector('.wf-addseries');
    document.getElementById('wf-posttype')?.addEventListener('change', (e) => {
        if (e.currentTarget.selectedIndex === 3) {
            seriesbtndiv.style.display = 'flex';
            chosenSeries.style.display = 'flex';
        }
        else {
            seriesbtndiv.style.display = 'none';
            chosenSeries.style.display = 'none';
        }
    });
    addtagbtn.addEventListener('click', function () {
        tagmenu.classList.add('dflex');
        modalbg2.classList.add('dblock');
    });
    document.getElementById('wf-addtag-list').addEventListener('click', (e) => {
        const target = e.target;
        if (target.parentElement.id = "wf-addtag-list") {
            const name = target.getAttribute('data-tagvalue');
            const id = target.getAttribute('data-id');
            chosenTags.querySelector('span[data-id="' + id + '"]')?.remove();
            let newTagSpan = document.createElement("span");
            newTagSpan.classList.add('wf-taglist');
            newTagSpan.setAttribute('data-id', id);
            newTagSpan.innerHTML = name + '<i class="bi bi-x-circle wf-removespanbtn"></i>';
            chosenTags.appendChild(newTagSpan);
            tagSearchbar.value = "";
            closeTagAndSeriesDD();
        }
    });
    addseriesbtn.addEventListener('click', function () {
        seriesmenu.classList.add('dflex');
        modalbg2.classList.add('dblock');
    });
    document.getElementById('wf-addseries-list').addEventListener('click', (e) => {
        const target = e.target;
        if (target.parentElement.id = "wf-addseries-list") {
            const name = target.getAttribute('data-seriesval');
            const id = target.getAttribute('data-id');
            chosenSeries.querySelector('span[data-id="' + id + '"]')?.remove();
            let newSeriesSpan = document.createElement("span");
            newSeriesSpan.classList.add('wf-serieslist');
            newSeriesSpan.setAttribute('data-id', id);
            newSeriesSpan.innerHTML = name + '<i class="bi bi-x-circle wf-removespanbtn"></i>';
            chosenSeries.appendChild(newSeriesSpan);
            seriesSearchbar.value = "";
            closeTagAndSeriesDD();
        }
    });
    createpost_form.addEventListener('submit', async function (event) {
        event.preventDefault();
        let message = document.querySelector('.wf-message');
        message.innerHTML = "";
        message.style.color = "#b22525";
        let payload = Object.fromEntries(new FormData(createpost_form));
        let tagsList = [];
        Array.from(document.getElementsByClassName('wf-taglist')).forEach(tag => {
            tagsList.push(parseInt(tag.getAttribute('data-id')));
        });
        payload["TagList"] = tagsList;
        let seriesList = [];
        Array.from(document.getElementsByClassName('wf-serieslist')).forEach(series => {
            seriesList.push(parseInt(series.getAttribute('data-id')));
        });
        payload["SeriesList"] = seriesList;
        const coverImg = document.getElementById('uploadCoverImg').value.replace(/.*[\/\\]/, '');
        if (coverImg !== null && coverImg !== "") {
            payload["CoverImage"] = coverImg;
        }
        await fetch("/Action/CreatePost", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then(async (data) => {
            if (data.statusCode === 200) {
                message.style.color = "#36914e";
                message.innerHTML = "SUCCESS";
                setTimeout(function () {
                    window.location.replace("https://localhost:7067");
                }, 500);
            }
            else {
                message.innerHTML = "*Error*";
            }
        })
            .catch(error => console.log('Create post submit has failed.', error));
    });
});
function swapForm(form) {
    let showform;
    let hideform;
    let showicon;
    let hideicon;
    if (form === "writing") {
        showform = document.getElementById('writing_form');
        hideform = document.getElementById('request_form');
        showicon = document.getElementById('sf-w_icon');
        hideicon = document.getElementById('sf-r_icon');
    }
    else {
        showform = document.getElementById('request_form');
        hideform = document.getElementById('writing_form');
        showicon = document.getElementById('sf-r_icon');
        hideicon = document.getElementById('sf-w_icon');
    }
    if (!showform.classList.contains('dflex')) {
        showform.classList.add('dflex');
    }
    if (hideform.classList.contains('dflex')) {
        hideform.classList.remove('dflex');
    }
    if (!showicon.classList.contains('dblock')) {
        showicon.classList.add('dblock');
    }
    if (hideicon.classList.contains('dblock')) {
        hideicon.classList.remove('dblock');
    }
}
