
$(document).ready(function(){
    const modalbg1 = document.getElementsByClassName('modalbg1')[0];

    const repliesModal = document.getElementById('modal-replies');
    const repliesModalClose = document.getElementsByClassName('mr-close');
    const getRepliesBtns = document.getElementsByClassName("get_replies");

    const chaptersModal = document.getElementById('modal-chapters');
    const chaptersModalClose = document.getElementById('mc-close');
    const getChaptersBtn = document.getElementById('get_chapters');

    var repliesBtns = []
        .concat(Array.from(repliesModalClose))
        .concat(Array.from(getRepliesBtns));

    repliesBtns.forEach(function(element) {
        element.addEventListener("click", function() {
            if(repliesModal.classList.contains('d-flex')){
                repliesModal.classList.remove('d-flex');
                modalbg1.classList.remove('d-block');
            }
            else{
                repliesModal.classList.add('d-flex');
                modalbg1.classList.add('d-block');
            }
        });
    });
    [getChaptersBtn, chaptersModalClose].forEach(function(element) {
        element.addEventListener("click", function() {
            if(chaptersModal.classList.contains('d-flex')){
                chaptersModal.classList.remove('d-flex');
                modalbg1.classList.remove('d-block');
            }
            else{
                chaptersModal.classList.add('d-flex');
                modalbg1.classList.add('d-block');
            }
        });
     });
    /*$('.get_replies, #mr-close').click(function(){
        if(repliesModal.classList.contains('d-flex')){
            repliesModal.classList.remove('d-flex');
            modalbg1.classList.remove('d-block');
        }
        else{
            repliesModal.classList.add('d-flex');
            modalbg1.classList.add('d-block');
        }
    });*/

});