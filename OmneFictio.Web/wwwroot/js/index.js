"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const todaytopBody = document.querySelector('.todaytop_body');
    const monthtopBody = document.querySelector('.monthtop_body');
    fetchTopPosts();
    function fetchTopPosts() {
        window.createSkeletons("index-topposts");
    }
});
