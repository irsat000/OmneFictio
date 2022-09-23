
$(document).ready(function(){
    const modalbg1 = document.getElementsByClassName('modalbg1')[0];

    const chaptersModal = document.getElementById('modal-chapters');
    const chapterModalBtns = [document.getElementById('mc-close'), document.getElementById('get_chapters')];
    chapterModalBtns.forEach(function(element) {
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

    const repliesModal = document.getElementById('modal-replies');
    var repliesBtns = []
        .concat(Array.from(document.getElementsByClassName('mr-close')))
        .concat(Array.from(document.getElementsByClassName("get_replies")));

    repliesBtns.forEach(function(element) {
        element.addEventListener("click", function() {
            if(repliesModal.classList.contains('d-flex')){
                repliesModal.classList.remove('d-flex');
                modalbg1.classList.remove('d-block');
            }
            else{
                repliesModal.classList.add('d-flex');
                modalbg1.classList.add('d-block');
                fetchReplies(1);
            }
        });
    });

    async function fetchReplies(commentId){
        await fetch("/HomeAction/GetComment/" + commentId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.ok) {
                console.log("Success");
            } else { 
                console.log("Error"); 
            }
            return response.json();
        })
        .then((comment) => {
            console.log(comment.value);
        })
        .catch(error => console.log('Fetching replies method is at fault', error));
    }

});