
class ofIndex_GetTopPosts {
    todaysTopPosts!: ofPost_1[];
    monthsTopPosts!: ofPost_1[];
}

document.addEventListener("DOMContentLoaded", function () {
    const featured_images = document.querySelector('.swiper-images') as HTMLDivElement;
    const featured_descs = document.querySelector('.featured_description') as HTMLDivElement;

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
                    for (const post of response.todaysTopPosts) {
                        todaytopBody.appendChild(window.fillPostTemplate(post, false));
                    }
                    for (const post of response.monthsTopPosts) {
                        monthtopBody.appendChild(window.fillPostTemplate(post, false));
                    }
                    if (response.todaysTopPosts.length < 1) {
                        //Letting the user know there was no posts
                    }
                    if (response.monthsTopPosts.length < 1) {
                        //Letting the user know there was no posts
                    }
                }
                else {
                    todaytopBody.remove();
                    monthtopBody.remove();
                }
            })
            .catch(error => { console.log("Fetch failed -> " + error) });
    }

    //Auto swipe interval for featured and stop when on hover
    var autoSwipeFeatured = setInterval(() => {
        swipeFeatured("next");
    }, 10000)
    document.querySelector(".featured")!.addEventListener("mouseover", function() {
        clearInterval(autoSwipeFeatured);
    });
    document.querySelector(".featured")!.addEventListener("mouseout", function() {
        autoSwipeFeatured = setInterval(function() {
            swipeFeatured("next");
        }, 10000);
    });
    //Swipe featured
    document.querySelector('.fswipe-next i')!.addEventListener('click', () => {
        swipeFeatured("next");
    });
    document.querySelector('.fswipe-prev i')!.addEventListener('click', () => {
        swipeFeatured("prev");
    });
    function swipeFeatured(action: string) {
        //Current active
        const currentActive = featured_images.querySelector('a.active') as HTMLElement;
        const currentIndex = parseInt(currentActive.getAttribute('data-featured')!, 10);
        //Get all
        const a_indexes = [...featured_images.children]
            .map(a => parseInt(a.getAttribute('data-featured')!, 10));
        if (a_indexes.length < 2) {
            return;
        }
        //Deactivate current
        currentActive.classList.remove('active');
        featured_descs.querySelector('.fdesc.active')!.classList.remove('active');
        //Swipe
        const nextIndex = action === "next"
            ? next_swiper_index(a_indexes, currentIndex)
            : prev_swiper_index(a_indexes, currentIndex);
        featured_images.querySelector('[data-featured="' + nextIndex + '"]')!.classList.add('active');
        featured_descs.querySelector('[data-featured="' + nextIndex + '"]')!.classList.add('active');
    }
});

function prev_swiper_index(numbers: number[], num: number): number | null {
    let prev = Number.POSITIVE_INFINITY;
    let biggest = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < num && (prev === Number.POSITIVE_INFINITY || numbers[i] > prev)) {
            prev = numbers[i];
        }
        if (numbers[i] > num) {
            biggest = numbers[i];
        }
    }
    return prev === Number.POSITIVE_INFINITY ? biggest : prev;
}

function next_swiper_index(numbers: number[], num: number): number | null {
    let next = Number.NEGATIVE_INFINITY;
    let smallest = Number.POSITIVE_INFINITY;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > num && (next === Number.NEGATIVE_INFINITY || numbers[i] < next)) {
            next = numbers[i];
        }
        if (numbers[i] < smallest) {
            smallest = numbers[i];
        }
    }
    return next === Number.NEGATIVE_INFINITY ? smallest : next;
}