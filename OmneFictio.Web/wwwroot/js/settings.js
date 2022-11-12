
$(document).ready(function(){
    const navmobile = document.querySelector('.mobile_nav');
    const navdesktop = document.querySelector('.desktop_nav');
    switch (window.location.pathname) {
        case "/settings/profile":
            navmobile.getElementsByTagName('a')[0].classList.add('active');
            navdesktop.getElementsByTagName('a')[0].classList.add('active');
            break;
        case "/settings/library":
        case "/settings/mystuff":
        case "/settings/history":
            navmobile.getElementsByTagName('a')[1].classList.add('active');
            navdesktop.getElementsByTagName('a')[1].classList.add('active');
            break;
        case "/settings/friends":
            navmobile.getElementsByTagName('a')[2].classList.add('active');
            navdesktop.getElementsByTagName('a')[2].classList.add('active');
            break;
        case "/settings":
            navmobile.getElementsByTagName('a')[3].classList.add('active');
            navdesktop.getElementsByTagName('a')[3].classList.add('active');
            break;
        case "/settings/customize":
            navmobile.getElementsByTagName('a')[4].classList.add('active');
            navdesktop.getElementsByTagName('a')[4].classList.add('active');
            break;
        default:
            break;
    }
});