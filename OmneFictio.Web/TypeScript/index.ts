
document.addEventListener("DOMContentLoaded", function () {
    const todaytopBody = document.querySelector('.todaytop_body') as HTMLDivElement;
    const monthtopBody = document.querySelector('.monthtop_body') as HTMLDivElement;

    fetchTopPosts();
    function fetchTopPosts(){
        window.createSkeletons("index-topposts");
    }
});