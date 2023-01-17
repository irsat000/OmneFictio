"use strict";
class ofIndex_GetTopPosts {
    todaysTopPosts;
    monthsTopPosts;
}
document.addEventListener("DOMContentLoaded", function () {
    fetchTopPosts();
    function fetchTopPosts() {
        const todaytopBody = document.querySelector('.todaytop_body');
        const monthtopBody = document.querySelector('.monthtop_body');
        window.createSkeletons("index-topposts");
        fetch('/g/GetTopPosts', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
            if (data.statusCode == 200) {
                const response = JSON.parse(data.value);
                todaytopBody.innerHTML = "";
                monthtopBody.innerHTML = "";
                for (const post of response.todaysTopPosts) {
                    todaytopBody.appendChild(window.fillPostTemplate(post, false));
                }
                for (const post of response.monthsTopPosts) {
                    monthtopBody.appendChild(window.fillPostTemplate(post, false));
                }
                if (response.todaysTopPosts.length < 1) {
                }
                if (response.monthsTopPosts.length < 1) {
                }
            }
            else {
                todaytopBody.remove();
                monthtopBody.remove();
            }
        })
            .catch(error => { console.log("Fetch failed -> " + error); });
    }
});
