"use strict";
class ofIndex_GetTopPosts {
    todaysTopPosts;
    monthsTopPosts;
}
document.addEventListener("DOMContentLoaded", function () {
    const featured = document.querySelector('.featured');
    const featured_images = document.querySelector('.swiper-images');
    const featured_descs = document.querySelector('.featured_description');
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
    if (window.screen.width >= 992) {
        let featuredInterval_isSet = true;
        let autoSwipeFeatured = setInterval(() => {
            swipeFeatured("next");
        }, 10000);
        document.querySelector(".featured").addEventListener("mouseover", function () {
            if (featuredInterval_isSet) {
                clearInterval(autoSwipeFeatured);
                featuredInterval_isSet = false;
            }
        });
        document.querySelector(".featured").addEventListener("mouseout", function () {
            if (featuredInterval_isSet === false) {
                autoSwipeFeatured = setInterval(function () {
                    swipeFeatured("next");
                }, 10000);
                featuredInterval_isSet = true;
            }
        });
    }
    document.querySelector('.fswipe-next i').addEventListener('click', () => {
        swipeFeatured("next");
    });
    document.querySelector('.fswipe-prev i').addEventListener('click', () => {
        swipeFeatured("prev");
    });
    function swipeFeatured(action) {
        const currentIndex = parseInt(featured.querySelector('[data-fswipe_tabIndex].active')
            .getAttribute('data-fswipe_tabIndex'), 10);
        const a_indexes = [...featured_images.children]
            .map(a => parseInt(a.getAttribute('data-fswipe_tabIndex'), 10));
        if (a_indexes.length < 2) {
            return;
        }
        featured.querySelectorAll('[data-fswipe_tabIndex].active').forEach(element => {
            element.classList.remove('active');
        });
        const nextIndex = action === "next"
            ? next_swiper_index(a_indexes, currentIndex)
            : prev_swiper_index(a_indexes, currentIndex);
        featured.querySelectorAll('[data-fswipe_tabIndex="' + nextIndex + '"]').forEach(element => {
            element.classList.add('active');
        });
    }
});
function prev_swiper_index(numbers, num) {
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
function next_swiper_index(numbers, num) {
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
