
class ofIndex_GetTopPosts {
    todaysTopPosts!: ofPost_1[];
    monthsTopPosts!: ofPost_1[];
}

document.addEventListener("DOMContentLoaded", function () {

    fetchTopPosts();
    function fetchTopPosts() {
        const todaytopBody = document.querySelector('.todaytop_body') as HTMLDivElement;
        const monthtopBody = document.querySelector('.monthtop_body') as HTMLDivElement;

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
                    const response = JSON.parse(data.value) as ofIndex_GetTopPosts;
                    todaytopBody.innerHTML = "";
                    monthtopBody.innerHTML = "";
                    console.log(response);
                    for (const post of response.todaysTopPosts) {
                        todaytopBody.appendChild(window.fillPostTemplate(post));
                    }
                    for (const post of response.monthsTopPosts) {
                        monthtopBody.appendChild(window.fillPostTemplate(post));
                    }
                    if(response.todaysTopPosts.length < 1){
                        //Letting the user know there was no posts
                    }
                    if(response.monthsTopPosts.length < 1){
                        //Letting the user know there was no posts
                    }
                }
                else {
                    todaytopBody.remove();
                    monthtopBody.remove();
                }
            })
            //.catch(error => { console.log("Fetch failed -> " + error) });
    }
});