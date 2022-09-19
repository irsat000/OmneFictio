
$(document).ready(function(){

    const repliesModal = document.getElementById('modal-replies');
    const modalbg1 = document.getElementsByClassName('modalbg1')[0];
    
    $('.get_replies, #mr-close').click(function(){
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